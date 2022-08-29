import { Linear } from '../../../../src/scale';
import { RangeY } from '../../../../src/mark/annotation/rangeY';
import { plot } from '../helper';

describe('RangeY annotation', () => {
  it('RangeY has expected props', () => {
    expect(RangeY.props).toEqual({
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
        { name: 'y', required: true },
      ],
      preInference: [],
      postInference: [{ type: 'maybeKey' }],
      shapes: ['annotation.range'],
    });
  });

  it('RangeY should draw range annotation in x direction', () => {
    const [I, P] = plot({
      mark: RangeY({}),
      index: [0],
      scale: {
        y: Linear({
          domain: [0, 1],
          range: [0, 1],
        }),
      },
      channel: {
        y: [0.2],
        y1: [0.5],
      },
    });
    expect(I).toEqual([0]);
    expect(P).toEqual([
      [
        [0, 80],
        [600, 80],
        [600, 200],
        [0, 200],
      ],
    ]);
  });
});
