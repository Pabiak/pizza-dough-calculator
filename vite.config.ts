import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ["VITE_"]);

  return {
    plugins: [
      tsconfigPaths(),
      react(),
      tailwindcss(),
      svgr(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
        manifest: {
          theme_color: "#fff",
          background_color: "#fff",
          icons: [
            {
              src: "pwa-64x64.png",
              sizes: "64x64",
              type: "image/png",
            },
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "maskable-icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
          screenshots: [
            {
              src: "screenshots/mobile-screenshot.png",
              sizes: "430x932",
              type: "image/png",
              form_factor: "narrow",
            },
            {
              src: "screenshots/desktop-screenshot.png",
              sizes: "1920x1080",
              type: "image/png",
              form_factor: "wide",
            },
          ],
          name: "React Skeleton",
          short_name: "React Skeleton",
          start_url: "https://appURL.pl",
          scope: "https://appURL.pl",
        },
      }),
    ],
    server: {
      port: 3000,
      open: true,
    },
    define: {
      "process.env": {
        ENV_VARIABLE: env.VARIABLE,
      },
      global: {},
      anotherVariable: {},
    },
    build: {
      outDir: "dist",
    },
  };
});
