// Modules installed by tnpm or cnpm will use underscore as prefix.
// In this case _{module} is also necessary.
const esm = ['d3-*'].map((d) => `_${d}|${d}`).join('|');

module.exports = {
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  testTimeout: 30000,
  preset: 'ts-jest/presets/js-with-ts',
  globals: {
    'ts-jest': {
      tsconfig: {
        allowJs: true,
        sourceMap: true,
      },
    },
  },
  collectCoverage: false,
  testRegex: '/tests/.*-spec\\.ts?$',
  // Transform esm to cjs.
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esm}))`],
  collectCoverageFrom: ['src/**/*.{ts,js}', '!**/node_modules/**', '!**/vendor/**'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    'd3-color': 'd3-color/dist/d3-color.min.js',
    'd3-interpolate': 'd3-interpolate/dist/d3-interpolate.min.js',
    'd3-geo': 'd3-geo/build/d3-geo.min.js',
    'd3-path': 'd3-path/dist/d3-path.min.js',
  },
};
