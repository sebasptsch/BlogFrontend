import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import env from "vite-plugin-env-compatible";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    env(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        navigateFallbackDenylist: [/^\/api/],
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: "Seb's Blog",
        short_name: "Seb's Blog",
        shortcuts: [
          { url: `/`, name: "Posts", short_name: "Posts", icons: [] },
          {
            url: `/profile`,
            name: "Profile",
            short_name: "Profile",
            icons: [],
          },
        ],
        icons: [
          {
            src: "/maskable_icon.png",
            type: "image/png",
            sizes: "1024x1024",
            purpose: "maskable",
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  publicDir: "public",
  server: {
    port: 3002,
    proxy: {
      "/api": {
        target: "https://api.sebasptsch.dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
