import { Band, Identity } from '../../../../src/scale';
import { RangeX } from '../../../../src/mark/annotation/rangeX';
import { plot } from '../helper';

describe('RangeX annotation', () => {
  it('RangeX has expected props', () => {
    expect(RangeX.props).toEqual({
      defaultShape: 'annotation.range',
      channels: [
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay', scaleName: 'enter' },
        { name: 'enterDuration', scaleName: 'enter' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'x', required: true },
      ],
      preInference: [{ type: 'maybeArrayField' }],
      postInference: [{ type: 'maybeKey' }],
      shapes: ['annotation.range'],
    });
  });

  it('RangeX should draw range annotation in y direction', () => {
    const [I, P] = plot({
      mark: RangeX({}),
      index: [0],
      scale: {
        x: Band({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
        }),
      },
      channel: {
        x: [1 / 3],
        x1: [2 / 3],
      },
    });
    expect(I).toEqual([0]);
    expect(P).toEqual([
      [
        [200, 0],
        [600, 0],
        [600, 400],
        [200, 400],
      ],
    ]);
  });

  it('RangeX should draw range annotation with identity scale', () => {
    const [I, P] = plot({
      mark: RangeX({}),
      index: [0],
      scale: {
        x: Identity({
          domain: [0, 1],
          range: [0, 1],
        }),
      },
      channel: {
        x: [0.2],
        x1: [0.5],
      },
    });
    expect(I).toEqual([0]);
    expect(P).toEqual([
      [
        [120, 0],
        [300, 0],
        [300, 400],
        [120, 400],
      ],
    ]);
  });
});
