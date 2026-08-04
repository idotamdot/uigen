"use server";

import { getCurrentAppUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import {
  createProjectInputSchema,
  CreateProjectInput,
  DataValidationError,
} from "@/lib/data-schemas";

export async function createProject(input: CreateProjectInput) {
  const user = await getCurrentAppUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const parsed = createProjectInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new DataValidationError("Project data is invalid", parsed.error);
  }

  return prisma.project.create({
    data: {
      name: parsed.data.name,
      userId: user.id,
      messages: JSON.stringify(parsed.data.messages),
      data: JSON.stringify(parsed.data.data),
    },
  });
}
