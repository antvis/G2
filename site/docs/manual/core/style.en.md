---
title: Style
order: 9
---

**Style** in G2 is primarily used to control the visual styling of marks, views, and components.

## Configuration Methods

Marks can set their own styles as well as view styles:

```js
({
  type: 'interval',
  style: {
    // Own style
    stroke: 'black',
    strokeWidth: 2,
  },
  viewStyle: {
    // View style
    viewFill: 'red',
    contentFill: 'yellow',
  },
});
```

```js
// API
// First approach
chart
  .interval()
  .style('stroke', 'black')
  .style('strokeWidth', 2)
  .viewStyle('viewFill', 'red')
  .viewStyle('contentFill', 'yellow');

// Second approach
chart
  .interval()
  .style({
    stroke: 'black',
    strokeWidth: 2,
  })
  .viewStyle({
    viewFill: 'red',
    contentFill: 'yellow',
  });
```

Views can set their own styles:

```js
({
  type: 'view',
  style: {
    viewFill: 'red',
    contentFill: 'yellow',
  },
});
```

```js
// API
// First approach
chart.style('viewFill', 'red').style('contentFill', 'yellow');

// Second approach
chart.style({
  viewFill: 'red',
  contentFill: 'yellow',
});
```

All chart components can also set styles, for example legends:

```ts
({
  type: 'interval',
  legend: {
    color: {
      // Legend item marker styles (categorical legend)
      itemMarkerFill: '#5B8FF9',
      itemMarkerStroke: '#333',
      itemMarkerStrokeOpacity: 0.8,
      
      // Legend item label styles (categorical legend)
      itemLabelFontSize: 12,
      itemLabelFill: '#666',
      itemLabelFontFamily: 'sans-serif',
    },
  },
});
```

## Mark Styles

In addition to setting visual properties through `mark.encode`, they can also be set through `mark.style`. The main differences between the two are:

- Channels set by `mark.encode` are special - either unique to the mark (like the `src` channel for images) or have special logic (like the `x` channel affecting x-axis generation).
- `mark.encode` tends to set data-related channels, while `mark.style` tends to set data-independent channels. However, `mark.style` also supports callbacks for data-driven channels.

### Different Shapes for Marks

For the `shape` property, it can be configured through either `encode.shape` or `style.shape`. The difference is:

**Configure through `encode.shape` (Recommended)**:

- Supports data-driven configuration, allowing dynamic selection of different shapes based on data
- Participates in scale creation and can interact through legends
- Has higher priority and will override `style.shape` settings

**Configure through `style.shape`**:

- Supports static values or callback functions for data-driven implementation
- Does not participate in scale creation and will not generate legends
- Takes effect when `encode.shape` is not set

### Common Shape Configuration Examples

**Configure hollow bar chart**:

```js
// Method 1: Through encode.shape
chart.options({
  type: 'interval',
  encode: {
    x: 'category',
    y: 'value',
    shape: 'hollow', // Configure as hollow rectangle
  },
});

// Method 2: Through style.shape
chart.options({
  type: 'interval',
  encode: {
    x: 'category',
    y: 'value',
  },
  style: {
    shape: 'hollow', // Configure as hollow rectangle
  },
});
```

Shape types supported by different marks:

- **interval**: `rect` (solid rectangle), `hollow` (hollow rectangle), `funnel` (funnel shape), `pyramid` (pyramid shape)
- **point**: `hollow` (hollow circle), `point` (solid circle), `hollowSquare` (hollow square), etc.
- **rect**: `rect` (solid rectangle), `hollow` (hollow rectangle)
- **line**: `line` (straight line), `smooth` (smooth curve), `vh` (step line, vertical then horizontal connection), etc.

Here's a complete example of a hollow bar chart:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    shape: 'hollow', // Configure as hollow rectangle
  },
  style: {
    stroke: '#1890ff', // Set stroke color
    strokeWidth: 2, // Set stroke width
  },
});

chart.render();
```

You can also achieve the same effect through `style.shape` configuration:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
  style: {
    shape: 'hollow', // Configure as hollow rectangle through style
    stroke: '#52c41a', // Set stroke color
    strokeWidth: 2, // Set stroke width
  },
});

chart.render();
```

## View Styles

Styles for different areas can be set using the `${name}${Style}` format, where `Style` represents all styles supported by G's rectangle, such as `fill`, `stroke`, etc. Note that the first letter should be capitalized to form camelCase.

