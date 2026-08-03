import "server-only";

import { parseServerEnv } from "@/lib/env-schema";

export function getServerEnv() {
  return parseServerEnv(process.env);
}
