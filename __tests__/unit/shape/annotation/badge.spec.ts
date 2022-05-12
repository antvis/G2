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

  it('AnnotationBadge() returns a function draw badgeAnnotation with text, default using color as fill', () => {
    const container = document.createElement('div');
    const shape = draw({
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

  it('AnnotationBadge() returns a function draw badgeAnnotation contains text and support custom style.', () => {
    const container = document.createElement('div');
    const shape = draw({
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

  it('AnnotationBadge() returns a function draw badge annotation, enable change position', () => {
    const container = document.createElement('div');
    const shape = draw({
      width: 150,
      height: 100,
      shape: AnnotationBadge({
        position: 'top-right',
      }),
      container,
      value: {
        text: 'hello',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);
    const badgeMarker = shape.querySelector('.badge-marker') as any;
    let bbox = badgeMarker.getBounds();
    expect(bbox.max[0]).not.toBeLessThan(75);
    expect(bbox.max[1]).toBe(50);

    shape.style.position = 'top-left';
    expect(badgeMarker.getBounds().max[0]).not.toBeGreaterThan(75);

    shape.style.position = 'top';
    bbox = badgeMarker.getBounds();
    expect((bbox.min[0] + bbox.max[0]) / 2).toBeCloseTo(75);
  });

  it('AnnotationBadge() returns a function draw badge annotation, enable custom marker symbol', () => {
    const container = document.createElement('div');
    const shape = draw({
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
