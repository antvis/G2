import { plot } from './helper';
import { Link } from '@/mark';

describe('Link', () => {
  it('Link has expected props', () => {
    expect(Link.props).toEqual({
      defaultShape: 'link',
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
        { name: 'title', scale: 'identity' },
        { name: 'tooltip', scale: 'identity', independent: true },
        { name: 'x', required: true },
        { name: 'y', required: true },
      ],
      preInference: [{ type: 'maybeIdentityY' }, { type: 'maybeIdentityX' }],
      postInference: [
        { type: 'maybeKey' },
        { type: 'maybeTitleX' },
        { type: 'maybeTooltipY' },
      ],
      shapes: ['link', 'arc', 'vhv', 'smooth'],
    });
  });

  it('Link should draw basic link', () => {
    const [I, P] = plot({
      mark: Link({}),
      index: [0, 1],
      channel: {
        x: [0.1, 0.2],
        x1: [0.9, 0.8],
        y: [0.1, 0.2],
        y1: [0.9, 0.8],
      },
    });

    expect(I).toEqual([0, 1]);
    expect(P).toEqual([
      [
        [60, 40],
        [540, 360],
      ],
      [
        [120, 80],
        [480, 320],
      ],
    ]);
  });
});
