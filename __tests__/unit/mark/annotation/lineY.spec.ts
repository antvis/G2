import { LineY } from '../../../../src/mark/annotation/lineY';
import { plot } from '../../geometry/helper';

describe('Line annotation', () => {
  it('LineY has expected props', () => {
    expect(LineY.props).toEqual({
      defaultShape: 'annotation.line',
      channels: [
        { name: 'enterType' },
        { name: 'enterDelay' },
        { name: 'enterDuration' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'x', required: true },
        { name: 'shape' },
        { name: 'size' },
        { name: 'color' },
      ],
      infer: [{ type: 'maybeTuple' }],
      shapes: ['annotation.line'],
    });
  });

  it('LineY should draw line annotation in y direction', () => {
    const [I, P] = plot({
      mark: LineY({}),
      index: [0],
      channel: {
        x: [[0.5]],
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

  it('LineY should draw multiple line annotation', () => {
    const [I, P] = plot({
      mark: LineY({}),
      index: [0, 1, 2],
      channel: {
        x: [[0.5], [0.2], [0.4]],
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

  it('LineY should throw error without x', () => {
    expect(() =>
      plot({
        mark: LineY({}),
        index: [0, 1, 2],
        channel: {
          y: [[0.5], [0.2], [0.4]],
        },
      }),
    ).toThrowError();
  });
});
