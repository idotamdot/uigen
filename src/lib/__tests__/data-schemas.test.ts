import { describe, expect, it } from "vitest";
import {
  chatRequestSchema,
  DataValidationError,
  LIMITS,
  parsePersistedProject,
  serializedFileSystemSchema,
} from "../data-schemas";

function message(content: string, index = 0) {
  return { id: `message-${index}`, role: "user" as const, content };
}

describe("chat request validation", () => {
  it("rejects oversized prompts", () => {
    const result = chatRequestSchema.safeParse({
      messages: [message("x".repeat(LIMITS.maxPromptCharacters + 1))],
      files: {},
    });
    expect(result.success).toBe(false);
  });

  it("rejects excessive message counts", () => {
    const messages = Array.from({ length: LIMITS.maxMessages + 1 }, (_, index) =>
      message("hello", index)
    );
    expect(chatRequestSchema.safeParse({ messages, files: {} }).success).toBe(false);
  });
});

describe("serialized filesystem validation", () => {
  it.each(["relative.tsx", "/../secret", "/src/./App.tsx", "/src\\App.tsx"])(
    "rejects invalid virtual path %s",
    (path) => {
      const result = serializedFileSystemSchema.safeParse({
        [path]: { type: "file", name: "App.tsx", path, content: "" },
      });
      expect(result.success).toBe(false);
    }
  );

  it("rejects an oversized individual file", () => {
    const path = "/App.tsx";
    const result = serializedFileSystemSchema.safeParse({
      "/": { type: "directory", name: "/", path: "/" },
      [path]: {
        type: "file",
        name: "App.tsx",
        path,
        content: "x".repeat(LIMITS.maxFileBytes + 1),
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejects an oversized generated filesystem", () => {
    const files: Record<string, object> = {
      "/": { type: "directory", name: "/", path: "/" },
    };
    for (let index = 0; index < 5; index += 1) {
      const path = `/file-${index}.tsx`;
      files[path] = {
        type: "file",
        name: `file-${index}.tsx`,
        path,
        content: "x".repeat(220 * 1024),
      };
    }
    expect(serializedFileSystemSchema.safeParse(files).success).toBe(false);
  });
});

describe("persisted project validation", () => {
  it("reports malformed persisted JSON", () => {
    expect(() => parsePersistedProject("not-json", "{}"))
      .toThrowError(DataValidationError);
  });

  it("does not silently accept structurally invalid persisted data", () => {
    expect(() => parsePersistedProject("[]", JSON.stringify({ bad: true })))
      .toThrow("Persisted project data is invalid");
  });
});
