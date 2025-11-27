import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
// @ts-expect-error - @vitejs/plugin-react types are not properly exported
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  }
});