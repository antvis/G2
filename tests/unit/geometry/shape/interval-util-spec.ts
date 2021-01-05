import { parseRadius } from '../../../../src/geometry/shape/interval/util';

describe('绘制 interval shape 的一些 utils', () => {
  it('parseRadius', () => {
    expect(parseRadius(4, 10)).toEqual([4, 4, 4, 4]);
    expect(parseRadius([3, 4], 10)).toEqual([3, 4, 3, 4]);
    expect(parseRadius([3, 4, 5], 10)).toEqual([3, 4, 5, 4]);
    expect(parseRadius([3, 4, 5, 2], 10)).toEqual([3, 4, 5, 2]);
    expect(parseRadius(null, 10)).toEqual([0, 0, 0, 0]);
    expect(parseRadius(undefined, 10)).toEqual([0, 0, 0, 0]);
  });

  it('parseRadius, exceed minLength', () => {
    expect(parseRadius(4, 3)).toEqual([1.5, 1.5, 1.5, 1.5]);

    expect(parseRadius([3, 1], 4)).toEqual([3, 1, 3, 1]);
    expect(parseRadius([3, 2], 4)).toEqual([(4 / 5) * 3, 4 - (4 / 5) * 3, (4 / 5) * 3, 4 - (4 / 5) * 3]);
  });
});
