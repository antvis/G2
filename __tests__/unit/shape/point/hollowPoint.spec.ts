import { HollowPoint } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('HollowPoint', () => {
  it('HollowPoint has expected defaults', () => {
    expect(HollowPoint.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('HollowPoint() returns a function draw point using color as fill', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: HollowPoint({}),
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
    expect(style(shape, ['stroke', 'lineWidth'])).toEqual({
      stroke: 'steelblue',
      lineWidth: 1,
    });
  });

  it('HollowPoint({...}) returns a function draw point with custom style', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: HollowPoint({ stroke: 'red' }),
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
    expect(style(shape, ['stroke'])).toEqual({
      stroke: 'red',
    });
  });
});
