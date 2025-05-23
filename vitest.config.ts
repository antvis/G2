import { defineConfig } from 'vitest/config';

// https://cn.vitest.dev/guide/
export default defineConfig({
  test: {
    testTimeout: 100_000,
    globals: true,
    environment: 'jsdom',
    include: ['__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      reporter: ['lcov'],
      provider: 'istanbul',
      include: ['src/**/*.ts'],
    },
  },
});
