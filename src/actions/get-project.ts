"use server";

import { getCurrentAppUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { parsePersistedProject } from "@/lib/data-schemas";

export async function getProject(projectId: string) {
  const user = await getCurrentAppUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: user.id,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const persisted = parsePersistedProject(project.messages, project.data);

  return {
    id: project.id,
    name: project.name,
    messages: persisted.messages,
    data: persisted.data,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}
