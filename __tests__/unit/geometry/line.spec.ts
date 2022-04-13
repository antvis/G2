import { Parallel } from '../../../src/coordinate';
import { Line } from '../../../src/geometry';
import { plot } from './helper';

describe('Line', () => {
  it('Line has expected props', () => {
    expect(Line.props).toEqual({
      defaultShape: 'line',
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
        { name: 'x' },
        { name: 'y' },
        { name: 'position' },
        { name: 'size' },
        { name: 'series', scale: 'identity' },
      ],
      infer: [
        { type: 'maybeTuple' },
        { type: 'maybeKey' },
        { type: 'maybeTitle' },
        { type: 'maybeTooltip' },
        { type: 'maybeSeries' },
        { type: 'maybeSplitPosition' },
      ],
      shapes: ['line', 'smooth'],
    });
  });

  it('Line should draw basic line', () => {
    const [I, P] = plot({
      mark: Line({}),
      index: [0, 1, 2],
      channel: {
        x: [[0.2], [0.4], [0.6]],
        y: [[0.5], [0.2], [0.4]],
      },
    });
    expect(I).toEqual([0]);
    expect(P).toEqual([
      [
        [120, 200],
        [240, 80],
        [360, 160],
      ],
    ]);
  });

  it('Line should drawing multiple lines', () => {
    const [I, P] = plot({
      mark: Line({}),
      index: [0, 1, 2, 3, 4, 5],
      channel: {
        x: [[0.2], [0.4], [0.6], [0.5], [0.2], [0.4]],
        y: [[0.5], [0.2], [0.4], [0.2], [0.4], [0.6]],
        series: ['a', 'a', 'a', 'b', 'b', 'b'],
      },
    });

    expect(I).toEqual([0, 3]);
    expect(P).toEqual([
      [
        [120, 200],
        [240, 80],
        [360, 160],
      ],
      [
        [300, 80],
        [120, 160],
        [240, 240],
      ],
    ]);
  });

  it('Line should drawing parallel lines', () => {
    const [I, P] = plot({
      mark: Line({}),
      index: [0, 1, 2],
      channel: {
        'position[0]': [0.2, 0.9, 0.3],
        'position[1]': [0.3, 0.5, 0.1],
        'position[2]': [0.9, 0.4, 0.7],
      },
      transform: [Parallel()],
    });

    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([
      [
        [0, 80],
        [300, 120],
        [600, 360],
      ],
      [
        [0, 360],
        [300, 200],
        [600, 160],
      ],
      [
        [0, 120],
        [300, 40],
        [600, 280],
      ],
    ]);
  });

  it('Line should throw error without x', () => {
    expect(() =>
      plot({
        mark: Line({}),
        index: [0, 1, 2],
        channel: {
          y: [[0.5], [0.2], [0.4]],
          size: [2, 2, 2],
        },
      }),
    ).toThrowError();
  });

  it('Line should throw error without y', () => {
    expect(() =>
      plot({
        mark: Line({}),
        index: [0, 1, 2],
        channel: {
          x: [[0.5], [0.2], [0.4]],
          size: [2, 2, 2],
        },
      }),
    ).toThrowError();
  });

  it('Line should throw error without position', () => {
    expect(() =>
      plot({
        mark: Line({}),
        index: [0, 1, 2],
        channel: {},
        transform: [Parallel()],
      }),
    ).toThrowError();
  });
});
