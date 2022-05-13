import { Image } from '../../../src/mark/geometry';
import { plot } from './helper';

describe('Image', () => {
  it('Image has expected props', () => {
    expect(Image.props).toEqual({
      defaultShape: 'image',
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
        { name: 'src', required: true, scale: 'identity' },
        { name: 'size' },
      ],
      infer: [
        { type: 'maybeTuple' },
        { type: 'maybeKey' },
        { type: 'maybeTitle' },
        { type: 'maybeTooltip' },
      ],
      shapes: ['image'],
    });
  });

  it('Image should draw basic image', () => {
    const [I, P] = plot({
      mark: Image({}),
      index: [0, 1, 2],
      channel: {
        x: [[0.2], [0.4], [0.6]],
        y: [[0.5], [0.2], [0.4]],
        size: [3, 3, 3],
      },
    });

    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([[[120, 200]], [[240, 80]], [[360, 160]]]);
  });
});
