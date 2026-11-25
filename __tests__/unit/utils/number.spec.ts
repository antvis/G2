import { clamp, prettyNumber } from '../../../src/utils/number';

describe('number', () => {
  it('clame should return value between lower and upper', () => {
    expect(clamp(1, 0, 2)).toBe(1);
    expect(clamp(1, 2, 3)).toBe(2);
    expect(clamp(5, 2, 3)).toBe(3);
  });
});

describe('prettyNumber', () => {
  it('removes floating point noise', () => {
    expect(prettyNumber(0.1 + 0.2)).toBe(0.3);
    expect(prettyNumber(1.1 * 3)).toBe(3.3);
    expect(prettyNumber(1234.5678)).toBe(1234.5678);
    expect(prettyNumber(-0.30000000000000004)).toBe(-0.3);
    expect(prettyNumber(0)).toBe(0);
    expect(prettyNumber('a' as any)).toBe('a');
  });

  it('keeps the significant digits of small values', () => {
    expect(prettyNumber(2e-11)).toBe(2e-11);
    expect(prettyNumber(-5e-12)).toBe(-5e-12);
    expect(prettyNumber(1.25e-9)).toBe(1.25e-9);
    expect(prettyNumber(0.1 * 3 * 1e-10)).toBe(3e-11);
    expect(prettyNumber(0.00012345)).toBe(0.00012345);
  });
});
