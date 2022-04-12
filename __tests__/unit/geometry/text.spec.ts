import { Text } from '../../../src/geometry';
import { plot } from './helper';

describe('Text', () => {
  it('Text should has expected props', () => {
    expect(Text.props).toEqual({
      defaultShape: 'text',
      channels: [
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay' },
        { name: 'enterDuration' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'title', scale: 'identity' },
        { name: 'tooltip', scale: 'identity' },
        { name: 'x', required: true },
        { name: 'y', required: true },
        { name: 'text', required: true, scale: 'identity' },
        { name: 'fontSize' },
        { name: 'rotate' },
      ],
      infer: [
        { type: 'maybeTuple' },
        { type: 'maybeKey' },
        { type: 'maybeTitle' },
        { type: 'maybeTooltip' },
      ],
      shapes: ['text'],
    });
  });

  it('Text should transform values into points of anchor of text', () => {
    const [I, P] = plot({
      mark: Text({}),
      index: [0, 1, 2],
      channel: {
        x: [[0.2], [0.4], [0.6]],
        y: [[0.5], [0.2], [0.4]],
        text: ['a', 'b', 'c'],
      },
    });

    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([[[120, 200]], [[240, 80]], [[360, 160]]]);
  });
});
