/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["./src/__tests__/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/__tests__/vitest.setup.ts"],
    coverage: {
      enabled: true,
      include: ["src/components/*.tsx", "src/hooks/*.ts"],
      reporter: ["text"],
    },
  },
});