- **view${Style}** - Set the style of the view area
- **plot${Style}** - Set the style of the plot area
- **main${Style}** - Set the style of the main area
- **content${Style}** - Set the style of the content area

For example, coloring different areas in the chart below:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  height: 280,
  inset: 10,
  marginTop: 30,
  marginLeft: 40,
  marginBottom: 10,
  marginRight: 20,
  style: {
    // Set view styles
    viewFill: '#4e79a7',
    plotFill: '#f28e2c',
    mainFill: '#e15759',
    contentFill: '#76b7b2',
  },
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/commits.json',
      },
      encode: {
        x: (d) => new Date(d.time).getUTCHours(),
        y: (d) => new Date(d.time).getUTCDay(),
        size: 'count',
        shape: 'point',
      },
      transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
      scale: { y: { type: 'point' } },
      style: { shape: 'point', fill: '#59a14f' },
      axis: {
        x: { title: 'time (hours)', tickCount: 24 },
        y: { title: 'time (day)', grid: true },
      },
      legend: false,
    },
  ],
});

chart.render();
```

## Component Styles

Component styles refer to the visual styling configurations for various chart components such as axes, legends, labels, titles, etc. Each component provides rich styling configuration options, supporting fine-grained style control over component sub-elements.

### Axis Styles

Axes consist of multiple elements including title, axis line, ticks, tick labels, and grid lines, each of which can be styled independently:

```js
({
  type: 'interval',
  axis: {
    x: {
      // Title styles
      title: 'X Axis Title',
      titleFontSize: 16,
      titleFontFamily: 'Arial',
      titleFontWeight: 'bold',
      titleFill: '#333',
      
      // Axis line styles
      line: true,
      lineStroke: '#666',
      lineLineWidth: 2,
      
      // Tick styles
      tick: true,
      tickStroke: '#999',
      tickLineWidth: 1,
      
      // Tick label styles
      labelFontSize: 12,
      labelFill: '#666',
      labelFontFamily: 'sans-serif',
      
      // Grid line styles
      grid: true,
      gridStroke: '#e6e6e6',
      gridStrokeOpacity: 0.7,
    },
    y: {
      // Y-axis style configuration similar...
    },
  },
});
```

For more configuration on axis styles, see [Axis](/en/manual/component/axis).

### Legend Styles

Legends support both categorical and continuous legend types, both offering rich styling properties:

```js
({
  type: 'interval',
  legend: {
    color: {
      // Title styles
      title: 'Legend Title',
      titleFontSize: 14,
      titleFontFamily: 'Arial',
      titleFill: '#333',
      titleFontWeight: 'bold',
      
      // Legend item marker styles (categorical legend)
      itemMarkerFill: '#5B8FF9',
      itemMarkerStroke: '#333',
      itemMarkerStrokeOpacity: 0.8,
      
      // Legend item label styles (categorical legend)
      itemLabelFontSize: 12,
      itemLabelFill: '#666',
      itemLabelFontFamily: 'sans-serif',
      
      // Continuous legend styles
      ribbon: {
        fill: '#5B8FF9',
        stroke: '#333',
      },
    },
  },
});
```

For more configuration on legend styles, see [Legend](/en/manual/component/legend).

### Label Styles

Data labels support rich text styling configurations:

```js
({
  type: 'interval',
  labels: [
    {
      text: 'value',
      style: {
        fontSize: 12,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fill: '#333',
        stroke: '#fff',
        strokeOpacity: 0.8,
        textAlign: 'center',
        textBaseline: 'middle',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 3,
        dx: 0,
        dy: -10,
      },
    },
  ],
});
```

For more configuration on label styles, see [Label](/en/manual/component/label).

### Title Styles

Chart titles include both main title and subtitle, both supporting detailed style configuration:

```js
({
  type: 'interval',
  title: {
    // Main title
    title: 'Chart Main Title',
    titleFontSize: 20,
    titleFontFamily: 'Arial',
    titleFontWeight: 'bold',
    titleFill: '#333',
    titleStroke: '#000',
    titleLineWidth: 1,
    
    // Subtitle
    subtitle: 'Chart Subtitle',
    subtitleFontSize: 14,
    subtitleFontFamily: 'Arial',
    subtitleFontWeight: 'normal',
    subtitleFill: '#666',
    
    // Layout configuration
    align: 'center',
    spacing: 8,
  },
});
```

For more configuration on title styles, see [Title](/en/manual/component/title).

### Tooltip Styles

Tooltip styles are mainly customized through interaction configuration, supporting CSS styles, marker styles, and crosshair styles:

```js
({
  type: 'interval',
  tooltip: {
    title: 'name',
    items: ['value'],
  },
  interaction: {
    tooltip: {
      // CSS style configuration
      css: {
        '.g2-tooltip': {
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          'font-size': '12px',
          padding: '8px 12px',
          'border-radius': '4px',
          border: '1px solid #ccc',
        },
        '.g2-tooltip-title': {
          'font-weight': 'bold',
          'font-size': '14px',
        },
        '.g2-tooltip-list-item-value': {
          'font-weight': 'normal',
        },
      },
      
      // Marker styles
      marker: true,
      markerFill: '#5B8FF9',
      markerStroke: '#fff',
      markerLineWidth: 2,
      
      // Crosshair styles
      crosshairs: true,
      crosshairsStroke: '#999',
      crosshairsLineDash: [4, 4],
    },
  },
});
```

For more configuration on tooltip styles, see [Tooltip](/en/manual/component/tooltip).

### Style Configuration Consistency

All component style configurations follow the same naming conventions:

- **Text styles**: `fontSize`, `fontFamily`, `fontWeight`, `fill`, `stroke`, etc.
- **Shadow styles**: `shadowColor`, `shadowBlur`, `shadowOffsetX`, `shadowOffsetY`
- **Opacity**: `opacity`, `fillOpacity`, `strokeOpacity`
- **Position offset**: `dx`, `dy`
- **Mouse interaction**: `cursor`

This unified naming convention provides a consistent experience when configuring styles across different components.

## Drawing Properties

G2 uses [G](https://g.antv.antgroup.com/) as its drawing engine. Style configurations for various graphics, such as `line.style` for line charts and `interval.style` for bar charts, as well as some component style configurations like `label.style` and `axis.line${style}`, are directly passed through to G's drawing properties.

For user convenience, here's a brief introduction to commonly used drawing properties in G2:

### Configuring Graphic Styles

| Property      | Description                                                                                                    | Type            | Default   | Required |
| ------------- | -------------------------------------------------------------------------------------------------------------- | --------------- | --------- | -------- |
| fill          | Fill color of the graphic                                                                                      | string          |           |          |
| fillOpacity   | Fill transparency of the graphic                                                                               | number          |           |          |
| stroke        | Stroke color of the graphic                                                                                    | string          |           |          |
| strokeOpacity | Stroke transparency of the graphic                                                                             | number          |           |          |
| lineWidth     | Width of the graphic's stroke                                                                                  | number          |           |          |
| lineDash      | Dashed stroke configuration. First value is the length of each dash, second is the gap. [0,0] means no stroke. | [number,number] |           |          |
| opacity       | Overall transparency of the graphic                                                                            | number          |           |          |
| shadowColor   | Shadow color of the graphic                                                                                    | string          |           |          |
| shadowBlur    | Gaussian blur coefficient for the graphic's shadow                                                             | number          |           |          |
| shadowOffsetX | Horizontal distance of shadow from the graphic                                                                 | number          |           |          |
| shadowOffsetY | Vertical distance of shadow from the graphic                                                                   | number          |           |          |
| cursor        | Mouse cursor style. Same as CSS cursor                                                                         | string          | `default` |          |

Try using the full range of graphic style properties to configure the `interval` graphic style of a basic bar chart in the code editor below:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 30 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  style: {
    fill: 'skyblue',
    fillOpacity: 0.5,
    stroke: 'black',
    lineWidth: 1,
    lineDash: [4, 5],
    strokeOpacity: 0.7,
    opacity: 0.9,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    cursor: 'pointer',
  },
});

chart.render();
```

