import { defineConfig } from 'vitest/config';

// https://cn.vitest.dev/guide/
export default defineConfig({
  test: {
    testTimeout: 100_000,
    globals: true,
    environment: 'jsdom',
    include: ['__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '__tests__/integration/api-chart-emit-legend-filter.spec.ts',
      '__tests__/integration/api-chart-emit-slider-filter.spec.ts',
      '__tests__/integration/api-chart-on-brush-filter.spec.ts',
      '__tests__/integration/api-chart-auto-fit.spec.ts',
      '__tests__/integration/chart-on-brush-filter.spec.ts',
      '__tests__/integration/spec-interaction.spec.ts',
      '__tests__/integration/spec-static.spec.ts',
      '__tests__/integration/spec-animation.spec.ts',
      '__tests__/integration/animation-control.spec.ts',
    ],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
    },
  },
});
