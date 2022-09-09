import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './__tests__/integration/charts',
  publicDir: path.resolve('./test'),
  server: {
    port: 8080,
    open: '/',
  },
});
