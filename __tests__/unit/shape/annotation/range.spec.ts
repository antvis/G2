import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';
import { Polar, Transpose } from '../../../../src/coordinate';
import { AnnotationRange } from '../../../../src/shape';

describe('AnnotationRange', () => {
  it('AnnotationRange has expected defaults', () => {
    expect(AnnotationRange.props).toEqual({
      defaultEnterAnimation: 'scaleInY',
    });
  });

  it('AnnotationRange() returns a function draw rect in cartesian coordinate using color as stroke', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: AnnotationRange({}),
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

    expect(shape.nodeName).toBe('rect');
    expect(style(shape, ['x', 'y', 'width', 'height', 'fill'])).toEqual({
      fill: 'steelblue',
      height: 400,
      width: 120,
      // G will convert "" to 0
      x: '',
      y: '',
    });
  });

  it('AnnotationRange() returns a function drawing path in transpose', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: AnnotationRange({}),
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
      x: '',
      y: '',
    });
  });

  it('AnnotationRange() returns a function drawing rect with negative width and height', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: AnnotationRange({}),
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
      x: '',
      y: '',
    });
  });

  it('AnnotationRange() returns a function drawing sector in Polar', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: AnnotationRange({}),
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
});
