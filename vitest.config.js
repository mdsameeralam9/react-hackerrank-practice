import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',              // DOM for React tests
    // globals: true,                     // describe/it/expect as globals
    // setupFiles: './src/test/setup.ts', // jest-dom + cleanup + shim
    // css: true,                         // allow CSS imports
  },
});


