import { Interval } from '../../../src/geometry';
import { Band } from '../../../src/scale';
import { plot } from './helper';

describe('Interval', () => {
  it('Interval has expected props', () => {
    expect(Interval.props).toEqual({
      defaultShape: 'rect',
      channels: [
        { name: 'x', scale: 'band', required: true },
        { name: 'y', required: true },
        { name: 'series', scale: 'band' },
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
        { type: 'maybeZeroX1' },
        { type: 'maybeZeroY2' },
        { type: 'maybeStackY' },
        { type: 'maybeKey' },
      ],
      shapes: ['rect', 'hollowRect'],
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
        x: [[0], [1 / 3], [2 / 3]],
        y: [
          [0.6, 1],
          [0.4, 1],
          [0.2, 1],
        ],
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
        x: [[0], [1 / 3], [2 / 3], [0], [1 / 3], [2 / 3]],
        y: [
          [0.6, 1],
          [0.5, 1],
          [0.8, 1],
          [0.3, 1],
          [0.2, 1],
          [0.3, 1],
        ],
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
