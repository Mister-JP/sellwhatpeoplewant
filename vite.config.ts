/**
 * Keeps the public application conventional while adding only the metadata hook
 * required by OpenAI Sites. Product modules remain independent of the hosting
 * provider; changing deployment targets should require configuration work here,
 * not changes to the system-map model or public pages.
 */
import { sites } from '@openai/sites-vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), sites()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/testing/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
