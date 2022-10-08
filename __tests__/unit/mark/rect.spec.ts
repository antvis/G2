import { Rect } from '../../../src/mark';
import { plot } from './helper';

describe('Rect', () => {
  it('Rect has expected props', () => {
    expect(Rect.props).toEqual({
      defaultShape: 'rect',
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
      ],
      preInference: [{ type: 'maybeZeroY1' }],
      postInference: [
        { type: 'maybeKey' },
        { type: 'maybeTitleX' },
        { type: 'maybeTooltipY' },
      ],
      shapes: ['rect', 'hollow'],
    });
  });
});

it('Rect should draw basic rect', () => {
  const [I, P] = plot({
    mark: Rect({}),
    index: [0, 1],
    channel: {
      x: [0.1, 0.2],
      x1: [0.5, 0.8],
      y: [0.1, 0.2],
      y1: [0.9, 0.5],
    },
  });

  expect(I).toEqual([0, 1]);
  expect(P).toEqual([
    [
      [60, 40],
      [300, 40],
      [300, 360],
      [60, 360],
    ],
    [
      [120, 80],
      [480, 80],
      [480, 200],
      [120, 200],
    ],
  ]);
});
