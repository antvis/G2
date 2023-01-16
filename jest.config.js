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
};
