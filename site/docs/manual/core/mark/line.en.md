---
title: line
order: 12
---

## Overview

The line chart (`line`) mark draws lines connecting a series of points to display data changes across an ordered dimension. It's commonly used to create line charts and is one of the most frequently used `Mark` types.

Line charts are used to analyze how things change over time or ordered categories. With multiple data groups, they analyze the interaction and influence of multiple data groups over time or ordered categories. The direction of the line indicates positive/negative changes, while the slope indicates the degree of change.

## Getting Started

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  width: 900,
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
});

chart.render();
```

For more examples, check out the [Chart Examples - Line Charts](/en/examples#general-line) page.

## Configuration Options

| Property   | Description                                                                                                                                              | Type                      | Default Value          | Required |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | -------- |
| encode     | Configure visual channels for `line` mark, including `x`, `y`, `color`, `shape`, `size`, etc., to specify relationships between visual elements and data | [encode](#encode)         | -                      | ✓        |
| coordinate | Configure coordinate system for `line` mark, which performs a series of point transformations to change the spatial display form of the mark             | [coordinate](#coordinate) | `{type: 'cartesian' }` |          |
| style      | Configure graphic styles for `line` mark                                                                                                                 | [style](#style)           | -                      |          |

### encode

Configure visual channels for the `line` mark.

| Property | Description                                                                                                                                                                                                                        | Type                                                   | Default Value | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------- | -------- |
| x        | Bind the `x` property channel for `line` mark, typically a time or ordered categorical field from `data`                                                                                                                           | [encode](/en/manual/core/encode)                       | -             | ✓        |
| y        | Bind the `y` property channel for `line` mark, typically a numerical field from `data`                                                                                                                                             | [encode](/en/manual/core/encode)                       | -             | ✓        |
| color    | Bind the `color` property channel for `line` mark. When mapping data fields to color channel, data is grouped and split into multiple lines with different colors for multi-line charts, or split into multi-colored line segments | [encode](/en/manual/core/encode)                       | -             |          |
| series   | Bind the `series` property channel for `line` mark, implementing series line charts based on the series channel                                                                                                                    | [encode](/en/manual/core/encode)                       | -             |          |
| shape    | Bind the `shape` property channel for `line` mark, changing the drawing shape of the graphic mark                                                                                                                                  | `line` \| `smooth` \| `vh` \| `hv` \| `hvh` \| `trail` | `line`        |          |
| size     | Bind the `size` property channel for `line` mark, changing the size of the graphic mark. For lines, the `size` visual channel maps to line width                                                                                   | [encode](/en/manual/core/encode)                       | -             |          |

#### color

The `color` visual channel affects the fill color of the `line` graphic mark. When applied to line charts, it generally maps categorical fields to group data.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { name: 'London', month: 'Jan.', rainfall: 18.9 },
    { name: 'London', month: 'Feb.', rainfall: 28.8 },
    { name: 'London', month: 'Mar.', rainfall: 39.3 },
    { name: 'London', month: 'Apr.', rainfall: 81.4 },
    { name: 'London', month: 'May', rainfall: 47 },
    { name: 'London', month: 'Jun.', rainfall: 20.3 },
    { name: 'London', month: 'Jul.', rainfall: 24 },
    { name: 'London', month: 'Aug.', rainfall: 35.6 },
    { name: 'Berlin', month: 'Jan.', rainfall: 12.4 },
    { name: 'Berlin', month: 'Feb.', rainfall: 23.2 },
    { name: 'Berlin', month: 'Mar.', rainfall: 34.5 },
    { name: 'Berlin', month: 'Apr.', rainfall: 99.7 },
    { name: 'Berlin', month: 'May', rainfall: 52.6 },
    { name: 'Berlin', month: 'Jun.', rainfall: 35.5 },
    { name: 'Berlin', month: 'Jul.', rainfall: 37.4 },
    { name: 'Berlin', month: 'Aug.', rainfall: 42.4 },
  ],
  encode: {
    x: 'month',
    y: 'rainfall',
    color: 'name', // Configure color channel to group data
  },
});

chart.render();
```

