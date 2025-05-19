---
title: 'Chart API'
order: 4
---

<style>
h3 { 
    color: #873bf4; 
}
</style>

## Creating Visualizations

### new Chart()

```sign
new Chart(params: ChartCfg) => View;
```

Creates a Chart object.

```js
const chart = new Chart({
  container: 'container',
  width: 640,
  height: 480,
});
```

### ChartCfg.container

<description> _string | HTMLElement_ **optional** </description>

Specifies the DOM container for chart rendering. Accepts either a DOM ID or DOM element instance.

```js
// Pass DOM id
const chart = new Chart({
  container: 'container',
});

// Pass DOM instance
const container = document.createElement('div');
const chart = new Chart({
  container,
});

// Get default container
const chart = new Chart();
chart.options({});
chart.render();
return chart.getContainer();
```

### ChartCfg.autoFit

<description> _boolean_ **optional** _default:_ `false`</description>

Whether the chart auto-adapts to container dimensions. Default `false` requires manual width/height setting. When `autoFit: true`, automatically uses container dimensions while respecting user-defined height.

### ChartCfg.clip

<description> _boolean_ **optional** _default:_ `false`</description>

Whether to clip graphics exceeding the drawing area.

With `clip = false`, out-of-bound graphics remain visible:

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .data([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ])
    .encode('x', 'year')
    .encode('y', 'value')
    .scale('x', { range: [0, 1] })
    .scale('y', { domainMin: 6, nice: true });

  chart.line().label({
    text: 'value',
    style: {
      dx: -10,
      dy: -12,
    },
  });
  chart.point().style('fill', 'white').tooltip(false);
  chart.render();

  return chart.getContainer();
})();
```

Set `clip = true` to enable clipping. Adjust `inset` if points get clipped:

```js | ob
(() => {
  const chart = new G2.Chart({
    clip: true,
    inset: 20,
  });

  chart
    .data([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ])
    .encode('x', 'year')
    .encode('y', 'value')
    .scale('x', {
      range: [0, 1],
    })
    .scale('y', {
      domainMin: 6,
      nice: true,
    });

  chart.line().label({
    text: 'value',
    style: {
      dx: -10,
      dy: -12,
    },
  });

  chart.point().style('fill', 'white').tooltip(false);
  chart.render();
  return chart.getContainer();
})();
```

### ChartCfg.width

<description> _number_ **optional** _default:_ `640` </description>

Chart width.

### ChartCfg.height

<description>_number_ **optional** _default:_ `480` </description>

Chart height.

### ChartCfg.depth

<description> _number_ **optional** _default:_ `0` </description>

Chart depth for 3D visualizations.

### ChartCfg.padding

<description> _'auto' | number_ **optional** _default:_ `'auto'`</description>

Sets chart padding using CSS box model conventions.

```js
const chart = new Chart({
  container: 'container',
  width: 1000,
  height: 500,
  padding: 20,
});
```

<img alt="chart-component" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tFaaTbBg-_cAAAAAAAAAAAAAemJ7AQ/original" width=900/>

### ChartCfg.margin

<description> _number_ **optional** _default:_ `16`</description>

Sets chart margin using CSS box model .

```js
const chart = new Chart({
  container: 'container',
  width: 1000,
  height: 500,
  margin: 20,
});
```

### ChartCfg.inset

<description> _number_ **optional** _default:_ `0`</description>

Sets breathing space around chart area.

```js
const chart = new G2.Chart({
  container: 'container',
  width: 1000,
  height: 500,
  inset: 20,
});
```

See [Chart Layout](/manual/core/chart/chart-component#%E5%9B%BE%E8%A1%A8%E5%B8%83%E5%B1%80) for layout details.

### ChartCfg.renderer

<description>_[canvas](https://www.npmjs.com/package/@antv/g-canvas) | [svg](https://www.npmjs.com/package/@antv/g-svg) | [webGL](https://www.npmjs.com/package/@antv/g-webgl)_ **optional** _default:_ [canvas](https://www.npmjs.com/package/@antv/g-canvas) </description>

Specifies rendering engine (default: canvas). For SVG/WebGL, import respective packages:

```js
import { Chart } from '@antv/g2';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

