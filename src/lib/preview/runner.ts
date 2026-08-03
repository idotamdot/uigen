export function createPreviewCsp(nonce: string, applicationOrigin: string): string {
  return [
    "default-src 'none'", "base-uri 'none'", "object-src 'none'", "form-action 'none'",
    "connect-src 'none'", "worker-src 'none'", "frame-src 'none'", "child-src 'none'",
    "manifest-src 'none'", "img-src data: blob:", "font-src data:", "media-src data: blob:",
    `script-src 'nonce-${nonce}' blob: ${applicationOrigin}`,
    "script-src-attr 'none'", `style-src-elem 'nonce-${nonce}'`, "style-src-attr 'unsafe-inline'",
  ].join("; ") + ";";
}

function escapeScriptValue(value: string): string {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) =>
    `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`
  );
}

export function createTrustedRunnerHtml(nonce: string, applicationOrigin: string): string {
  const csp = createPreviewCsp(nonce, applicationOrigin);
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content=${escapeScriptValue(csp)}></head><body><div id="root"></div><script nonce="${nonce}">
  (() => { const urls = new Map(); let channelId = null; let renderId = null;
  const send=(type,data={})=>parent.postMessage({type,channelId,renderId,...data},'*');
  const diagnostic=(value)=>({message:String(value instanceof Error?value.message:value).slice(0,4000),stack:value instanceof Error&&value.stack?value.stack.slice(0,12000):undefined});
  const dispose=(id)=>{const list=urls.get(id)||[]; for(const url of list)URL.revokeObjectURL(url); urls.delete(id)};
  addEventListener('error',event=>send('preview-runtime-error',{diagnostic:diagnostic(event.error||event.message)}));
  addEventListener('unhandledrejection',event=>send('preview-unhandled-rejection',{diagnostic:diagnostic(event.reason)}));
  addEventListener('securitypolicyviolation',event=>send('preview-csp-violation',{directive:String(event.effectiveDirective).slice(0,200),blockedUri:String(event.blockedURI).slice(0,500)}));
  addEventListener('message',async event=>{const message=event.data;if(!message||typeof message!=='object')return;
    if(message.type==='initialize-preview'&&typeof message.channelId==='string'){channelId=message.channelId;send('preview-ready');return}
    if(message.channelId!==channelId)return;
    if(message.type==='dispose-render'){dispose(message.renderId);return}
    if(message.type!=='render-bundle')return; renderId=message.renderId;
    try{const imports={};const owned=[];for(const module of message.modules){const url=URL.createObjectURL(new Blob([module.code],{type:'text/javascript'}));owned.push(url);imports[module.path]=url;imports[module.path.replace(/\\.(jsx?|tsx?)$/,'')]=url}
      Object.assign(imports,message.dependencies);urls.set(renderId,owned);const map=document.createElement('script');map.type='importmap';map.textContent=JSON.stringify({imports});document.head.append(map);
      const style=document.createElement('style');style.nonce=${escapeScriptValue(nonce)};style.textContent=message.styles;document.head.append(style);
      await import(imports[message.entryPoint]);send('preview-loaded');
    }catch(error){send('preview-build-error',{diagnostic:diagnostic(error)})}
  }); parent.postMessage({type:'preview-bootstrap'},'*'); })();
  </script></body></html>`;
}
