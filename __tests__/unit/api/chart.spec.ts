import { Canvas, HTML } from '@antv/g';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Chart, stdlib, ChartEvent } from '../../../src';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';

const TEST_OPTIONS = {
  type: 'interval',
  encode: { x: 'genre', y: 'sold' },
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
};

describe('Chart', () => {
  it('Chart() should have expected defaults.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    expect(chart.type).toBe('view');
    expect(chart.parentNode).toBeNull();
    expect(chart.value).toEqual({ key: undefined });
    expect(chart['_container'].nodeName).toBe('DIV');
    expect(chart['_trailing']).toBe(false);
    expect(chart['_rendering']).toBe(false);
    expect(chart['_plugins'].length).toBe(0);
    expect(chart['_renderer']).toBeDefined();
    expect(chart['_trailingResolve']).toBeNull();
    expect(chart['_trailingReject']).toBeNull();
  });

  it('Chart({...}) should support HTML container.', () => {
    const canvas = createNodeGCanvas(640, 480);
    const container = canvas.getConfig().container as HTMLDivElement;
    const chart = new Chart({
      container,
      canvas,
    });

    expect(chart['_container']).toBe(container);
  });

  it('Chart({...}) should support id container.', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'root');
    document.body.appendChild(div);
    const chart = new Chart({ container: 'root' });
    expect(chart['_container']).toBe(div);
  });

  it('Chart({...}) should support undefined container.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    const defaultContainer = chart['_container'];
    expect(defaultContainer.nodeName).toBe('DIV');
    expect(defaultContainer.parentNode).toBeNull();
  });

  it('Chart({...}) should override default value.', () => {
    const chart = new Chart({
      data: [1, 2, 3],
      key: 'chart',
      canvas: createNodeGCanvas(640, 480),
    });
    expect(chart.value).toEqual({
      data: [1, 2, 3],
      key: 'chart',
    });
  });

  it('chart.getContainer() should return container.', () => {
    const canvas = createNodeGCanvas(640, 480);
    const container = canvas.getConfig().container as HTMLDivElement;
    const chart = new Chart({
      container,
      canvas,
    });
    expect(chart.getContainer()).toBe(container);
  });

  it('chart.[attr](...) should specify options by API.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    chart
      .data([1, 2, 3])
      .labelTransform({ type: 'overlapDodgeY' })
      .attr('key', 'composition')
      .coordinate({ type: 'polar' })
      .interaction('elementHighlight')
      .transform({ type: 'stackY' })
      .theme({ color: 'red' });

    expect(chart.options()).toEqual({
      type: 'view',
      data: [1, 2, 3],
      key: 'composition',
      labelTransform: [{ type: 'overlapDodgeY' }],
      coordinate: { type: 'polar' },
      transform: [{ type: 'stackY' }],
      theme: { color: 'red' },
      interaction: {
        elementHighlight: true,
      },
    });
  });

  it('chart.nodeName() should return expected node.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    expect(chart.interval().type).toBe('interval');
    expect(chart.rect().type).toBe('rect');
    expect(chart.point().type).toBe('point');
    expect(chart.area().type).toBe('area');
    expect(chart.line().type).toBe('line');
    expect(chart.cell().type).toBe('cell');
    expect(chart.vector().type).toBe('vector');
    expect(chart.link().type).toBe('link');
    expect(chart.polygon().type).toBe('polygon');
    expect(chart.image().type).toBe('image');
    expect(chart.text().type).toBe('text');
    expect(chart.box().type).toBe('box');
    expect(chart.lineX().type).toBe('lineX');
    expect(chart.lineY().type).toBe('lineY');
    expect(chart.range().type).toBe('range');
    expect(chart.rangeX().type).toBe('rangeX');
    expect(chart.rangeY().type).toBe('rangeY');
    expect(chart.connector().type).toBe('connector');
    expect(chart.sankey().type).toBe('sankey');
    expect(chart.treemap().type).toBe('treemap');
    expect(chart.boxplot().type).toBe('boxplot');
    expect(chart.shape().type).toBe('shape');
    expect(chart.pack().type).toBe('pack');
    expect(chart.forceGraph().type).toBe('forceGraph');
    expect(chart.tree().type).toBe('tree');
    expect(chart.wordCloud().type).toBe('wordCloud');
    expect(chart.gauge().type).toBe('gauge');
    expect(chart.liquid().type).toBe('liquid');
    expect(chart.density().type).toBe('density');
    expect(chart.heatmap().type).toBe('heatmap');
    expect(chart.axisX().type).toBe('axisX');
    expect(chart.axisY().type).toBe('axisY');
    expect(chart.legends().type).toBe('legends');
    expect((chart.options() as any).children).toEqual([
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
      { type: 'liquid' },
      { type: 'density' },
      { type: 'heatmap' },
      { type: 'axisX' },
      { type: 'axisY' },
      { type: 'legends' },
    ]);
  });

  it('chart.container() should use last node as root node.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    chart.view();
    chart.spaceLayer();
    expect(chart.spaceLayer().type).toBe('spaceLayer');
  });

  it('chart.container() should set layout options for root node.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
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

  it('chart.container() should return expected container.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    expect(chart.view().type).toBe('view');
    expect(chart.options()).toEqual({ type: 'view' });
    expect(chart.spaceLayer().type).toBe('spaceLayer');
    expect(chart.options()).toEqual({ type: 'spaceLayer' });
    expect(chart.spaceFlex().type).toBe('spaceFlex');
    expect(chart.options()).toEqual({ type: 'spaceFlex' });
    expect(chart.facetRect().type).toBe('facetRect');
    expect(chart.options()).toEqual({ type: 'facetRect' });
    expect(chart.repeatMatrix().type).toBe('repeatMatrix');
    expect(chart.options()).toEqual({ type: 'repeatMatrix' });
    expect(chart.facetCircle().type).toBe('facetCircle');
    expect(chart.options()).toEqual({ type: 'facetCircle' });
    expect(chart.timingKeyframe().type).toBe('timingKeyframe');
    expect(chart.options()).toEqual({
      type: 'timingKeyframe',
    });
  });

  it('chart.options() should return view tree.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    chart.interval();
    chart.point();
    expect(chart.options()).toEqual({
      type: 'view',

      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.options(options) should handle date object.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    const date = new Date();
    chart.cell().data([{ date }]);
    expect(chart.options()).toEqual({
      type: 'view',

      children: [{ type: 'cell', data: [{ date }] }],
    });
  });

  it('chart.options(options) should return this chart instance.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    expect(chart.options({ width: 800 })).toBe(chart);
  });

  it('chart.title() should set title options.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

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

  it('chart.nodeName() should build view tree.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    chart.interval();
    chart.point();
    expect(chart.options()).toEqual({
      type: 'view',

      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.call(chart => chart.nodeName()) should build view tree.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    chart.call((chart) => chart.interval()).call((chart) => chart.point());
    expect(chart.options()).toEqual({
      type: 'view',

      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.nodeName() should build nested view tree.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
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

  it('chart.getContext() should return rendering context.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
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

    const context = chart.getContext();
    // expect(context.canvas).toBeUndefined();
    expect(context.library).toEqual(stdlib());
    chart.render();
    expect(context.canvas).toBeInstanceOf(Canvas);
  });

  it('chart.render() should return promise.', (done) => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
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

    chart.render().then((c) => {
      expect(c).toBe(chart);
      done();
    });
  });

  it('chart renderer SVG and Canvas', () => {
    // Default is CanvasRenderer.
    let chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
    ]);

    chart.interval().encode('x', 'genre').encode('y', 'sold');

    chart.render();

    // Use SVGRenderer.
    chart = new Chart({ renderer: new SVGRenderer() });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
    ]);

    chart.interval().encode('x', 'genre').encode('y', 'sold');

    chart.render();
    expect(chart.getContainer().querySelector('svg')).not.toBeNull();
  });

  it('chart.on(event, callback) should register chart event.', (done) => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
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
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    let count = 0;
    chart.once('foo', () => count++);
    chart.emit('foo');
    chart.emit('foo');
    expect(count).toBe(1);
  });

  it('chart.emit(event, ...params) should emit event.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    let sum = 0;
    chart.on('foo', (a, b) => (sum = a + b));
    chart.emit('foo', 1, 2);
    expect(sum).toBe(3);
  });

  it('chart.off(event) should remove event.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    let count = 0;
    chart.on('foo', () => count++);
    chart.off('foo');
    chart.emit('foo');
    expect(count).toBe(0);
  });

  it('chart.render() should be called after window resize.', (done) => {
    const canvas = createNodeGCanvas(640, 480);
    const div = canvas.getConfig().container as HTMLDivElement;
    const chart = new Chart({
      container: div,
      canvas,
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

    chart.render().then(() => {
      // Mock resize window.
      div.style.width = '100px';
      div.style.height = '100px';
      window.dispatchEvent(new Event('resize'));
    });

    // Listen.
    chart.on('afterchangesize', () => {
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('chart.getInstance() should return internal instance after chart render.', async () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
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
      .attr('key', 'interval')
      .encode('x', 'genre')
      .encode('y', 'sold');

    await chart.render();

    const context = chart.getContext();
    const view = context.views?.find((v) => v.key === chart['_key']);

    expect(chart.getView()).toEqual(view);
    expect(chart.getCoordinate()).toEqual(view?.coordinate);
    expect(chart.getTheme()).toEqual(view?.theme);
    expect(chart.getGroup().id).toEqual(chart['_key']);
    expect(chart.getScale()).toEqual(view?.scale);
    expect(chart.getScaleByChannel('color')).toEqual(view?.scale.color);
    expect(chart.getScaleByChannel('shape')).not.toBeDefined();
  });

  it('chart.render() should throw error.', async () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    chart.options({ type: 'xxx' });
    await expect(chart.render()).rejects.toThrowError();
  });

  it('chart.destroy() should destroy group', async () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
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
      .attr('key', 'interval')
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    await chart.render();
    expect(chart.getGroup().id).toEqual(chart['_key']);
    chart.destroy();
    expect(chart.getGroup()).toEqual(null);
  });

  it('chart.destroy() should remove created node.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    const container = chart.getContainer();
    document.body.append(container);
    expect(container.parentNode).not.toBe(null);
    chart.destroy();
    expect(container.parentNode).toBe(null);
  });

  it('chart.destroy() should not remove provided node.', () => {
    const canvas = createNodeGCanvas(640, 480);
    const container = canvas.getConfig().container as HTMLDivElement;
    document.body.append(container);
    const chart = new Chart({
      container,
      canvas,
    });
    expect(container.parentNode).not.toBe(null);
    chart.destroy();
    expect(container.parentNode).not.toBe(null);
  });

  it('chart.clear() should clear group.', async () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
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
      .attr('key', 'interval')
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    await chart.render();
    expect(chart.getGroup().id).toEqual(chart['_key']);
    chart.clear();
    expect(chart.getGroup()).toEqual(null);
  });

  it('chart.clear() should preserve some global options.', () => {
    const globals = {
      autoFit: true,
      width: 300,
      height: 200,
      inset: 10,
      insetTop: 20,
      insetRight: 30,
      insetBottom: 40,
      insetLeft: 50,
      margin: 10,
      marginTop: 20,
      marginRight: 30,
      marginBottom: 40,
      padding: 10,
      paddingTop: 20,
      paddingRight: 30,
      paddingBottom: 40,
    };

    const chart = new Chart(globals);

    chart
      .interval()
      .data([
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ])
      .attr('key', 'interval')
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    chart.clear();

    expect(chart.options()).toStrictEqual({ ...globals, type: 'view' });
  });

  it('chart.changeData() should update all children data although mark children have their own data', async () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
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

  it('new Chart({ autoFit: true }) should not set width and height of chart options.', async () => {
    const chart = new Chart({
      autoFit: true,
      canvas: createNodeGCanvas(640, 480),
    });

    chart
      .interval()
      .data([
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ])
      .encode('x', 'genre')
      .encode('y', 'sold');
    await chart.render();
    expect(chart.attr('width')).toBeUndefined();
    expect(chart.attr('height')).toBeUndefined();
  });

  it('chart.options({ autoFit: true }) should bind autoFit.', async () => {
    const canvas = createNodeGCanvas(640, 480);
    const div = canvas.getConfig().container as HTMLDivElement;
    const chart = new Chart({
      container: div,
      canvas,
    });
    chart.options({
      autoFit: true,

      type: 'interval',
      encode: {
        x: 'genre',
        y: 'sold',
      },
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
    });

    expect(chart['_hasBindAutoFit']).toBe(false);

    await chart.render();
    expect(chart['_hasBindAutoFit']).toBe(true);

    chart.options({
      autoFit: false,
    });
    await chart.render();
    expect(chart['_hasBindAutoFit']).toBe(false);
  });

  it('chart.forceFit() should be not rerender if size of container do not change.', async () => {
    const canvas = createNodeGCanvas(640, 480);
    const div = canvas.getConfig().container as HTMLDivElement;
    div.style.width = '500px';
    div.style.height = '400px';
    const chart = new Chart({
      container: div,
      canvas,
      autoFit: true,
    });

    chart
      .interval()
      .data([
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ])
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
    await chart.render();

    await chart.forceFit();
    expect(fn).toBeCalledTimes(1);
  });

  it('chart.render() should toggle value of _rendering.', async () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options(TEST_OPTIONS);

    const finished = chart.render();
    expect(chart['_rendering']).toBeTruthy();

    await finished;
    expect(chart['_rendering']).toBeFalsy();
  });

  it('chart.render() should catch error for trailing render task.', async () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    chart.options(TEST_OPTIONS);
    chart.render();

    chart.options({ ...TEST_OPTIONS, theme: 'foo' });
    await expect(chart.render()).rejects.toThrowError();
    expect(chart['_rendering']).toBeFalsy();
  });

  it('chart.render() should render after previous rendering.', async () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options(TEST_OPTIONS);

    let count = 0;
    chart.on(ChartEvent.BEFORE_RENDER, () => {
      count++;
    });
    const p1 = chart.render();
    const p2 = chart.render();

    await p1;
    expect(count).toBe(1);
    await p2;
    expect(count).toBe(2);
  });

  it('chart.render() should render first and last rendering task in a row.', async () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options(TEST_OPTIONS);

    let count = 0;
    chart.on(ChartEvent.AFTER_RENDER, () => {
      count++;
    });

    const p1 = chart.render();
    const p2 = chart.render();
    const p3 = chart.render();
    const p4 = chart.render();

    const v1 = await p1;
    const v2 = await p2;
    const v3 = await p3;
    const v4 = await p4;

    expect(count).toBe(2);
    expect(v1).toBe(chart);
    expect(v2).toBe(chart);
    expect(v3).toBe(chart);
    expect(v4).toBe(chart);
  });
});
