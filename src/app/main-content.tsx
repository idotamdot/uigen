"use client";

import { useState } from "react";
import { Code2, Eye, Sparkles } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FileSystemProvider } from "@/lib/contexts/file-system-context";
import { ChatProvider } from "@/lib/contexts/chat-context";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { FileTree } from "@/components/editor/FileTree";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderActions } from "@/components/HeaderActions";
import { ChatMessage, SerializedFileSystem } from "@/lib/data-schemas";

interface MainContentProps {
  user?: {
    id: string;
    email: string;
  } | null;
  project?: {
    id: string;
    name: string;
    messages: ChatMessage[];
    data: SerializedFileSystem;
    createdAt: Date;
    updatedAt: Date;
  };
}

type WorkspaceView = "preview" | "code";

export function MainContent({ user, project }: MainContentProps) {
  const [activeView, setActiveView] = useState<WorkspaceView>("preview");
  const projectName = project?.name ?? "Untitled synthesis";

  return (
    <FileSystemProvider initialData={project?.data}>
      <ChatProvider projectId={project?.id} initialMessages={project?.messages}>
        <main className="relative h-screen w-screen overflow-hidden bg-[#050507] text-[#f8f7ff]">
          <div className="alchemy-grid pointer-events-none absolute inset-0 opacity-70" />
          <div className="alchemy-orb absolute -left-32 top-24 h-80 w-80 bg-violet-600/30" />
          <div className="alchemy-orb absolute -right-36 bottom-12 h-96 w-96 bg-cyan-400/20 [animation-delay:1.5s]" />

          <div className="relative z-10 flex h-full flex-col p-2 sm:p-3">
            <header className="alchemy-glass mb-2 flex min-h-16 items-center justify-between rounded-2xl px-4 sm:mb-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="alchemy-edge flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#09090d]">
                    <Sparkles className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="alchemy-kicker">UIGen</p>
                  <div className="flex min-w-0 items-baseline gap-2">
                    <h1 className="alchemy-wordmark truncate text-lg font-semibold tracking-[-0.035em] sm:text-xl">
                      Interface Alchemy
                    </h1>
                    <span className="hidden truncate text-xs text-white/35 md:inline">
                      {projectName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] text-white/50 lg:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c7ff4a] shadow-[0_0_12px_rgba(199,255,74,0.8)]" />
                  Engine ready
                </div>
                <HeaderActions user={user} projectId={project?.id} />
              </div>
            </header>

            <section className="min-h-0 flex-1">
              <ResizablePanelGroup direction="horizontal" className="h-full gap-2 sm:gap-3">
                <ResizablePanel defaultSize={34} minSize={25} maxSize={48}>
                  <section className="alchemy-glass flex h-full flex-col overflow-hidden rounded-2xl">
                    <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.08] px-5">
                      <div>
                        <p className="alchemy-kicker">The Conductor</p>
                        <p className="mt-1 text-sm font-medium text-white/80">
                          Shape intent into interface
                        </p>
                      </div>
                      <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-violet-200">
                        Imagine
                      </span>
                    </div>
                    <div className="min-h-0 flex-1 bg-black/10">
                      <ChatInterface />
                    </div>
                  </section>
                </ResizablePanel>

                <ResizableHandle className="group relative w-1 bg-transparent after:absolute after:inset-y-8 after:left-1/2 after:w-px after:-translate-x-1/2 after:bg-white/10 hover:after:bg-cyan-300/70" />

                <ResizablePanel defaultSize={66}>
                  <section className="alchemy-glass flex h-full flex-col overflow-hidden rounded-2xl">
                    <div className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-4 sm:px-5">
                      <div className="min-w-0">
                        <p className="alchemy-kicker">The Stage</p>
                        <p className="mt-1 truncate text-sm text-white/45">
                          Thought, rendered in real time
                        </p>
                      </div>

                      <Tabs
                        value={activeView}
                        onValueChange={(value) => setActiveView(value as WorkspaceView)}
                      >
                        <TabsList className="h-10 rounded-xl border border-white/10 bg-black/25 p-1 shadow-inner shadow-black/40">
                          <TabsTrigger
                            value="preview"
                            className="gap-2 rounded-lg px-3 text-xs text-white/45 transition-all data-[state=active]:bg-white/10 data-[state=active]:text-cyan-100 data-[state=active]:shadow-[0_0_24px_rgba(34,211,238,0.12)]"
                          >
                            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                            Live
                          </TabsTrigger>
                          <TabsTrigger
                            value="code"
                            className="gap-2 rounded-lg px-3 text-xs text-white/45 transition-all data-[state=active]:bg-white/10 data-[state=active]:text-violet-100 data-[state=active]:shadow-[0_0_24px_rgba(139,92,246,0.14)]"
                          >
                            <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Inspect
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    <div className="relative min-h-0 flex-1 overflow-hidden bg-[#07070b]">
                      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-violet-500/[0.04] to-transparent" />
                      {activeView === "preview" ? (
                        <div className="h-full p-2 sm:p-3">
                          <div className="alchemy-edge h-full overflow-hidden rounded-xl">
                            <div className="h-full overflow-hidden rounded-xl bg-white">
                              <PreviewFrame />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <ResizablePanelGroup direction="horizontal" className="h-full">
                          <ResizablePanel defaultSize={28} minSize={20} maxSize={46}>
                            <div className="h-full border-r border-white/[0.08] bg-black/20">
                              <div className="border-b border-white/[0.08] px-4 py-3">
                                <p className="alchemy-kicker">The Matter</p>
                              </div>
                              <div className="h-[calc(100%-49px)]">
                                <FileTree />
                              </div>
                            </div>
                          </ResizablePanel>

                          <ResizableHandle className="w-px bg-white/[0.08] hover:bg-violet-300/60" />

                          <ResizablePanel defaultSize={72}>
                            <div className="h-full bg-[#09090d]">
                              <CodeEditor />
                            </div>
                          </ResizablePanel>
                        </ResizablePanelGroup>
                      )}
                    </div>
                  </section>
                </ResizablePanel>
              </ResizablePanelGroup>
            </section>
          </div>
        </main>
      </ChatProvider>
    </FileSystemProvider>
  );
}
