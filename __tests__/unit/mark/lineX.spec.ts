import { LineX } from '../../../src/mark/lineX';
import { plot } from './helper';

describe('Line annotation', () => {
  it('LineX has expected props', () => {
    expect(LineX.props).toEqual({
      defaultShape: 'line',
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
      ],
      preInference: [],
      postInference: [{ type: 'maybeKey' }],
      shapes: ['line'],
    });
  });

  it('LineX should draw line annotation in y direction', () => {
    const [I, P] = plot({
      mark: LineX({}),
      index: [0],
      channel: {
        x: [0.5],
      },
    });
    expect(I).toEqual([0]);
    expect(P).toEqual([
      [
        [300, 400],
        [300, 0],
      ],
    ]);
  });

  it('LineX should draw multiple line annotation', () => {
    const [I, P] = plot({
      mark: LineX({}),
      index: [0, 1, 2],
      channel: {
        x: [0.5, 0.2, 0.4],
      },
    });

    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([
      [
        [300, 400],
        [300, 0],
      ],
      [
        [120, 400],
        [120, 0],
      ],
      [
        [240, 400],
        [240, 0],
      ],
    ]);
  });

  it('LineX should throw error without x', () => {
    expect(() =>
      plot({
        mark: LineX({}),
        index: [0, 1, 2],
        channel: {
          y: [[0.5], [0.2], [0.4]],
        },
      }),
    ).toThrowError();
  });
});
