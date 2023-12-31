import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  }
});
