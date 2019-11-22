import { isBetween, padEnd } from '../../../src/util/helper';

describe('Helper', () => {
  it('isBetween()', () => {
    expect(isBetween(3, 4, 6)).toBe(false);
    expect(isBetween(3, 2, 6)).toBe(true);
  });

  it('padEnd', () => {
    expect(padEnd('skr', 5, '~')).toBe('skr~~');
    expect(padEnd([1, 2, 3], 5, 4)).toEqual([1, 2, 3, 4, 4]);
    expect(padEnd([1, 2, 3], 3, 3)).toEqual([1, 2, 3]);
  });
});