const chart = new Chart({
  container: 'container',
  // Alternatively, you can choose the WebGLRenderer. If not specified, the default will be CanvasRenderer.
  renderer: new SVGRenderer(),
});
```

See [renderer](/manual/extra-topics/plugin/renderer) for renderer details.

### ChartCfg.theme

<description> _'classic' | 'classicDark' | 'academy' | customTheme_ **optional**</description>

Configures chart theme. Register custom themes using `register` :

```js | ob
(() => {
  // define theme
  function CustomTheme() {
    const light = G2.Light();
    return {
      ...light,
      category20: [
        '#FFC0CB',
        '#A2F5E8',
        '#D4B0FF',
        '#FFF3A3',
        '#9AD6E3',
        '#FFD8B1',
        '#C3E6B4',
        '#E8CFF8',
        '#FFB7A0',
        '#B8D0EB',
        '#F5E6C3',
        '#EED5B7',
        '#C5D4EB',
        '#D9C2F0',
        '#D4EDC9',
        '#B8E0A8',
        '#EFD3A7',
        '#F7CBD4',
        '#F7ABD4',
        '#F0E6E6',
      ],
    };
  }

  // register theme
  G2.register('theme.custom', CustomTheme);

  const chart = new G2.Chart({
    theme: { type: 'custom' }, // use theme
  });

  chart.options({
    type: 'interval',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    },
    encode: { x: 'letter', y: 'frequency', color: 'letter' },
    axis: { y: { labelFormatter: '.0%' } },
  });

  chart.render();

  return chart.getContainer();
})();
```

### ChartCfg.plugins

<description> _any[]_ **optional**</description>

Specify the plugins to be used during rendering. As a flexible extension mechanism, plugins allow users to enhance G2's functionality, such as creating hand-drawn-style charts.

```js
import { Plugin } from '@antv/g-plugin-rough-canvas-renderer';

const chart = new Chart({
  container: 'container',
  plugins: [new Plugin()],
});
```

See [plugin-rough](/manual/extra-topics/plugin/rough) for plugins details.

## Configuring the Chart

Just like version 4.0, G2 5.0 provides an imperative Functional API for defining charts. Here's an example of declaring the simplest bar chart:

```js | ob
(() => {
  // Initialize the chart instance
  const chart = new G2.Chart();

  // declare the visualization
  chart
    .interval() // Create an Interval mark
    .data([
      // Bind the data
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre') // Encode data to the x channel
    .encode('y', 'sold'); // Encode data to the y channel

  // Render the visualization
  chart.render();

  return chart.getContainer();
})();
```

The Functional API is built on top of the Spec API. Simply put, each `Chart` instance has an `options` object. The Functional API generates this `options` object through a series of methods, while the Spec API directly sets it. Regardless of which API you use, G2 ultimately renders the current `options`. Therefore, both APIs are equally capable of defining visualizations.

---

**Setting Properties**

### chart.options()

Retrieve or set the overall chart configuration, known as the Spec.

```js
// Retrieve configuration
chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  })
  .encode('x', 'height')
  .encode('y', 'weight')
  .encode('color', 'gender');
console.log(chart.options());

// Set configuration
chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height', y: 'weight', color: 'gender' },
});
```

### chart.width()

Retrieve or set the width of the chart.

### chart.height()

Retrieve or set the height of the chart.

---

**Creating Composite Containers**

In G2, the Spec is essentially a hierarchical **View Tree**, consisting of various nodes. Each node is defined by `node.type`, which determines its role, and nesting can be achieved through `node.children`.

A "view" can be simply understood as a chart, or a **Single View Plot**. This "tree" uses different container nodes to manage charts in time and space, enabling the creation of **Multiple View Plots**.

For example:

```js
({
  type: 'spaceFlex',
  children: [
    {
      type: 'view',
      children: [{ type: 'line' }, { type: 'point' }],
    },
    {
      type: 'interval',
    },
  ],
});
```

The hierarchy can be declared programmatically using the API by adding specific _child_ nodes to a _parent_ using the syntax `parent.[child]()`. The above hierarchy can be expressed as follows:

```js
const spaceFlex = chart.spaceFlex();

