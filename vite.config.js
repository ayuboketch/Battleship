import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: './',  // Make sure the root is set correctly
  publicDir: 'public',  // Path to your static files
  test: {
    includeSource: ['src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    }
  }, 
  build: {
    target: 'esnext', 
  },
  server: {
    open: true, 
  },
});

