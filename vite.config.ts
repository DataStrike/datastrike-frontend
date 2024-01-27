import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({ 
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: ["@/*"],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    proxy: {
        '/api': {
            target: "http://localhost:80/api",
            changeOrigin: true,
        },
    },
},
});
