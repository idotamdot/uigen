import { z } from "zod";

export const PREVIEW_LIMITS = {
  maxModules: 100,
  maxModuleCharacters: 256_000,
  maxStylesCharacters: 1_000_000,
  maxDiagnosticCharacters: 4_000,
  maxStackCharacters: 12_000,
  diagnosticsPerWindow: 20,
} as const;

const idSchema = z.string().uuid();
const moduleSchema = z.object({
  path: z.string().startsWith("/").max(240),
  code: z.string().max(PREVIEW_LIMITS.maxModuleCharacters),
});
const diagnosticSchema = z.object({
  message: z.string().max(PREVIEW_LIMITS.maxDiagnosticCharacters),
  stack: z.string().max(PREVIEW_LIMITS.maxStackCharacters).optional(),
});

export const hostToPreviewSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("initialize-preview"), channelId: idSchema }),
  z.object({
    type: z.literal("render-bundle"),
    channelId: idSchema,
    renderId: idSchema,
    entryPoint: z.string().startsWith("/").max(240),
    modules: z.array(moduleSchema).max(PREVIEW_LIMITS.maxModules),
    styles: z.string().max(PREVIEW_LIMITS.maxStylesCharacters),
  }),
  z.object({
    type: z.literal("dispose-render"),
    channelId: idSchema,
    renderId: idSchema,
  }),
]);

export const previewToHostSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("preview-ready"), channelId: idSchema }),
  z.object({ type: z.literal("preview-loaded"), channelId: idSchema, renderId: idSchema }),
  z.object({ type: z.literal("preview-build-error"), channelId: idSchema, renderId: idSchema.optional(), diagnostic: diagnosticSchema }),
  z.object({ type: z.literal("preview-runtime-error"), channelId: idSchema, renderId: idSchema.optional(), diagnostic: diagnosticSchema }),
  z.object({ type: z.literal("preview-unhandled-rejection"), channelId: idSchema, renderId: idSchema.optional(), diagnostic: diagnosticSchema }),
  z.object({ type: z.literal("preview-csp-violation"), channelId: idSchema, renderId: idSchema.optional(), directive: z.string().max(200), blockedUri: z.string().max(500) }),
]);

export type HostToPreviewMessage = z.infer<typeof hostToPreviewSchema>;
export type PreviewToHostMessage = z.infer<typeof previewToHostSchema>;

export function createPreviewId(): string {
  return crypto.randomUUID();
}
