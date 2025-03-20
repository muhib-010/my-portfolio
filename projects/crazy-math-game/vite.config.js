import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: "/", // Ensures relative paths work in the build
  plugins: [react(), tailwindcss()],
});

