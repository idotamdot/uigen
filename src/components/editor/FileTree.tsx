"use client";

import { useState } from "react";
import { FileNode } from "@/lib/file-system";
import { useFileSystem } from "@/lib/contexts/file-system-context";
import {
  Box,
  Braces,
  ChevronDown,
  ChevronRight,
  Component,
  FileCode2,
  FileJson2,
  Folder,
  FolderOpen,
  ImageIcon,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileTreeNodeProps {
  node: FileNode;
  level: number;
}

function getMatterSignature(node: FileNode) {
  if (node.type === "directory") {
    return {
      Icon: Folder,
      activeIcon: FolderOpen,
      color: "text-signal-cyan",
      glow: "shadow-[0_0_18px_color-mix(in_srgb,var(--signal-cyan)_72%,transparent)]",
      kind: "collection",
    };
  }

  const name = node.name.toLowerCase();

  if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name)) {
    return {
      Icon: ImageIcon,
      activeIcon: ImageIcon,
      color: "text-solar-coral",
      glow: "shadow-[0_0_18px_color-mix(in_srgb,var(--solar-coral)_72%,transparent)]",
      kind: "asset",
    };
  }

  if (/\.(css|scss|sass|less)$/.test(name) || name.includes("token")) {
    return {
      Icon: Palette,
      activeIcon: Palette,
      color: "text-electric-orchid",
      glow: "shadow-[0_0_18px_color-mix(in_srgb,var(--electric-orchid)_72%,transparent)]",
      kind: "design DNA",
    };
  }

  if (/package\.json|lock|config/.test(name)) {
    return {
      Icon: Box,
      activeIcon: Box,
      color: "text-acid-lime",
      glow: "shadow-[0_0_18px_color-mix(in_srgb,var(--acid-lime)_72%,transparent)]",
      kind: "dependency",
    };
  }

  if (/\.(json|ya?ml)$/.test(name)) {
    return {
      Icon: FileJson2,
      activeIcon: FileJson2,
      color: "text-acid-lime",
      glow: "shadow-[0_0_18px_color-mix(in_srgb,var(--acid-lime)_72%,transparent)]",
      kind: "data",
    };
  }

  if (/\.(tsx|jsx)$/.test(name)) {
    return {
      Icon: Component,
      activeIcon: Component,
      color: "text-plasma-violet",
      glow: "shadow-[0_0_18px_color-mix(in_srgb,var(--plasma-violet)_78%,transparent)]",
      kind: "component",
    };
  }

  if (/\.(ts|js|mjs|cjs)$/.test(name)) {
    return {
      Icon: Braces,
      activeIcon: Braces,
      color: "text-signal-cyan",
      glow: "shadow-[0_0_18px_color-mix(in_srgb,var(--signal-cyan)_72%,transparent)]",
      kind: "logic",
    };
  }

  return {
    Icon: FileCode2,
    activeIcon: FileCode2,
    color: "text-hot-white",
    glow: "shadow-[0_0_16px_rgba(248,247,255,0.5)]",
    kind: "matter",
  };
}

function FileTreeNode({ node, level }: FileTreeNodeProps) {
  const { selectedFile, setSelectedFile } = useFileSystem();
  const [isExpanded, setIsExpanded] = useState(true);
  const selected = selectedFile === node.path;
  const signature = getMatterSignature(node);
  const Icon = node.type === "directory" && isExpanded ? signature.activeIcon : signature.Icon;

  const handleClick = () => {
    if (node.type === "directory") {
      setIsExpanded(!isExpanded);
    } else {
      setSelectedFile(node.path);
    }
  };

  const children =
    node.type === "directory" && node.children
      ? Array.from(node.children.values()).sort((a, b) => {
          if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
          return a.name.localeCompare(b.name);
        })
      : [];

  return (
    <div>
      <button
        type="button"
        className={cn(
          "group relative flex w-full items-center gap-2.5 overflow-hidden border-l-2 border-transparent px-2 py-2 text-left text-sm transition-all duration-160",
          "hover:border-signal-cyan hover:bg-signal-cyan/10 hover:text-hot-white",
          selected &&
            "border-electric-orchid bg-gradient-to-r from-plasma-violet/25 via-electric-orchid/12 to-transparent text-hot-white"
        )}
        style={{ paddingLeft: `${level * 14 + 10}px` }}
        onClick={handleClick}
        aria-expanded={node.type === "directory" ? isExpanded : undefined}
        aria-label={`${node.type === "directory" ? "Collection" : signature.kind}: ${node.name}`}
      >
        {selected && (
          <span className="absolute inset-y-1 left-0 w-px bg-electric-orchid shadow-[0_0_14px_3px_var(--electric-orchid)]" />
        )}

        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
          {node.type === "directory" ? (
            isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-signal-cyan drop-shadow-[0_0_6px_var(--signal-cyan)]" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-signal-cyan drop-shadow-[0_0_6px_var(--signal-cyan)]" />
            )
          ) : (
            <span className="h-px w-2 bg-white/15" />
          )}
        </span>

        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/35 transition-all",
            signature.color,
            selected ? signature.glow : "group-hover:shadow-[0_0_16px_rgba(34,211,238,0.4)]"
          )}
        >
          <Icon className="h-4 w-4 drop-shadow-[0_0_6px_currentColor]" aria-hidden="true" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium text-white/78 transition-colors group-hover:text-hot-white">
            {node.name}
          </span>
          <span className={cn("block truncate font-mono text-[9px] uppercase tracking-[0.16em] opacity-70", signature.color)}>
            {signature.kind}
          </span>
        </span>
      </button>

      {node.type === "directory" && isExpanded && children.length > 0 && (
        <div className="relative before:absolute before:bottom-1 before:left-[17px] before:top-0 before:w-px before:bg-gradient-to-b before:from-signal-cyan/50 before:to-transparent">
          {children.map((child) => (
            <FileTreeNode key={child.path} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree() {
  const { fileSystem, refreshTrigger } = useFileSystem();
  const rootNode = fileSystem.getNode("/");

  if (!rootNode || !rootNode.children || rootNode.children.size === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <div className="alchemy-edge rounded-2xl p-[1px]">
          <div className="flex h-16 w-16 items-center justify-center rounded-[calc(1rem-1px)] bg-[#09090d]">
            <Folder className="h-7 w-7 text-signal-cyan drop-shadow-[0_0_12px_var(--signal-cyan)]" />
          </div>
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-electric-orchid drop-shadow-[0_0_8px_var(--electric-orchid)]">
          Matter field empty
        </p>
        <p className="mt-2 max-w-52 text-xs leading-5 text-white/40">
          Components, assets, tokens, and dependencies will materialize here as the interface forms.
        </p>
      </div>
    );
  }

  const rootChildren = Array.from(rootNode.children.values()).sort((a, b) => {
    if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <ScrollArea className="h-full">
      <div className="py-2" key={refreshTrigger}>
        {rootChildren.map((child) => (
          <FileTreeNode key={child.path} node={child} level={0} />
        ))}
      </div>
    </ScrollArea>
  );
}
