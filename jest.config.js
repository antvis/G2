// Installing third-party modules by tnpm or cnpm will name modules with underscore as prefix.
// In this case _{module} is also necessary.
const esm = ['internmap', 'd3-*', 'lodash-es', 'chroma-js', '@antv/*'].map((d) => `_${d}|${d}`).join('|');

module.exports = {
  testTimeout: 100000,
  preset: 'ts-jest/presets/js-with-ts',
  globals: {
    'ts-jest': {
      tsconfig: {
        target: 'esnext', // Increase test coverage.
        allowJs: true,
        sourceMap: true,
      },
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  // testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/__tests__/integration/api-chart-emit-legend-filter.spec.ts',
    '<rootDir>/__tests__/integration/api-chart-emit-slider-filter.spec.ts',
    '<rootDir>/__tests__/integration/api-chart-on-brush-filter.spec.ts',
    '<rootDir>/__tests__/integration/api-chart-auto-fit.spec.ts',
    '<rootDir>/__tests__/integration/chart-on-brush-filter.spec.ts',
    '<rootDir>/__tests__/integration/spec-interaction.spec.ts',
    '<rootDir>/__tests__/integration/spec-static.spec.ts',
    '<rootDir>/__tests__/integration/spec-animation.spec.ts',
    '<rootDir>/__tests__/integration/animation-control.spec.ts',
  ],
  // Transform esm to cjs.
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(?:.pnpm/)?(${esm}))`],
};
