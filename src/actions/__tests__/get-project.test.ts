import { beforeEach, describe, expect, it, vi } from "vitest";

const { getSession, findUnique } = vi.hoisted(() => ({
  getSession: vi.fn(),
  findUnique: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ getSession }));
vi.mock("@/lib/prisma", () => ({
  prisma: { project: { findUnique } },
}));

import { getProject } from "../get-project";

describe("getProject ownership", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getSession.mockResolvedValue({ userId: "user-1", email: "user@example.com" });
  });

  it("queries by both project id and authenticated owner", async () => {
    findUnique.mockResolvedValue(null);

    await expect(getProject("project-1")).rejects.toThrow("Project not found");
    expect(findUnique).toHaveBeenCalledWith({
      where: { id: "project-1", userId: "user-1" },
    });
  });

  it("rejects unauthenticated access before querying", async () => {
    getSession.mockResolvedValue(null);

    await expect(getProject("project-1")).rejects.toThrow("Unauthorized");
    expect(findUnique).not.toHaveBeenCalled();
  });
});
