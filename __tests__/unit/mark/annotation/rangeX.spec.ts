import { RangeX } from '../../../../src/mark/annotation/rangeX';

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
        { name: 'y' },
      ],
      preInference: [{ type: 'maybeArrayField' }],
      postInference: [{ type: 'maybeKey' }],
      shapes: ['annotation.range'],
    });
  });
});
