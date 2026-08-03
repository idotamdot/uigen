import "server-only";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";
import { SessionClaims, verifySessionToken } from "@/lib/session";

const DEVELOPMENT_JWT_SECRET =
  "uigen-development-only-session-secret-never-use-in-production";

const COOKIE_NAME = "auth-token";

function getJwtSecret(): Uint8Array {
  const env = getServerEnv();
  const value = env.JWT_SECRET ?? DEVELOPMENT_JWT_SECRET;
  return new TextEncoder().encode(value);
}

export async function createSession(userId: string, email: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(getJwtSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getSession(): Promise<SessionClaims | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token, getJwtSecret());
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function verifySession(
  request: NextRequest
): Promise<SessionClaims | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token, getJwtSecret());
}
