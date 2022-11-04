import { Coordinate } from '@antv/coord';
import { DisplayObject } from '@antv/g';
import { Badge } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('Badge shape', () => {
  it('Badge has expected defaults', () => {
    expect(Badge.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('Badge() returns a function draw CustomElement', () => {
    const shape = Badge({})([[0, 0]], {}, new Coordinate(), {
      defaultColor: 'red',
    });
    expect(shape.style.fill).toBe('red');
  });

  it('Badge() returns a function draw badgeAnnotation with text, default using color as fill', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 50,
      shape: Badge({}),
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
    const textShape = shape.getElementById('text') as DisplayObject;
    expect(textShape?.style.text).toEqual('hello');
    expect(textShape?.style.fill).toEqual('steelblue');
    const badgeMarker = shape.getElementById('marker') as DisplayObject;
    expect(badgeMarker?.style.symbol).toBeInstanceOf(Function);
  });

  it('Badge() returns a function draw badgeAnnotation contains text and support custom style.', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 100,
      shape: Badge({
        stroke: 'steelblue',
        text: 'Top',
        fill: '#fff',
        fontSize: 10,
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    const textShape = shape.getElementById('text') as DisplayObject;
    expect(textShape?.style.fill).toBe('#fff');
    expect(textShape?.style.fontSize).toBe(10);
  });

  it('Badge() returns a function draw badge annotation, with built-in marker.', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 100,
      shape: Badge({ markerSize: 12 }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    const badgeMarker = shape.getElementById('marker') as DisplayObject;
    expect(badgeMarker?.getBBox().width).toBeCloseTo(12);
    expect(badgeMarker?.getBBox().bottom).toBeCloseTo(50);
  });

  it('Badge() returns a function draw badge annotation, enable custom marker symbol', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 100,
      shape: Badge({
        markerSymbol: 'triangle',
        markerSize: 12,
        markerStroke: 'red',
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    const badgeMarker = shape.getElementById('marker');
    expect(badgeMarker?.style.symbol).toBe('triangle');
    expect(badgeMarker?.style.size).toBe(12);
    expect(badgeMarker?.style.stroke).toBe('red');
  });
});
