import { Point } from '../../../../src/mark/geometry';
import { plot } from '../helper';

describe('Point', () => {
  it('Point should has expected props', () => {
    expect(Point.props).toEqual({
      defaultShape: 'point',
      defaultLabelShape: 'label',
      channels: [
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay', scaleName: 'enter' },
        { name: 'enterDuration', scaleName: 'enter' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'groupKey', scale: 'identity' },
        { name: 'label', scale: 'identity' },
        { name: 'title', scale: 'identity' },
        { name: 'tooltip', scale: 'identity', independent: true },
        { name: 'x', required: true },
        { name: 'y', required: true },
        { name: 'size', required: true },
        { name: 'dx', scale: 'identity' },
        { name: 'dy', scale: 'identity' },
      ],
      preInference: [
        { type: 'maybeArrayField' },
        { type: 'maybeZeroY' },
        { type: 'maybeZeroX' },
        { type: 'maybeSize' },
      ],
      postInference: [
        { type: 'maybeKey' },
        { type: 'maybeTitleX' },
        { type: 'maybeTooltipY' },
      ],
      shapes: [
        'bowtie',
        'cross',
        'diamond',
        'hexagon',
        'hollowBowtie',
        'hollowDiamond',
        'hollowHexagon',
        'hollowPoint',
        'hollowSquare',
        'hollowTriangle',
        'hollowTriangleDown',
        'hyphen',
        'linePoint',
        'plus',
        'point',
        'square',
        'tick',
        'triangle',
        'triangleDown',
      ],
    });
  });

  it('Point should transform values into points of bbox for point', () => {
    const [I, P] = plot({
      mark: Point({}),
      index: [0, 1, 2],
      channel: {
        x: [0.2, 0.4, 0.6],
        y: [0.5, 0.2, 0.4],
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
