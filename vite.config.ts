import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets load reliably on both custom domains and GitHub Pages subpaths
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Lazy chunk separation: three.js and magazine engine separated from main story
          if (id.includes('node_modules/three')) {
            return 'three-vendor';
          }
          if (id.includes('src/magazine')) {
            return 'magazine-engine';
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
