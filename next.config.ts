// Load the Node 25+ Web Storage shim first. Next loads this config before
// any app code, so importing here is early enough — and unlike the previous
// NODE_OPTIONS='--require …' approach, this works on Windows.
import "./node-compat.cjs";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Pin the workspace root so a stray yarn.lock or package.json elsewhere
  // on the learner's machine can't hijack module resolution / file tracing.
  // (`turbopack.root` only exists in Next 15.4+; on 15.3.9 the valid key is
  // the top-level `outputFileTracingRoot`.)
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
