import {
  Area,
  Interval,
  Point,
  Cell,
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
  Sankey,
  Treemap,
  Boxplot,
  Shape,
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
    .key('mark')
    .class('mark')
    .coordinate({ type: 'polar' })
    .interaction({ type: 'brush' })
    .padding(0)
    .paddingBottom(10)
    .paddingLeft(20)
    .paddingTop(30)
    .paddingRight(40)
    .margin(0)
    .marginBottom(10)
    .marginLeft(20)
    .marginTop(30)
    .marginRight(40)
    .inset(0)
    .insetBottom(10)
    .insetLeft(20)
    .insetTop(30)
    .insetRight(40)
    .axis('x', { tickCount: 10 })
    .legend('y', { title: 'hello' })
    .label({ text: 'hello' });
}

function setCompositeOptions(node) {
  return node.call(setOptions).layout('a', 10).layout('b', 8);
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
    axis: { x: { tickCount: 10 } },
    legend: { y: { title: 'hello' } },
    facet: true,
    key: 'mark',
    class: 'mark',
    coordinate: [{ type: 'polar' }],
    interaction: [{ type: 'brush' }],
    padding: 0,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingTop: 30,
    paddingRight: 40,
    inset: 0,
    insetBottom: 10,
    insetLeft: 20,
    insetTop: 30,
    insetRight: 40,
    margin: 0,
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 30,
    marginRight: 40,
    labels: [{ text: 'hello' }],
  };
}

function getCompositeOptions() {
  return {
    ...getOptions(),
    layout: {
      a: 10,
      b: 8,
    },
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

  it('Cell() should specify options by API', () => {
    const node = new Cell();
    expect(node.type).toBe('cell');
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

  it('Sankey() should specify options by API', () => {
    const node = new Sankey();
    expect(node.type).toBe('sankey');
    expect(setCompositeOptions(node).value).toEqual(getCompositeOptions());
  });

  it('Treemap() should specify options by API', () => {
    const node = new Treemap();
    expect(node.type).toBe('treemap');
    expect(setCompositeOptions(node).value).toEqual(getCompositeOptions());
  });

  it('Boxplot() should specify options by API', () => {
    const node = new Boxplot();
    expect(node.type).toBe('boxplot');
    expect(setOptions(node).value).toEqual(getOptions());
  });

  it('Shape() should specify options by API', () => {
    const node = new Shape();
    expect(node.type).toBe('shape');
    expect(setOptions(node).value).toEqual(getOptions());
  });
});