In some special cases, it can also map to continuous fields, using different colors for graphics corresponding to different value ranges:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { year: '2000', value: 50 },
    { year: '2001', value: 52 },
    { year: '2002', value: 40 },
    { year: '2003', value: 70 },
    { year: '2004', value: 60 },
    { year: '2005', value: 80 },
    { year: '2006', value: 88 },
    { year: '2007', value: 86 },
    { year: '2008', value: 90 },
    { year: '2009', value: 78 },
    { year: '2010', value: 110 },
    { year: '2011', value: 115 },
  ],
  encode: {
    x: 'year',
    y: 'value',
    color: 'value',
  },
  scale: {
    y: { nice: true },
    color: { palette: 'turbo' },
  },
  style: {
    gradient: 'y', // Gradient direction
    lineWidth: 2,
    lineJoin: 'bevel', // Connection style
  },
});

chart.render();
```

#### series

The `series` visual channel groups data to draw series line charts.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { name: 'London', month: 'Jan.', rainfall: 18.9 },
    { name: 'London', month: 'Feb.', rainfall: 28.8 },
    { name: 'London', month: 'Mar.', rainfall: 39.3 },
    { name: 'London', month: 'Apr.', rainfall: 81.4 },
    { name: 'London', month: 'May', rainfall: 47 },
    { name: 'London', month: 'Jun.', rainfall: 20.3 },
    { name: 'London', month: 'Jul.', rainfall: 24 },
    { name: 'London', month: 'Aug.', rainfall: 35.6 },
    { name: 'Berlin', month: 'Jan.', rainfall: 12.4 },
    { name: 'Berlin', month: 'Feb.', rainfall: 23.2 },
    { name: 'Berlin', month: 'Mar.', rainfall: 34.5 },
    { name: 'Berlin', month: 'Apr.', rainfall: 99.7 },
    { name: 'Berlin', month: 'May', rainfall: 52.6 },
    { name: 'Berlin', month: 'Jun.', rainfall: 35.5 },
    { name: 'Berlin', month: 'Jul.', rainfall: 37.4 },
    { name: 'Berlin', month: 'Aug.', rainfall: 42.4 },
    { name: 'Paris', month: 'Jan.', rainfall: 14.4 },
    { name: 'Paris', month: 'Feb.', rainfall: 26.2 },
    { name: 'Paris', month: 'Mar.', rainfall: 37.5 },
    { name: 'Paris', month: 'Apr.', rainfall: 120.7 },
    { name: 'Paris', month: 'May', rainfall: 56.6 },
    { name: 'Paris', month: 'Jun.', rainfall: 45.5 },
    { name: 'Paris', month: 'Jul.', rainfall: 47.4 },
    { name: 'Paris', month: 'Aug.', rainfall: 62.4 },
  ],
  encode: { x: 'month', y: 'rainfall', series: 'name', shape: 'smooth' },
});

chart.render();
```

#### shape

The supported shapes for `line` mark are:

| Shape  | Description                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
| line   | Draw straight line connections                                                                                     |
| smooth | Draw smooth curve connections                                                                                      |
| vh     | Draw step line chart, vertical line first then horizontal line connection                                          |
| hv     | Draw step line chart, horizontal line first then vertical line connection                                          |
| hvh    | Draw step line chart, vertical-horizontal-vertical, midpoint connection                                            |
| trail  | Draw trail, similar to a brush stroke, used to draw lines with varying thickness when `size` channel is configured |

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
const shapeList = ['line', 'smooth', 'trail', 'vh', 'hv', 'hvh'];
const shapeMap = shapeList.map((p) => {
  return {
    label: p,
    value: p,
  };
});

