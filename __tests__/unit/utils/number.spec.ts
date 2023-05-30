import { clamp } from '../../../src/utils/number';

describe('number', () => {
  it('clame should return value between lower and upper', () => {
    expect(clamp(1, 0, 2)).toBe(1);
    expect(clamp(1, 2, 3)).toBe(2);
    expect(clamp(5, 2, 3)).toBe(3);
  });
});
