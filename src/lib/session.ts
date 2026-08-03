import { jwtVerify, JWTPayload } from "jose";
import { z } from "zod";

export const sessionClaimsSchema = z.object({
  userId: z.string().cuid(),
  email: z.string().email(),
  iat: z.number().int().nonnegative(),
  exp: z.number().int().positive(),
});

export type SessionClaims = z.infer<typeof sessionClaimsSchema>;

export async function verifySessionToken(
  token: string,
  secret: Uint8Array,
  currentDate = new Date()
): Promise<SessionClaims | null> {
  try {
    const { payload } = await jwtVerify(token, secret, { currentDate });
    return parseSessionClaims(payload);
  } catch {
    return null;
  }
}

export function parseSessionClaims(payload: JWTPayload): SessionClaims | null {
  const parsed = sessionClaimsSchema.safeParse(payload);
  return parsed.success ? parsed.data : null;
}
