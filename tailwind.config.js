import { globSync } from "glob";
import path from "path";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./ls-techs.html",
    ...globSync(path.resolve(__dirname, "./articles", "*.html")),
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
