import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom', // or 'happy-dom'
    globals: true, // to use describe, it, expect globally
  },
  // Add other configurations here as needed in the future.
});