chart.options({
  type: 'line',
  data: [
    { name: 'London', month: 'Jan.', rainfall: 18.9 },
    { name: 'London', month: 'Feb.', rainfall: 28.8 },
    { name: 'London', month: 'Mar.', rainfall: 39.3 },
    { name: 'London', month: 'Apr.', rainfall: 81.4 },
    { name: 'London', month: 'May', rainfall: 47 },
    { name: 'London', month: 'Jun.', rainfall: 20.3 },
    { name: 'London', month: 'Jul.', rainfall: 24 },
    { name: 'London', month: 'Aug.', rainfall: 35.6 },
    { name: 'Berlin', month: 'Jan.', rainfall: 12.4 },
    { name: 'Berlin', month: 'Feb.', rainfall: 23.2 },
    { name: 'Berlin', month: 'Mar.', rainfall: 34.5 },
    { name: 'Berlin', month: 'Apr.', rainfall: 99.7 },
    { name: 'Berlin', month: 'May', rainfall: 52.6 },
    { name: 'Berlin', month: 'Jun.', rainfall: 35.5 },
    { name: 'Berlin', month: 'Jul.', rainfall: 37.4 },
    { name: 'Berlin', month: 'Aug.', rainfall: 42.4 },
  ],
  encode: { x: 'month', y: 'rainfall', color: 'name', size: 'rainfall' },
});

const handleSetShape = (shape) => {
  chart.options({
    encode: {
      x: 'month',
      y: 'rainfall',
      color: 'name',
      size: 'rainfall',
      shape,
    },
  });
  chart.render(); // Re-render chart
};

// Insert Shape selector
const selectorContainer = document.createElement('div');
selectorContainer.textContent = 'Select line shape ';
const selector = document.createElement('select');
selector.innerHTML = shapeMap.map(
  (shape, index) =>
    `<option value="${shape.value}" ${index === 0 ? 'selected' : ''}>${
      shape.label
    }</option>`,
);
selector.onchange = (e) => {
  handleSetShape(e.target.value);
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
```

#### size

Bind the `size` property channel for `line` mark to change the size of the graphic mark. For lines, the `size` visual channel maps to line width, typically used together with the `trail` shape in the `shape` channel.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { name: 'London', month: 'Jan.', rainfall: 18.9 },
    { name: 'London', month: 'Feb.', rainfall: 28.8 },
    { name: 'London', month: 'Mar.', rainfall: 39.3 },
    { name: 'London', month: 'Apr.', rainfall: 81.4 },
    { name: 'London', month: 'May', rainfall: 47 },
    { name: 'London', month: 'Jun.', rainfall: 20.3 },
    { name: 'London', month: 'Jul.', rainfall: 24 },
    { name: 'London', month: 'Aug.', rainfall: 35.6 },
  ],
  encode: {
    x: 'month',
    y: 'rainfall',
    size: 'rainfall',
    shape: 'trail',
  },
});

chart.render();
```

### coordinate

The `line` graphic mark displays differently in different coordinate systems. Depending on the coordinate system or coordinate transformations, you can draw line charts, bar charts, radar charts, pie charts, and various other chart types.

| Coordinate System or Transform | Coordinate Configuration | Chart Type                 |
| ------------------------------ | ------------------------ | -------------------------- |
| Cartesian coordinate system    | `{ type: 'cartesian' }`  | Line charts, etc.          |
| Polar coordinate system        | `{ type: 'polar' }`      | Radar charts, etc.         |
| `parallel` coordinate system   | `{ type: 'parallel' }`   | Parallel coordinates, etc. |

In **polar coordinate system**, line charts appear as radar charts. In polar coordinates, line area charts need to be closed. Commonly used to draw radar charts, etc.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { item: 'Design', type: 'a', score: 70 },
    { item: 'Design', type: 'b', score: 30 },
    { item: 'Development', type: 'a', score: 60 },
    { item: 'Development', type: 'b', score: 70 },
    { item: 'Marketing', type: 'a', score: 50 },
    { item: 'Marketing', type: 'b', score: 60 },
    { item: 'Users', type: 'a', score: 40 },
    { item: 'Users', type: 'b', score: 50 },
    { item: 'Test', type: 'a', score: 60 },
    { item: 'Test', type: 'b', score: 70 },
    { item: 'Language', type: 'a', score: 70 },
    { item: 'Language', type: 'b', score: 50 },
    { item: 'Technology', type: 'a', score: 50 },
    { item: 'Technology', type: 'b', score: 40 },
    { item: 'Support', type: 'a', score: 30 },
    { item: 'Support', type: 'b', score: 40 },
    { item: 'Sales', type: 'a', score: 60 },
    { item: 'Sales', type: 'b', score: 40 },
    { item: 'UX', type: 'a', score: 50 },
    { item: 'UX', type: 'b', score: 60 },
  ],
  encode: { x: 'item', y: 'score', color: 'type' },
  // Adjust scale to make polar coordinate display more friendly
  scale: {
    x: { padding: 0.5, align: 0 },
    y: { tickCount: 5, domainMin: 0, domainMax: 80 },
  },
  coordinate: { type: 'polar' }, // Set polar coordinate system transformation
  style: { lineWidth: 2 },
  axis: {
    x: { grid: true, gridLineWidth: 1, tick: false, gridLineDash: [0, 0] },
    y: {
      zIndex: 1,
      title: false,
      gridLineWidth: 1, // Grid line width
      gridLineDash: [0, 0], // Grid line dash style
      gridAreaFill: (dataum, index, data) => {
        return index % 2 === 1 ? 'rgba(0, 0, 0, 0.04)' : '';
      }, // Grid area fill
    },
  },
});

