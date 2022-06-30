import { Grid } from '../../../../src/mark/geometry';
import { Band } from '../../../../src/scale';
import { plot } from '../helper';

describe('Grid', () => {
  it('Grid has expected props', () => {
    expect(Grid.props).toEqual({
      defaultShape: 'rect',
      channels: [
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay', scaleName: 'enter' },
        { name: 'enterDuration', scaleName: 'enter' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'groupKey', scale: 'identity' },
        { name: 'title', scale: 'identity' },
        { name: 'tooltip', scale: 'identity', independent: true },
        { name: 'x', required: true, scale: 'band' },
        { name: 'y', required: true, scale: 'band' },
      ],
      preInference: [
        { type: 'maybeArrayField' },
        { type: 'maybeZeroX' },
        { type: 'maybeZeroY' },
      ],
      postInference: [
        { type: 'maybeKey' },
        { type: 'maybeTitleX' },
        { type: 'maybeTooltipY' },
      ],
      shapes: ['rect', 'hollowRect'],
    });
  });

  it('Grid() returns a function calc points from value', () => {
    const [I, P] = plot({
      mark: Grid({}),
      index: [0, 1, 2, 3],
      scale: {
        x: Band({
          domain: ['a', 'b'],
          range: [0, 1],
        }),
        y: Band({
          domain: ['c', 'd'],
          range: [0, 1],
        }),
      },
      channel: {
        x: [[0], [0], [0.5], [0.5]],
        y: [[0], [0.5], [0], [0.5]],
      },
    });

    expect(I).toEqual([0, 1, 2, 3]);
    expect(P).toEqual([
      [
        [0, 0],
        [300, 0],
        [300, 200],
        [0, 200],
      ],
      [
        [0, 200],
        [300, 200],
        [300, 400],
        [0, 400],
      ],
      [
        [300, 0],
        [600, 0],
        [600, 200],
        [300, 200],
      ],
      [
        [300, 200],
        [600, 200],
        [600, 400],
        [300, 400],
      ],
    ]);
  });
});
