import { Smooth } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('Smooth', () => {
  it('Smooth has expected defaults', () => {
    expect(Smooth.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('Smooth() returns a function draw curve line in cartesian coordinate using color as stroke', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: Smooth({}),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0],
        [0.2, 0.5],
        [0.4, 0.2],
        [0.6, 0.4],
      ],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('path');
    expect(style(shape, ['stroke', 'path'])).toEqual({
      stroke: 'steelblue',
      path: 'M0,0C0,0,76.27987544037975,194.6178067140059,120,200C157.29321179415848,204.59100416921183,198.23595244227917,84.13545567483145,240,80C278.50084784671265,76.1876647733087,360,160,360,160',
    });
  });

  it('Smooth() returns a function draw curve line with specified alpha', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: Smooth({ alpha: 0 }),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0],
        [0.2, 0.5],
        [0.4, 0.2],
        [0.6, 0.4],
      ],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('path');
    expect(style(shape, ['stroke', 'path'])).toEqual({
      stroke: 'steelblue',
      path: 'M0,0C0,0,80,186.66666666666666,120,200C160,213.33333333333334,200,86.66666666666667,240,80C280,73.33333333333333,360,160,360,160',
    });
  });
});
