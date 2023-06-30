import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/transition/index.ts",
      name: "transition",
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        exports: "named",
      },
    },
  },
});
