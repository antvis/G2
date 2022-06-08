import { HollowRect } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('HollowRect', () => {
  it('HollowRect() returns a function drawing rect in cartesian using color as stroke', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: HollowRect(),
      container,
      value: {
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
      fill: '',
      lineWidth: 1,
    });
  });

  it('HollowRect() returns a function drawing rect with specified lineWidth', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: HollowRect({ lineWidth: 10, radius: 10 }),
      container,
      value: {
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
      fill: '',
      lineWidth: 10,
    });
  });
});
