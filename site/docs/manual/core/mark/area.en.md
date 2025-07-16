---
title: area
order: 2
---

## Overview

The area (`area`) graphic mark is mostly used to draw common area charts. It is a graphic that reflects numerical changes as ordered variables change, with principles similar to `line`. The characteristic of area charts is that the region between the polyline and the independent variable coordinate axis is filled with color or texture.

Additionally, in terms of data structure, the difference between `area` and `line` is that `area` can set an array of length `2` as the data for the `y` channel. The first and second elements of the array represent the upper and lower boundaries of the area chart respectively. This method is used to draw interval area charts. If not set, the default lower boundary is `0`.

Area charts can also be used for comparing multiple series of data, expressing data totals and trends. Compared to line charts, area charts can not only clearly reflect data trend changes but also emphasize differences and comparisons between data of different categories.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  },
  // Configure visual channels
  encode: {
    x: (d) => new Date(d.date), // Configure x channel
    y: 'close', // Configure y channel
    shape: 'area', // Configure shape channel, can be omitted when default is 'area'. Options: 'area', 'smooth', 'hvh', 'vh', 'hv'
  },
  // Configure styles
  style: {
    fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff', // Configure area chart fill color as gradient
    fillOpacity: 0.9, // Configure area mark fill opacity as 0.9
  },
  // Configure coordinate system
  coordinate: {},
});

chart.render();
```

For more examples, check the [Chart Examples - Area Charts](/en/examples#general-area) page.

## Configuration

| Property   | Description                                                                                                                                       | Type                      | Default Value          | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | -------- |
| encode     | Configure visual channels for `area` marks, including `x`, `y`, `color`, `shape`, etc., to specify relationships between visual elements and data | [encode](#encode)         | -                      | ✓        |
| coordinate | Configure coordinate system for `area` marks. The coordinate system performs a series of point transformations to change the spatial display form | [coordinate](#coordinate) | `{type: 'cartesian' }` |          |
| style      | Configure graphic styles for `area` marks                                                                                                         | [style](#style)           | -                      |          |

### encode

Configure visual channels for `area` marks.

| Property | Description                                                                                                                                                                              | Type                                        | Default Value | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------- | -------- |
| x        | Bind the `x` property channel of `area` marks, usually a time or ordered categorical field in `data`                                                                                     | [encode](/en/manual/core/encode)            | -             | ✓        |
| y        | Bind the `y` property channel of `area` marks, usually a numerical or array field in `data`                                                                                              | [encode](/en/manual/core/encode)            | -             | ✓        |
| color    | Bind the `color` property channel of `area` marks. If data fields are mapped to color channels, data will be grouped and split into multiple areas of different colors for stacked areas | [encode](/en/manual/core/encode)            | -             |          |
| shape    | Bind the `shape` property channel of `area` marks to change the drawing shape of the graphic mark                                                                                        | `area` \| `smooth` \| `vh` \| `hv` \| `hvh` | `area`        |          |

#### x & y

The position visual channels of `area` marks require values from both `x` and `y` fields. The supported data formats are:

- Both `x` and `y` are numerical values (categorical, continuous). Since area charts represent data trends, try to avoid having the field corresponding to the `x` axis be an unordered categorical type.
- `x` is a numerical value (categorical, continuous), `y` is an array representing an interval value

| x Channel Binding | y Channel Binding | Explanation                     |
| ----------------- | ----------------- | ------------------------------- |
| Numerical         | Numerical         | Regular area chart              |
| Numerical         | Array             | Stacked and interval area chart |

#### color

The `color` visual channel affects the fill color of the enclosed area in `area` graphic marks. A single area in an `area` mark can only use one color (or gradient), but if data fields are mapped to color channels, the data will be grouped and split into multiple areas:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  data: [
    { country: 'Asia', year: '1750', value: 502 },
    { country: 'Asia', year: '1800', value: 635 },
    { country: 'Asia', year: '1850', value: 809 },
    { country: 'Asia', year: '1900', value: 947 },
    { country: 'Asia', year: '1950', value: 1402 },
    { country: 'Asia', year: '1999', value: 3634 },
    { country: 'Asia', year: '2050', value: 5268 },
    { country: 'Africa', year: '1750', value: 106 },
    { country: 'Africa', year: '1800', value: 107 },
    { country: 'Africa', year: '1850', value: 111 },
    { country: 'Africa', year: '1900', value: 133 },
    { country: 'Africa', year: '1950', value: 221 },
    { country: 'Africa', year: '1999', value: 767 },
    { country: 'Africa', year: '2050', value: 1766 },
    { country: 'Europe', year: '1750', value: 163 },
    { country: 'Europe', year: '1800', value: 203 },
    { country: 'Europe', year: '1850', value: 276 },
    { country: 'Europe', year: '1900', value: 408 },
    { country: 'Europe', year: '1950', value: 547 },
    { country: 'Europe', year: '1999', value: 729 },
    { country: 'Europe', year: '2050', value: 628 },
  ],
  encode: {
    x: 'year', // Configure x channel
    y: 'value', // Configure y channel
    color: 'country', // Configure color channel
  },
  style: { fillOpacity: 0.3 }, // Configure area mark fill opacity as 0.3
});

chart.render();
```

