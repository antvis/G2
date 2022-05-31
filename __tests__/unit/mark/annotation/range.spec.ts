import { Range } from '../../../../src/mark/annotation/range';

describe('Range annotation', () => {
  it('Range has expected props', () => {
    expect(Range.props).toEqual({
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
        { name: 'y', required: true },
      ],
      preInference: [
        { type: 'maybeArrayField' },
        { type: 'maybeZeroY1' },
        { type: 'maybeZeroX' },
      ],
      postInference: [{ type: 'maybeKey' }],
      shapes: ['annotation.range'],
    });
  });
});
