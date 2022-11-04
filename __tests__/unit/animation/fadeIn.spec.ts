import { Rect } from '@antv/g';
import { mount, createDiv } from '../../utils/dom';
import { applyAnimation, keyframes, timing } from './helper';
import { FadeIn } from '@/animation';
import { Transpose } from '@/coordinate';

describe('FadeIn', () => {
  it('FadeIn({..}) should change attributes related to opacity', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: {
          x: 0,
          y: 0,
          width: 50,
          height: 200,
          fill: 'red',
          fillOpacity: 0.8,
          strokeOpacity: 0.8,
          opacity: 0.8,
        },
      }),
      animate: FadeIn({ fill: 'both', duration: 300 }),
      container,
      defaults: {},
    });
    expect(keyframes(animation, 'fillOpacity')).toEqual([0, 0.8]);
    expect(keyframes(animation, 'opacity')).toEqual([0, 0.8]);
    expect(keyframes(animation, 'strokeOpacity')).toEqual([0, 0.8]);
  });

  it('FadeIn(options) should take options as priority among options, style and theme', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: FadeIn({ duration: 300 }),
      defaults: { duration: 200 },
      value: { duration: 100 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(300);
  });

  it('FadeIn({...}) should take style as priority among style and theme', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: FadeIn({}),
      defaults: { duration: 200 },
      value: { duration: 100 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(100);
  });

  it('FadeIn({...}) should use theme as default effect timing', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: FadeIn({}),
      defaults: { duration: 200 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(200);
  });
});
