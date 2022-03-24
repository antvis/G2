import { Rect } from '@antv/g';
import { ScaleInY } from '../../../src/animation';
import { Transpose } from '../../../src/coordinate';
import { mount, createDiv } from '../../utils/dom';
import { applyAnimation, keyframes, style, timing } from './helper';

describe('ScaleInY', () => {
  it('ScaleInY({..}) should change the transform origin and scale', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [shape, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      animate: ScaleInY({ fill: 'both', duration: 300 }),
      container,
    });
    expect(style(shape, 'origin')).toEqual(new Float32Array([0, 200, 0]));
    expect(keyframes(animation, 'transform')).toEqual([
      'scale(1, 0.0001)',
      'scale(1, 1)',
    ]);

    const { onfinish } = animation;
    return new Promise<void>((resolve) => {
      animation.onfinish = (e) => {
        onfinish.call(animation, e);
        expect(style(shape, 'origin')).toEqual(new Float32Array([0, 0, 0]));
        resolve();
      };
    });
  });

  it('ScaleInY({...}) should scale in different origin in transpose coordinate', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [shape, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: ScaleInY({ fill: 'both', duration: 300 }),
      container,
    });

    expect(style(shape, 'origin')).toEqual(new Float32Array([0, 0, 0]));
    expect(keyframes(animation, 'transform')).toEqual([
      'scale(0.0001, 1)',
      'scale(1, 1)',
    ]);
  });

  it('ScaleInY(options) should take options as priority among options, style and theme', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: ScaleInY({ duration: 300 }),
      theme: { enter: { duration: 200 } },
      style: { duration: 100 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(300);
  });

  it('ScaleInY({...}) should take style as priority among style and theme', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: ScaleInY({ duration: undefined }),
      theme: { enter: { duration: 200 } },
      style: { duration: 100 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(100);
  });

  it('ScaleInY({...}) should use theme as default effect timing', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: ScaleInY({}),
      theme: { enter: { duration: 200 } },
      container,
    });
    expect(timing(animation, 'duration')).toBe(200);
  });
});