const view = spaceFlex.view();

view.line();

view.point();

spaceFlex.interval();
```

### chart.view()

Add a [view](/manual/core/view) to the chart.

### chart.spaceLayer()

Add a [spaceLayer](/manual/core/composition/space-layer) composite container.

### chart.spaceFlex()

Add a [spaceFlex](/manual/core/composition/space-flex) composite container.

### chart.facetRect()

Add a [facetRect](/manual/core/composition/facet-rect) composite container.

### chart.facetCircle()

Add a [facetCircle](/manual/core/composition/facet-circle) composite container.

### chart.repeatMatrix()

Add a [repeatMatrix](/manual/core/composition/repeat-matrix) composite container.

### chart.geoView()

Add a [geoView](/manual/extra-topics/geo/geo-view) composite container.

### chart.timingKeyframe()

Add a [timingKeyframe](/manual/core/composition/timing-keyframe) composite container.

---

**Creating Marks**

Next, we'll introduce the API in G2 for creating marks. Marks can be added to different container nodes, including `chart`, `view`, `geoView`, `spaceLayer`, `facetRect`, `spaceFlex`, `facetCircle`, `repeatMatrix`, and `timingKeyframe`.

### interval()

Adds an [interval](/manual/core/mark/interval) mark.

### rect()

Adds a [rect](/manual/core/mark/rect) mark.

### point()

Adds a [point](/manual/core/mark/point) mark.

### area()

Adds an [area](/manual/core/mark/area) mark.

### line()

Adds a [line](/manual/core/mark/line) mark.

### vector()

Adds a [vector](/manual/core/mark/vector) mark.

### link()

Adds a [link](/manual/core/mark/link) mark.

### polygon()

Adds a [polygon](/manual/core/mark/polygon) mark.

### image()

Adds an [image](/manual/core/mark/image) mark.

### text()

Adds a [text](/manual/core/mark/text) mark.

### lineX()

Adds a [lineX](/manual/core/mark/line-x) mark.

### lineY()

Adds a [lineY](/manual/core/mark/line-y) mark.

### range()

Adds a [range](/manual/core/mark/range) mark.

### rangeX()

Adds a [rangeX](/manual/core/mark/range-x) mark.

### rangeY()

Adds a [rangeY](/manual/core/mark/range-y) mark.

### connector()

Adds a connector mark.

### sankey()

Adds a [sankey](/manual/extra-topics/graph/sankey) mark.

### treemap()

Adds a [treemap](/manual/extra-topics/graph/treemap) mark.

### boxplot()

Adds a [boxplot](/manual/core/mark/boxplot) mark.

### density()

Adds a [density](/manual/core/mark/density) mark.

### heatmap()

Adds a [heatmap](/manual/core/mark/heatmap) mark.

### shape()

Adds a [custom](/manual/core/mark/shape) shape mark.

### pack()

Adds a [pack](/manual/extra-topics/graph/pack) mark.

### forceGraph()

Adds a [forceGraph](/manual/extra-topics/graph/force-graph) mark.

### tree()

Adds a [tree](/manual/extra-topics/graph/tree) mark.

### wordCloud()

Adds a [wordCloud](/manual/core/mark/wordcloud) mark.

### gauge()

Adds a [gauge](/manual/core/mark/gauge) mark.

### geoPath()

Adds a [geoPath](/manual/extra-topics/geo/geo-path) mark.

### point3D()

Adds a [point3D](/manual/extra-topics/three-dimensional/point-threed) mark.

### line3D()

Adds a [line3D](/manual/extra-topics/three-dimensional/line-threed) mark.

### interval3D()

Adds an [interval3D](/manual/extra-topics/three-dimensional/interval-threed) mark.

### surface3D()

Adds a [surface3D](/manual/extra-topics/three-dimensional/surface-threed) mark.

---

**Setting Attributes**

### attr()

Retrieve or set the attributes of a mark.

```js
// Retrieve attributes
const point = chart.point();
console.log(point.attr());

