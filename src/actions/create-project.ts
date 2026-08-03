"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createProjectInputSchema,
  CreateProjectInput,
  DataValidationError,
} from "@/lib/data-schemas";

export async function createProject(input: CreateProjectInput) {
  const session = await getSession();
  
  if (!session) {
    throw new Error("Unauthorized");
  }

  const parsed = createProjectInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new DataValidationError("Project data is invalid", parsed.error);
  }

  const project = await prisma.project.create({
    data: {
      name: parsed.data.name,
      userId: session.userId,
      messages: JSON.stringify(parsed.data.messages),
      data: JSON.stringify(parsed.data.data),
    },
  });

  return project;
}
