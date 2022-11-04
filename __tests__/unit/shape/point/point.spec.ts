import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';
import { Point } from '@/shape';

describe('Point', () => {
  it('Point has expected defaults', () => {
    expect(Point.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('Point() returns a function draw point using color as fill', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: Point({}),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0.2, 0.2],
        [0.5, 0.5],
      ],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('path');
    expect(style(shape, ['fill', 'lineWidth'])).toEqual({
      fill: 'steelblue',
      lineWidth: '',
    });
  });

  it('Point({...}) returns a function draw point with custom style', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: Point({ fill: 'red' }),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0.2, 0.2],
        [0.5, 0.5],
      ],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('path');
    expect(style(shape, ['fill'])).toEqual({
      fill: 'red',
    });
  });
});
