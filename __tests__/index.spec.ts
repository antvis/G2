import { version } from '../src';

describe('template', () => {
  test('export', () => {
    expect(version).toBe('0.1.0');
  });
});
