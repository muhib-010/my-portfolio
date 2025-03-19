import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: "/my-portfolio/projects/crazy-math-game/",
  plugins: [tailwindcss(), react()],
});
