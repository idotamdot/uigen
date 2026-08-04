import "server-only";

import { createNeonAuth } from "@neondatabase/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL ?? process.env.AUTH_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

if (!baseUrl) {
  throw new Error(
    "Neon Auth requires NEON_AUTH_BASE_URL or AUTH_URL in the server environment."
  );
}

if (!cookieSecret || cookieSecret.length < 32) {
  throw new Error(
    "NEON_AUTH_COOKIE_SECRET must be configured with at least 32 characters."
  );
}

export const neonAuth = createNeonAuth({
  baseUrl,
  cookies: {
    secret: cookieSecret,
  },
});
