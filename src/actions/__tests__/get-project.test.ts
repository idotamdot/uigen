import { beforeEach, describe, expect, it, vi } from "vitest";

const { requireCurrentUser, findUnique } = vi.hoisted(() => ({
  requireCurrentUser: vi.fn(),
  findUnique: vi.fn(),
}));

vi.mock("@/lib/current-user", () => ({ requireCurrentUser }));
vi.mock("@/lib/prisma", () => ({
  prisma: { project: { findUnique } },
}));

import { getProject } from "../get-project";

describe("getProject ownership", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    requireCurrentUser.mockResolvedValue({
      id: "user-1",
      email: "user@example.com",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    });
  });

  it("queries by both project id and authenticated owner", async () => {
    findUnique.mockResolvedValue(null);

    await expect(getProject("project-1")).rejects.toThrow("Project not found");
    expect(findUnique).toHaveBeenCalledWith({
      where: { id: "project-1", userId: "user-1" },
    });
  });

  it("rejects unauthenticated access before querying", async () => {
    requireCurrentUser.mockRejectedValue(new Error("Unauthorized"));

    await expect(getProject("project-1")).rejects.toThrow("Unauthorized");
    expect(findUnique).not.toHaveBeenCalled();
  });
});
