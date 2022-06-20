import { Node } from '../../../../src/mark/geometry';
import { plot } from '../helper';

describe('Node', () => {
  it('Node has expected props', () => {
    expect(Node.props).toEqual({
      defaultShape: 'point',
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
      ],
      preInference: [{ type: 'maybeArrayField' }],
      postInference: [
        { type: 'maybeKey' },
        { type: 'maybeTitleX' },
        { type: 'maybeTooltipY' },
      ],
      shapes: ['point', 'polygon'],
    });
  });

  it('Node should draw basic polygon', () => {
    const [I, P] = plot({
      mark: Node({}),
      index: [0, 1],
      channel: {
        x: [0.1, 0.2],
        x1: [0.5, 0.8],
        x2: [1, 1],
        y: [0.1, 0.2],
        y1: [0.9, 0.5],
        y2: [1, 1],
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
