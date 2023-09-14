import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/carrot-movie-db",
  build: {
    outDir: join(__dirname, "docs")
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
});
