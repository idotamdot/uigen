import "server-only";

import { neonAuth } from "@/lib/neon-auth-server";
import { prisma } from "@/lib/prisma";

export async function getCurrentAppUser() {
  const { data } = await neonAuth.getSession();
  const authUser = data?.user;

  if (!authUser?.id || !authUser.email) {
    return null;
  }

  const email = authUser.email.trim().toLowerCase();

  return prisma.user.upsert({
    where: { id: authUser.id },
    update: { email },
    create: {
      id: authUser.id,
      email,
      password: null,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });
}
