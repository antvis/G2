import { Chart, MarkNode } from '../../../src';
import { G2Mark } from '../../../src/runtime';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';

function setOptions(node: MarkNode) {
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

function setCompositeOptions(node: MarkNode) {
  return node.call(setOptions);
}

function setOptions2(node: MarkNode) {
  return node.tooltip(false);
}

function setLayoutOptions(node: MarkNode) {
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

function setAxisOptions(node: MarkNode): MarkNode {
  return node
    .scale('x', { type: 'linear' })
    .transform({ type: 'stackY' })
    .style('gridFill', 'red')
    .state('active', { gridFill: 'red' })
    .attr('labelFormatter', '~s');
}

function getAxisOptions() {
  return {
    scale: { x: { type: 'linear' } },
    transform: [{ type: 'stackY' }],
    style: { gridFill: 'red' },
    state: { active: { gridFill: 'red' } },
    labelFormatter: '~s',
  };
}

describe('mark.get[Instance]()', () => {
  let view;
  let interval;

  beforeAll(async () => {
    const chart = new Chart({
      key: '$$chart$$',
      canvas: createNodeGCanvas(640, 480),
    });

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
  const chart = new Chart({
    canvas: createNodeGCanvas(640, 480),
  });
  it('chart.interval() should specify options by API', () => {
    const node = chart.interval();
    expect(node.type).toBe('interval');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.point() should specify options by API', () => {
    const node = chart.point();
    expect(node.type).toBe('point');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.area() should specify options by API', () => {
    const node = chart.area();
    expect(node.type).toBe('area');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.cell() should specify options by API', () => {
    const node = chart.cell();
    expect(node.type).toBe('cell');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.vector() should specify options by API', () => {
    const node = chart.vector();
    expect(node.type).toBe('vector');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.link() should specify options by API', () => {
    const node = chart.link();
    expect(node.type).toBe('link');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.polygon() should specify options by API', () => {
    const node = chart.polygon();
    expect(node.type).toBe('polygon');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.image() should specify options by API', () => {
    const node = chart.image();
    expect(node.type).toBe('image');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.text() should specify options by API', () => {
    const node = chart.text();
    expect(node.type).toBe('text');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.box() should specify options by API', () => {
    const node = chart.box();
    expect(node.type).toBe('box');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.connector() should specify options by API', () => {
    const node = chart.connector();
    expect(node.type).toBe('connector');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.range() should specify options by API', () => {
    const node = chart.range();
    expect(node.type).toBe('range');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.rangeX() should specify options by API', () => {
    const node = chart.rangeX();
    expect(node.type).toBe('rangeX');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.rangeY() should specify options by API', () => {
    const node = chart.rangeY();
    expect(node.type).toBe('rangeY');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.lineX() should specify options by API', () => {
    const node = chart.lineX();
    expect(node.type).toBe('lineX');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.lineY() should specify options by API', () => {
    const node = chart.lineY();
    expect(node.type).toBe('lineY');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.shape() should specify options by API', () => {
    const node = chart.shape();
    expect(node.type).toBe('shape');
    expect(setOptions(node).value).toEqual(getOptions());
    expect(setOptions2(node).value).toEqual(getOptions2());
  });

  it('chart.boxplot() should specify options by API', () => {
    const node = chart.boxplot();
    expect(node.type).toBe('boxplot');
    expect(setCompositeOptions(node).value).toEqual(getOptions());
  });

  it('chart.sankey() should specify options by API', () => {
    const node = chart.sankey();
    expect(node.type).toBe('sankey');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('treemap() should specify options by API', () => {
    const node = chart.treemap();
    expect(node.type).toBe('treemap');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('chart.pack() should specify options by API', () => {
    const node = chart.pack();
    expect(node.type).toBe('pack');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('chart.forceGraph() should specify options by API', () => {
    const node = chart.forceGraph();
    expect(node.type).toBe('forceGraph');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('chart.tree() should specify options by API', () => {
    const node = chart.tree();
    expect(node.type).toBe('tree');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('chart.wordCloud() should specify options by API', () => {
    const node = chart.wordCloud();
    expect(node.type).toBe('wordCloud');
    expect(setLayoutOptions(node).value).toEqual(getLayoutOptions());
  });

  it('chart.gauge() should specify options by API', () => {
    const node = chart.gauge();
    expect(node.type).toBe('gauge');
    expect(setCompositeOptions(node).value).toEqual(getOptions());
  });

  it('chart.liquid() should specify options by API', () => {
    const node = chart.liquid();
    expect(node.type).toBe('liquid');
    expect(setCompositeOptions(node).value).toEqual(getOptions());
  });

  it('chart.axisX() should specify options by API', () => {
    const node = chart.axisX();
    expect(node.type).toBe('axisX');
    expect(setAxisOptions(node).value).toEqual(getAxisOptions());
  });

  it('chart.axisY() should specify options by API', () => {
    const node = chart.axisY();
    expect(node.type).toBe('axisY');
    expect(setAxisOptions(node).value).toEqual(getAxisOptions());
  });

  it('chart.legends() should specify options by API', () => {
    const node = chart.legends();
    expect(node.type).toBe('legends');
    expect(setAxisOptions(node).value).toEqual(getAxisOptions());
  });
});
