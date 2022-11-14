import { Parallel } from '../../../src/coordinate';
import { Line } from '../../../src/mark';
import { plot } from './helper';

describe('Line', () => {
  it('Line has expected props', () => {
    expect(Line.props).toEqual({
      defaultShape: 'line',
      defaultLabelShape: 'label',
      channels: [
        { name: 'color' },
        { name: 'opacity' },
        { name: 'shape', range: ['line', 'smooth'] },
        { name: 'enterType' },
        { name: 'enterDelay', scaleName: 'enter' },
        { name: 'enterDuration', scaleName: 'enter' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'groupKey', scale: 'identity' },
        { name: 'label', scale: 'identity' },
        { name: 'title', scale: 'identity' },
        { name: 'tooltip', scale: 'identity', independent: true },
        { name: 'x' },
        { name: 'y' },
        { name: 'position', independent: true },
        { name: 'size' },
        { name: 'series', scale: 'identity' },
      ],
      preInference: [{ type: 'maybeSeries' }],
      postInference: [
        { type: 'maybeKey' },
        { type: 'maybeTitleX' },
        { type: 'maybeTooltipY' },
        { type: 'maybeTooltipPosition' },
      ],
    });
  });

  it('Line should draw basic line', () => {
    const [I, P, S] = plot({
      mark: Line({}),
      index: [0, 1, 2],
      channel: {
        x: [0.2, 0.4, 0.6],
        y: [0.5, 0.2, 0.4],
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
    expect(S).toEqual([[0, 1, 2]]);
  });

  it('Line should drawing multiple lines', () => {
    const [I, P, S] = plot({
      mark: Line({}),
      index: [0, 1, 2, 3, 4, 5],
      channel: {
        x: [0.2, 0.4, 0.6, 0.5, 0.2, 0.4],
        y: [0.5, 0.2, 0.4, 0.2, 0.4, 0.6],
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
    expect(S).toEqual([
      [0, 1, 2],
      [3, 4, 5],
    ]);
  });

  it('Line should drawing parallel lines', () => {
    const [I, P] = plot({
      mark: Line({}),
      index: [0, 1, 2],
      channel: {
        position: [0.2, 0.9, 0.3],
        position1: [0.3, 0.5, 0.1],
        position2: [0.9, 0.4, 0.7],
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
          y: [0.5, 0.2, 0.4],
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
          x: [0.5, 0.2, 0.4],
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
