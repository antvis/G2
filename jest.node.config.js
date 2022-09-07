// Installing third-party modules by tnpm or cnpm will name modules with underscore as prefix.
// In this case _{module} is also necessary.
const esm = ['internmap', 'd3-*', 'lodash-es']
  .map((d) => `_${d}|${d}`)
  .join('|');

module.exports = {
  testTimeout: 30000,
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
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: false,
  testRegex: '(/__tests__/integration/.*\\.(test|spec))\\.(ts|tsx|js)$',
  collectCoverageFrom: ['src/**/*.ts', '!**/d3-sankey/**', '!**/d3-cloud/**'],
  // Transform esm to cjs.
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esm}))`],
};
