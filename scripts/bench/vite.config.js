import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8000,
    open: '/',
  },
  resolve: {
    alias: [
      { find: '@antv/g2v5', replacement: path.resolve('../../src/index.ts') },
      { find: '@', replacement: './' },
    ],
  },
});
