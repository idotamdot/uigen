"use client";

import { useEffect, useRef, useState } from "react";
import { useFileSystem } from "@/lib/contexts/file-system-context";
import {
  createImportMap,
  createPreviewHTML,
} from "@/lib/transform/jsx-transformer";
import { AlertCircle, Sparkles } from "lucide-react";

export function PreviewFrame() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { getAllFiles, refreshTrigger } = useFileSystem();
  const [error, setError] = useState<string | null>(null);
  const [entryPoint, setEntryPoint] = useState<string>("/App.jsx");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const updatePreview = () => {
      try {
        const files = getAllFiles();

        if (files.size > 0 && error) {
          setError(null);
        }

        let foundEntryPoint = entryPoint;
        const possibleEntries = [
          "/App.jsx",
          "/App.tsx",
          "/index.jsx",
          "/index.tsx",
          "/src/App.jsx",
          "/src/App.tsx",
        ];

        if (!files.has(entryPoint)) {
          const found = possibleEntries.find((path) => files.has(path));
          if (found) {
            foundEntryPoint = found;
            setEntryPoint(found);
          } else if (files.size > 0) {
            const firstJSX = Array.from(files.keys()).find(
              (path) => path.endsWith(".jsx") || path.endsWith(".tsx")
            );
            if (firstJSX) {
              foundEntryPoint = firstJSX;
              setEntryPoint(firstJSX);
            }
          }
        }

        if (files.size === 0) {
          setError(isFirstLoad ? "firstLoad" : "No files to preview");
          return;
        }

        if (isFirstLoad) {
          setIsFirstLoad(false);
        }

        if (!foundEntryPoint || !files.has(foundEntryPoint)) {
          setError(
            "No React component found. Create an App.jsx or index.jsx file to get started."
          );
          return;
        }

        const { importMap, styles, errors } = createImportMap(files);
        const previewHTML = createPreviewHTML(foundEntryPoint, importMap, styles, errors);

        if (iframeRef.current) {
          const iframe = iframeRef.current;
          iframe.setAttribute(
            "sandbox",
            "allow-scripts allow-same-origin allow-forms"
          );
          iframe.srcdoc = previewHTML;
          setError(null);
        }
      } catch (err) {
        console.error("Preview error:", err);
        setError(err instanceof Error ? err.message : "Unknown preview error");
      }
    };

    updatePreview();
  }, [refreshTrigger, getAllFiles, entryPoint, error, isFirstLoad]);

  if (error) {
    if (error === "firstLoad") {
      return (
        <div className="flex h-full items-center justify-center bg-[#08080d] p-8 text-white">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-[radial-gradient(circle_at_30%_20%,rgba(217,70,239,0.35),transparent_48%),radial-gradient(circle_at_75%_75%,rgba(34,211,238,0.25),transparent_45%),#0b0b12] shadow-[0_0_50px_rgba(139,92,246,0.18)]">
              <Sparkles className="h-7 w-7 text-cyan-100" aria-hidden="true" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-fuchsia-200/60">
              The Stage is listening
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
              Describe the feeling. Generate the interface.
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/45">
              Shape the intent in The Conductor. Your first interface will resolve here as soon as the project has matter.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full items-center justify-center bg-[#08080d] p-8 text-white">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-coral-300/20 bg-white/[0.04]">
            <AlertCircle className="h-7 w-7 text-[#ff5f6d]" aria-hidden="true" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ff5f6d]/75">
            Preview interrupted
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
            The interface could not resolve yet.
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/50">{error}</p>
          <p className="mt-2 text-xs text-white/30">
            Your files are safe. Refine the project matter or repair the entry point.
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      className="h-full w-full border-0 bg-white"
      title="Generated interface preview"
    />
  );
}
