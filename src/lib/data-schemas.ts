import { z } from "zod";

export const LIMITS = {
  maxRequestBytes: 2 * 1024 * 1024,
  maxMessages: 100,
  maxPromptCharacters: 20_000,
  maxFiles: 100,
  maxFileBytes: 256 * 1024,
  maxFileSystemBytes: 1024 * 1024,
} as const;

const jsonPrimitiveSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([jsonPrimitiveSchema, z.array(jsonValueSchema), z.record(jsonValueSchema)])
);

const textPartSchema = z.object({
  type: z.literal("text"),
  text: z.string().max(LIMITS.maxPromptCharacters),
});

const reasoningPartSchema = z.object({
  type: z.literal("reasoning"),
  reasoning: z.string().max(LIMITS.maxPromptCharacters),
  details: z.array(jsonValueSchema).optional(),
});

export const toolCallSchema = z.object({
  state: z.enum(["partial-call", "call", "result"]),
  step: z.number().int().nonnegative().optional(),
  toolCallId: z.string().min(1).max(200),
  toolName: z.string().min(1).max(100),
  args: jsonValueSchema,
  result: jsonValueSchema.optional(),
});

const toolInvocationPartSchema = z.object({
  type: z.literal("tool-invocation"),
  toolInvocation: toolCallSchema,
});

const sourcePartSchema = z.object({
  type: z.literal("source"),
  source: jsonValueSchema,
});

const filePartSchema = z.object({
  type: z.literal("file"),
  mimeType: z.string().min(1).max(200),
  data: z.string().max(LIMITS.maxFileBytes),
});

const stepStartPartSchema = z.object({ type: z.literal("step-start") });

export const messageContentPartSchema = z.discriminatedUnion("type", [
  textPartSchema,
  reasoningPartSchema,
  toolInvocationPartSchema,
  sourcePartSchema,
  filePartSchema,
  stepStartPartSchema,
]);

export const chatMessageSchema = z.object({
  id: z.string().min(1).max(200),
  createdAt: z.coerce.date().optional(),
  role: z.enum(["system", "user", "assistant", "data"]),
  content: z.string().max(LIMITS.maxPromptCharacters),
  reasoning: z.string().max(LIMITS.maxPromptCharacters).optional(),
  data: jsonValueSchema.optional(),
  annotations: z.array(jsonValueSchema).max(100).optional(),
  toolInvocations: z.array(toolCallSchema).max(100).optional(),
  parts: z.array(messageContentPartSchema).max(200).optional(),
  experimental_attachments: z
    .array(
      z.object({
        name: z.string().max(255).optional(),
        contentType: z.string().max(200).optional(),
        url: z.string().url().max(2048),
      })
    )
    .max(10)
    .optional(),
});

export const chatMessagesSchema = z
  .array(chatMessageSchema)
  .min(1, "at least one message is required")
  .max(LIMITS.maxMessages, `no more than ${LIMITS.maxMessages} messages are allowed`);

function isValidVirtualPath(path: string): boolean {
  if (!path.startsWith("/") || path.includes("\\") || path.includes("\0")) {
    return false;
  }
  if (path.length > 240 || (path.length > 1 && path.endsWith("/"))) {
    return false;
  }
  return path.split("/").every((segment, index) => {
    if (index === 0) return segment === "";
    return segment.length > 0 && segment !== "." && segment !== "..";
  });
}

export const virtualPathSchema = z
  .string()
  .refine(isValidVirtualPath, "invalid virtual filesystem path");

export const serializedFileNodeSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("file"),
    name: z.string().min(1).max(255),
    path: virtualPathSchema,
    content: z.string().default(""),
  }),
  z.object({
    type: z.literal("directory"),
    name: z.string().min(1).max(255),
    path: virtualPathSchema,
  }),
]);

export const serializedFileSystemSchema = z
  .record(virtualPathSchema, serializedFileNodeSchema)
  .superRefine((nodes, context) => {
    const entries = Object.entries(nodes);
    if (entries.length > LIMITS.maxFiles + 1) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `filesystem cannot contain more than ${LIMITS.maxFiles} files`,
      });
    }

    let totalBytes = 0;
    let fileCount = 0;
    for (const [key, node] of entries) {
      if (key !== node.path) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key, "path"],
          message: "filesystem key must match node path",
        });
      }
      if (node.path === "/" && node.type !== "directory") {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: "filesystem root must be a directory",
        });
      }
      if (node.type === "file") {
        fileCount += 1;
        const fileBytes = new TextEncoder().encode(node.content).byteLength;
        totalBytes += fileBytes;
        if (fileBytes > LIMITS.maxFileBytes) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: [key, "content"],
            message: `file exceeds ${LIMITS.maxFileBytes} bytes`,
          });
        }
      }
    }
    if (fileCount > LIMITS.maxFiles) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `filesystem cannot contain more than ${LIMITS.maxFiles} files`,
      });
    }
    if (totalBytes > LIMITS.maxFileSystemBytes) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `filesystem exceeds ${LIMITS.maxFileSystemBytes} bytes`,
      });
    }
  });

export const chatRequestSchema = z.object({
  messages: chatMessagesSchema,
  files: serializedFileSystemSchema.default({}),
  projectId: z.string().cuid().optional(),
});

export const persistedProjectSchema = z.object({
  messages: z.array(chatMessageSchema).max(LIMITS.maxMessages),
  data: serializedFileSystemSchema,
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type MessageContentPart = z.infer<typeof messageContentPartSchema>;
export type ToolCall = z.infer<typeof toolCallSchema>;
export type SerializedFileNode = z.infer<typeof serializedFileNodeSchema>;
export type SerializedFileSystem = z.infer<typeof serializedFileSystemSchema>;
export type PersistedProjectData = z.infer<typeof persistedProjectSchema>;

export class DataValidationError extends Error {
  readonly code = "DATA_VALIDATION_ERROR";
  readonly fields: Record<string, string[]>;

  constructor(message: string, error: z.ZodError) {
    super(message);
    this.name = "DataValidationError";
    this.fields = error.flatten().fieldErrors;
  }
}

export function parsePersistedProject(
  messagesJson: string,
  dataJson: string
): PersistedProjectData {
  let rawMessages: unknown;
  let rawData: unknown;
  try {
    rawMessages = JSON.parse(messagesJson);
    rawData = JSON.parse(dataJson);
  } catch (error: unknown) {
    throw new DataValidationError(
      "Persisted project contains malformed JSON",
      new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          path: [],
          message: error instanceof Error ? error.message : "Invalid JSON",
        },
      ])
    );
  }

  const parsed = persistedProjectSchema.safeParse({ messages: rawMessages, data: rawData });
  if (!parsed.success) {
    throw new DataValidationError("Persisted project data is invalid", parsed.error);
  }
  return parsed.data;
}
