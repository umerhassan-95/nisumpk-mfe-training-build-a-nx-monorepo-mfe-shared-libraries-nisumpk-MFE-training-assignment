import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@nx-mfe/types': path.resolve(__dirname, '../../libs/types/src/index.ts'),
      '@nx-mfe/ui': path.resolve(__dirname, '../../libs/ui/src/index.ts')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
});
