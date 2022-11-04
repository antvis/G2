import { DisplayObject } from '@antv/g';
import { Text } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('Text shape', () => {
  it('Text has expected defaults', () => {
    expect(Text.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('Text() returns a function draw textAnnotation, using color as fill and stroke', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 50,
      shape: Text({}),
      container,
      value: {
        text: 'hello',
        color: 'steelblue',
        mark: 'text',
        shape: 'text',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('g');
    expect(style(shape, ['x', 'y'])).toEqual({ x: 75, y: 25 });
    const textShape = shape.getElementById('text') as DisplayObject;
    expect(textShape.style.text).toEqual('hello');
    expect(textShape.style.fontSize).toEqual(12);
    expect(style(textShape, ['fill', 'stroke'])).toEqual({
      fill: 'steelblue',
      stroke: 'steelblue',
    });
  });

  it('Text() returns a function draw textAnnotation, contains connector, background and markerPoints', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 100,
      shape: Text({
        connector: true,
        background: true,
        startMarker: true,
        endMarker: true,
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

  it('Text() returns a function draw textAnnotation, enable custom text style includes rotate.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: Text({
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

    const textShape = shape.getElementById('text') as DisplayObject;
    expect(textShape.getEulerAngles()).toBeCloseTo(-45);
    expect(textShape.style.textAlign).toBe('left');
    expect(textShape.style.stroke).toBe('red');
  });

  const bounds = (shape: any) => shape.getLocalBounds();
  it('Text() returns a function draw textAnnotation, enable custom background style.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: Text({
        dx: 6,
        dy: -10,
        connector: true,
        background: true,
        backgroundPadding: [2, 4, 2, 6],
        backgroundFill: 'red',
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });

    const textShape = shape.getElementById('text') as DisplayObject;
    const connectorShape = shape.getElementById('connector') as DisplayObject;
    const background = shape.getElementById('background') as DisplayObject;
    expect(background.style.fill).toBe('red');
    expect(background.style.width).toBe(textShape.getBBox().width + 10);
    expect(background.style.height).toBe(textShape.getBBox().height + 4);
    expect(background.style.zIndex).toBe(-1);
    expect(bounds(background).min[1]).toBe(bounds(textShape).min[1] - 2);
    expect(bounds(background).min[0]).toBe(bounds(textShape).min[0] - 6);
    expect(bounds(background).max[1]).toBe(bounds(connectorShape).min[1]);
  });

  it('Text() returns a function draw text annotation, enable text and background rotate.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: Text({
        background: true,
      }),
      container,
      value: {
        text: 'hello',
        rotate: -45,
      },
      vectors: [[0.5, 0.5]],
    });
    shape.style.backgroundStroke = 'green';
    shape.style.backgroundLineWidth = 1;
    const textShape = shape.getElementById('text') as DisplayObject;
    const background = shape.getElementById('background') as DisplayObject;
    expect(background.getEulerAngles()).toBeCloseTo(-45);
    expect(textShape.getLocalBounds().min[0]).toBeCloseTo(
      background.getLocalBounds().min[0],
    );
    shape.setEulerAngles(0);
    expect(bounds(background).min[0]).toBe(bounds(textShape).min[0]);
  });

  it('Text() returns a function draw textAnnotation, connector path infer by text shape and background.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: Text({
        dx: 24,
        dy: 20,
        textAlign: 'left',
        textBaseline: 'top',
        connector: true,
        connectorStroke: 'green',
        connectorLineDash: [2, 4],
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });

    shape.style.connector = { stroke: 'green', lineDash: [2, 4], lineWidth: 1 };
    const textShape = shape.getElementById('text') as DisplayObject;
    const connectorShape = shape.getElementById('connector') as DisplayObject;
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
  });

  it('Text() returns a function draw textAnnotation, enable custom connector path.', async () => {
    const container = document.createElement('div');
    mount(createDiv(), container);
    const shape = await draw({
      width: 150,
      height: 100,
      shape: Text({
        dx: 24,
        dy: 15,
        textAlign: 'left',
        textBaseline: 'top',
        connector: true,
        connectorPath: [
          ['M', 0, -4],
          ['L', 8, -4],
        ],
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });

    const connector = shape.getElementById('connector') as DisplayObject;
    expect(connector.style.path).toBeDefined();
  });
});
