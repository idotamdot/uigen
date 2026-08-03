export const PREVIEW_DEPENDENCIES = {
  react: "/preview-vendor/react.js",
  "react-dom/client": "/preview-vendor/react-dom-client.js",
  "react/jsx-runtime": "/preview-vendor/jsx-runtime.js",
  "lucide-react": "/preview-vendor/lucide-react.js",
} as const;

export type PreviewDependency = keyof typeof PREVIEW_DEPENDENCIES;

export function resolvePreviewDependency(specifier: string): string {
  if (/[:?#\\]|%2e|%2f|%5c/i.test(specifier) || specifier.startsWith("/")) {
    throw new Error(`Unsupported dependency: ${specifier}`);
  }
  if (!(specifier in PREVIEW_DEPENDENCIES)) {
    throw new Error(`Unsupported dependency: ${specifier}`);
  }
  return PREVIEW_DEPENDENCIES[specifier as PreviewDependency];
}