// Set attributes
point.attr('padding', 0);
```

### data()

Set the data for the mark. Supports various data sources and transformations. See [data](/manual/core/data/overview) for more details.

```js
chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/athletes.json',
});

chart.interval().data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);
```

### encode()

Define how data fields are encoded to visual channels. See [encode](/manual/core/encode) for more details.

```js
chart
  .interval()
  .encode('x', 'civilization')
  .encode('y', ['start', 'end'])
  .encode('color', 'region');

chart.facetCircle().encode('position', 'month');

chart.encode('x', 'year').encode('y', 'value');
```

### scale()

Define the scale of data for each channel. See [scale](/manual/core/scale/overview) for more details.

```js
chart.scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] });

chart.line().scale('y', {
  domain: [0, 1],
});
```

### legend()

Configure the legend for a mark. See [legend](/manual/component/legend) for more details.

```js
// Disable legend for the color channel
chart.legend('color', false);

chart
  .interval()
  .legend('color', { labelFormatter: (d) => (d === 1 ? 'Male' : 'Female') });
```

### tooltip()

Configure tooltips for a mark. See [tooltip](/manual/component/tooltip) for more details.

```js
chart.interval().tooltip({ channel: 'y', valueFormatter: '.0%' });

// Disable tooltip for link marks
chart.link().tooltip(false);
```

### axis()

Configure the axes of a mark. See [axis](/manual/component/axis) for more details.

```js
chart
  .interval()
  .axis('y', { labelFormatter: '~s' })
  .axis('x', { labelTransform: 'rotate(90)' });

chart.axis('y', { title: false });
```

### slider()

Set sliders for the chart to enable panning or zooming. See [slider](/manual/component/slider) for more details.

```js
chart
  .point()
  .slider('x', { labelFormatter: (d) => d.toFixed(1) })
  .slider('y', { labelFormatter: (d) => d.toFixed(1) });

chart.slider('y', true).slider('x', true);
```

### label()

Add labels to a mark. See [label](/manual/component/label) for more details.

```js
chart
  .interval()
  .label({
    text: (d, i) => (i !== 0 ? '转换率' : ''),
    position: 'top-right',
    textAlign: 'left',
    textBaseline: 'middle',
    fill: '#aaa',
    dx: 60,
  })
  .label({
    text: (d, i, data) =>
      i !== 0 ? r(data[i - 1]['value'], data[i]['value']) : '',
    position: 'top-right',
    textAlign: 'left',
    textBaseline: 'middle',
    dx: 60,
    dy: 15,
  });

chart.interval().label({
  text: 'id',
  position: 'spider',
  connectorDistance: 0,
  fontWeight: 'bold',
  textBaseline: 'bottom',
  textAlign: (d) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
  dy: -4,
});
```

### labelTransform()

Configures label transformations for the chart. See [label](/manual/component/label) for details.

```js
chart
  .labelTransform({ type: 'overlapHide' })
  .labelTransform({ type: 'contrastReverse' });

chart.labelTransform([{ type: 'overlapHide' }, { type: 'contrastReverse' }]);
```

### style()

Sets the styles for the chart elements. See [style](/manual/core/style) for details.

```js
chart.rect().style('inset', 0.5);

chart.liquid().data(0.3).style({
  outlineBorder: 4,
  outlineDistance: 8,
  waveLength: 128,
});
```

### theme()

Applies a theme to the chart. See [theme](/manual/core/theme/overview) for details.

```js
chart.theme({ type: 'academy' });

