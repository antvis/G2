import {
  getPathPoints,
  getSmoothViolinPath,
  getViolinPath,
} from '../../../../../src/geometry/shape/util/get-path-points';

describe('getPathPoints', () => {
  test('data is empty', () => {
    expect(getPathPoints([], true).length).toBe(0);
  });

  test('connectNulls is true', () => {
    const data = [
      { x: 1, y: 10 },
      { x: 2, y: null },
      { x: 4, y: 90 },
      { x: 8, y: 12 },
      { x: 9, y: 34 },
    ];
    const result = getPathPoints(data, true);
    expect(result).toEqual([
      [
        { x: 1, y: 10 },
        { x: 4, y: 90 },
        { x: 8, y: 12 },
        { x: 9, y: 34 },
      ],
    ]);
  });

  test('connectNulls is false', () => {
    const data = [
      { x: 1, y: 10 },
      { x: 2, y: undefined },
      { x: 4, y: [null] },
      { x: 8, y: 12 },
      { x: 9, y: 34 },
    ];
    const result = getPathPoints(data, false);
    expect(result).toEqual([
      [{ x: 1, y: 10 }],
      [
        { x: 8, y: 12 },
        { x: 9, y: 34 },
      ],
    ]);
  });

  test('showSinglePoint is false', () => {
    const data = [
      { x: 1, y: 10 },
      { x: 2, y: undefined },
      { x: 4, y: [null] },
      { x: 8, y: 12 },
      { x: 9, y: 34 },
    ];
    const result1 = getPathPoints(data, false, false);
    expect(result1).toEqual([
      [
        { x: 8, y: 12 },
        { x: 9, y: 34 },
      ],
    ]);
  });

  test('connectNulls is true, and each point is an array', () => {
    const data = [
      [
        { x: 1, y: 10 },
        { x: 2, y: 2 },
      ],
      [
        { x: 4, y: 2 },
        { x: 8, y: NaN },
      ],
      [
        { x: 9, y: 34 },
        { x: 1, y: 1 },
      ],
    ];
    const result = getPathPoints(data, true);
    expect(result).toEqual([
      [
        [
          { x: 1, y: 10 },
          { x: 2, y: 2 },
        ],
        [
          { x: 9, y: 34 },
          { x: 1, y: 1 },
        ],
      ],
    ]);
  });
});

describe('get path of violin', () => {
  // 小提琴图用 KDE transform 提供数据, 采样点 y 会产生一个 array 数量不定 可大到 13 条

  test('data is empty', () => {
    expect(getViolinPath([]).length).toBe(0);
  });

  test('default', () => {
    const points = [
      { isMin: false, isMax: true, x: 0.0823123041405853, y: 0.14780717951998482 },
      { isMin: false, isMax: false, x: 0.08468585099790692, y: 0.11085538463998862 },
      { isMin: false, isMax: false, x: 0.0933583514121099, y: 0.07390358975999241 },
      { isMin: false, isMax: false, x: 0.10286458333333333, y: 0.036951794879996204 },
      { isMin: true, isMax: false, x: 0.09777862576584968, y: 0 },
      { isMin: true, isMax: false, x: 0.06628387423415032, y: 0 },
      { isMin: false, isMax: false, x: 0.06119791666666667, y: 0.036951794879996204 },
      { isMin: false, isMax: false, x: 0.0707041485878901, y: 0.07390358975999241 },
      { isMin: false, isMax: false, x: 0.07937664900209308, y: 0.11085538463998862 },
      { isMin: false, isMax: true, x: 0.0817501958594147, y: 0.14780717951998482 },
    ];

    const result = getViolinPath(points);
    expect(result.length).toBe(points.length + 2);
    expect(result[0][0].toLowerCase()).toBe('m');
    expect(result[result.length - 1][0].toLowerCase()).toBe('z');
    result.forEach((p, idx) => {
      if (idx < result.length - 1 && points[idx]) {
        expect(p[1]).toBe(points[idx].x);
        expect(p[2]).toBe(points[idx].y);
      } else if (idx === result.length && points[0]) {
        expect(p[1]).toBe(points[0].x);
        expect(p[2]).toBe(points[0].y);
      }
    });
  });

  test('smooth', () => {
    const points = [
      { isMin: false, isMax: true, x: 0.0823123041405853, y: 0.14780717951998482 },
      { isMin: false, isMax: false, x: 0.08468585099790692, y: 0.11085538463998862 },
      { isMin: false, isMax: false, x: 0.0933583514121099, y: 0.07390358975999241 },
      { isMin: false, isMax: false, x: 0.10286458333333333, y: 0.036951794879996204 },
      { isMin: true, isMax: false, x: 0.09777862576584968, y: 0 },
      { isMin: true, isMax: false, x: 0.06628387423415032, y: 0 },
      { isMin: false, isMax: false, x: 0.06119791666666667, y: 0.036951794879996204 },
      { isMin: false, isMax: false, x: 0.0707041485878901, y: 0.07390358975999241 },
      { isMin: false, isMax: false, x: 0.07937664900209308, y: 0.11085538463998862 },
      { isMin: false, isMax: true, x: 0.0817501958594147, y: 0.14780717951998482 },
    ];

    const result = getSmoothViolinPath(points);
    expect(result.length).toBe(points.length + 2);
    expect(result[result.length - 1][0].toLowerCase()).toBe('z');
    result.forEach((p, idx) => {
      if (idx === 0) {
        expect(p[0].toLowerCase()).toBe('m');
      } else if (idx === result.length - 1) {
        expect(p[0].toLowerCase()).toBe('z');
      } else if (idx % (points.length / 2) === 0) {
        // 取半
        expect(p[0].toLowerCase()).toBe('l');
        if (points[idx]) {
          expect(p[1]).toBe(points[idx].x);
          expect(p[2]).toBe(points[idx].y);
        } else {
          expect(p[1]).toBe(points[0].x);
          expect(p[2]).toBe(points[0].y);
        }
      } else {
        expect(p[0].toLowerCase()).toBe('c');
      }
    });
  });
});
