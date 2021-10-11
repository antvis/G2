import { getPolygonCentroid } from '../../../src/util/graphics';

describe('test getPolygonCentroid', () => {
  test('getPolygonCentroid can handle colline points', () => {
    const x1 = [1, 1, 1, 1];
    const y1 = [0, 3, 4, 2];

    expect(getPolygonCentroid(x1, y1)).toEqual([1, 2]);

    const x2 = y1;
    const y2 = x1;
    expect(getPolygonCentroid(x2, y2)).toEqual([2, 1]);

    const x3 = x1;
    const y3 = x1;
    expect(getPolygonCentroid(x3, y3)).toEqual([1, 1]);
  });
});
