import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/crazy-math-game/", // ✅ Set base path for GitHub Pages
  plugins: [tailwindcss(), react()],
});
