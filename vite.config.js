import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Prerender from "@prerenderer/rollup-plugin";

const prerenderedRoutes = ["/", "/story", "/pricing", "/contact", "/designers"];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Prerender({
      routes: prerenderedRoutes,
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        renderAfterDocumentEvent: "prerender-ready",
        headless: true,
      },
    }),
  ],
});
