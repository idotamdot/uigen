"use client";

import Link from "next/link";
import { useEffect } from "react";

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RouteError({ error, reset }: RouteErrorProps): React.JSX.Element {
  useEffect(() => {
    console.error("UIGen route error", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-destructive">Something went wrong</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          UIGen could not finish loading this page
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Your project data has not been intentionally changed. Try loading the page again.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Return to UIGen
          </Link>
        </div>
      </section>
    </main>
  );
}
