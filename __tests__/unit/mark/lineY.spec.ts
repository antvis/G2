import { plot } from './helper';
import { LineY } from '@/mark/lineY';

describe('Line annotation', () => {
  it('LineY has expected props', () => {
    expect(LineY.props).toEqual({
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
        { name: 'y', required: true },
      ],
      preInference: [{ type: 'maybeTupleY' }],
      postInference: [{ type: 'maybeKey' }],
      shapes: ['line'],
    });
  });

  it('LineY should draw line annotation in x direction', () => {
    const [I, P] = plot({
      mark: LineY({}),
      index: [0],
      channel: {
        y: [0.5, 0.5, 0.5],
      },
    });
    expect(I).toEqual([0]);
    expect(P).toEqual([
      [
        [0, 200],
        [600, 200],
      ],
    ]);
  });

  it('LineY should draw multiple line annotation', () => {
    const [I, P] = plot({
      mark: LineY({}),
      index: [0, 1, 2],
      channel: {
        y: [0.5, 0.2, 0.4],
      },
    });

    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([
      [
        [0, 200],
        [600, 200],
      ],
      [
        [0, 80],
        [600, 80],
      ],
      [
        [0, 160],
        [600, 160],
      ],
    ]);
  });

  it('LineY should throw error without y', () => {
    expect(() =>
      plot({
        mark: LineY({}),
        index: [0, 1, 2],
        channel: {
          x: [[0.5], [0.2], [0.4]],
        },
      }),
    ).toThrowError();
  });
});
