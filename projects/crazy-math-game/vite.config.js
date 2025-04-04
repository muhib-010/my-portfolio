import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/my-portfolio/projects/crazy-math-game/',  // Ensure relative paths for GitHub Pages
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'docs',  // Change the output folder from 'dist' to 'docs'
  }
});

