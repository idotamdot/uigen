"use client";

import { Message } from "ai";
import { cn } from "@/lib/utils";
import { Bot, Loader2, Sparkles, User, WandSparkles } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onSuggestionSelect?: (text: string) => void;
}

const STARTER_PROMPTS = [
  "Create a luminous biotech dashboard with calm precision",
  "Design an occult editorial archive with ceremonial motion",
  "Build a playful learning app that feels tactile and alive",
  "Shape a cinematic booking interface with dramatic restraint",
] as const;

export function MessageList({
  messages,
  isLoading,
  onSuggestionSelect,
}: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-5 py-10 text-center">
        <div className="living-edge mb-6 rounded-[2rem] bg-white/[0.055] p-[1px]">
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-[calc(2rem-1px)] bg-[#0b0b12]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,70,239,0.35),transparent_48%),radial-gradient(circle_at_75%_75%,rgba(34,211,238,0.25),transparent_45%)]" />
            <WandSparkles className="relative h-8 w-8 text-white" />
          </div>
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-fuchsia-200/60">
          Interface Alchemy
        </p>
        <h2 className="mt-3 max-w-md text-balance text-2xl font-semibold tracking-tight text-white">
          Describe something impossible.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-white/45">
          Give the machine a purpose, an atmosphere, and a feeling. The code will follow.
        </p>

        {onSuggestionSelect && (
          <div className="mt-8 grid w-full max-w-xl gap-2 sm:grid-cols-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onSuggestionSelect(prompt)}
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-left text-sm leading-5 text-white/65 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              >
                <span className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-violet-200/50 group-hover:text-cyan-100/70">
                  <Sparkles className="h-3 w-3" />
                  Seed an interface
                </span>
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        {messages.map((message) => (
          <div
            key={message.id || message.content}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="flex-shrink-0">
                <div className="living-edge rounded-xl bg-white/[0.055] p-[1px]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[calc(0.75rem-1px)] bg-[#0c0c13]">
                    <Bot className="h-4 w-4 text-fuchsia-100" />
                  </div>
                </div>
              </div>
            )}

            <div
              className={cn(
                "flex max-w-[86%] flex-col gap-2",
                message.role === "user" ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-6 shadow-[0_16px_42px_rgba(0,0,0,0.18)]",
                  message.role === "user"
                    ? "border border-violet-300/20 bg-gradient-to-br from-violet-500/80 to-fuchsia-500/65 text-white"
                    : "border border-white/10 bg-white/[0.055] text-white/85 backdrop-blur-xl"
                )}
              >
                {message.parts ? (
                  <>
                    {message.parts.map((part, partIndex) => {
                      switch (part.type) {
                        case "text":
                          return message.role === "user" ? (
                            <span key={partIndex} className="whitespace-pre-wrap">
                              {part.text}
                            </span>
                          ) : (
                            <MarkdownRenderer
                              key={partIndex}
                              content={part.text}
                              className="prose-sm prose-invert"
                            />
                          );
                        case "reasoning":
                          return (
                            <div
                              key={partIndex}
                              className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3"
                            >
                              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/60">
                                Design reasoning
                              </span>
                              <span className="text-sm text-white/65">
                                {part.reasoning}
                              </span>
                            </div>
                          );
                        case "tool-invocation": {
                          const tool = part.toolInvocation;
                          const isComplete = tool.state === "result" && tool.result;
                          return (
                            <div
                              key={partIndex}
                              className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[10px] text-white/65"
                            >
                              {isComplete ? (
                                <div className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(199,255,74,0.7)]" />
                              ) : (
                                <Loader2 className="h-3 w-3 animate-spin text-cyan-300" />
                              )}
                              <span>{tool.toolName}</span>
                            </div>
                          );
                        }
                        case "source":
                          return (
                            <div key={partIndex} className="mt-2 text-xs text-white/40">
                              Source: {JSON.stringify(part.source)}
                            </div>
                          );
                        case "step-start":
                          return partIndex > 0 ? (
                            <hr key={partIndex} className="my-3 border-white/10" />
                          ) : null;
                        default:
                          return null;
                      }
                    })}
                    {isLoading &&
                      message.role === "assistant" &&
                      messages.indexOf(message) === messages.length - 1 && (
                        <div className="mt-3 flex items-center gap-2 text-cyan-100/60">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span className="text-xs uppercase tracking-[0.14em]">
                            Resolving the interface
                          </span>
                        </div>
                      )}
                  </>
                ) : message.content ? (
                  message.role === "user" ? (
                    <span className="whitespace-pre-wrap">{message.content}</span>
                  ) : (
                    <MarkdownRenderer
                      content={message.content}
                      className="prose-sm prose-invert"
                    />
                  )
                ) : isLoading &&
                  message.role === "assistant" &&
                  messages.indexOf(message) === messages.length - 1 ? (
                  <div className="flex items-center gap-2 text-cyan-100/60">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span className="text-xs uppercase tracking-[0.14em]">
                      Resolving the interface
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {message.role === "user" && (
              <div className="flex-shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-[0_0_24px_rgba(255,255,255,0.08)]">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
