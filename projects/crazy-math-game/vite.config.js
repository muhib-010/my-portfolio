import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // Ensures relative paths work in the build
  plugins: [react()],
});