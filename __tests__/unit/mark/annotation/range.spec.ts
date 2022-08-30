import { Band, Identity, Linear } from '../../../../src/scale';
import { Range } from '../../../../src/mark/annotation/range';
import { plot } from '../helper';

describe('Range annotation', () => {
  it('Range has expected props', () => {
    expect(Range.props).toEqual({
      defaultShape: 'annotation.range',
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
        { name: 'x', required: true },
        { name: 'y', required: true },
      ],
      preInference: [],
      postInference: [{ type: 'maybeKey' }],
      shapes: ['annotation.range'],
    });
  });

  it('Range should draw range annotation in y direction', () => {
    const [I, P] = plot({
      mark: Range({}),
      index: [0],
      scale: {
        x: Band({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
        }),
        y: Linear({
          domain: [0, 1],
          range: [0, 1],
        }),
      },
      channel: {
        x: [1 / 3],
        x1: [2 / 3],
        y: [0.2],
        y1: [0.5],
      },
    });
    expect(I).toEqual([0]);
    expect(P).toEqual([
      [
        [200, 80],
        [600, 80],
        [600, 200],
        [200, 200],
      ],
    ]);
  });

  it('Range should draw range annotation in y direction, with Identity scale', () => {
    const [I, P] = plot({
      mark: Range({}),
      index: [0],
      scale: {
        x: Identity({
          domain: [0, 1],
        }),
        y: Linear({
          domain: [0, 1],
          range: [0, 1],
        }),
      },
      channel: {
        x: [0.1],
        x1: [0.3],
        y: [0.2],
        y1: [0],
      },
    });
    expect(I).toEqual([0]);
    expect(P).toEqual([
      [
        [60, 80],
        [180, 80],
        [180, 0],
        [60, 0],
      ],
    ]);
  });
});
