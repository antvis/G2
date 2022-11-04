import { Rect, IAnimation } from '@antv/g';
import { mount, createDiv } from '../../utils/dom';
import { applyAnimation, keyframes, timing } from './helper';
import { ScaleInX } from '@/animation';
import { Transpose } from '@/coordinate';

describe('ScaleInX', () => {
  it('ScaleInX({..}) should change the transform origin and scale', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [shape, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      animate: ScaleInX({ fill: 'both', duration: 300 }),
      container,
    });
    expect(shape.getOrigin()).toEqual(new Float32Array([0, 0, 0]));
    expect(keyframes(animation, 'transform')).toEqual([
      'scale(0.0001, 1)',
      'scale(0.0001, 1)',
      'scale(1, 1)',
    ]);
    expect(keyframes(animation, 'fillOpacity')).toEqual([0, '', '']);
    expect(keyframes(animation, 'strokeOpacity')).toEqual([0, '', '']);
    expect(keyframes(animation, 'opacity')).toEqual([0, '', '']);
    expect(keyframes(animation, 'offset')).toEqual([null, 0.01, null]);

    await (animation as IAnimation).finished;
    expect(shape.getOrigin()).toEqual(new Float32Array([0, 0, 0]));
  });

  it('ScaleInX({...}) should scale in different origin in transpose coordinate', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [shape, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: ScaleInX({ fill: 'both', duration: 300 }),
      container,
    });

    expect(shape.getOrigin()).toEqual(new Float32Array([0, 200, 0]));
    expect(keyframes(animation, 'transform')).toEqual([
      'scale(1, 0.0001)',
      'scale(1, 0.0001)',
      'scale(1, 1)',
    ]);
  });

  it('ScaleInX(options) should take options as priority among options, style and theme', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: ScaleInX({ duration: 300 }),
      defaults: { duration: 200 },
      value: { duration: 100 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(300);
  });

  it('ScaleInX({...}) should take style as priority among style and theme', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: ScaleInX({ duration: undefined }),
      defaults: { duration: 200 },
      value: { duration: 100 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(100);
  });

  it('ScaleInX({...}) should use theme as default effect timing', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: ScaleInX({}),
      defaults: { duration: 200 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(200);
  });
});