chart.render();
```

In **parallel coordinate system**, line charts are commonly used to draw parallel coordinate plots. Parallel coordinate plots are statistical charts containing multiple vertical parallel coordinate axis. Each vertical coordinate axis represents a field, and each field uses scales to indicate ranges. This way, multidimensional data can easily find "landing points" on each axis, connecting them to form a line. As data increases and lines stack up, analysts may discover characteristics and patterns, such as clustering relationships between data.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
const positionList = [
  'position',
  'position1',
  'position2',
  'position3',
  'position4',
  'position5',
  'position6',
  'position7',
];
const axis = {
  zIndex: 1,
  titlePosition: 'right',
  line: true,
  labelStroke: '#fff',
  labelLineWidth: 5,
  labelFontSize: 10,
  labelStrokeLineJoin: 'round',
  titleStroke: '#fff',
  titleFontSize: 10,
  titleLineWidth: 5,
  titleStrokeLineJoin: 'round',
  titleTransform: 'translate(-50%, 0) rotate(-90)',
  lineStroke: 'black',
  tickStroke: 'black',
  lineLineWidth: 1,
};

chart.options({
  type: 'line',
  paddingLeft: 20,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/cars3.json',
  },
  encode: {
    position: [
      'economy (mpg)',
      'cylinders',
      'displacement (cc)',
      'power (hp)',
      'weight (lb)',
      '0-60 mph (s)',
      'year',
    ],
    color: 'weight (lb)',
  },
  axis: Object.fromEntries(positionList.map((item) => [item, axis])),
  scale: { color: { palette: 'brBG', offset: (t) => 1 - t } },
  coordinate: { type: 'parallel' }, // Configure parallel coordinate system transformation
  style: { lineWidth: 1.5, strokeOpacity: 0.4 },
  legend: { color: { length: 400, layout: { justifyContent: 'center' } } },
  interaction: { tooltip: { series: false } },
});

chart.render();
```

### style

Configure styles for the `line` mark.

