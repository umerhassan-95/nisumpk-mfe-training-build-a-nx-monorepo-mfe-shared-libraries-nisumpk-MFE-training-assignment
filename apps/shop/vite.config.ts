import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [
    federation({
      name: 'shop',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/ProductList.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@nx-mfe/types': path.resolve(__dirname, '../../libs/types/src/index.ts'),
      '@nx-mfe/ui': path.resolve(__dirname, '../../libs/ui/src/index.ts'),
    },
  },
  server: {
    port: 4174,
  },
  preview: {
    port: 4174,
  },
  build: {
    target: 'esnext',
  },
});
