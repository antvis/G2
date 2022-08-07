import {
  props,
  Area,
  Interval,
  Point,
  Grid,
  Vector,
  Link,
  Polygon,
  Image,
  Text,
  Schema,
  AnnotationText,
  AnnotationBadge,
  AnnotationConnector,
  AnnotationLineX,
  AnnotationLineY,
  AnnotationRange,
  AnnotationRangeX,
  AnnotationRangeY,
} from '../../../src/api/mark';

describe('Interval', () => {
  it('Interval() should have expected defaults', () => {
    const interval = new Interval();
    expect(interval.type).toBe('interval');
  });

  it('Mark should have expected props', () => {
    expect(props).toEqual([
      { name: 'encode', type: 'object' },
      { name: 'scale', type: 'object' },
      { name: 'data', type: 'value' },
      { name: 'key', type: 'value' },
      { name: 'class', type: 'value' },
      { name: 'transform', type: 'array' },
      { name: 'style', type: 'object' },
      { name: 'animate', type: 'object' },
      { name: 'adjust', type: 'object' },
      { name: 'frame', type: 'value' },
      { name: 'facet', type: 'value' },
    ]);
  });

  it('Interval() should specify options by API', () => {
    const node = new Interval()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('interval');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('Point() should specify options by API', () => {
    const node = new Point()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('point');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('Area() should specify options by API', () => {
    const node = new Area()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('area');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('Grid() should specify options by API', () => {
    const grid = new Grid()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(grid.type).toBe('grid');
    expect(grid.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('Vector() should specify options by API', () => {
    const node = new Vector()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('vector');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('Link() should specify options by API', () => {
    const node = new Link()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('link');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('Polygon() should specify options by API', () => {
    const node = new Polygon()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('polygon');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('Image() should specify options by API', () => {
    const node = new Image()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('image');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('Text() should specify options by API', () => {
    const node = new Text()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('text');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('Schema() should specify options by API', () => {
    const node = new Schema()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('schema');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('AnnotationText() should specify options by API', () => {
    const node = new AnnotationText()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('annotation.text');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('AnnotationBadge() should specify options by API', () => {
    const node = new AnnotationBadge()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('annotation.badge');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('AnnotationConnector() should specify options by API', () => {
    const node = new AnnotationConnector()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('annotation.connector');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('AnnotationRange() should specify options by API', () => {
    const node = new AnnotationRange()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('annotation.range');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('AnnotationRangeX() should specify options by API', () => {
    const node = new AnnotationRangeX()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('annotation.rangeX');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('AnnotationRangeY() should specify options by API', () => {
    const node = new AnnotationRangeY()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('annotation.rangeY');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('AnnotationLineX() should specify options by API', () => {
    const node = new AnnotationLineX()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('annotation.lineX');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });

  it('AnnotationLineY() should specify options by API', () => {
    const node = new AnnotationLineY()
      .data([1, 2, 3])
      .encode('x', 'name')
      .scale('x', { domain: [0, 1] })
      .transform({ type: 'stackY' })
      .style('stroke', 'black')
      .animate('enter', { type: 'scaleInX' })
      .adjust('type', 'pack')
      .facet(true)
      .frame(true)
      .key('mark')
      .class('mark');

    expect(node.type).toBe('annotation.lineY');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      encode: { x: 'name' },
      scale: { x: { domain: [0, 1] } },
      transform: [{ type: 'stackY' }],
      style: { stroke: 'black' },
      animate: { enter: { type: 'scaleInX' } },
      adjust: { type: 'pack' },
      frame: true,
      facet: true,
      key: 'mark',
      class: 'mark',
    });
  });
});
