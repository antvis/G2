import { version } from '../../package.json';
import { VERSION } from '../../src';

describe('G2', () => {
  it('export', () => {
    expect(VERSION).toBe(version);
  });
});
