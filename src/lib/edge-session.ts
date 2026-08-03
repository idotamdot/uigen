import { jwtVerify } from "jose/jwt/verify";
import type { NextRequest } from "next/server";
import {
  getSessionSecret,
  SESSION_COOKIE_NAME,
} from "@/lib/session-config";
import {
  parseSessionClaims,
  type SessionClaims,
} from "@/lib/session";

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

export async function verifyRequestSession(
  request: Pick<NextRequest, "cookies">
): Promise<SessionClaims | null> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  return verifySessionToken(token, getSessionSecret());
}
