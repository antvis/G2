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

  it('AnnotationText() returns a function draw textAnnotation, using color as fill and stroke', async () => {
    const container = document.createElement('div');
    const shape = await draw({
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

  it('AnnotationText() returns a function draw textAnnotation, contains connector, background and markerPoints', async () => {
    const container = document.createElement('div');
    const shape = await draw({
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

  it('AnnotationText() returns a function draw textAnnotation, enable custom text style includes rotate.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: AnnotationText({
        stroke: 'red',
        textAlign: 'left',
      }),
      container,
      value: {
        text: 'hello',
        rotate: -45,
      },
      vectors: [[0.5, 0.5]],
    });

    // @ts-ignore
    const textShape = shape.textShape;
    expect(textShape.getEulerAngles()).toBeCloseTo(-45);
    expect(textShape.style.textAlign).toBe('left');
    expect(textShape.style.stroke).toBe('red');
  });

  const bounds = (shape: any) => shape.getLocalBounds();
  it('AnnotationText() returns a function draw textAnnotation, enable custom background style.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: AnnotationText({
        dx: 6,
        dy: -10,
        connector: {},
        background: {},
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });

    shape.style.background = { padding: [2, 4, 2, 6], fill: 'red' };
    // @ts-ignore
    const textShape = shape.textShape;
    // @ts-ignore
    const connectorShape = shape.connector;
    // @ts-ignore
    const background = shape.background;
    expect(background.style.fill).toBe('red');
    expect(background.style.width).toBe(textShape.getBBox().width + 10);
    expect(background.style.height).toBe(textShape.getBBox().height + 4);
    expect(background.style.zIndex).toBe(-1);
    expect(bounds(background).min[1]).toBe(bounds(textShape).min[1] - 2);
    expect(bounds(background).min[0]).toBe(bounds(textShape).min[0] - 6);
    expect(bounds(background).max[1]).toBe(bounds(connectorShape).min[1]);

    shape.style.background = null;
    // @ts-ignore
    expect(shape.background).toBeUndefined();
  });

  it('AnnotationText() returns a function draw text annotation, enable text and background rotate.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: AnnotationText({
        background: {},
      }),
      container,
      value: {
        text: 'hello',
        rotate: -45,
      },
      vectors: [[0.5, 0.5]],
    });
    shape.style.background = { stroke: 'green', lineWidth: 1 };
    // @ts-ignore
    const textShape = shape.textShape;
    // @ts-ignore
    const background = shape.background;
    expect(background.getEulerAngles()).toBeCloseTo(-45);
    expect(textShape.getLocalBounds().min[0]).toBeCloseTo(
      background.getLocalBounds().min[0],
    );
    shape.setEulerAngles(0);
    expect(bounds(background).min[0]).toBe(bounds(textShape).min[0]);
  });

  it('AnnotationText() returns a function draw textAnnotation, connector path infer by text shape and background.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: AnnotationText({
        dx: 24,
        dy: 20,
        textAlign: 'left',
        textBaseline: 'top',
        connector: {
          fill: 'green',
        },
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });

    expect(shape.childNodes.length).toBe(2);

    shape.style.connector = { stroke: 'green', lineDash: [2, 4], lineWidth: 1 };
    // @ts-ignore
    const textShape = shape.textShape;
    // @ts-ignore
    const connectorShape = shape.connector;
    expect(connectorShape.style.stroke).toBe('green');
    expect(connectorShape.style.path).toEqual([
      ['M', 0, 0],
      ['L', 24, 20],
    ]);
    expect(connectorShape.style.lineDash).toEqual([2, 4]);
    expect(bounds(connectorShape).min[1]).toBe(0);

    shape.style.textAlign = 'right';
    expect(bounds(connectorShape).min[1]).toBe(0);
    expect(connectorShape.style.path[1][2]).toBe(bounds(textShape).min[1]);

    shape.style.textAlign = 'center';
    shape.style.dx = 0;
    expect(connectorShape.style.path).toEqual([
      ['M', 0, 0],
      ['L', 0, 20],
    ]);

    shape.style.background = { padding: [4, 0] };
    expect(connectorShape.style.path[1][2]).toBe(bounds(textShape).min[1] - 4);
    shape.style.connector = null;
    // @ts-ignore
    expect(shape.connector).toBeUndefined();
  });

  it('AnnotationText() returns a function draw textAnnotation, enable custom connector path.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: AnnotationText({
        dx: 24,
        dy: 15,
        textBaseline: 'top',
        connector: {
          path: [
            ['M', 0, -4],
            ['L', 8, -4],
          ],
        },
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });

    expect(shape.childNodes.length).toBe(2);
    // @ts-ignore
    expect(shape.endPoint).toEqual({ x: 8, y: -4 });
    // @ts-ignore
    expect(shape.connector.style.path).toEqual([
      ['M', 0, -4],
      ['L', 8, -4],
    ]);
    expect((shape.childNodes[0] as any).style.x).toBe(8);
    expect((shape.childNodes[0] as any).style.y).toBe(-4);
    expect((shape.childNodes[0] as any).style.textAlign).toBe('left');

    shape.style.connector = {
      path: [
        ['M', 0, 4],
        ['L', -8, 4],
      ],
    };
    expect((shape.childNodes[0] as any).style.x).toBe(-8);
    expect((shape.childNodes[0] as any).style.y).toBe(4);
    expect((shape.childNodes[0] as any).style.textAlign).toBe('right');
  });

  it('AnnotationText() returns a function draw textAnnotation, enable custom startMarker and endMarker style.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: AnnotationText({
        startMarker: { size: 12 },
        endMarker: { size: 20 },
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
    // @ts-ignore
    const endPoint = shape.endMarkerPoint;
    expect(startPoint.style.fill).toBe('red');
    expect(startPoint.getBBox().width).toBe(12);
    expect(endPoint.getBBox().width).toBe(20);
    expect(endPoint.style.fill).toBe('green');

    shape.style.startMarker = null;
    shape.style.endMarker = null;
    // @ts-ignore
    expect(shape.startMarkerPoint).toBeUndefined();
    // @ts-ignore
    expect(shape.endMarkerPoint).toBeUndefined();
  });
});
