import { Canvas } from '@antv/g';
import { Chart, createLibrary } from '../../../src';
import {
  View,
  TimingKeyframe,
  SpaceFlex,
  FacetRect,
  RepeatMatrix,
  FacetCircle,
  SpaceLayer,
} from '../../../src/api/composition';
import {
  Area,
  Cell,
  Image,
  Interval,
  Line,
  Link,
  Point,
  Polygon,
  Vector,
  Text,
  Box,
  LineX,
  LineY,
  Range,
  RangeX,
  RangeY,
  Rect,
  Connector,
  BoxPlot,
  Sankey,
  Treemap,
} from '../../../src/api/mark/mark';
import { createDiv } from '../../utils/dom';

describe('Chart', () => {
  it('Chart() should have expected defaults', () => {
    const chart = new Chart();
    expect(chart.type).toBe('view');
    expect(chart.parentNode).toBeNull();
    expect(chart.value).toEqual({});
    expect(chart['_container'].nodeName).toBe('DIV');
  });

  it('Chart({...}) should support HTML container', () => {
    const container = createDiv();
    const chart = new Chart({
      container,
    });
    expect(chart['_container']).toBe(container);
  });

  it('Chart({...}) should support id container', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'root');
    document.body.appendChild(div);
    const chart = new Chart({
      container: 'root',
    });
    expect(chart['_container']).toBe(div);
  });

  it('Chart({...}) should support undefined container', () => {
    const chart = new Chart();
    expect(chart['_container'].nodeName).toBe('DIV');
  });

  it('Chart({...}) should override default value', () => {
    const chart = new Chart({
      data: [1, 2, 3],
    });
    expect(chart.value).toEqual({
      data: [1, 2, 3],
    });
  });

  it('chart.node() should return container', () => {
    const container = createDiv();
    const chart = new Chart({
      container,
    });
    expect(chart.node()).toBe(container);
  });

  it('chart.[attr](...) should specify options by API', () => {
    const chart = new Chart();
    chart
      .data([1, 2, 3])
      .key('composition')
      .coordinate({ type: 'polar' })
      .interaction({ type: 'brush' })
      .transform({ type: 'stackY' })
      .theme('defaultColor', 'red');

    expect(chart.options()).toEqual({
      type: 'view',
      data: [1, 2, 3],
      key: 'composition',
      coordinate: [{ type: 'polar' }],
      interaction: [{ type: 'brush' }],
      transform: [{ type: 'stackY' }],
      theme: { defaultColor: 'red' },
    });
  });

  it('chart.nodeName() should return expected node ', () => {
    const chart = new Chart();
    expect(chart.interval()).toBeInstanceOf(Interval);
    expect(chart.rect()).toBeInstanceOf(Rect);
    expect(chart.point()).toBeInstanceOf(Point);
    expect(chart.area()).toBeInstanceOf(Area);
    expect(chart.line()).toBeInstanceOf(Line);
    expect(chart.cell()).toBeInstanceOf(Cell);
    expect(chart.vector()).toBeInstanceOf(Vector);
    expect(chart.link()).toBeInstanceOf(Link);
    expect(chart.polygon()).toBeInstanceOf(Polygon);
    expect(chart.image()).toBeInstanceOf(Image);
    expect(chart.text()).toBeInstanceOf(Text);
    expect(chart.box()).toBeInstanceOf(Box);
    expect(chart.lineX()).toBeInstanceOf(LineX);
    expect(chart.lineY()).toBeInstanceOf(LineY);
    expect(chart.range()).toBeInstanceOf(Range);
    expect(chart.rangeX()).toBeInstanceOf(RangeX);
    expect(chart.rangeY()).toBeInstanceOf(RangeY);
    expect(chart.connector()).toBeInstanceOf(Connector);
    expect(chart.sankey()).toBeInstanceOf(Sankey);
    expect(chart.treemap()).toBeInstanceOf(Treemap);
    expect(chart.boxPlot()).toBeInstanceOf(BoxPlot);
    expect(chart.options().children).toEqual([
      { type: 'interval' },
      { type: 'rect' },
      { type: 'point' },
      { type: 'area' },
      { type: 'line' },
      { type: 'cell' },
      { type: 'vector' },
      { type: 'link' },
      { type: 'polygon' },
      { type: 'image' },
      { type: 'text' },
      { type: 'box' },
      { type: 'lineX' },
      { type: 'lineY' },
      { type: 'range' },
      { type: 'rangeX' },
      { type: 'rangeY' },
      { type: 'connector' },
      { type: 'sankey' },
      { type: 'treemap' },
      { type: 'boxPlot' },
    ]);
  });

  it('chart.container() should use last node as root node', () => {
    const chart = new Chart();
    chart.view();
    chart.spaceLayer();
    expect(chart.spaceLayer()).toBeInstanceOf(SpaceLayer);
  });

  it('chart.container() should set layout options for root node', () => {
    const chart = new Chart({
      width: 100,
      height: 120,
      padding: 0,
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 30,
      paddingTop: 40,
      marginBottom: 10,
      marginRight: 20,
      marginLeft: 30,
      marginTop: 40,
      margin: 0,
      insetBottom: 10,
      insetRight: 20,
      insetLeft: 30,
      insetTop: 40,
      inset: 0,
      autoFit: true,
    });
    chart.spaceLayer();
    expect(chart.options()).toEqual({
      type: 'spaceLayer',
      width: 100,
      height: 120,
      padding: 0,
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 30,
      paddingTop: 40,
      marginBottom: 10,
      marginRight: 20,
      marginLeft: 30,
      marginTop: 40,
      margin: 0,
      insetBottom: 10,
      insetRight: 20,
      insetLeft: 30,
      insetTop: 40,
      inset: 0,
      autoFit: true,
    });
  });

  it('chart.container() should return expected container', () => {
    const chart = new Chart();
    expect(chart.view()).toBeInstanceOf(View);
    expect(chart.options()).toEqual({ type: 'view' });
    expect(chart.spaceLayer()).toBeInstanceOf(SpaceLayer);
    expect(chart.options()).toEqual({ type: 'spaceLayer' });
    expect(chart.spaceFlex()).toBeInstanceOf(SpaceFlex);
    expect(chart.options()).toEqual({ type: 'spaceFlex' });
    expect(chart.facetRect()).toBeInstanceOf(FacetRect);
    expect(chart.options()).toEqual({ type: 'facetRect' });
    expect(chart.repeatMatrix()).toBeInstanceOf(RepeatMatrix);
    expect(chart.options()).toEqual({ type: 'repeatMatrix' });
    expect(chart.facetCircle()).toBeInstanceOf(FacetCircle);
    expect(chart.options()).toEqual({ type: 'facetCircle' });
    expect(chart.timingKeyframe()).toBeInstanceOf(TimingKeyframe);
    expect(chart.options()).toEqual({ type: 'timingKeyframe' });
  });

  it('chart.options() should return view tree', () => {
    const chart = new Chart();
    chart.interval();
    chart.point();
    expect(chart.options()).toEqual({
      type: 'view',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.options() should handle date object', () => {
    const chart = new Chart({});
    const date = new Date();
    chart.cell().data([{ date }]);
    expect(chart.options()).toEqual({
      type: 'view',
      children: [{ type: 'cell', data: [{ date }] }],
    });
  });

  it('chart.nodeName() should build view tree', () => {
    const chart = new Chart();
    chart.interval();
    chart.point();
    expect(chart.options()).toEqual({
      type: 'view',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.call(chart => chart.nodeName()) should build view tree', () => {
    const chart = new Chart();
    chart.call((chart) => chart.interval()).call((chart) => chart.point());
    expect(chart.options()).toEqual({
      type: 'view',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.nodeName() should build nested view tree', () => {
    const chart = new Chart();
    chart
      .spaceFlex()
      .call((node) => node.interval())
      .call((node) =>
        node
          .spaceFlex()
          .call((node) => node.line())
          .call((node) => node.point()),
      );
    expect(chart.options()).toEqual({
      type: 'spaceFlex',
      children: [
        { type: 'interval' },
        { type: 'spaceFlex', children: [{ type: 'line' }, { type: 'point' }] },
      ],
    });
  });

  it('chart.render() should render chart', () => {
    const chart = new Chart({
      container: createDiv(),
    });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    expect(chart.render()).toBe(chart);
  });

  it('chart.context() should return rendering context', () => {
    const chart = new Chart({
      container: createDiv(),
    });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    const context = chart.context();
    expect(context.canvas).toBeUndefined();
    expect(context.library).toEqual(createLibrary());
    chart.render();
    expect(context.canvas).toBeInstanceOf(Canvas);
  });

  it('chart.render({...}) should rerender chart with updated data', () => {
    const div = createDiv();
    const button = document.createElement('button');
    button.innerText = 'Update Data';
    div.appendChild(button);

    const chart = new Chart({
      container: div,
    });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);
    const interval = chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    chart.render();
    button.onclick = () => {
      interval.changeData([
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
      ]);
    };
  });
});

it('chart.render({...}) should rerender chart with updated size', () => {
  const div = createDiv();
  const button = document.createElement('button');
  button.innerText = 'Update Size';
  div.appendChild(button);

  const chart = new Chart({
    container: div,
    width: 300,
    height: 600,
  });

  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  chart.render();
  button.onclick = () => {
    chart.changeSize(200, 400);
  };
});

it('chart.render({...}) should render with autoFit.', () => {
  const div = createDiv();

  // button
  const button = document.createElement('button');
  button.innerText = 'Change Wrapper Container';
  div.appendChild(button);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  wrapperDiv.style.width = '800px';
  wrapperDiv.style.height = '500px';
  div.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    autoFit: true,
  });

  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  chart.render();

  button.onclick = () => {
    wrapperDiv.style.width = '400px';
    wrapperDiv.style.height = '500px';
    chart.forceFit();
  };
});

it('chart.on({...}) should register chart event.', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
  });

  // 1. chart.on('eventName', callback)
  chart.on('afterrender', () => console.log('afterrender event.'));
  // 2. chart.on('eventName', [callback])
  chart.on('beforerender', [
    () => console.log('beforerender event 1'),
    () => console.log('beforerender event 2'),
  ]);
  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  chart.render();
});
