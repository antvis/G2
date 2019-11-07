import { parsePadding } from '../../../src/util/padding';

describe('util padding', () => {
  it('parsePadding', () => {
    expect(parsePadding()).toEqual([0, 0, 0, 0]);
    expect(parsePadding([])).toEqual([0, 0, 0, 0]);
    expect(parsePadding(1)).toEqual([1, 1, 1, 1]);
    expect(parsePadding([1])).toEqual([1, 1, 1, 1]);
    expect(parsePadding([1, 2])).toEqual([1, 2, 1, 2]);
    expect(parsePadding([1, 2, 3])).toEqual([1, 2, 3, 2]);
    expect(parsePadding([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(parsePadding([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4]);
  });
});