### Configuring Line Styles

| Property      | Description                                                                                         | Type            | Default   | Required |
| ------------- | --------------------------------------------------------------------------------------------------- | --------------- | --------- | -------- |
| stroke        | Line color                                                                                          | string          |           |          |
| strokeOpacity | Line transparency                                                                                   | number          |           |          |
| lineWidth     | Line width                                                                                          | number          |           |          |
| lineDash      | Dashed line configuration. First value is dash length, second is gap length. [0,0] means no stroke. | [number,number] |           |          |
| opacity       | Overall transparency                                                                                | number          |           |          |
| shadowColor   | Shadow color                                                                                        | string          |           |          |
| shadowBlur    | Gaussian blur coefficient                                                                           | number          |           |          |
| shadowOffsetX | Horizontal distance of shadow from the graphic                                                      | number          |           |          |
| shadowOffsetY | Vertical distance of shadow from the graphic                                                        | number          |           |          |
| cursor        | Mouse cursor style. Same as CSS cursor                                                              | string          | `default` |          |

Try using the full range of line style properties to configure the `line` style of a basic line chart in the code editor below:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'line',
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  style: {
    stroke: 'skyblue',
    strokeOpacity: 0.9,
    lineWidth: 4,
    lineDash: [4, 8],
    opacity: 0.9,
    shadowColor: '#d3d3d3',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    cursor: 'pointer',
  },
});

