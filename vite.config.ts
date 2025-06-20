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
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg", "pizza.png"],
        manifest: {
          theme_color: "#ed2626",
          background_color: "#fcf7f7",
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
          name: "Pabiak's Pizza Calculator",
          short_name: "Pizza Calculator",
          start_url: "/",
          scope: "/",
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
