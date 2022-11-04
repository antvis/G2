import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';
import { Polar, Transpose } from '@/coordinate';
import { Rect } from '@/shape';

describe('Rect', () => {
  it('Rect() returns a function drawing rect in cartesian using color as fill', async () => {
    const container = document.createElement('div');
    const shape = await draw({
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

  it('Rect() returns a function drawing rect with negative width and height', async () => {
    const container = document.createElement('div');
    const shape = await draw({
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

  it('Rect() returns a function drawing rect in transpose', async () => {
    const container = document.createElement('div');
    const shape = await draw({
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

  it('Rect() returns a function drawing sector in Polar', async () => {
    const container = document.createElement('div');
    const shape = await draw({
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
      path: 'M1.2246467991473532e-14,-200A200,200,0,0,1,190.2113032590307,-61.803398874989476L0,0Z',
    });
  });

  it('Rect() returns a function drawing nothing in Polar with angle equals to 0', async () => {
    const container = document.createElement('div');
    const shape = await draw({
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
      path: 'M190.2113032590307,-61.803398874989476L0,0Z',
    });
  });

  it('Rect() returns a function drawing ring in Polar with angle equals to Math.PI * 2', async () => {
    const container = document.createElement('div');
    const shape = await draw({
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
      path: 'M9.797174393178826e-15,-160A160,160,0,1,1,-9.797174393178826e-15,160A160,160,0,1,1,9.797174393178826e-15,-160M-2.3513218543629186e-14,-128.00000000000003A128.00000000000003,128.00000000000003,0,1,0,2.3513218543629186e-14,128.00000000000003A128.00000000000003,128.00000000000003,0,1,0,-2.3513218543629186e-14,-128.00000000000003Z',
    });
  });

  it('ShapesRect() returns a function enabling drawing rect with radius corner', async () => {
    const container = document.createElement('div');
    const shape = await draw({
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

  it('Rect() returns a function enabling drawing sector with radius in Polar', async () => {
    const container = document.createElement('div');
    const shape = await draw({
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
      path: 'M1.0658141036401503e-14,-178.88543819998318A20,20,0,0,1,22.222222222222236,-198.76159799998132A200,200,0,0,1,182.1664686476767,-82.55530086211921A20,20,0,0,1,170.13016167040797,-55.27864045000422L53.799880957116585,-17.480640977952845A20,20,0,0,1,31.746360713078428,-24.334514202570613A40,40,0,0,0,13.33333333333333,-37.712361663282536A20,20,0,0,1,3.552713678800501e-15,-56.568542494923804Z',
    });
  });
});
