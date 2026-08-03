// @vitest-environment node

import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SessionClaims } from "../session";

const { verifyRequestSession } = vi.hoisted(() => ({
  verifyRequestSession: vi.fn<
    (request: Pick<NextRequest, "cookies">) => Promise<SessionClaims | null>
  >(),
}));

vi.mock("@/lib/edge-session", () => ({ verifyRequestSession }));

import { middleware } from "../../middleware";

describe("middleware authentication", () => {
  beforeEach(() => {
    verifyRequestSession.mockReset();
  });

  it("rejects unauthenticated access to protected routes", async () => {
    verifyRequestSession.mockResolvedValue(null);

    const response = await middleware(
      new NextRequest("https://uigen.example/api/projects")
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "Authentication required",
    });
  });

  it("allows an authenticated owner request to continue", async () => {
    verifyRequestSession.mockResolvedValue({
      userId: "clx1234567890abcdefghijkl",
      email: "owner@example.com",
      iat: 1,
      exp: 4_102_444_800,
    });

    const response = await middleware(
      new NextRequest("https://uigen.example/api/projects")
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });
});
