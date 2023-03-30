import { Canvas } from '@antv/g';
import { Chart, createLibrary, VIEW_CLASS_NAME } from '../../../src';
import { G2_CHART_KEY } from '../../../src/api/chart';
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
  Gauge,
  Progress,
} from '../../../src/api/mark/mark';

describe('Chart', () => {
  it('Chart() should have expected defaults', () => {
    const chart = new Chart({ theme: 'classic' });
    expect(chart.type).toBe('view');
    expect(chart.parentNode).toBeNull();
    expect(chart.value).toEqual({ key: G2_CHART_KEY, theme: 'classic' });
    expect(chart['_container'].nodeName).toBe('DIV');
  });

  it('Chart({...}) should support HTML container', () => {
    const container = document.createElement('div');
    const chart = new Chart({ theme: 'classic', container });
    expect(chart['_container']).toBe(container);
  });

  it('Chart({...}) should support id container', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'root');
    document.body.appendChild(div);
    const chart = new Chart({ theme: 'classic', container: 'root' });
    expect(chart['_container']).toBe(div);
  });

  it('Chart({...}) should support undefined container', () => {
    const chart = new Chart({ theme: 'classic' });
    const defaultContainer = chart['_container'];
    expect(defaultContainer.nodeName).toBe('DIV');
    expect(defaultContainer.parentNode).toBeNull();
  });

  it('Chart({...}) should override default value', () => {
    const chart = new Chart({
      theme: 'classic',
      data: [1, 2, 3],
      key: 'chart',
    });
    expect(chart.value).toEqual({
      data: [1, 2, 3],
      key: 'chart',
      theme: 'classic',
    });
  });

  it('chart.getContainer() should return container', () => {
    const container = document.createElement('div');
    const chart = new Chart({ theme: 'classic', container });
    expect(chart.getContainer()).toBe(container);
  });

  it('chart.[attr](...) should specify options by API', () => {
    const chart = new Chart({ theme: 'classic' });
    chart
      .data([1, 2, 3])
      .labelTransform({ type: 'overlapDodgeY' })
      .attr('key', 'composition')
      .coordinate({ type: 'polar' })
      .interaction('elementHighlight')
      .transform({ type: 'stackY' })
      .theme({ defaultColor: 'red' });

    expect(chart.options()).toEqual({
      type: 'view',
      data: [1, 2, 3],
      key: 'composition',
      labelTransform: [{ type: 'overlapDodgeY' }],
      coordinate: { type: 'polar' },
      transform: [{ type: 'stackY' }],
      theme: { defaultColor: 'red' },
      interaction: {
        elementHighlight: true,
      },
    });
  });

  it('chart.nodeName() should return expected node ', () => {
    const chart = new Chart({ theme: 'classic' });
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
    expect(chart.gauge()).toBeInstanceOf(Gauge);
    expect(chart.progress()).toBeInstanceOf(Progress);
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
      { type: 'gauge' },
      { type: 'progress' },
    ]);
  });

  it('chart.container() should use last node as root node', () => {
    const chart = new Chart({ theme: 'classic' });
    chart.view();
    chart.spaceLayer();
    expect(chart.spaceLayer()).toBeInstanceOf(SpaceLayer);
  });

  it('chart.container() should set layout options for root node', () => {
    const chart = new Chart({
      theme: 'classic',
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
      theme: 'classic',
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
    const chart = new Chart({ theme: 'classic' });
    expect(chart.view()).toBeInstanceOf(View);
    expect(chart.options()).toEqual({ type: 'view', theme: 'classic' });
    expect(chart.spaceLayer()).toBeInstanceOf(SpaceLayer);
    expect(chart.options()).toEqual({ type: 'spaceLayer', theme: 'classic' });
    expect(chart.spaceFlex()).toBeInstanceOf(SpaceFlex);
    expect(chart.options()).toEqual({ type: 'spaceFlex', theme: 'classic' });
    expect(chart.facetRect()).toBeInstanceOf(FacetRect);
    expect(chart.options()).toEqual({ type: 'facetRect', theme: 'classic' });
    expect(chart.repeatMatrix()).toBeInstanceOf(RepeatMatrix);
    expect(chart.options()).toEqual({ type: 'repeatMatrix', theme: 'classic' });
    expect(chart.facetCircle()).toBeInstanceOf(FacetCircle);
    expect(chart.options()).toEqual({ type: 'facetCircle', theme: 'classic' });
    expect(chart.timingKeyframe()).toBeInstanceOf(TimingKeyframe);
    expect(chart.options()).toEqual({
      type: 'timingKeyframe',
      theme: 'classic',
    });
  });

  it('chart.options() should return view tree', () => {
    const chart = new Chart({ theme: 'classic' });
    chart.interval();
    chart.point();
    expect(chart.options()).toEqual({
      type: 'view',
      key: G2_CHART_KEY,
      theme: 'classic',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.options(options) should handle date object', () => {
    const chart = new Chart({ theme: 'classic' });
    const date = new Date();
    chart.cell().data([{ date }]);
    expect(chart.options()).toEqual({
      type: 'view',
      key: G2_CHART_KEY,
      theme: 'classic',
      children: [{ type: 'cell', data: [{ date }] }],
    });
  });

  it('chart.options(options) should return this chart instance', () => {
    const chart = new Chart({ theme: 'classic' });
    expect(chart.options({ width: 800 })).toBe(chart);
  });

  it('chart.title() should set title options', () => {
    const chart = new Chart({ theme: 'classic' });

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
    const chart = new Chart({ theme: 'classic' });
    chart.interval();
    chart.point();
    expect(chart.options()).toEqual({
      type: 'view',
      key: G2_CHART_KEY,
      theme: 'classic',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.call(chart => chart.nodeName()) should build view tree', () => {
    const chart = new Chart({ theme: 'classic' });
    chart.call((chart) => chart.interval()).call((chart) => chart.point());
    expect(chart.options()).toEqual({
      type: 'view',
      key: G2_CHART_KEY,
      theme: 'classic',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.nodeName() should build nested view tree', () => {
    const chart = new Chart({ theme: 'classic' });
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
      theme: 'classic',
      children: [
        { type: 'interval' },
        { type: 'spaceFlex', children: [{ type: 'line' }, { type: 'point' }] },
      ],
    });
  });

  it('chart.getContext() should return rendering context', () => {
    const chart = new Chart({ theme: 'classic' });

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

    const context = chart.getContext();
    expect(context.canvas).toBeUndefined();
    expect(context.library).toEqual(createLibrary());
    chart.render();
    expect(context.canvas).toBeInstanceOf(Canvas);
  });

  it('chart.render() should return promise', (done) => {
    const chart = new Chart({ theme: 'classic' });

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
    const chart = new Chart({ theme: 'classic' });

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
    const chart = new Chart({ theme: 'classic' });
    let count = 0;
    chart.once('foo', () => count++);
    chart.emit('foo');
    chart.emit('foo');
    expect(count).toBe(1);
  });

  it('chart.emit(event, ...params) should emit event.', () => {
    const chart = new Chart({ theme: 'classic' });
    let sum = 0;
    chart.on('foo', (a, b) => (sum = a + b));
    chart.emit('foo', 1, 2);
    expect(sum).toBe(3);
  });

  it('chart.off(event) should remove event.', () => {
    const chart = new Chart({ theme: 'classic' });
    let count = 0;
    chart.on('foo', () => count++);
    chart.off('foo');
    chart.emit('foo');
    expect(count).toBe(0);
  });

  it('chart should render after window resize.', (done) => {
    const div = document.createElement('div');
    const chart = new Chart({
      theme: 'classic',
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
    const chart = new Chart({ theme: 'classic' });

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

    const context = chart.getContext();
    const view = context.views?.find((v) => v.key === chart.attr('key'));

    expect(chart.getView()).toEqual(view);
    expect(chart.getCoordinate()).toEqual(view?.coordinate);
    expect(chart.getTheme()).toEqual(view?.theme);
    expect(chart.getGroup().id).toEqual(chart.attr('key'));
    expect(chart.getScale()).toEqual(view?.scale);
    expect(chart.getScaleByChannel('color')).toEqual(view?.scale.color);
    expect(chart.getScaleByChannel('shape')).not.toBeDefined();
  });

  it('chart render before theme option must be specified.', async () => {
    // Catch error.
    // @ts-ignore
    const chart = new Chart({});
    await expect(chart.render()).rejects.toThrowError();
  });

  it('chart.destroy()', async () => {
    const chart = new Chart({ theme: 'classic' });
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
    expect(chart.getGroup().id).toEqual(chart.attr('key'));
    chart.destroy();
    expect(chart.getGroup()).toEqual(null);
  });

  it('chart.clear()', async () => {
    const chart = new Chart({ theme: 'classic' });
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
    expect(chart.getGroup().id).toEqual(chart.attr('key'));
    chart.clear();
    expect(chart.getGroup()).toEqual(null);
  });

  it('chart.clear() should clear interaction', async () => {
    const chart = new Chart({ theme: 'classic' });
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
      .encode('color', 'genre')
      .interaction('tooltip');
    await chart.render();

    const { canvas } = chart.getContext();
    const fn = jest.fn();
    // @ts-ignore
    const [view] = canvas.document.getElementsByClassName(VIEW_CLASS_NAME);
    const nameInteraction = view['nameInteraction'];
    const interaction = nameInteraction.get('tooltip');
    const { destroy } = interaction;
    const newDestroy = () => {
      destroy();
      fn();
    };
    interaction.destroy = newDestroy;
    chart.clear();
    expect(fn).toBeCalledTimes(1);
  });

  it('chart.changeData() should update all children data although mark children have their own data', async () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const chart = new Chart({ theme: 'classic' });
    const interval = chart
      .interval()
      .data(data)
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre')
      .interaction('tooltip');

    const line = chart
      .line()
      .data([data[0]])
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre')
      .interaction('tooltip');

    await chart.render();
    expect(interval.data()).toEqual(data);
    expect(line.data()).toEqual([data[0]]);

    await chart.changeData([data[1]]);
    expect(chart.data()).toEqual([data[1]]);
    expect(interval.data()).toEqual([data[1]]);
    expect(line.data()).toEqual([data[1]]);
  });
});
