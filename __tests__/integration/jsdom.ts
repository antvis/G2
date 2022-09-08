import util from 'util';

// @see https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// @see https://github.com/jsdom/jsdom/issues/2524
if (global.window) {
  // eslint-disable-next-line no-undef
  Object.defineProperty(global.window, 'TextEncoder', {
    writable: true,
    value: util.TextEncoder,
  });
  // eslint-disable-next-line no-undef
  Object.defineProperty(global.window, 'TextDecoder', {
    writable: true,
    value: util.TextDecoder,
  });
}

export { JSDOM } from 'jsdom';
