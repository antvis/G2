import {
  Area,
  Interval,
  Point,
  Grid,
  Vector,
  Link,
  Polygon,
  Image,
  Text,
  Box,
  Connector,
  LineX,
  LineY,
  Range,
  RangeX,
  RangeY,
} from '../../../src/api/mark/mark';

function setOptions(node) {
  return node
    .data([1, 2, 3])
    .encode('x', 'name')
    .scale('x', { domain: [0, 1] })
    .transform({ type: 'stackY' })
    .style('stroke', 'black')
    .animate('enter', { type: 'scaleInX' })
    .adjust({ type: 'pack' })
    .facet(true)
    .frame(true)
    .key('mark')
    .class('mark')
    .coordinate({ type: 'polar' })
    .interaction({ type: 'brush' })
    .paddingBottom(10)
    .paddingLeft(20)
    .paddingTop(30)
    .paddingRight(40)
    .label({ text: 'hello' });
}

function getOptions() {
  return {
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
    coordinate: [{ type: 'polar' }],
    interaction: [{ type: 'brush' }],
    paddingBottom: 10,
    paddingLeft: 20,
    paddingTop: 30,
    paddingRight: 40,
    labels: [{ text: 'hello' }],
  };
}

describe('Mark', () => {
  it('Interval() should specify options by API', () => {
    const node = new Interval();
    expect(node.type).toBe('interval');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Point() should specify options by API', () => {
    const node = new Point();
    expect(node.type).toBe('point');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Area() should specify options by API', () => {
    const node = new Area();
    expect(node.type).toBe('area');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Grid() should specify options by API', () => {
    const node = new Grid();
    expect(node.type).toBe('grid');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Vector() should specify options by API', () => {
    const node = new Vector();
    expect(node.type).toBe('vector');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Link() should specify options by API', () => {
    const node = new Link();
    expect(node.type).toBe('link');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Polygon() should specify options by API', () => {
    const node = new Polygon();
    expect(node.type).toBe('polygon');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Image() should specify options by API', () => {
    const node = new Image();
    expect(node.type).toBe('image');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Text() should specify options by API', () => {
    const node = new Text();
    expect(node.type).toBe('text');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Box() should specify options by API', () => {
    const node = new Box();
    expect(node.type).toBe('box');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Connector() should specify options by API', () => {
    const node = new Connector();
    expect(node.type).toBe('connector');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Range() should specify options by API', () => {
    const node = new Range();
    expect(node.type).toBe('range');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('RangeX() should specify options by API', () => {
    const node = new RangeX();
    expect(node.type).toBe('rangeX');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('RangeY() should specify options by API', () => {
    const node = new RangeY();
    expect(node.type).toBe('rangeY');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('LineX() should specify options by API', () => {
    const node = new LineX();
    expect(node.type).toBe('lineX');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('LineY() should specify options by API', () => {
    const node = new LineY();
    expect(node.type).toBe('lineY');
    expect(setOptions(node).value).toEqual(getOptions());
  });
});
