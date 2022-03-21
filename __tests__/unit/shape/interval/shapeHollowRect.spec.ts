import { ShapeHollowRect } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('ShapeHollowRect', () => {
  it('ShapeRect() returns a function drawing rect in cartesian using color as stroke', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: ShapeHollowRect(),
      container,
      style: {
        color: 'steelblue',
      },
      vectors: [
        [0.1, 0.1],
        [0.2, 0.1],
        [0.2, 0.9],
        [0.1, 0.9],
      ],
    });
    mount(createDiv(), container);

    expect(style(shape, ['stroke', 'lineWidth', 'fill'])).toEqual({
      stroke: 'steelblue',
      fill: 'transparent',
      lineWidth: 2,
    });
  });

  it('ShapeRect() returns a function drawing rect with specified lineWidth', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: ShapeHollowRect(),
      container,
      style: {
        color: 'steelblue',
        lineWidth: 10,
        radius: 10,
      },
      vectors: [
        [0.1, 0.1],
        [0.2, 0.1],
        [0.2, 0.9],
        [0.1, 0.9],
      ],
    });
    mount(createDiv(), container);

    expect(style(shape, ['stroke', 'lineWidth', 'fill'])).toEqual({
      stroke: 'steelblue',
      fill: 'transparent',
      lineWidth: 10,
    });
  });
});
