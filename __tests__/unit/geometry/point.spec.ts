import { Point } from '../../../src/geometry';
import { plot } from './helper';

describe('Point', () => {
  it('Point should has expected props', () => {
    expect(Point.props).toEqual({
      defaultShape: 'point',
      channels: [
        { name: 'x', required: true },
        { name: 'y', required: true },
        { name: 'size', required: true },
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay' },
        { name: 'enterDuration' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
      ],
      infer: [
        { type: 'maybeTuple' },
        { type: 'maybeZeroY1' },
        { type: 'maybeSize' },
        { type: 'maybeKey' },
      ],
      shapes: ['point', 'hollowPoint'],
    });
  });

  it('Point should transform values into points of bbox for point', () => {
    const [I, P] = plot({
      mark: Point({}),
      index: [0, 1, 2],
      channel: {
        x: [[0.2], [0.4], [0.6]],
        y: [[0.5], [0.2], [0.4]],
        size: [3, 3, 3],
      },
    });

    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([
      [
        [117, 197],
        [123.00000000000001, 202.99999999999997],
      ],
      [
        [237, 77],
        [243.00000000000003, 83],
      ],
      [
        [357, 157],
        [363, 163],
      ],
    ]);

    const [p] = P;
    const [[x0, y0], [x1, y1]] = p;
    expect(x1 - x0).toBeCloseTo(y1 - y0);
    expect(x1 - x0).toBeCloseTo(3 * 2);
  });
});
