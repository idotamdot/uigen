// @vitest-environment node

import { SignJWT } from "jose";
import { describe, expect, it } from "vitest";
import { verifySessionToken } from "../session";

const secret = new TextEncoder().encode(
  "test-session-secret-with-at-least-thirty-two-characters"
);
const userId = "clx1234567890abcdefghijkl";

async function signClaims(
  claims: Record<string, unknown>,
  expiresIn: string | number = "1h"
) {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

describe("verifySessionToken", () => {
  it("accepts valid session claims", async () => {
    const token = await signClaims({ userId, email: "user@example.com" });
    await expect(verifySessionToken(token, secret)).resolves.toMatchObject({
      userId,
      email: "user@example.com",
    });
  });

  it("rejects invalid tokens", async () => {
    await expect(verifySessionToken("not-a-jwt", secret)).resolves.toBeNull();
  });

  it("rejects malformed JWT claims", async () => {
    const token = await signClaims({ userId: 123, email: "not-an-email" });
    await expect(verifySessionToken(token, secret)).resolves.toBeNull();
  });

  it("rejects expired sessions", async () => {
    const token = await signClaims(
      { userId, email: "user@example.com" },
      Math.floor(Date.now() / 1000) - 60
    );
    await expect(verifySessionToken(token, secret)).resolves.toBeNull();
  });
});
