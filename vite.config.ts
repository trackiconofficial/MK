// @lovable.dev/vite-tanstack-config already includes TanStack Start, React, Tailwind, path aliases,
// and nitro — do NOT add them manually.
// Set GITHUB_PAGES=true to build a fully static site for https://trackiconofficial.github.io/MKTRADERS/
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const githubPages = process.env['GITHUB_PAGES'] === "true";

export default defineConfig({
  vite: githubPages ? { base: "/MKTRADERS/" } : {},
  tanstackStart: githubPages
    ? {
        server: { entry: "server" },
        pages: [{ path: "/" }],
        prerender: { enabled: true, autoStaticPathsDiscovery: false },
      }
    : {
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        server: { entry: "server" },
      },
});