chart.theme({
  type: 'classicDark',
  view: {
    viewFill: '#141414',
  },
}); // Apply dark theme.
```

### interaction()

Configures interactions for the chart. See [interaction](/manual/core/interaction/overview) for details.

```js
// Disable the legendFilter interaction
chart.interaction('legendFilter', false);

chart.line().interaction('tooltip', {
  render: (event, { items }) => {
    const target = event.target;
    const format = (item) => `${item.name}: ${item.value}`;
    if (target.className === 'g2-tooltip-marker') {
      const color = target.style.fill;
      const item = items.find((i) => i.color === color);
      return format(item);
    }
    return items.map(format).join('<br>');
  },
});
```

### animate()

Configures animations for the chart. See [animation](/manual/core/animate/overview) for details.

```js
chart
  .interval()
  .animate('enter', { type: 'fadeIn', duration: 1000 })
  .animate('exit', { type: 'fadeOut', duration: 2000 });

// Disable animations
chart.animate(false);
```

### scrollbar()

Adds scrollbars to the chart. See [scrollbar](/manual/component/scrollbar) for details.

```js
chart.line().scrollbar('x', {}).scrollbar('y', { value: 0.2 });
```

### title()

Sets the chart title. See [title](/manual/component/title) for details.

```js
chart.title({
  align: 'right',
  title: 'Sold by genre, sorted by sold',
  titleFontSize: 15,
  subtitle: 'It shows the sales volume of each genre, sorted by sales.',
  subtitleFill: 'red',
  subtitleFontSize: 12,
  subtitleShadowColor: 'yellow',
  subtitleShadowBlur: 5,
  subtitleFontStyle: 'italic',
});

chart.title('Pareto Chart of Customer Complaints');
```

### state()

Configures styles for different states of the chart. See [state](/manual/core/state) for details.

```js
chart
  .interval()
  .state('selected', { fill: '#1783FF', stroke: 'black', strokeWidth: 1 })
  .state('unselected', { fill: '#ccc' });

chart.sunburst().state({
  active: { zIndex: 2, stroke: 'red' },
  inactive: { zIndex: 1, stroke: '#fff' },
});
```

### transform()

Applies data transformations to the chart. See [transform](/manual/core/transform/overview) for details.

```js
chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/world-history.json',
  })
  .transform({ type: 'sortX', by: 'y' })
  .transform({ type: 'sortColor', by: 'y', reducer: 'min' });

