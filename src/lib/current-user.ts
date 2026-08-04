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

  // Email is the stable application identity. Existing UIGen accounts may
  // predate Neon Auth and therefore have a different primary key. Resolving
  // by email preserves their project ownership and avoids unique-email
  // collisions when Neon creates its own identity id.
  return prisma.user.upsert({
    where: { email },
    update: { password: null },
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
