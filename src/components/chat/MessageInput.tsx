"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useMemo } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface MessageInputProps {
  input: string;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const ATMOSPHERE_WORDS = [
  "editorial",
  "ritualistic",
  "playful",
  "brutalist",
  "calm",
  "cinematic",
  "organic",
  "luminous",
  "minimal",
  "experimental",
] as const;

export function MessageInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: MessageInputProps) {
  const detectedAtmosphere = useMemo(
    () =>
      ATMOSPHERE_WORDS.filter((word) =>
        input.toLocaleLowerCase().includes(word)
      ),
    [input]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-white/10 bg-[#07070b]/92 p-4 backdrop-blur-2xl">
      <div className="living-edge relative overflow-hidden rounded-[1.4rem] bg-white/[0.055] p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
        <div className="relative rounded-[calc(1.4rem-1px)] bg-[#0b0b12]/95 px-4 pb-3 pt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-200/70">
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
              Shape the intent
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
              Shift + Enter for depth
            </span>
          </div>

          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Describe the feeling, the purpose, and the interface you want to bring into existence..."
            disabled={isLoading}
            className="min-h-[104px] max-h-[240px] w-full resize-none bg-transparent pr-14 text-[15px] leading-7 text-white outline-none placeholder:text-white/30 disabled:cursor-wait disabled:opacity-60"
            rows={4}
            aria-label="Describe the interface to generate"
          />

          <div className="mt-3 flex min-h-7 flex-wrap items-center gap-2 pr-14">
            {detectedAtmosphere.length > 0 ? (
              detectedAtmosphere.map((word) => (
                <span
                  key={word}
                  className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-fuchsia-100"
                >
                  {word}
                </span>
              ))
            ) : (
              <span className="text-xs text-white/30">
                Atmosphere words become part of the design DNA.
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="group absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-200/30 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-[0_0_30px_rgba(139,92,246,0.35)] transition duration-200 hover:scale-105 hover:shadow-[0_0_42px_rgba(34,211,238,0.42)] disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:scale-100"
            aria-label={isLoading ? "Interface synthesis in progress" : "Generate interface"}
          >
            <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </form>
  );
}
