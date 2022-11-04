import { IAnimation, Rect } from '@antv/g';
import { mount, createDiv } from '../../utils/dom';
import { applyAnimation, keyframes, timing } from './helper';
import { Polar } from '@/coordinate';
import { WaveIn } from '@/animation';

describe('WaveIn', () => {
  it('WaveIn(options) should take options as priority among options, style and theme', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const shape = new Rect({
      style: {
        x: 0,
        y: 0,
        width: 50,
        height: 200,
        fill: 'red',
      },
    });
    // @ts-ignore
    shape.__data__ = {
      points: [
        [50, 0],
        [50, 0],
        [50, 200],
        [50, 200],
      ],
      y: 0,
      y1: 0,
    };

    const [, animation] = await applyAnimation({
      shape: shape,
      transform: [Polar({})],
      animate: WaveIn({ duration: 300 }),
      defaults: { duration: 200 },
      value: { duration: 100 },
      container,
    });
    await (animation as IAnimation).finished;

    expect(timing(animation, 'duration')).toBe(300);
  });

  it('WaveIn({...}) should take style as priority among style and theme', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const shape = new Rect({
      style: {
        x: 0,
        y: 0,
        width: 50,
        height: 200,
        fill: 'red',
      },
    });
    // @ts-ignore
    shape.__data__ = {
      points: [
        [50, 0],
        [50, 0],
        [50, 200],
        [50, 200],
      ],
      y: 0,
      y1: 0,
    };

    const [, animation] = await applyAnimation({
      shape: shape,
      transform: [Polar({})],
      animate: WaveIn({}),
      defaults: { duration: 200 },
      value: { duration: 100 },
      container,
    });
    await (animation as IAnimation).finished;

    expect(timing(animation, 'duration')).toBe(100);
  });

  it('WaveIn({...}) should use theme as default effect timing', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = new Rect({
      style: {
        x: 0,
        y: 0,
        width: 50,
        height: 200,
        fill: 'red',
      },
    });
    // @ts-ignore
    shape.__data__ = {
      points: [
        [50, 0],
        [50, 0],
        [50, 200],
        [50, 200],
      ],
      y: 0,
      y1: 0,
    };
    const [, animation] = await applyAnimation({
      shape: shape,
      transform: [Polar({})],
      animate: WaveIn({}),
      defaults: { duration: 200 },
      container,
    });
    await (animation as IAnimation).finished;

    expect(timing(animation, 'duration')).toBe(200);
  });

  it('WaveIn({...}) test a no polar shape condition', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = new Rect({
      style: {
        x: 0,
        y: 0,
        width: 50,
        height: 200,
        fill: 'red',
      },
    });
    // @ts-ignore
    shape.__data__ = {
      points: [
        [50, 0],
        [50, 0],
        [50, 200],
        [50, 200],
      ],
      y: 0,
      y1: 0,
    };
    const [, animation] = await applyAnimation({
      shape: shape,
      animate: WaveIn({}),
      defaults: { duration: 200 },
      container,
    });
    await (animation as IAnimation).finished;

    expect(timing(animation, 'duration')).toBe(200);
  });
});
