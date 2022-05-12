import { Area } from '../../../src/geometry';
import { plot } from './helper';

describe('Area', () => {
  it('Area has expected props', () => {
    expect(Area.props).toEqual({
      defaultShape: 'area',
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
        { name: 'size' },
        { name: 'series', scale: 'identity' },
      ],
      infer: [
        { type: 'maybeTuple' },
        { type: 'maybeKey' },
        { type: 'maybeTitle' },
        { type: 'maybeTooltip' },
        { type: 'maybeSeries' },
        { type: 'maybeZeroY2' },
        { type: 'maybeStackY' },
      ],
      shapes: ['area', 'smooth'],
    });
  });

  it('Area should draw basic area', () => {
    const [I, P] = plot({
      mark: Area({}),
      index: [0, 1, 2],
      channel: {
        x: [[0.2], [0.4], [0.6]],
        y: [
          [0.5, 0],
          [0.2, 0],
          [0.4, 0],
        ],
      },
    });
    expect(I).toEqual([0]);
    expect(P).toEqual([
      [
        [120, 200],
        [240, 80],
        [360, 160],
        [120, 0],
        [240, 0],
        [360, 0],
      ],
    ]);
  });

  it('Area should drawing multiple areas', () => {
    const [I, P] = plot({
      mark: Area({}),
      index: [0, 1, 2, 3, 4, 5],
      channel: {
        x: [[0.2], [0.4], [0.6], [0.5], [0.2], [0.4]],
        y: [
          [0.5, 0],
          [0.2, 0],
          [0.4, 0],
          [0.2, 0],
          [0.4, 0],
          [0.6, 0],
        ],
        series: ['a', 'a', 'a', 'b', 'b', 'b'],
      },
    });

    expect(I).toEqual([0, 3]);
    expect(P).toEqual([
      [
        [120, 200],
        [240, 80],
        [360, 160],
        [120, 0],
        [240, 0],
        [360, 0],
      ],
      [
        [300, 80],
        [120, 160],
        [240, 240],
        [300, 0],
        [120, 0],
        [240, 0],
      ],
    ]);
  });
});
