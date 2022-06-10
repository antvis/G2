import { Vector } from '../../../../src/mark/geometry';
import { plot } from '../helper';

describe('Vector', () => {
  it('Vector has expected props', () => {
    expect(Vector.props).toEqual({
      defaultShape: 'vector',
      channels: [
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay', scaleName: 'enter' },
        { name: 'enterDuration', scaleName: 'enter' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'title', scale: 'identity' },
        { name: 'tooltip', scale: 'identity', independent: true },
        { name: 'x', required: true },
        { name: 'y', required: true },
        { name: 'rotate', required: true },
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
        [121, 200],
      ],
      [
        [239.18954654119779, 78.73779352278815],
        [240.81045345880221, 81.26220647721185],
      ],
      [
        [360.8322936730943, 158.18140514634862],
        [359.1677063269057, 161.81859485365138],
      ],
    ]);
  });
});
