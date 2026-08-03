// Lightweight in-memory sliding-window rate limiter.
//
// Keyed by an arbitrary string (e.g. "chat:<ip>"). Good enough to protect a
// single-instance deployment from a runaway client draining the Anthropic
// budget. Note: state lives in process memory, so on a multi-instance /
// serverless deployment each instance limits independently — swap in a shared
// store (Redis, Upstash) there.

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  /** Seconds until the caller may retry (0 when ok). */
  retryAfterSeconds: number;
}

const store = new Map<string, number[]>();

export function rateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Drop timestamps that have aged out of the window.
  const hits = (store.get(key) ?? []).filter((t) => t > windowStart);

  if (hits.length >= limit) {
    store.set(key, hits);
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((hits[0] + windowMs - now) / 1000)
    );
    return { ok: false, remaining: 0, retryAfterSeconds };
  }

  hits.push(now);
  store.set(key, hits);
  return { ok: true, remaining: limit - hits.length, retryAfterSeconds: 0 };
}

/** Test helper — clears all recorded hits. */
export function __resetRateLimit() {
  store.clear();
}
