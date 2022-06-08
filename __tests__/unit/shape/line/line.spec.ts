import { Line } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';
import { Polar } from '../../../../src/coordinate';

describe('Line', () => {
  it('Line has expected defaults', () => {
    expect(Line.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('Line() returns a function draw line in cartesian coordinate using color as stroke', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: Line(),
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
      path: 'M0,0L120,200L240,80L360,160',
    });
  });

  it('Line() returns a function draw line with custom styles', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: Line({ stroke: 'red' }),
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
      stroke: 'red',
      path: 'M0,0L120,200L240,80L360,160',
    });
  });

  it('Line() returns a function draw closed line in polar coordinate', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: Line(),
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
      transform: [Polar({})],
    });
    mount(createDiv(), container);

    expect(style(shape, ['path'])).toEqual({
      path: 'M300,0L395.10565162951536,169.09830056250524L394.0456403667957,329.4427190999916L229.46576972490323,297.0820393249937L300,0',
    });
  });
});
