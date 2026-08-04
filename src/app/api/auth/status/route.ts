import { NextResponse } from "next/server";
import { getCurrentAppUser } from "@/lib/current-user";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentAppUser();

    if (!user) {
      return NextResponse.json(
        { authenticated: false },
        {
          status: 401,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Auth status resolution failed", error);

    return NextResponse.json(
      {
        authenticated: false,
        error: "AUTH_STATUS_FAILED",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
