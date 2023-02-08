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
  Boxplot,
  Sankey,
  Treemap,
  Shape,
  Pack,
  ForceGraph,
  Tree,
  WordCloud,
} from '../../../src/api/mark/mark';

describe('Chart', () => {
  it('Chart() should have expected defaults', () => {
    const chart = new Chart();
    expect(chart.type).toBe('view');
    expect(chart.parentNode).toBeNull();
    expect(chart.value).toEqual({});
    expect(chart['_container'].nodeName).toBe('DIV');
  });

  it('Chart({...}) should support HTML container', () => {
    const container = document.createElement('div');
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
    const defaultContainer = chart['_container'];
    expect(defaultContainer.nodeName).toBe('DIV');
    expect(defaultContainer.parentNode).toBeNull();
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
    const container = document.createElement('div');
    const chart = new Chart({
      container,
    });
    expect(chart.node()).toBe(container);
  });

  it('chart.[attr](...) should specify options by API', () => {
    const chart = new Chart();
    chart
      .data([1, 2, 3])
      .attr('key', 'composition')
      .coordinate({ type: 'polar' })
      .interaction('elementHighlight')
      .transform({ type: 'stackY' })
      .theme('defaultColor', 'red');

    expect(chart.options()).toEqual({
      type: 'view',
      data: [1, 2, 3],
      key: 'composition',
      coordinates: [{ type: 'polar' }],
      transform: [{ type: 'stackY' }],
      theme: { defaultColor: 'red' },
      interaction: {
        elementHighlight: true,
      },
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
    expect(chart.boxplot()).toBeInstanceOf(Boxplot);
    expect(chart.shape()).toBeInstanceOf(Shape);
    expect(chart.pack()).toBeInstanceOf(Pack);
    expect(chart.forceGraph()).toBeInstanceOf(ForceGraph);
    expect(chart.tree()).toBeInstanceOf(Tree);
    expect(chart.wordCloud()).toBeInstanceOf(WordCloud);
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
      { type: 'boxplot' },
      { type: 'shape' },
      { type: 'pack' },
      { type: 'forceGraph' },
      { type: 'tree' },
      { type: 'wordCloud' },
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

  it('chart.title() should set title options', () => {
    const chart = new Chart({});

    chart.title('This is a title.');
    expect(chart.options().title).toEqual('This is a title.');

    chart.title({
      title: 'This is a main title,',
      subtitle: 'This is a subtitle.',
    });
    expect(chart.options().title).toEqual({
      title: 'This is a main title,',
      subtitle: 'This is a subtitle.',
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

  it('chart.context() should return rendering context', () => {
    const chart = new Chart({});

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

  it('chart.render() should return promise', (done) => {
    const chart = new Chart();

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

    chart.render().then((c) => {
      expect(c).toBe(chart);
      done();
    });
  });

  it('chart.on(event, callback) should register chart event.', (done) => {
    const chart = new Chart();

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

    let beforerender = false;
    let beforepaint = false;
    let afterpaint = false;
    chart
      .on('beforerender', () => (beforerender = true))
      .on('beforepaint', () => (beforepaint = true))
      .on('afterpaint', () => (afterpaint = true))
      .on('afterrender', () => {
        expect(beforerender).toBe(true);
        expect(beforepaint).toBe(true);
        expect(afterpaint).toBe(true);
        done();
      });

    chart.render();
  });

  it('chart.once(event, callback) should call callback once.', () => {
    const chart = new Chart();
    let count = 0;
    chart.once('foo', () => count++);
    chart.emit('foo');
    chart.emit('foo');
    expect(count).toBe(1);
  });

  it('chart.emit(event, ...params) should emit event.', () => {
    const chart = new Chart();
    let sum = 0;
    chart.on('foo', (a, b) => (sum = a + b));
    chart.emit('foo', 1, 2);
    expect(sum).toBe(3);
  });

  it('chart.off(event) should remove event.', () => {
    const chart = new Chart();
    let count = 0;
    chart.on('foo', () => count++);
    chart.off('foo');
    chart.emit('foo');
    expect(count).toBe(0);
  });

  it('chart should render after window resize.', (done) => {
    const div = document.createElement('div');

    const chart = new Chart({
      container: div,
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

    // Track chart render;
    const fn = jest.fn();
    const render = chart.render.bind(chart);
    chart.render = () => {
      fn();
      return render();
    };
    chart.render();

    // Mock resize window.
    div.style.width = '100px';
    div.style.height = '100px';
    window.dispatchEvent(new Event('resize'));

    // Listen.
    chart.on('afterchangesize', () => {
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('get instance information after chart render.', async () => {
    const chart = new Chart({ key: '$$chart$$' });
    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);
    chart
      .interval()
      .attr('key', 'interval')
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');
    await chart.render();
    const context = chart.context();
    const view = context.views?.find((v) => v.key === chart.attr('key'));
    expect(chart.getView()).toEqual(view);
    expect(chart.getCoordinate()).toEqual(view?.coordinate);
    expect(chart.getTheme()).toEqual(view?.theme);
    expect(chart.getGroup().id).toEqual(chart.attr('key'));
  });
});
