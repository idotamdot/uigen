import { z } from "zod";

const PLACEHOLDER_VALUES = new Set([
  "your-api-key-here",
  "your-keys-here",
  "replace-me",
  "replace-with-a-long-random-secret",
  "replace-with-your-anthropic-api-key",
]);

const optionalSecret = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().min(1).optional()
);

const booleanFlag = z
  .enum(["true", "false"])
  .default("false")
  .transform((value) => value === "true");

const rawServerEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  ANTHROPIC_API_KEY: optionalSecret.refine(
    (value) =>
      value === undefined ||
      (!PLACEHOLDER_VALUES.has(value) && /^sk-ant-[A-Za-z0-9_-]+$/.test(value)),
    "ANTHROPIC_API_KEY must be a valid Anthropic API key"
  ),
  JWT_SECRET: optionalSecret.refine(
    (value) => value === undefined || !PLACEHOLDER_VALUES.has(value),
    "JWT_SECRET must not be a placeholder value"
  ),
  ENABLE_DEV_MOCK_PROVIDER: booleanFlag,
});

export type ServerEnv = z.infer<typeof rawServerEnvSchema>;

export class ConfigurationError extends Error {
  readonly code = "CONFIGURATION_ERROR";

  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

export function parseServerEnv(input: NodeJS.ProcessEnv): ServerEnv {
  const parsed = rawServerEnvSchema.safeParse(input);
  if (!parsed.success) {
    const fields = Object.keys(parsed.error.flatten().fieldErrors).join(", ");
    throw new ConfigurationError(
      `Invalid server environment configuration${fields ? `: ${fields}` : ""}`
    );
  }

  const env = parsed.data;
  if (env.NODE_ENV === "production") {
    if (!env.JWT_SECRET) {
      throw new ConfigurationError("JWT_SECRET is required in production");
    }
    if (env.JWT_SECRET.length < 32) {
      throw new ConfigurationError(
        "JWT_SECRET must contain at least 32 characters in production"
      );
    }
    if (env.ENABLE_DEV_MOCK_PROVIDER) {
      throw new ConfigurationError(
        "ENABLE_DEV_MOCK_PROVIDER cannot be enabled in production"
      );
    }
  }

  return env;
}
