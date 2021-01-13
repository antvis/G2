import { getCoordinate } from '@antv/coord';
import {
  getBackgroundRectPath,
  parseRadius,
  getRectWithCornerRadius,
} from '../../../../src/geometry/shape/interval/util';

const CartesianCoordinate = getCoordinate('rect');
const PolarCoordinate = getCoordinate('polar');

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
    expect(parseRadius([6, 2], 4)).toEqual([3, 1, 3, 1]);
    expect(parseRadius([6, null], 4)).toEqual([4, 0, 4, 0]);
  });

  const region = { start: { x: 0, y: 300 }, end: { x: 300, y: 0 } };
  const shapeInfo = {
    x: 0.2,
    y: 0.5,
    points: [
      { x: 0.2, y: 1 },
      { x: 0.2, y: 0.5 },
      { x: 0.4, y: 0.5 },
      { x: 0.4, y: 1 },
    ],
  };
  const points = [
    { x: 60, y: 0 },
    { x: 60, y: 150 },
    { x: 120, y: 150 },
    { x: 120, y: 0 },
  ];

  it('直角坐标系：获取 path of background rect', () => {
    const rectCoord = new CartesianCoordinate(region);

    const path = getBackgroundRectPath(shapeInfo, points, rectCoord);
    // p0 (60, 300), p1 (120, 0)
    expect(path).toEqual([['M', 60, 300], ['L', 120, 300], ['L', 120, 0], ['L', 60, 0], ['L', 60, 300], ['z']]);

    const path2 = getBackgroundRectPath(
      { ...shapeInfo, background: { style: { radius: [10, 110, 10, 10] } } },
      [
        { x: 60, y: 0 },
        { x: 60, y: 150 },
        { x: 120, y: 150 },
        { x: 120, y: 0 },
      ],
      rectCoord
    );
    expect(path2).not.toEqual(path);

    const radius = parseRadius([10, 110, 10, 10], 60);
    expect(radius).toEqual([5, 55, 10, 10]);
    // p0 (60, 300), p1 (120, 0) radius [5, 55, 10, 10]
    expect(path2).toEqual([
      ['M', 60, 5],
      ['A', 5, 5, 0, 0, 1, 65, 0],
      ['L', 65, 0],
      ['A', 55, 55, 0, 0, 1, 120, 55],
      ['L', 120, 290],
      ['A', 10, 10, 0, 0, 1, 110, 300],
      ['L', 70, 300],
      ['A', 10, 10, 0, 0, 1, 60, 290],
      ['z'],
    ]);
  });

  it('直角坐标系，转置：获取 path of background rect', () => {
    const rectCoord = new CartesianCoordinate(region);
    rectCoord.transpose();

    const path = getBackgroundRectPath(
      {
        ...shapeInfo,
        points: [
          { x: 0.7007575757575757, y: 0 },
          { x: 0.7007575757575757, y: 1 },
          { x: 0.7992424242424243, y: 1 },
          { x: 0.7992424242424243, y: 0 },
        ],
      },
      [
        { x: 56, y: 79 },
        { x: 300, y: 79 },
        { x: 300, y: 52.99999999999997 },
        { x: 56, y: 52.99999999999997 },
      ],
      rectCoord
    );
    // p0 (0, 79), p1 (300, 52.99999999999997)
    expect(path).toEqual([
      ['M', 0, 79],
      ['L', 300, 79],
      ['L', 300, 52.99999999999997],
      ['L', 0, 52.99999999999997],
      ['L', 0, 79],
      ['z'],
    ]);
  });

  it('polar 坐标系，非转置：获取 path of background rect', () => {
    const polarCoord = new PolarCoordinate(region);

    const path = getBackgroundRectPath(shapeInfo, points, polarCoord);

    // p0 (60, 300), p1 (120, 0)
    expect(path[0][1]).toEqual(path[3][1]);
    expect(path[0][2]).toEqual(path[3][2]);

    const path2 = getBackgroundRectPath(
      { ...shapeInfo, background: { style: { radius: [10, 110, 10, 10] } } },
      [
        { x: 60, y: 0 },
        { x: 60, y: 150 },
        { x: 120, y: 150 },
        { x: 120, y: 0 },
      ],
      polarCoord
    );
    // polar 坐标系下 不支持background radius，因为两个 path 相等
    expect(path2).toEqual(path);
  });

  it('polar 坐标系，转置：获取 path of background rect', () => {
    const polarCoord = new PolarCoordinate(region);
    polarCoord.transpose();

    expect(polarCoord.isTransposed).toBe(true);

    const path = getBackgroundRectPath(shapeInfo, points, polarCoord);
    const p0 = { x: path[0][1], y: path[0][2] };
    const p2 = { x: path[3][1], y: path[3][2] };
    expect(p0).not.toEqual(p2);

    const path2 = getBackgroundRectPath(
      { ...shapeInfo, background: { style: { radius: [10, 110, 10, 10] } } },
      [
        { x: 60, y: 0 },
        { x: 60, y: 150 },
        { x: 120, y: 150 },
        { x: 120, y: 0 },
      ],
      polarCoord
    );
    // 极坐标系下 不支持background radius，因为两个 path 相等
    expect(path2).toEqual(path);
  });

  it('直角坐标系：获取 带 corner-radius 的 rect', () => {
    const rectCoord = new CartesianCoordinate(region);

    const path = getRectWithCornerRadius(
      [
        { x: 60, y: 150 },
        { x: 60, y: 0 },
        { x: 120, y: 0 },
        { x: 120, y: 150 },
      ],
      rectCoord,
      5
    );
    /**
     * 从 p1 开始绘制，对应的 radius: [r1, r2, r3, r0]
     * p1 ----> p2
     * ↑        |
     * |        |
     * |        |
     * |        ↓
     * P0 <---- P3
     */
    expect(path).toEqual([
      ['M', 60, 5],
      ['A', 5, 5, 0, 0, 1, 65, 0],
      ['L', 115, 0],
      ['A', 5, 5, 0, 0, 1, 120, 5],
      ['L', 120, 145],
      ['A', 5, 5, 0, 0, 1, 115, 150],
      ['L', 65, 150],
      ['A', 5, 5, 0, 0, 1, 60, 145],
      ['L', 60, 5],
      ['z'],
    ]);

    const path1 = getRectWithCornerRadius(
      [
        { x: 60, y: 150 },
        { x: 60, y: 0 },
        { x: 120, y: 0 },
        { x: 120, y: 150 },
      ],
      rectCoord,
      [5, 0, 0, 5]
    );
    expect(path1).toEqual([
      ['M', 60, 5],
      ['A', 5, 5, 0, 0, 1, 65, 0],
      ['L', 120, 0],
      ['L', 120, 150],
      ['L', 65, 150],
      ['A', 5, 5, 0, 0, 1, 60, 145],
      ['L', 60, 5],
      ['z'],
    ]);
  });

  it('直角坐标系, 转置: 带 corner-radius 的 rect', () => {
    const rectCoord = new CartesianCoordinate(region);
    rectCoord.transpose();

    const path = getRectWithCornerRadius(
      [
        { x: 60, y: 150 },
        { x: 210, y: 150 },
        { x: 210, y: 90 },
        { x: 60, y: 90 },
      ],
      rectCoord,
      5
    );
    /**
     * 转置后，
     * 从 p3 开始绘制，对应的 radius: [r1, r2, r3, r0]
     * p3 → p2
     * ↑    ↓
     * P0 ← P1
     */
    expect(path).toEqual([
      ['M', 60, 95],
      ['A', 5, 5, 0, 0, 1, 65, 90],
      ['L', 205, 90],
      ['A', 5, 5, 0, 0, 1, 210, 95],
      ['L', 210, 145],
      ['A', 5, 5, 0, 0, 1, 205, 150],
      ['L', 65, 150],
      ['A', 5, 5, 0, 0, 1, 60, 145],
      ['L', 60, 95],
      ['z'],
    ]);


    const path1 = getRectWithCornerRadius(
      [
        { x: 60, y: 150 },
        { x: 210, y: 150 },
        { x: 210, y: 90 },
        { x: 60, y: 90 },
      ],
      rectCoord,
      [5, 0, 0, 5]
    );
    expect(path1).toEqual([
      ['M', 60, 95],
      ['A', 5, 5, 0, 0, 1, 65, 90],
      ['L', 205, 90],
      ['A', 5, 5, 0, 0, 1, 210, 95],
      ['L', 210, 150],
      ['L', 60, 150],
      ['L', 60, 95],
      ['z'],
    ]);
  });

  it('直角坐标系, 转置: 带负数值的，带 corner-radius 的 rect', () => {
    const rectCoord = new CartesianCoordinate(region);
    rectCoord.transpose();

    const path = getRectWithCornerRadius(
      [
        { x: 210, y: 150 },
        { x: 60, y: 150 },
        { x: 60, y: 90 },
        { x: 210, y: 90 },
      ],
      rectCoord,
      5
    );
    /**
     * 转置后，
     * 从 p3 开始绘制，对应的 radius: [r1, r2, r3, r0]
     * p3 → p2
     * ↑    ↓
     * P0 ← P1
     */
    expect(path).toEqual([
      ['M', 60, 95],
      ['A', 5, 5, 0, 0, 1, 65, 90],
      ['L', 205, 90],
      ['A', 5, 5, 0, 0, 1, 210, 95],
      ['L', 210, 145],
      ['A', 5, 5, 0, 0, 1, 205, 150],
      ['L', 65, 150],
      ['A', 5, 5, 0, 0, 1, 60, 145],
      ['L', 60, 95],
      ['z'],
    ]);


    const path1 = getRectWithCornerRadius(
      [
        { x: 210, y: 150 },
        { x: 60, y: 150 },
        { x: 60, y: 90 },
        { x: 210, y: 90 },
      ],
      rectCoord,
      [5, 0, 0, 5]
    );
    expect(path1).toEqual([
      ['M', 60, 95],
      ['A', 5, 5, 0, 0, 1, 65, 90],
      ['L', 205, 90],
      ['A', 5, 5, 0, 0, 1, 210, 95],
      ['L', 210, 150],
      ['L', 60, 150],
      ['L', 60, 95],
      ['z'],
    ]);
  });
});
