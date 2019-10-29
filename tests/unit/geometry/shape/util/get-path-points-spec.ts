import { getPathPoints } from '../../../../../src/geometry/shape/util/get-path-points';

describe('getPathPoints', () => {
  test('data is empty', () => {
    expect(getPathPoints([], true).length).toBe(0);
  });

  test('connectNulls is true', () => {
    const data = [{ x: 1, y: 10 }, { x: 2, y: null }, { x: 4, y: 90 }, { x: 8, y: 12 }, { x: 9, y: 34 }];
    const result = getPathPoints(data, true);
    expect(result).toEqual([[{ x: 1, y: 10 }, { x: 4, y: 90 }, { x: 8, y: 12 }, { x: 9, y: 34 }]]);
  });

  test('connectNulls is false', () => {
    const data = [{ x: 1, y: 10 }, { x: 2, y: undefined }, { x: 4, y: [null] }, { x: 8, y: 12 }, { x: 9, y: 34 }];
    const result = getPathPoints(data, false);
    expect(result).toEqual([[{ x: 1, y: 10 }], [{ x: 8, y: 12 }, { x: 9, y: 34 }]]);
  });

  test('connectNulls is true, and each point is an array', () => {
    const data = [
      [{ x: 1, y: 10 }, { x: 2, y: 2 }],
      [{ x: 4, y: 2 }, { x: 8, y: NaN }],
      [{ x: 9, y: 34 }, { x: 1, y: 1 }],
    ];
    const result = getPathPoints(data, true);
    console.log(JSON.stringify(result));
    expect(result).toEqual([[[{ x: 1, y: 10 }, { x: 2, y: 2 }], [{ x: 9, y: 34 }, { x: 1, y: 1 }]]]);
  });
});
