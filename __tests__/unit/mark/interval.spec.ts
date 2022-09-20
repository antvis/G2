import { Interval } from '../../../src/mark';
import { Band } from '../../../src/scale';
import { plot } from './helper';

describe('Interval', () => {
  it('Interval has expected props', () => {
    expect(Interval.props).toEqual({
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
        { name: 'x', scale: 'band', required: true },
        { name: 'y', required: true },
        { name: 'series', scale: 'band' },
      ],
      preInference: [{ type: 'maybeZeroY1' }, { type: 'maybeZeroX' }],
      postInference: [
        { type: 'maybeKey' },
        { type: 'maybeTitleX' },
        { type: 'maybeTooltipY' },
      ],
      shapes: ['rect', 'hollowRect', 'funnel', 'pyramid'],
    });
  });

  it('Interval() returns a function transforming values into interval shapes', () => {
    const [I, P] = plot({
      mark: Interval({}),
      index: [0, 1, 2],
      scale: {
        x: Band({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
        }),
      },
      channel: {
        x: [0, 1 / 3, 2 / 3],
        y: [0.6, 0.4, 0.2],
        y1: [1, 1, 1],
      },
    });

    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([
      [
        [0, 240],
        [200, 240],
        [200, 400],
        [0, 400],
      ],
      [
        [200, 160],
        [400, 160],
        [400, 400],
        [200, 400],
      ],
      [
        [400, 80],
        [600, 80],
        [600, 400],
        [400, 400],
      ],
    ]);
  });

  it('Interval() returns a function handle series channel', () => {
    const [I, P] = plot({
      mark: Interval({}),
      index: [0, 1, 2, 3, 4, 5],
      scale: {
        x: Band({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
        }),
        series: Band({ domain: ['1', '2'], range: [0, 1] }),
      },
      channel: {
        x: [0, 1 / 3, 2 / 3, 0, 1 / 3, 2 / 3],
        y: [0.6, 0.5, 0.8, 0.3, 0.2, 0.3],
        y1: [1, 1, 1, 1, 1, 1],
        series: [0, 0, 0, 1 / 2, 1 / 2, 1 / 2],
      },
    });

    expect(I).toEqual([0, 1, 2, 3, 4, 5]);
    expect(P).toEqual([
      [
        [0, 240],
        [100, 240],
        [100, 400],
        [0, 400],
      ],
      [
        [200, 200],
        [300, 200],
        [300, 400],
        [200, 400],
      ],
      [
        [400, 320],
        [499.99999999999994, 320],
        [499.99999999999994, 400],
        [400, 400],
      ],
      [
        [100, 120],
        [200, 120],
        [200, 400],
        [100, 400],
      ],
      [
        [300, 80],
        [400, 80],
        [400, 400],
        [300, 400],
      ],
      [
        [499.99999999999994, 120],
        [599.9999999999999, 120],
        [599.9999999999999, 400],
        [499.99999999999994, 400],
      ],
    ]);
  });
});
