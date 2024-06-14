import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { globSync } from "glob";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: [
        "index.html",
        ...globSync(path.resolve(__dirname, "./articles", "*.html")),
        "ls-techs.html",
      ],
    },
  },
  assetsInclude: ["src/assets/*.svg"],
});
