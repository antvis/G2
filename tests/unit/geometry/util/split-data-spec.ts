import { splitData } from '../../../../src/geometry/util/split-data';

describe('splitData', () => {
  test('data is empty', () => {
    expect(splitData([], 'y').length).toBe(0);
  });

  test('connectNulls is true', () => {
    const data = [{ x: 1, y: 10 }, { x: 2, y: null }, { x: 4, y: 90 }, { x: 8, y: 12 }, { x: 9, y: 34 }];
    const result = splitData(data, 'y', true);
    expect(result).toEqual([[{ x: 1, y: 10 }, { x: 4, y: 90 }, { x: 8, y: 12 }, { x: 9, y: 34 }]]);
  });

  test('connectNulls is false', () => {
    const data = [
      { x: 1, y: 10, _origin: { x: 1, y: 10 } },
      { x: 2, _origin: { x: 2 } },
      { x: 4, y: [null], _origin: { x: 4, y: [null] } },
      { x: 8, y: 12, _origin: { x: 8, y: 12 } },
      { x: 9, y: 34, _origin: { x: 9, y: 34 } },
    ];
    const result = splitData(data, 'y', false);
    expect(result).toEqual([
      [{ x: 1, y: 10, _origin: { x: 1, y: 10 } }],
      [{ x: 8, y: 12, _origin: { x: 8, y: 12 } }, { x: 9, y: 34, _origin: { x: 9, y: 34 } }],
    ]);
  });
});
