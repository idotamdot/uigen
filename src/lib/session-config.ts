import { parseServerEnv } from "@/lib/env-schema";

const DEVELOPMENT_JWT_SECRET =
  "uigen-development-only-session-secret-never-use-in-production";

export const SESSION_COOKIE_NAME = "auth-token";

export function getSessionSecret(): Uint8Array {
  const env = parseServerEnv(process.env);
  const value = env.JWT_SECRET ?? DEVELOPMENT_JWT_SECRET;
  return new TextEncoder().encode(value);
}
