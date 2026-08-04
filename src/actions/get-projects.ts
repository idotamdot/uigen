"use server";

import { getCurrentAppUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export async function getProjects() {
  const user = await getCurrentAppUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return prisma.project.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
