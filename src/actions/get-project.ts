"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parsePersistedProject } from "@/lib/data-schemas";

export async function getProject(projectId: string) {
  const session = await getSession();
  
  if (!session) {
    throw new Error("Unauthorized");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: session.userId,
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