By configuring [stackY](/en/manual/core/transform/stack-y) in the `transform`, grouped areas can be stacked to form stacked area charts, avoiding information blur caused by overlapping:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  data: [
    { country: 'Asia', year: '1750', value: 502 },
    { country: 'Asia', year: '1800', value: 635 },
    { country: 'Asia', year: '1850', value: 809 },
    { country: 'Asia', year: '1900', value: 947 },
    { country: 'Asia', year: '1950', value: 1402 },
    { country: 'Asia', year: '1999', value: 3634 },
    { country: 'Asia', year: '2050', value: 5268 },
    { country: 'Africa', year: '1750', value: 106 },
    { country: 'Africa', year: '1800', value: 107 },
    { country: 'Africa', year: '1850', value: 111 },
    { country: 'Africa', year: '1900', value: 133 },
    { country: 'Africa', year: '1950', value: 221 },
    { country: 'Africa', year: '1999', value: 767 },
    { country: 'Africa', year: '2050', value: 1766 },
    { country: 'Europe', year: '1750', value: 163 },
    { country: 'Europe', year: '1800', value: 203 },
    { country: 'Europe', year: '1850', value: 276 },
    { country: 'Europe', year: '1900', value: 408 },
    { country: 'Europe', year: '1950', value: 547 },
    { country: 'Europe', year: '1999', value: 729 },
    { country: 'Europe', year: '2050', value: 628 },
  ],
  encode: {
    x: 'year', // Configure x channel
    y: 'value', // Configure y channel
    color: 'country', // Configure color channel
  },
  transform: [{ type: 'stackY' }], // Group by specified channels, stack y and y1 channels for each group to achieve stacking effect
  style: { fillOpacity: 0.3 }, // Configure area mark fill opacity as 0.3
});

chart.render();
```

#### shape

The supported shapes for `area` marks are as follows:

| Shape  | Description                                                             | Example                                                                                                          |
| ------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| area   | Draw area chart with straight line connections                          | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_nCpS59Cc_MAAAAAAAAAAAAAemJ7AQ/original"></img> |
| smooth | Draw area chart with smooth curves                                      | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7GhERYQPy4UAAAAAAAAAAAAAemJ7AQ/original"></img> |
| vh     | Draw step area chart, vertical then horizontal lines                    | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*B893SYRqUUwAAAAAAAAAAAAAemJ7AQ/original"></img> |
| hv     | Draw step area chart, horizontal then vertical lines                    | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*A2RnTI55cVoAAAAAAAAAAAAAemJ7AQ/original"></img> |
| hvh    | Draw step area chart, vertical-horizontal-vertical, midpoint connection | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0QEpT47_yGQAAAAAAAAAAAAAemJ7AQ/original"></img> |

### coordinate

The display of `area` graphic marks differs under different coordinate systems. Depending on the coordinate system or coordinate system transformations, various charts such as area charts and radar charts can be drawn.

| Coordinate System or Transformation | Coordinate Configuration | Chart Type       |
| ----------------------------------- | ------------------------ | ---------------- |
| Cartesian coordinate system         | `{ type: 'cartesian' }`  | Area charts etc  |
| Polar coordinate system             | `{ type: 'polar' }`      | Radar charts etc |

In **polar coordinate systems**, area charts need to be closed. Commonly used to draw radar charts.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
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
  coordinate: { type: 'polar' }, // Configure coordinate system as polar for drawing radar charts
  style: { fillOpacity: 0.5 },
  axis: { x: { grid: true }, y: { zIndex: 1, title: false } }, // Configure chart components - coordinate axis
  scale: { x: { padding: 0.5, align: 0 }, y: { tickCount: 5 } }, // Configure scales for better chart display
});

chart.render();
```

### style

Configure styles for `area` marks.