| Property             | Description                                                                                                                                                        | Type                          | Default Value                                              | Required |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ---------------------------------------------------------- | -------- |
| gradient             | Configure gradient direction for gradient line charts, defaults to `y` when true                                                                                   | `x` \| `y` \|true             | false                                                      |          |
| gradientColor        | Color corresponding to gradient part for each node                                                                                                                 | `between` \| `start` \|`end`  | `between`                                                  |          |
| lineJoin             | Connection style, see [lineJoin](https://g.antv.antgroup.com/api/basic/display-object#%E6%8F%8F%E8%BE%B9)                                                          | `miter` \| `round` \| `bevel` | -                                                          |          |
| connect              | Whether to connect null values with `connector` graphics                                                                                                           | boolean                       | false                                                      |          |
| defined              | Determine if data is null                                                                                                                                          | (d: any) => boolean           | `(d) => !Number.isNaN(d) && d !== undefined && d !== null` |          |
| connectFill          | `connector` graphic fill color                                                                                                                                     | string                        | -                                                          |          |
| connectFillOpacity   | `connector` graphic fill opacity                                                                                                                                   | number                        | -                                                          |          |
| connectStroke        | `connector` graphic stroke                                                                                                                                         | string                        | -                                                          |          |
| connectStrokeOpacity | `connector` graphic stroke opacity                                                                                                                                 | number                        | -                                                          |          |
| connectLineWidth     | `connector` graphic stroke width                                                                                                                                   | number                        | -                                                          |          |
| connectLineDash      | `connector` graphic stroke dash configuration, first value is dash segment length, second value is segment gap distance. Setting lineDash to [0,0] removes stroke. | [number,number]               | -                                                          |          |
| connectOpacity       | `connector` graphic overall opacity                                                                                                                                | number                        | -                                                          |          |
| connectShadowColor   | `connector` graphic shadow color                                                                                                                                   | string                        | -                                                          |          |
| connectShadowBlur    | `connector` graphic shadow gaussian blur coefficient                                                                                                               | number                        | -                                                          |          |
| connectShadowOffsetX | Set horizontal distance of shadow from `connector` graphic                                                                                                         | number                        | -                                                          |          |
| connectShadowOffsetY | Set vertical distance of shadow from `connector` graphic                                                                                                           | number                        | -                                                          |          |
| connectCursor        | `connector` graphic mouse style. Same as CSS mouse style.                                                                                                          | string                        | `default`                                                  |          |
| stroke               | `line` graphic stroke                                                                                                                                              | string                        | -                                                          |          |
| strokeOpacity        | `line` graphic stroke opacity                                                                                                                                      | number                        | `1`                                                        |          |
| lineWidth            | `line` graphic stroke width                                                                                                                                        | number                        | `1`                                                        |          |
| lineDash             | `line` graphic stroke dash configuration, first value is dash segment length, second value is segment gap distance. Setting lineDash to [0, 0] removes stroke.     | [number,number]               | -                                                          |          |
| opacity              | `line` graphic overall opacity                                                                                                                                     | number                        | -                                                          |          |
| shadowColor          | `line` graphic shadow color                                                                                                                                        | string                        | -                                                          |          |
| shadowBlur           | `line` graphic shadow gaussian blur coefficient                                                                                                                    | number                        | -                                                          |          |
| shadowOffsetX        | Set horizontal distance of shadow from `line` graphic                                                                                                              | number                        | -                                                          |          |
| shadowOffsetY        | Set vertical distance of shadow from `line` graphic                                                                                                                | number                        | -                                                          |          |
| cursor               | `line` graphic mouse style. Same as CSS mouse style.                                                                                                               | string                        | `default`                                                  |          |

Try it out:

```js | ob {. inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/doughnut-purchases.json',
    transform: [
      // Mock missing data.
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          count: ['2004'].includes(d.year) ? NaN : d.count,
        }),
      },
    ],
  },
  style: {
    gradient: 'x',
    gradientColor: 'start',
    lineJoin: 'round',
    connect: true,
    connectStroke: '#aaa',
    connectLineWidth: 1,
    connectLineDash: [2, 4],
    lineWidth: 3,
    opacity: 0.9,
    shadowColor: '#d3d3d3',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
  },
  encode: { x: 'year', y: 'count', color: 'year', shape: 'smooth' },
  scale: { y: { zero: true, nice: true } },
  axis: { y: { labelFormatter: '~s' } },
  labels: [
    {
      text: 'count',
    },
  ],
});

chart.render();

```

## Examples

- How to draw a zero-value line chart?

Configure the `scale` for the `y` channel to customize the y-axis domain.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { date: '06-10', count: 0, type: 'Test' },
    { date: '06-11', count: 0, type: 'Test' },
    { date: '06-12', count: 0, type: 'Test' },
    { date: '06-13', count: 0, type: 'Test' },
    { date: '06-14', count: 0, type: 'Test' },
    { date: '06-15', count: 0, type: 'Test' },
    { date: '06-16', count: 0, type: 'Test' },
  ],
  encode: { x: 'date', y: 'count' },
  scale: { y: { domain: [0, 1] } },
});
chart.render();
```