chart.render();
```

Similarly, we can configure axis grid lines in the same way:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  axis: {
    y: {
      grid: true,
      gridStroke: 'red',
      gridStrokeOpacity: 0.5,
      gridLineWidth: 2,
      gridLineDash: [2, 4],
    },
  },
});

chart.render();
```

### Configuring Text Styles

| Property      | Description                                                                                           | Type                                                       | Default   | Required |
| ------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------- | -------- |
| fontSize      | Font size                                                                                             | number                                                     |           |          |
| fontFamily    | Font family                                                                                           | string                                                     |           |          |
| fontWeight    | Font weight                                                                                           | number                                                     |           |          |
| lineHeight    | Line height of text                                                                                   | number                                                     |           |          |
| textAlign     | Text alignment                                                                                        | `center` \| `end` \| `left` \| `right` \| `start`          | `start`   |          |
| textBaseline  | Text baseline when drawing text                                                                       | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging` | `bottom`  |          |
| fill          | Text fill color                                                                                       | string                                                     |           |          |
| fillOpacity   | Text fill transparency                                                                                | number                                                     |           |          |
| stroke        | Text stroke color                                                                                     | string                                                     |           |          |
| lineWidth     | Text stroke width                                                                                     | number                                                     |           |          |
| lineDash      | Dashed stroke configuration. First value is dash length, second is gap length. [0,0] means no stroke. | [number,number]                                            |           |          |
| strokeOpacity | Stroke transparency                                                                                   | number                                                     |           |          |
| opacity       | Overall text transparency                                                                             | number                                                     |           |          |
| shadowColor   | Text shadow color                                                                                     | string                                                     |           |          |
| shadowBlur    | Gaussian blur coefficient for text shadow                                                             | number                                                     |           |          |
| shadowOffsetX | Horizontal distance of shadow from text                                                               | number                                                     |           |          |
| shadowOffsetY | Vertical distance of shadow from text                                                                 | number                                                     |           |          |
| cursor        | Mouse cursor style. Same as CSS cursor                                                                | string                                                     | `default` |          |
| dx            | Horizontal offset of text                                                                             | number                                                     | 0         |          |
| dy            | Vertical offset of text                                                                               | number                                                     | 0         |          |

Try using the full range of text style properties to configure the center text style of a liquid chart in the code editor below:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'liquid',
  autoFit: true,
  data: 0.581,
  style: {
    waveLength: 50,
    contentText: 'center text',
    outlineBorder: 4,
    outlineDistance: 8,
    // Drawing properties
    contentFontSize: 30,
    contentFontFamily: 'sans-serif',
    contentFontWeight: 500,
    contentLineHeight: 20,
    contentTextAlign: 'center',
    contentTextBaseline: 'middle',
    contentFill: '#fff',
    contentFillOpacity: 0.9,
    contentStroke: 'yellow',
    contentStrokeOpacity: 0.9,
    contentLineWidth: 2,
    contentLineDash: [4, 8],
    contentOpacity: 1,
    contentShadowColor: '#d3d3d3',
    contentShadowBlur: 10,
    contentShadowOffsetX: 10,
    contentShadowOffsetY: 10,
    contentCursor: 'pointer',
    contentDx: 10,
    contentDy: 10,
  },
});

chart.render();
```

