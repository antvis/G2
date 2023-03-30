import { Chart } from '../../../src';
import { G2Mark } from '../../../src/runtime';
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
  Pack,
  ForceGraph,
  Tree,
  WordCloud,
  Gauge,
  Progress,
} from '../../../src/api/mark/mark';

type Mark =
  | Area
  | Interval
  | Point
  | Cell
  | Vector
  | Link
  | Polygon
  | Image
  | Text
  | Box
  | Connector
  | LineX
  | LineY
  | Range
  | RangeX
  | RangeY
  | Shape;

function setOptions(node: Mark) {
  return node
    .data([1, 2, 3])
    .encode('x', 'name')
    .scale('x', { domain: [0, 1] })
    .transform({ type: 'stackY' })
    .style('stroke', 'black')
    .animate('enter', { type: 'scaleInX' })
    .attr('facet', true)
    .attr('key', 'mark')
    .attr('class', 'mark')
    .attr('padding', 0)
    .attr('paddingBottom', 10)
    .attr('paddingLeft', 20)
    .attr('paddingTop', 30)
    .attr('paddingRight', 40)
    .attr('margin', 0)
    .attr('marginBottom', 10)
    .attr('marginLeft', 20)
    .attr('marginTop', 30)
    .attr('marginRight', 40)
    .attr('inset', 0)
    .attr('insetBottom', 10)
    .attr('insetLeft', 20)
    .attr('insetTop', 30)
    .attr('insetRight', 40)
    .axis(false)
    .axis('x', { tickCount: 10 })
    .legend('color', { title: 'hello' })
    .tooltip('a')
    .tooltip('b')
    .slider('x', {})
    .scrollbar('x', {})
    .label({ text: 'hello' })
    .coordinate({ type: 'polar' })
    .interaction('tooltip')
    .state('active', { fill: 'red' })
    .state('inactive', { fill: 'blue' });
}

// @todo Fix type errors.
function setCompositeOptions(node) {
  return node.call(setOptions);
}

function setOptions2(node: Mark) {
  return node.tooltip(false);
}

function setLayoutOptions(node) {
  return node.call(setOptions).layout({
    a: 10,
    b: 8,
  });
}

function getOptions() {
  return {
    data: [1, 2, 3],
    encode: { x: 'name' },
    scale: { x: { domain: [0, 1] } },
    transform: [{ type: 'stackY' }],
    style: { stroke: 'black' },
    animate: { enter: { type: 'scaleInX' } },
    axis: { x: { tickCount: 10 } },
    legend: { color: { title: 'hello' } },
    slider: { x: {} },
    scrollbar: { x: {} },
    facet: true,
    key: 'mark',
    class: 'mark',
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
    coordinate: { type: 'polar' },
    interaction: { tooltip: true },
    state: {
      active: { fill: 'red' },
      inactive: { fill: 'blue' },
    },
    tooltip: { items: ['a', 'b'] },
  };
}

function getOptions2() {
  return {
    ...getOptions(),
    tooltip: false,
  };
}

function getLayoutOptions() {
  return {
    ...getOptions(),
    layout: {
      a: 10,
      b: 8,
    },
  };
}

describe('mark.get[Instance]()', () => {
  let view;
  let interval;

  beforeAll(async () => {
    const chart = new Chart({ theme: 'classic', key: '$$chart$$' });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    interval = chart
      .interval()
      .attr('key', 'interval')
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    await chart.render();

    view = chart.getView();
  });

  it('mark.getScale() should return scale instances', () => {
    expect(interval.getScale()).toEqual(view?.scale);
  });

  it('mark.getGroup() should return group', () => {
    expect(interval.getGroup().id).toEqual(interval.attr('key'));
  });

  it('mark.getScaleByChannel(channel) should return scale instance', () => {
    expect(interval.getScaleByChannel('x')).toEqual(view?.scale['x']);
  });

  it('mark.getMark() should return mark instance', () => {
    const markKey = Array.from(view.markState.keys()).find(
      // @ts-ignore
      (item) => item.key === interval.attr('key'),
    ) as G2Mark;
    expect(interval.getMark()).toEqual(view?.markState.get(markKey));
  });
});

describe('mark.[node]()', () => {
  it('Interval() should specify options by API', () => {
    const node = new Interval();
    expect(node.type).toBe('interval');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Point() should specify options by API', () => {
    const node = new Point();
    expect(node.type).toBe('point');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Area() should specify options by API', () => {
    const node = new Area();
    expect(node.type).toBe('area');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Cell() should specify options by API', () => {
    const node = new Cell();
    expect(node.type).toBe('cell');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Vector() should specify options by API', () => {
    const node = new Vector();
    expect(node.type).toBe('vector');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Link() should specify options by API', () => {
    const node = new Link();
    expect(node.type).toBe('link');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Polygon() should specify options by API', () => {
    const node = new Polygon();
    expect(node.type).toBe('polygon');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Image() should specify options by API', () => {
    const node = new Image();
    expect(node.type).toBe('image');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Text() should specify options by API', () => {
    const node = new Text();
    expect(node.type).toBe('text');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Box() should specify options by API', () => {
    const node = new Box();
    expect(node.type).toBe('box');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Connector() should specify options by API', () => {
    const node = new Connector();
    expect(node.type).toBe('connector');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Range() should specify options by API', () => {
    const node = new Range();
    expect(node.type).toBe('range');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('RangeX() should specify options by API', () => {
    const node = new RangeX();
    expect(node.type).toBe('rangeX');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('RangeY() should specify options by API', () => {
    const node = new RangeY();
    expect(node.type).toBe('rangeY');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('LineX() should specify options by API', () => {
    const node = new LineX();
    expect(node.type).toBe('lineX');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('LineY() should specify options by API', () => {
    const node = new LineY();
    expect(node.type).toBe('lineY');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Shape() should specify options by API', () => {
    const node = new Shape();
    expect(node.type).toBe('shape');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('Boxplot() should specify options by API', () => {
    const node = new Boxplot();
    expect(node.type).toBe('boxplot');
    expect(setCompositeOptions(node).value).toEqual(getOptions());
  });

  it('Sankey() should specify options by API', () => {
    const node = new Sankey();
    expect(node.type).toBe('sankey');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('Treemap() should specify options by API', () => {
    const node = new Treemap();
    expect(node.type).toBe('treemap');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('Pack() should specify options by API', () => {
    const node = new Pack();
    expect(node.type).toBe('pack');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('ForceGraph() should specify options by API', () => {
    const node = new ForceGraph();
    expect(node.type).toBe('forceGraph');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('Tree() should specify options by API', () => {
    const node = new Tree();
    expect(node.type).toBe('tree');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('WordCloud() should specify options by API', () => {
    const node = new WordCloud();
    expect(node.type).toBe('wordCloud');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('Gauge() should specify options by API', () => {
    const node = new Gauge();
    expect(node.type).toBe('gauge');
    expect(setCompositeOptions(node).value).toEqual(getOptions());
  });

  it('Progress() should specify options by API', () => {
    const node = new Progress();
    expect(node.type).toBe('progress');
    expect(setCompositeOptions(node).value).toEqual(getOptions());
  });
});
