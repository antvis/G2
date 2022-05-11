import { TextAnnotation } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('TextAnnotation shape', () => {
  it('TextAnnotation has expected defaults', () => {
    expect(TextAnnotation.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('TextAnnotation() returns a function draw CustomElement (textAnnotation)', () => {
    const shape = TextAnnotation({})([[0, 0]], {}, null, {
      defaultColor: 'red',
    });
    expect(shape.style.fill).toBe('red');
  });

  it('TextAnnotation() returns a function draw textAnnotation using color as fill and stroke', () => {
    const container = document.createElement('div');
    const shape = draw({
      width: 150,
      height: 50,
      shape: TextAnnotation({}),
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
    expect(textShape.style.fontSize).toEqual(14);
    expect(style(textShape, ['fill', 'stroke'])).toEqual({
      fill: 'steelblue',
      stroke: 'steelblue',
    });
    expect(shape.childNodes.length).toBe(1);
  });

  it('TextAnnotation() returns a function draw textAnnotation contains connector, background and markerPoints', () => {
    const container = document.createElement('div');
    const shape = draw({
      width: 150,
      height: 100,
      shape: TextAnnotation({
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

  it('TextAnnotation() returns a function draw textAnnotation, enable custom background style.', () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = draw({
      width: 150,
      height: 100,
      shape: TextAnnotation({
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
    const backgroundShape = shape.background;
    expect(backgroundShape.style.fill).toBe('red');
    expect(backgroundShape.getLocalBounds().max[1]).toBe(
      textShape.getLocalBounds().max[1] + 4,
    );

    shape.style.background = null;
    // @ts-ignore
    expect(shape.background).toBeUndefined();
  });

  it('TextAnnotation() returns a function draw textAnnotation, enable custom connector style.', () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = draw({
      width: 150,
      height: 100,
      shape: TextAnnotation({
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
    expect(connectorShape.style.lineDash).toEqual([2, 4]);
    expect(connectorShape.getLocalBounds().max[1]).toBe(0);

    shape.style.connector = null;
    // @ts-ignore
    expect(shape.connector).toBeUndefined();
  });

  it('TextAnnotation() returns a function draw textAnnotation, enable custom startMarker and endMarker style.', () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = draw({
      width: 150,
      height: 100,
      shape: TextAnnotation({
        startMarker: {},
        endMarker: {},
      }),
      container,
      value: {
        text: 'hello',
        rotate: -45,
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
  });
});
