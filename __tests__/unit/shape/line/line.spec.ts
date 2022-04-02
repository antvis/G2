import { Line } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';
import { Polar } from '../../../../src/coordinate';

describe('Line', () => {
  it('Line() returns a function draw line in cartesian coordinate using color as stroke', () => {
    const container = document.createElement('div');
    const shape = draw({
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

  it('Line() returns a function draw line with custom styles', () => {
    const container = document.createElement('div');
    const shape = draw({
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

  it('Line() returns a function draw closed line in polar coordinate', () => {
    const container = document.createElement('div');
    const shape = draw({
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
      path: 'M499.99999999999994,200L330.9016994374947,295.10565162951536L170.55728090000844,294.0456403667957L202.91796067500633,129.46576972490323L499.99999999999994,200',
    });
  });
});
