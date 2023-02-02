import { fetch } from './fetch';

const builtinFetch = global.fetch;

beforeAll(() => {
  // @ts-ignore
  global.fetch = fetch;
});

afterAll(() => {
  global.fetch = builtinFetch;
});
