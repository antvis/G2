import { getMean, getMedian } from '../../../src/util/stat';

describe('util stat', () => {
  it('getMean', () => {
    expect(getMean([])).toEqual(0);
    expect(getMean([1])).toEqual(1);
    expect(getMean([1, 2, 3, 4])).toEqual(2.5);
    expect(getMean([1, 2, NaN, 3, 4])).toEqual(2);
    expect(getMean([1, 2, null, 3, 4])).toEqual(2);
    expect(getMean([1, 2, undefined, 3, 4])).toEqual(2);
  });

  it('getMedian', () => {
    expect(getMedian([])).toEqual(0);
    expect(getMedian([1])).toEqual(1);
    expect(getMedian([1, 2, 3, 4])).toEqual(2.5);
    expect(getMedian([1, 2, 3, 4, 5])).toEqual(3);
  });
});