chart.area().transform([{ type: 'stackY' }, { type: 'normalizeY' }]);
```

## Rendering the Chart

### chart.render()

Triggers the rendering of the chart.

```sign
render(): void;
```

### chart.destroy()

Destroys the chart container and canvas, and unbinds all events.

```sign
destroy(): void;
```

### chart.clear()

Clears all the content drawn on the chart but does not destroy the chart. The chart instance remains usable.

```sign
clear(): void;
```

### chart.show()

Displays the graphical elements rendered by the current node.

```sign
show(): void;
```

### chart.hide()

Hides the graphical elements rendered by the current node.

```sign
hide(): void;
```

### chart.changeData()

Updates the data source for the chart and re-renders it.

```sign
changeData(data: any): void;
```

### chart.changeSize()

Changes the width and height of the chart and re-renders it.

```sign
changeSize(width: number, height: number): void;
```

### chart.forceFit()

Automatically adjusts the canvas size to fit its parent DOM container and re-renders the chart.

```sign
forceFit(): void;
```

### mark.changeData()

Updates the data source for a specific mark and re-renders the chart.

```sign
changeData(data: any): void;
```

## Accessing Instances

### chart.getContainer()

Gets the HTML container of the chart.

```sign
getContainer(): HTMLElement;
```

### chart.getContext()

Returns the context information of the chart.

```sign
getContext(): G2Context;
```

### chart.getView()

Returns the view instance used during chart rendering.

```sign
getView(): G2ViewDescriptor;
```

### chart.getCoordinate()

Returns the coordinate instance used during chart rendering.

```sign
getCoordinate(): Coordinate;
```

### chart.getTheme()

Returns the theme instance applied during chart rendering.

```sign
getTheme(): G2Theme;
```

### chart.getGroup()

Returns the canvas group instance used during chart rendering.

```sign
getGroup(): DisplayObject;
```

### chart.getScale()

Returns all the scale instances used during chart rendering.

```sign
getScale(): Record<string, Scale>;
```

### chart.getScaleByChannel()

Finds and returns the scale instance corresponding to a specific channel name during chart rendering.

```sign
getScaleByChannel(channel: string): Scale;
```

### chart.on()

Adds an event listener to the chart.

```sign
on(event: string, callback: (...args: any[]) => any, once?: boolean): this;
```

**Lifecycle Events**

| Event              | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `beforerender`     | Triggered before the chart is rendered.                  |
| `afterrender`      | Triggered after the chart is rendered.                   |
| `beforepaint`      | Triggered after layout calculations but before painting. |
| `afterpaint`       | Triggered after painting has been completed.             |
| `beforechangedata` | Triggered before the chart data is updated.              |
| `afterchangedata`  | Triggered after the chart data has been updated.         |
| `beforechangesize` | Triggered before the chart size is updated.              |
| `afterchangesize`  | Triggered after the chart size has been updated.         |
| `beforedestroy`    | Triggered before the chart is destroyed.                 |
| `afterdestroy`     | Triggered after the chart is destroyed.                  |

You can declare lifecycle events like this:

```js
chart.on('afterrender', (e) => {
  console.log('Chart has been rendered!');
});
```

### chart.once()

Adds an event listener to the chart that is triggered only once.

```sign
once(event: string, callback: (...args: any[]) => any): this;
```

### chart.emit()

Manually triggers an event on the chart.

```sign
emit(event: string, ...args: any[]): this;
```

### chart.off()

Removes one or more event listeners from the chart.

```sign
off(event?: string, callback?: (...args: any[]) => any): void;
```

### chart.getNodesByType()

Finds all child nodes under the chart by a specified type.

```sign
getNodesByType(type: string): Node[];
```

### chart.getNodeByKey()

Finds a specific child node of the chart by its key.

```sign
getNodeByKey(key: string): Node;
```

### chart.append()

Creates a new node and appends it as a child to the chart.

```sign
append(Ctor: new (value: Record<string, any>) => Node<ChildValue, Value>): Node<ChildValue, Value>;
```

### view.getView()

Returns the view instance used during view rendering.

```sign
getView(): G2ViewDescriptor;
```

### view.getCoordinate()

Returns the coordinate instance used during view rendering.

```sign
getCoordinate(): Coordinate;
```

### view.getTheme()

Returns the theme instance applied during view rendering.

```sign
getTheme(): G2Theme;
```

### view.getGroup()

Returns the canvas group instance used during view rendering.

```sign
getGroup(): DisplayObject;
```

### view.getScale()

Returns all the scale instances used during view rendering.

```sign
getScale(): Record<string, Scale>;
```

### view.getScaleByChannel()

Finds and returns the scale instance corresponding to a specific channel name during view rendering.

```sign
getScaleByChannel(channel: string): Scale;
```

### view.getNodesByType()

Finds all child nodes under the view by a specified type.

```sign
getNodesByType(type: string): Node[];
```

### view.getNodeByKey()

Finds a specific child node of the view by its key.

```sign
getNodeByKey(key: string): Node;
```

### mark.getGroup()

Returns the canvas group instance used during mark rendering.

```sign
getGroup(): DisplayObject;
```

### mark.getScale()

Returns all the scale instances used during mark rendering.

```sign
getScale(): Record<string, Scale>;
```

### mark.getScaleByChannel()

Finds and returns the scale instance corresponding to a specific channel name during mark rendering.

```sign
getScaleByChannel(channel: string): Scale;
```
