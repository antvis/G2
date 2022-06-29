import { Rect } from '@antv/g';
import { FadeOut } from '../../../src/animation';
import { Transpose } from '../../../src/coordinate';
import { mount, createDiv } from '../../utils/dom';
import { applyAnimation, keyframes, timing } from './helper';

describe('FadeOut', () => {
  it('FadeOut({..}) should change attributes related to opacity', async () => {
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
      animate: FadeOut({ fill: 'both', duration: 300 }),
      container,
      defaults: {},
    });
    expect(keyframes(animation, 'fillOpacity')).toEqual([0.8, 0]);
    expect(keyframes(animation, 'opacity')).toEqual([0.8, 0]);
    expect(keyframes(animation, 'strokeOpacity')).toEqual([0.8, 0]);
  });

  it('FadeOut(options) should take options as priority among options, style and theme', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: FadeOut({ duration: 300 }),
      defaults: { duration: 200 },
      value: { duration: 100 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(300);
  });

  it('FadeOut({...}) should take style as priority among style and theme', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: FadeOut({}),
      defaults: { duration: 200 },
      value: { duration: 100 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(100);
  });

  it('FadeOut({...}) should use theme as default effect timing', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);

    const [, animation] = await applyAnimation({
      shape: new Rect({
        style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
      }),
      transform: [Transpose()],
      animate: FadeOut({}),
      defaults: { duration: 200 },
      container,
    });
    expect(timing(animation, 'duration')).toBe(200);
  });
});
