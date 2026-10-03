import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Defaults of eslint-config-next, restated because this list replaces them.
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The static export (`build:dist`) — compiled output, not source.
    "dist/**",
  ]),
]);
