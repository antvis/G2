import { defineConfig } from 'vite';

export default defineConfig({
  root: './__tests__/integration/',
  server: {
    port: 8080,
    open: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
