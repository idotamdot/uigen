import { z } from "zod";

export const sessionClaimsSchema = z.object({
  userId: z.string().cuid(),
  email: z.string().email(),
  iat: z.number().int().nonnegative(),
  exp: z.number().int().positive(),
});

export type SessionClaims = z.infer<typeof sessionClaimsSchema>;

export function parseSessionClaims(payload: unknown): SessionClaims | null {
  const parsed = sessionClaimsSchema.safeParse(payload);
  return parsed.success ? parsed.data : null;
}