| Property             | Description                                                                                                                                               | Type                                                            | Default Value                                              | Required |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------- | -------- |
| connect              | Whether to connect null values with `connector` graphics                                                                                                  | boolean                                                         | `false`                                                    |          |
| defined              | Determines if data is a null value                                                                                                                        | (d) => boolean                                                  | `(d) => !Number.isNaN(d) && d !== undefined && d !== null` |          |
| connectFill          | `connector` graphic fill color, will be overridden by the overall `area` mark fill color `fill`                                                          | string \| (d, index, data, column) => string                    | -                                                          |          |
| connectFillOpacity   | `connector` graphic fill opacity                                                                                                                          | number \| (d, index, data, column) => number                    | -                                                          |          |
| connectStroke        | `connector` graphic stroke                                                                                                                                | string \| (d, index, data, column) => string                    | -                                                          |          |
| connectStrokeOpacity | `connector` graphic stroke opacity                                                                                                                        | number \| (d, index, data, column) => number                    | -                                                          |          |
| connectLineWidth     | `connector` graphic stroke width                                                                                                                          | number \| (d, index, data, column) => number                    | -                                                          |          |
| connectLineDash      | `connector` graphic stroke dash configuration. First value is dash segment length, second is gap distance. Setting lineDash to [0,0] results in no stroke | [number,number] \| (d, index, data, column) => [number, number] | -                                                          |          |
| connectOpacity       | `connector` graphic overall opacity                                                                                                                       | number \| (d, index, data, column) => number                    | -                                                          |          |
| connectShadowColor   | `connector` graphic shadow color                                                                                                                          | string \| (d, index, data, column) => string                    | -                                                          |          |
| connectShadowBlur    | `connector` graphic shadow Gaussian blur coefficient                                                                                                      | number \| (d, index, data, column) => number                    | -                                                          |          |
| connectShadowOffsetX | Horizontal distance of shadow from `connector` graphic                                                                                                    | number \| (d, index, data, column) => number                    | -                                                          |          |
| connectShadowOffsetY | Vertical distance of shadow from `connector` graphic                                                                                                      | number \| (d, index, data, column) => number                    | -                                                          |          |
| connectCursor        | `connector` graphic mouse cursor style. Same as CSS cursor style                                                                                          | string \| (d, index, data, column) => string                    | `default`                                                  |          |
| fill                 | `area` graphic fill color                                                                                                                                 | string \| (d, index, data, column) => string                    | -                                                          |          |
| fillOpacity          | `area` graphic fill opacity                                                                                                                               | number \| (d, index, data, column) => number                    | `0.85`                                                     |          |
| stroke               | `area` graphic stroke                                                                                                                                     | string \| (d, index, data, column) => string                    | -                                                          |          |
| strokeOpacity        | `area` graphic stroke opacity                                                                                                                             | number \| (d, index, data, column) => number                    | -                                                          |          |
| lineWidth            | `area` graphic stroke width                                                                                                                               | number \| (d, index, data, column) => number                    | `0`                                                        |          |
| lineDash             | `area` graphic stroke dash configuration. First value is dash segment length, second is gap distance. Setting lineDash to [0, 0] results in no stroke     | [number,number] \| (d, index, data, column) => [number, number] | -                                                          |          |
| opacity              | `area` graphic overall opacity                                                                                                                            | number \| (d, index, data, column) => number                    | -                                                          |          |
| shadowColor          | `area` graphic shadow color                                                                                                                               | string \| (d, index, data, column) => string                    | -                                                          |          |
| shadowBlur           | `area` graphic shadow Gaussian blur coefficient                                                                                                           | number \| (d, index, data, column) => number                    | -                                                          |          |
| shadowOffsetX        | Horizontal distance of shadow from `area` graphic                                                                                                         | number \| (d, index, data, column) => number                    | -                                                          |          |
| shadowOffsetY        | Vertical distance of shadow from `area` graphic                                                                                                           | number \| (d, index, data, column) => number                    | -                                                          |          |
| cursor               | `area` graphic mouse cursor style. Same as CSS cursor style                                                                                               | string \| (d, index, data, column) => string                    | `default`                                                  |          |

Try it out:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  },
  encode: {
    x: (d) => new Date(d.date),
    // Mock missing data. Set NaN from Jan. to Mar.
    y: (d) => (new Date(d.date).getUTCMonth() <= 3 ? NaN : d.close),
  },
  style: {
    connect: true,
    // Configure connector styles
    connectFill: 'grey', // Overridden by fill color
    connectFillOpacity: 0.15,
    // Configure area styles
    fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    opacity: 0.9,
    stroke: 'yellow',
  },
});

chart.render();
```

## Examples

- When using the connect feature, how to determine what kind of data is a null value?

You can use the `defined` configuration to determine whether it's a non-null value. By default, NaN, undefined, and null are null values. If you need data with value `0` to be treated as null for connection:

```js
chart
  .area()
  // ...
  .style('defined', (v) => v === 0);
```
