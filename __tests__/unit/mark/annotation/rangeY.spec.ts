import { RangeY } from '../../../../src/mark/annotation/rangeY';

describe('RangeY annotation', () => {
  it('RangeY has expected props', () => {
    expect(RangeY.props).toEqual({
      defaultShape: 'annotation.range',
      channels: [
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay', scaleName: 'enter' },
        { name: 'enterDuration', scaleName: 'enter' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'y', required: true },
        { name: 'x' },
      ],
      preInference: [{ type: 'maybeArrayField' }],
      postInference: [{ type: 'maybeKey' }],
      shapes: ['annotation.range'],
    });
  });
});
