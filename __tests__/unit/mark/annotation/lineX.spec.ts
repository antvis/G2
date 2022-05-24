import { LineX } from '../../../../src/mark/annotation/lineX';
import { plot } from '../helper';

describe('Line annotation', () => {
  it('LineX and LineY has expected props', () => {
    expect(LineX.props).toEqual({
      defaultShape: 'annotation.line',
      channels: [
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay', scaleName: 'enter' },
        { name: 'enterDuration', scaleName: 'enter' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'y', required: true },
      ],
      preInference: [{ type: 'maybeArrayField' }],
      postInference: [{ type: 'maybeKey' }],
      shapes: ['annotation.line'],
    });
  });

  it('LineX should draw line annotation in x direction', () => {
    const [I, P] = plot({
      mark: LineX({}),
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

  it('LineX should draw multiple line annotation', () => {
    const [I, P] = plot({
      mark: LineX({}),
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

  it('LineX should throw error without y', () => {
    expect(() =>
      plot({
        mark: LineX({}),
        index: [0, 1, 2],
        channel: {
          x: [[0.5], [0.2], [0.4]],
        },
      }),
    ).toThrowError();
  });
});
