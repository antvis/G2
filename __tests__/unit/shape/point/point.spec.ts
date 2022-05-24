import { Point } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('Point', () => {
  it('Point has expected defaults', () => {
    expect(Point.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('Point() returns a function draw point using color as fill', () => {
    const container = document.createElement('div');
    const shape = draw({
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

    expect(shape.nodeName).toBe('marker');
    expect(style(shape, ['fill', 'size', 'lineWidth'])).toEqual({
      fill: 'steelblue',
      size: 75,
      lineWidth: null,
    });
  });

  it('Point({...}) returns a function draw point with custom style', () => {
    const container = document.createElement('div');
    const shape = draw({
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

    expect(shape.nodeName).toBe('marker');
    expect(style(shape, ['fill'])).toEqual({
      fill: 'red',
    });
  });
});
