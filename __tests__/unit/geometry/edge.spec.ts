import { Edge } from '../../../src/geometry';
import { plot } from './helper';

describe('Edge', () => {
  it('Edge has expected props', () => {
    expect(Edge.props).toEqual({
      defaultShape: 'edge',
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
      shapes: ['edge'],
    });
  });

  it('Edge should draw basic edge', () => {
    const [I, P] = plot({
      mark: Edge({}),
      index: [0, 1],
      channel: {
        x: [
          [0.1, 0.9],
          [0.2, 0.8],
        ],
        y: [
          [0.1, 0.9],
          [0.2, 0.8],
        ],
      },
    });

    expect(I).toEqual([0, 1]);
    expect(P).toEqual([
      [
        [60, 40],
        [540, 360],
      ],
      [
        [120, 80],
        [480, 320],
      ],
    ]);
  });
});
