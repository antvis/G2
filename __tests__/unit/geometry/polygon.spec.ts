import { Polygon } from '../../../src/mark/geometry';
import { plot } from './helper';

describe('Polygon', () => {
  it('Polygon has expected props', () => {
    expect(Polygon.props).toEqual({
      defaultShape: 'polygon',
      channels: [
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay' },
        { name: 'enterDuration' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'title', scale: 'identity' },
        { name: 'tooltip', scale: 'identity' },
        { name: 'x', required: true },
        { name: 'y', required: true },
      ],
      infer: [
        { type: 'maybeTuple' },
        { type: 'maybeKey' },
        { type: 'maybeTitle' },
        { type: 'maybeTooltip' },
      ],
      shapes: ['polygon'],
    });
  });

  it('Polygon should draw basic polygon', () => {
    const [I, P] = plot({
      mark: Polygon({}),
      index: [0, 1],
      channel: {
        x: [
          [0.1, 0.5, 1],
          [0.2, 0.8, 1],
        ],
        y: [
          [0.1, 0.9, 1],
          [0.2, 0.5, 1],
        ],
      },
    });

    expect(I).toEqual([0, 1]);
    expect(P).toEqual([
      [
        [60, 40],
        [300, 360],
        [600, 400],
      ],
      [
        [120, 80],
        [480, 200],
        [600, 400],
      ],
    ]);
  });
});
