import { AnnotationBadge } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('AnnotationBadge shape', () => {
  it('AnnotationBadge has expected defaults', () => {
    expect(AnnotationBadge.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('AnnotationBadge() returns a function draw CustomElement', () => {
    const shape = AnnotationBadge({})([[0, 0]], {}, null, {
      defaultColor: 'red',
    });
    expect(shape.style.fill).toBe('red');
  });

  it('AnnotationBadge() returns a function draw badgeAnnotation with text, default using color as fill', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 50,
      shape: AnnotationBadge({}),
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
    expect(shape.style.text).toEqual('hello');
    const badgeMarker = shape.querySelector('.badge-marker');
    expect(badgeMarker.style.fill).toEqual('steelblue');
    expect(badgeMarker.style.symbol).toBeInstanceOf(Function);
  });

  it('AnnotationBadge() returns a function draw badgeAnnotation contains text and support custom style.', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 100,
      shape: AnnotationBadge({
        stroke: 'steelblue',
        content: 'Top',
        textStyle: { fill: '#fff', fontSize: 10 },
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    expect(shape.querySelector('.badge-marker')!.style.stroke).toBe(
      'steelblue',
    );
    const textShape = shape.querySelector('.badge-text');
    expect(textShape.style.fill).toBe('#fff');
    expect(textShape.style.fontSize).toBe(10);
  });

  it('AnnotationBadge() returns a function draw badge annotation, with built-in marker.', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 100,
      shape: AnnotationBadge({ size: 12 }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    const badgeMarker = shape.querySelector('.badge-marker') as any;
    expect(badgeMarker.style.x).toBe(0);
    expect(badgeMarker.style.y).toBe(0);
    expect(badgeMarker.getBBox().width).toBeCloseTo(12);
    expect(badgeMarker.getBBox().bottom).toBeCloseTo(50);
  });

  it('AnnotationBadge() returns a function draw badge annotation, enable custom marker symbol', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 100,
      shape: AnnotationBadge({
        symbol: 'triangle',
        size: 12,
        stroke: 'red',
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    const badgeMarker = shape.querySelector('.badge-marker');
    expect(badgeMarker.style.symbol).toBe('triangle');
    expect(badgeMarker.style.size).toBe(12);
    expect(badgeMarker.style.stroke).toBe('red');
  });
});
