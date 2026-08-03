import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { ConfigurationError } from "../env-schema";
import { getLanguageModel } from "../provider";

describe("AI provider configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("selects the mock only when explicitly enabled outside production", () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("ENABLE_DEV_MOCK_PROVIDER", "true");
    vi.stubEnv("ANTHROPIC_API_KEY", "");

    expect(getLanguageModel().provider).toBe("mock");
  });

  it("returns a typed configuration error when mock and real provider are disabled", () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("ENABLE_DEV_MOCK_PROVIDER", "false");
    vi.stubEnv("ANTHROPIC_API_KEY", "");

    expect(() => getLanguageModel()).toThrowError(ConfigurationError);
  });
});
