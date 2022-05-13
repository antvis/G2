import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';
import { Polar } from '../../../../src/coordinate';
import { AnnotationLine } from '../../../../src/shape';

describe('AnnotationLine', () => {
  it('AnnotationLine has expected defaults', () => {
    expect(AnnotationLine.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('AnnotationLine() returns a function draw line in cartesian coordinate using color as stroke', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: AnnotationLine({}),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0.5],
        [1, 0.5],
      ],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('path');
    expect(style(shape, ['stroke', 'path'])).toEqual({
      stroke: 'steelblue',
      path: 'M0,200L600,200',
    });
  });

  it('AnnotationLine() returns a function draw line using size', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: AnnotationLine({}),
      container,
      value: {
        size: 4,
      },
      vectors: [
        [0, 0.5],
        [1, 0.5],
      ],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('path');
    expect(shape.style.lineWidth).toBe(4);
  });

  it('AnnotationLine() returns a function draw line with custom styles', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: AnnotationLine({ stroke: 'red' }),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0.5],
        [1, 0.5],
      ],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('path');
    expect(style(shape, ['stroke', 'path'])).toEqual({
      stroke: 'red',
      path: 'M0,200L600,200',
    });
  });

  it('AnnotationLine() returns a function draw arc line in polar coordinate', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: AnnotationLine({}),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0, 0.5],
        [1, 0.5],
      ],
      transform: [Polar({})],
    });
    mount(createDiv(), container);

    expect(style(shape, ['path'])).toEqual({
      path: 'M6.123233995736766e-15,-100A100,100,0,1,1,-6.123233995736766e-15,100A100,100,0,1,1,6.123233995736766e-15,-100M-1.8369701987210297e-14,-100A100,100,0,1,0,1.8369701987210297e-14,100A100,100,0,1,0,-1.8369701987210297e-14,-100Z',
    });
  });
});
