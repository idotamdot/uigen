import { describe, expect, it } from "vitest";
import { ConfigurationError, parseServerEnv } from "../env-schema";

const strongSecret = "a-strong-production-secret-with-32-chars";

describe("parseServerEnv", () => {
  it("rejects a missing production JWT secret", () => {
    expect(() => parseServerEnv({ NODE_ENV: "production" })).toThrowError(
      new ConfigurationError("JWT_SECRET is required in production")
    );
  });

  it("rejects a weak production JWT secret", () => {
    expect(() =>
      parseServerEnv({ NODE_ENV: "production", JWT_SECRET: "too-short" })
    ).toThrow("at least 32 characters");
  });

  it("rejects the development mock in production", () => {
    expect(() =>
      parseServerEnv({
        NODE_ENV: "production",
        JWT_SECRET: strongSecret,
        ENABLE_DEV_MOCK_PROVIDER: "true",
      })
    ).toThrow("cannot be enabled in production");
  });

  it("allows the development mock only when explicitly enabled", () => {
    const env = parseServerEnv({
      NODE_ENV: "test",
      ENABLE_DEV_MOCK_PROVIDER: "true",
    });
    expect(env.ENABLE_DEV_MOCK_PROVIDER).toBe(true);
  });

  it("defaults the development mock to disabled", () => {
    expect(parseServerEnv({ NODE_ENV: "development" }).ENABLE_DEV_MOCK_PROVIDER).toBe(
      false
    );
  });
});
