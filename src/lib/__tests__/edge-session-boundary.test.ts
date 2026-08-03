// @vitest-environment node

import { readFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const sourceRoot = resolve(process.cwd(), "src");
const importPattern = /(?:import|export)\s+(?:type\s+)?(?:[^"']*?\s+from\s+)?["']([^"']+)["']/g;

function resolveLocalImport(importer: string, specifier: string): string | null {
  const unresolved = specifier.startsWith("@/")
    ? resolve(sourceRoot, specifier.slice(2))
    : specifier.startsWith(".")
      ? resolve(dirname(importer), specifier)
      : null;

  if (!unresolved) {
    return null;
  }

  return extname(unresolved) ? unresolved : `${unresolved}.ts`;
}

function collectDependencyGraph(entry: string): Set<string> {
  const visited = new Set<string>();
  const pending = [entry];

  while (pending.length > 0) {
    const file = pending.pop();
    if (!file || visited.has(file)) {
      continue;
    }

    visited.add(file);
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(importPattern)) {
      const dependency = resolveLocalImport(file, match[1]);
      if (dependency) {
        pending.push(dependency);
      }
    }
  }

  return visited;
}

describe("middleware dependency boundary", () => {
  it("keeps Node-only authentication code outside the Edge graph", () => {
    const middlewarePath = resolve(sourceRoot, "middleware.ts");
    const graph = collectDependencyGraph(middlewarePath);
    const relativeGraph = [...graph].map((file) =>
      file.slice(sourceRoot.length + 1).replaceAll("\\", "/")
    );
    const sources = [...graph].map((file) => readFileSync(file, "utf8")).join("\n");

    expect(relativeGraph).toContain("lib/edge-session.ts");
    expect(relativeGraph).not.toContain("lib/auth.ts");
    expect(relativeGraph.some((file) => file.startsWith("actions/"))).toBe(false);
    expect(sources).not.toMatch(/@prisma\/client|bcrypt|server-only/);
    expect(readFileSync(resolve(sourceRoot, "lib/edge-session.ts"), "utf8")).toContain(
      'from "jose/jwt/verify"'
    );
  });
});