Similarly, we can configure title text styles in the same way:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  title: {
    size: 30,
    title: "I am a title",
    align: 'center',
    spacing: 4,

    // Drawing properties
    titleFontSize: 30,
    titleFontFamily: 'sans-serif',
    titleFontWeight: 500,
    titleLineHeight: 30,
    titleTextAlign: 'center',
    titleTextBaseline: 'middle',
    titleFill: '#fff',
    titleFillOpacity: 0.9,
    titleStroke: 'yellow',
    titleStrokeOpacity: 0.9,
    titleLineWidth: 1,
    titleLineDash: [1, 2],
    titleOpacity: 1,
    titleShadowColor: '#d3d3d3',
    titleShadowBlur: 10,
    titleShadowOffsetX: 10,
    titleShadowOffsetY: 10,
    titleCursor: 'pointer',
    titleDx: 10,
    titleDy: 10,
  },
});

chart.render();
```

### Configuring Linear Gradients

<img alt="Linear Gradient" src="https://gw.alipayobjects.com/zos/rmsportal/ieWkhtoHOijxweuNFWdz.png" width="600">

> Note: `l` indicates linear gradient usage. Green text represents variables that users can customize.

```js
// Using gradient stroke, gradient angle 0, starting color #ffffff, midpoint color #7ec2f3, ending color #1890ff
stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff';
// The following syntax is also supported
stroke: 'linear-gradient(270deg, #ffffff 0%, #7ec2f3 50%, #1890ff 100%)';
```

Try configuring the fill color of an area chart as a linear gradient in the code editor below:

```js | ob { inject: true }
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/area_gradient.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stocks.json',
    transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
  },
  children: [
    {
      type: 'area',
      encode: { x: (d) => new Date(d.date), y: 'price' },
      style: { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' },
      // style: { fill: "linear-gradient(270deg, #ffffff 0%, #7ec2f3 50%, #1890ff 100%)" },
    },
  ],
});

chart.render();
```

You can also create a gradient gauge by configuring the `color` channel scale in the code editor below:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'gauge',
  data: {
    value: { target: 159, total: 400, name: 'score', thresholds: [200, 400] },
  },
  scale: {
    color: { range: ['l(0):0:#37b38e 1:#D9C652', 'l(0):0:#D9C652 1:#f96e3e'] },
  },
  style: {
    textContent: (target, total) => `Score: ${target}
Ratio: ${(target / total) * 100}%`,
  },
  legend: false,
});

chart.render();
```

### Configuring Radial Gradients

<img alt="Radial Gradient" src="https://gw.alipayobjects.com/zos/rmsportal/qnvmbtSBGxQlcuVOWkdu.png" width="600">

> Note: `r` indicates radial gradient usage. Green text represents variables that users can customize. The x, y, r values of the starting circle are all relative values in the 0-1 range.

```ts
// Using gradient fill, gradient starting circle center at the bounding box center of the filled object, radius 0.1 times (bounding box diagonal length / 2), starting color #ffffff, ending color #1890ff
fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff';
```

Try configuring the fill color of a bar chart as a radial gradient in the code editor below:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  height: 350,
  data: [
    { genre: 'Sports', sold: 30 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  style: {
    fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff',
  },
});

chart.render();
```

### Configuring Patterns

Fill graphics with specific patterns. Pattern content can be images or Data URLs.

<img alt="Pattern" src="https://gw.alipayobjects.com/zos/rmsportal/NjtjUimlJtmvXljsETAJ.png" width="600">

> Note: `p` indicates pattern usage. Green text represents variables that users can customize.

- `a`: The pattern repeats in both horizontal and vertical directions
- `x`: The pattern repeats only horizontally
- `y`: The pattern repeats only vertically
- `n`: The pattern displays only once (no repeat)

```ts
style: {
  fill: 'p(a)https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*58XjQY1tO7gAAAAAAAAAAABkARQnAQ',
}
```

Try configuring the fill color of a bar chart as a pattern in the code editor below:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  height: 350,
  data: [
    { genre: 'Sports', sold: 30 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  style: {
    fill: 'p(a)https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*58XjQY1tO7gAAAAAAAAAAABkARQnAQ',
  },
});

chart.render();
```

In addition, G2 provides multiple ways to set patterns including `built-in patterns` and `G API custom patterns`. For details, see [Setting Patterns](/en/manual/extra-topics/pattern).
