import { Polar, Transpose } from '../../../../src/coordinate';
import { Rect } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('Rect', () => {
  it('Rect() returns a function drawing rect in cartesian using color as fill', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: Rect(),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0],
        [0.2, 0],
        [0.2, 1],
        [0, 1],
      ],
    });
    mount(createDiv(), container);

    expect(style(shape, ['x', 'y', 'width', 'height', 'fill'])).toEqual({
      fill: 'steelblue',
      height: 400,
      width: 120,
      x: 0,
      y: 0,
    });
  });

  it('Rect() returns a function drawing rect with negative width and height', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: Rect(),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0.2, 1],
        [0, 1],
        [0, 0],
        [0.2, 0],
      ],
    });
    mount(createDiv(), container);

    expect(style(shape, ['x', 'y', 'width', 'height', 'fill'])).toEqual({
      fill: 'steelblue',
      height: 400,
      width: 120,
      x: 0,
      y: 0,
    });
  });

  it('Rect() returns a function drawing rect in transpose', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: Rect(),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0],
        [0.2, 0],
        [0.2, 1],
        [0, 1],
      ],
      transform: [Transpose()],
    });
    mount(createDiv(), container);

    expect(style(shape, ['x', 'y', 'width', 'height', 'fill'])).toEqual({
      fill: 'steelblue',
      height: 80,
      width: 600,
      x: 0,
      y: 0,
    });
  });

  it('Rect() returns a function drawing sector in Polar', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: Rect(),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0],
        [0.2, 0],
        [0.2, 1],
        [0, 1],
      ],
      transform: [Polar({})],
    });
    mount(createDiv(), container);

    expect(style(shape, ['path'])).toEqual({
      path: 'M1.2246467991473529e-14,-199.99999999999994A199.99999999999994,199.99999999999994,0,0,1,190.21130325903064,-61.80339887498946L0,0Z',
    });
  });

  it('Rect() returns a function drawing nothing in Polar with angle equals to 0', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: Rect(),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0.2, 0],
        [0.2, 0],
        [0.2, 1],
        [0.2, 1],
      ],
      transform: [Polar({})],
    });
    mount(createDiv(), container);

    expect(style(shape, ['path'])).toEqual({
      path: 'M190.21130325903073,-61.80339887498949L0,0Z',
    });
  });

  it('Rect() returns a function drawing ring in Polar with angle equals to Math.PI * 2', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: Rect({ stroke: 'black', lineWidth: 10 }),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0],
        [1, 0],
        [1, 0.2],
        [0, 0.2],
      ],
      transform: [Polar({ outerRadius: 0.8 })],
    });
    mount(createDiv(), container);

    expect(style(shape, ['path', 'stroke', 'lineWidth'])).toEqual({
      stroke: 'black',
      lineWidth: 10,
      path: 'M9.797174393178823e-15,-159.99999999999994A159.99999999999994,159.99999999999994,0,1,1,-9.797174393178823e-15,159.99999999999994A159.99999999999994,159.99999999999994,0,1,1,9.797174393178823e-15,-159.99999999999994M-2.351321854362918e-14,-128A128,128,0,1,0,2.351321854362918e-14,128A128,128,0,1,0,-2.351321854362918e-14,-128Z',
    });
  });

  it('ShapesRect() returns a function enabling drawing rect with radius corner', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: Rect({ radius: 10 }),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0],
        [0.2, 0],
        [0.2, 1],
        [0, 1],
      ],
    });
    mount(createDiv(), container);
    expect(style(shape, ['radius'])).toEqual({
      radius: 10,
    });
  });

  it('Rect() returns a function enabling drawing sector with radius in Polar', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: Rect({ radius: 20 }),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0],
        [0.2, 0],
        [0.2, 1],
        [0, 1],
      ],
      transform: [Polar({ innerRadius: 0.2 })],
    });
    mount(createDiv(), container);

    expect(style(shape, ['path'])).toEqual({
      path: 'M7.105427357601002e-15,-178.8854381999831A20,20,0,0,1,22.22222222222223,-198.76159799998123A199.99999999999994,199.99999999999994,0,0,1,182.16646864767665,-82.55530086211918A20,20,0,0,1,170.13016167040792,-55.27864045000419L53.79988095711659,-17.48064097795285A20,20,0,0,1,31.746360713078435,-24.334514202570613A40,40,0,0,0,13.33333333333334,-37.712361663282536A20,20,0,0,1,3.552713678800501e-15,-56.5685424949238Z',
    });
  });
});
