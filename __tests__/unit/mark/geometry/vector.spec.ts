import { Vector } from '../../../../src/mark/geometry';
import { plot } from '../helper';

describe('Vector', () => {
  it('Vector has expected props', () => {
    expect(Vector.props).toEqual({
      defaultShape: 'vector',
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
        { name: 'rotate', required: true, scale: 'identity' },
        { name: 'size', required: true },
      ],
      preInference: [{ type: 'maybeArrayField' }],
      postInference: [
        { type: 'maybeKey' },
        { type: 'maybeTitleX' },
        { type: 'maybeTooltipY' },
      ],
      shapes: ['vector'],
    });
  });

  it('Vector should draw basic vector', () => {
    const [I, P] = plot({
      mark: Vector({}),
      index: [0, 1, 2],
      channel: {
        x: [0.2, 0.4, 0.6],
        y: [0.5, 0.2, 0.4],
        size: [2, 3, 4],
        rotate: [0, 1, 2],
      },
    });
    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([
      [
        [119, 200],
        [121.00000000000001, 200],
      ],
      [
        [238.50022845726542, 80.02617860965593],
        [241.4997715427346, 79.97382139034409],
      ],
      [
        [358.0012183459618, 160.06979899340502],
        [361.99878165403817, 159.930201006595],
      ],
    ]);
  });
});
