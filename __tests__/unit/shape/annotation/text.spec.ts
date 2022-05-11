import { AnnotationText } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('AnnotationText shape', () => {
  it('AnnotationText has expected defaults', () => {
    expect(AnnotationText.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('AnnotationText() returns a function draw CustomElement (textAnnotation)', () => {
    const shape = AnnotationText({})([[0, 0]], {}, null, {
      defaultColor: 'red',
    });
    expect(shape.style.fill).toBe('red');
  });

  it('AnnotationText() returns a function draw textAnnotation using color as fill and stroke', () => {
    const container = document.createElement('div');
    const shape = draw({
      width: 150,
      height: 50,
      shape: AnnotationText({}),
      container,
      value: {
        text: 'hello',
        color: 'steelblue',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('g');
    expect(style(shape, ['x', 'y'])).toEqual({ x: 75, y: 25 });
    // @ts-ignore
    const textShape = shape.textShape;
    expect(textShape.style.text).toEqual('hello');
    expect(textShape.style.fontSize).toEqual(12);
    expect(style(textShape, ['fill', 'stroke'])).toEqual({
      fill: 'steelblue',
      stroke: 'steelblue',
    });
    expect(shape.childNodes.length).toBe(1);
  });

  it('AnnotationText() returns a function draw textAnnotation contains connector, background and markerPoints', () => {
    const container = document.createElement('div');
    const shape = draw({
      width: 150,
      height: 100,
      shape: AnnotationText({
        connector: {},
        background: {},
        startMarker: {},
        endMarker: {},
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    expect(shape.childNodes.length).toBe(5);
  });

  it('AnnotationText() returns a function draw textAnnotation, enable custom text style, includes rotate.', () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = draw({
      width: 150,
      height: 100,
      shape: AnnotationText({}),
      container,
      value: {
        text: 'hello',
        rotate: -45,
      },
      vectors: [[0.5, 0.5]],
    });

    // @ts-ignore
    const textShape = shape.textShape;
    expect(textShape.style.transform).toBe('rotate(-45deg)');
    shape.style.textAlign = 'left';
    expect(textShape.style.textAlign).toBe('left');
  });

  it('AnnotationText() returns a function draw textAnnotation, enable custom background style.', () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = draw({
      width: 150,
      height: 100,
      shape: AnnotationText({
        dx: 6,
        dy: -6.5,
        connector: {},
        background: {
          fill: 'red',
          padding: [2, 4, 4, 6],
          fillOpacity: 0.65,
        },
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });

    shape.style.background = { padding: [2, 4, 4, 6] };
    // @ts-ignore
    const textShape = shape.textShape;
    // @ts-ignore
    const connectorShape = shape.connector;
    // @ts-ignore
    const background = shape.background;
    expect(background.style.fill).toBe('red');
    expect(background.style.width).toBe(textShape.getBBox().width + 10);
    expect(background.style.height).toBe(textShape.getBBox().height + 6);
    expect(background.style.zIndex).toBe(-1);
    expect(background.getLocalBounds().min[1]).toBe(
      textShape.getLocalBounds().min[1] - 2,
    );
    expect(background.getLocalBounds().min[0]).toBe(
      textShape.getLocalBounds().min[0] - 6,
    );
    expect(background.getLocalBounds().min[0]).toBe(
      connectorShape.getLocalBounds().max[0],
    );
    shape.style.background = null;
    // @ts-ignore
    expect(shape.background).toBeUndefined();
  });

  it('AnnotationText() returns a function draw textAnnotation, enable custom connector style.', () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = draw({
      width: 150,
      height: 100,
      shape: AnnotationText({
        connector: {},
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });

    expect(shape.childNodes.length).toBe(2);

    shape.style.connector = { fill: 'green', lineDash: [2, 4] };
    // @ts-ignore
    const connectorShape = shape.connector;
    expect(connectorShape.style.fill).toBe('green');
    expect(connectorShape.style.path).toEqual([
      ['M', 0, 0],
      ['L', 0, -12],
      ['L', 8, -12],
    ]);
    expect(connectorShape.style.lineDash).toEqual([2, 4]);
    expect(connectorShape.getLocalBounds().max[1]).toBe(0);

    shape.style.connector = null;
    // @ts-ignore
    expect(shape.connector).toBeUndefined();
  });

  it('AnnotationText() returns a function draw textAnnotation, enable custom startMarker and endMarker style.', () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = draw({
      width: 150,
      height: 100,
      shape: AnnotationText({
        startMarker: {},
        endMarker: {},
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });

    expect(shape.childNodes.length).toBe(3);

    shape.style.startMarker = { fill: 'red' };
    shape.style.endMarker = { fill: 'green' };
    // @ts-ignore
    const startPoint = shape.startMarkerPoint;
    expect(startPoint.style.fill).toBe('red');
    // @ts-ignore
    expect(shape.endMarkerPoint.style.fill).toBe('green');

    shape.style.startMarker = null;
    shape.style.endMarker = null;
    // @ts-ignore
    expect(shape.startMarkerPoint).toBeUndefined();
    // @ts-ignore
    expect(shape.endMarkerPoint).toBeUndefined();
  });
});
