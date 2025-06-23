---
title: interval
order: 11
---

## Overview

The interval mark (`interval`) is a collection of chart marks used to represent upper and lower intervals of data. It is commonly used to draw bar charts, column charts, pie charts, etc. By changing the coordinate system, scales, and data `Transform`, a variety of visual styles can be produced. For example, grouping multiple parallel categories to form a group and then comparing between groups is called a grouped bar chart or clustered column chart. Splitting categories into multiple subcategories forms a stacked bar chart. Combining bar charts with line charts on the same chart is commonly known as a dual-axis chart, and so on. `interval` is the most commonly used `Mark` in the grammar of graphics.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
    { letter: 'D', frequency: 0.04253 },
    { letter: 'E', frequency: 0.12702 },
    { letter: 'F', frequency: 0.02288 },
    { letter: 'G', frequency: 0.02015 },
    { letter: 'H', frequency: 0.06094 },
    { letter: 'I', frequency: 0.06966 },
    { letter: 'J', frequency: 0.00153 },
    { letter: 'K', frequency: 0.00772 },
    { letter: 'L', frequency: 0.04025 },
    { letter: 'M', frequency: 0.02406 },
    { letter: 'N', frequency: 0.06749 },
    { letter: 'O', frequency: 0.07507 },
    { letter: 'P', frequency: 0.01929 },
    { letter: 'Q', frequency: 0.00095 },
    { letter: 'R', frequency: 0.05987 },
    { letter: 'S', frequency: 0.06327 },
    { letter: 'T', frequency: 0.09056 },
    { letter: 'U', frequency: 0.02758 },
    { letter: 'V', frequency: 0.00978 },
    { letter: 'W', frequency: 0.0236 },
    { letter: 'X', frequency: 0.0015 },
    { letter: 'Y', frequency: 0.01974 },
    { letter: 'Z', frequency: 0.00074 },
  ],
  // Configure visual channels
  encode: {
    x: 'letter', // Configure x channel
    y: 'frequency', // Configure y channel
    shape: 'rect', // Configure shape channel, default is 'rect'. Options: 'rect', 'hollow', 'funnel', 'pyramid'
  },
  style: {
    columnWidthRatio: 0.5, // Set bar width ratio to 0.5
  },
});

chart.render();
```

For more examples, see [Chart Examples - Bar](/en/examples#general-interval), [Chart Examples - Pie](/en/examples#general-pie), and other pages.

## Configuration

| Property   | Description                                                                                                                                                              | Type                      | Default                | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | ---------------------- | -------- |
| encode     | Configure the visual channels of the `interval` mark, including `x`, `y`, `color`, `shape`, etc., to specify the relationship between visual element properties and data | [encode](#encode)         | -                      | ✓        |
| coordinate | Configure the coordinate system for the `interval` mark, which performs a series of point transformations to change the spatial display form of the mark                 | [coordinate](#coordinate) | `{type: 'cartesian' }` |          |
| style      | Configure the graphic style of the `interval` mark                                                                                                                       | [style](#style)           | -                      |          |

### encode

Configure the visual channels of the `interval` mark.

| Property | Description                                                                                                                                                                                                                | Type                                        | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------- | -------- |
| x        | Bind the `x` property channel of the `interval` mark, usually an ordered or unordered field from `data`. Can be empty when drawing pie charts                                                                              | [encode](/en/manual/core/encode)            | -       | ✓        |
| y        | Bind the `y` property channel of the `interval` mark, usually a numeric or array field from `data`                                                                                                                         | [encode](/en/manual/core/encode)            | -       | ✓        |
| color    | Bind the `color` property channel of the `interval` mark. Mapping data fields to the color channel will group the data and split it into multiple shapes with different colors, commonly used for stacked bar charts, etc. | [encode](/en/manual/core/encode)            | -       |          |
| series   | Bind the `series` property channel of the `interval` mark to achieve grouping effects                                                                                                                                      | [encode](/en/manual/core/encode)            | -       |          |
| shape    | Bind the `shape` property channel of the `interval` mark to change the drawing shape of the mark                                                                                                                           | `rect` \| `hollow` \| `funnel` \| `pyramid` | `rect`  |          |

#### x & y

The position visual channels of the `interval` mark require values for both `x` and `y`. Supported data formats are as follows:

- Both `x` and `y` are numbers, for standard bar charts, rose charts, etc.

```js
{
  type: "interval",
  data: [{ name: "Category 1", value: 100 }],
  encode: { x: "name", y: "value" },
}
```

- `x` is a number, `y` is an array, for interval bar charts, interval rose charts, stacked bar charts, stacked rose charts, and symmetric bar charts (funnel charts).

```js
{
  type: "interval",
  data: [{ name: 'Category 1', value: [10, 100] },
  { name: 'Category 2', value: [20, 80] }],
  encode: { x: "name", y: "value" },
}
```

- `x` is empty, `y` is a number. Generally used for pie chart data configuration, where the coordinate system is `theta`, and G2 internally fills in `x` and `y`.

```js
{
  type: "interval",
  data: [
    { item: "Category 1", count: 40, },
    { item: "Category 2", count: 21, },
    { item: "Category 3", count: 17 },
    { item: "Category 4", count: 13 },
    { item: "Category 5", count: 9 },
  ],
  encode: { y: "count", color: "item" },
  transform: [{ type: "stackY" }], // Configure stackY data transform so that the pie sector angle and value size correspond
  coordinate: { type: "theta", }, // Configure theta coordinate system, a special polar coordinate system commonly used for pie charts
}
```

| x channel value | y channel value | Explanation                                                                                  |
| --------------- | --------------- | -------------------------------------------------------------------------------------------- |
| number          | number          | Standard bar chart, rose chart                                                               |
| number          | array           | Interval bar chart, interval rose chart, stacked bar chart, stacked rose chart, funnel chart |
| empty           | number          | Pie chart                                                                                    |

#### color

The `color` visual channel affects the fill color of the `interval` mark. When applied to interval charts, it usually maps to a categorical field and groups the data.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
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

In some special cases, it can also be mapped to a continuous field, using different colors for different value ranges:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { name: 'a1', value: 50 },
    { name: 'a2', value: 60 },
    { name: 'a3', value: 40 },
  ],
  encode: {
    x: 'name',
    y: 'value',
    // The color channel can also accept a callback function to return different values based on conditions
    color: (d) => (d.value > 50 ? 'high' : 'low'),
  },
});

chart.render();
```

Configuring the [stackY](/en/manual/core/transform/stack-y) transform allows stacking of grouped areas, forming a stacked area chart and avoiding information loss due to overlap:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
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
  // Configure visual channels
  encode: { x: 'month', y: 'rainfall', color: 'name' },
  transform: [{ type: 'stackY' }], // Stack y and y1 channels for each group to achieve stacking effect
});

chart.render();
```

#### series

The `series` visual channel divides the data of the `interval` mark into multiple series. It is usually configured together with the `color` channel, or you can configure the [dodgeX](/en/manual/core/transform/dodge-x) transform to generate `series` channel values from the `color` channel, achieving grouping effects based on the `series` channel:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
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
  // Configure visual channels
  encode: {
    x: 'month',
    y: 'rainfall',
    color: 'name', // Configure color channel to group data
    series: 'name', // Configure series channel to divide data into different series
  },
  // transform: [{ type: 'dodgeX' }], // Generate series channel values from color channel, achieving grouping effects based on the series channel
});

chart.render();
```

#### shape

The supported shapes for the `interval` mark are as follows:

| Shape   | Description           | Example                                                                                                          |
| ------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| rect    | Draw filled rectangle | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*y3SSRawOBTMAAAAAAAAAAAAAemJ7AQ/original"></img> |
| hollow  | Draw hollow rectangle | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qTYkSraMAsQAAAAAAAAAAAAAemJ7AQ/original"></img> |
| funnel  | Draw funnel shape     | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5l6BTaPpHPwAAAAAAAAAAAAAemJ7AQ/original"></img> |
| pyramid | Draw pyramid shape    | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*XeSlSLqQbHQAAAAAAAAAAAAAemJ7AQ/original"></img> |

### coordinate

The display of the `interval` mark varies under different coordinate systems. By changing the coordinate system or applying coordinate transforms, you can draw bar charts, column charts, rose charts, pie charts, and more.

| Coordinate System or Transform | Coordinate System Configuration          | Chart Type           |
| ------------------------------ | ---------------------------------------- | -------------------- |
| Cartesian                      | `{ type: 'cartesian' }`                  | Bar, histogram, etc. |
| transpose transform            | `{ transform: [{ type: 'transpose' }] }` | Column, etc.         |
| Polar                          | `{ type: 'polar' }`                      | Rose, etc.           |
| Theta                          | `{ type: 'theta' }`                      | Pie, donut, etc.     |
| Radial                         | `{ type: 'radial' }`                     | Radial, etc.         |

After applying the **transpose transform**, the interval chart appears as a column chart.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { item: 'Category 1', count: 40 },
    { item: 'Category 2', count: 21 },
    { item: 'Category 3', count: 17 },
    { item: 'Category 4', count: 13 },
    { item: 'Category 5', count: 9 },
  ],
  encode: { x: 'item', y: 'count' },
  coordinate: {
    transform: [{ type: 'transpose' }], // Configure transpose transform
  },
});

chart.render();
```

Under the **polar coordinate system**, the interval chart appears as a rose chart, using radius to compare data size.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
  },
  encode: { x: 'year', color: 'year', y: 'people' },
  transform: [{ type: 'groupX', y: 'sum' }], // Group discrete x channel and sum
  coordinate: {
    type: 'polar', // Set coordinate system to polar for rose chart
  },
  axis: false, // Hide axis
});

chart.render();
```

Under the **theta coordinate system**, the interval chart appears as a pie chart, using arc size to compare data size.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { item: 'Category 1', count: 40 },
    { item: 'Category 2', count: 21 },
    { item: 'Category 3', count: 17 },
    { item: 'Category 4', count: 13 },
    { item: 'Category 5', count: 9 },
  ],
  encode: { y: 'count', color: 'item' },
  transform: [{ type: 'stackY' }], // Configure stackY data transform so that the pie sector angle and value size correspond
  coordinate: {
    type: 'theta', // Set coordinate system to theta, a special polar coordinate system for pie charts
    outerRadius: 0.8, // Polar coordinate radius, range 0-1
  },
});

chart.render();
```

Under the **radial coordinate system**, the interval chart appears as a radial chart, also using arcs to compare data size.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { question: 'Question 1', percent: 0.21 },
    { question: 'Question 2', percent: 0.4 },
    { question: 'Question 3', percent: 0.49 },
    { question: 'Question 4', percent: 0.52 },
    { question: 'Question 5', percent: 0.53 },
    { question: 'Question 6', percent: 0.84 },
    { question: 'Question 7', percent: 1 },
    { question: 'Question 8', percent: 1.2 },
  ],
  encode: { x: 'question', y: 'percent', color: 'percent' },
  scale: { color: { range: ['#BAE7FF', '#1890FF'] } }, // Configure color scale for smooth color transition in radial chart
  coordinate: {
    type: 'radial', // Set coordinate system to radial, a special polar coordinate system for radial charts
    innerRadius: 0.1, // Inner radius, range 0-1
    endAngle: 3.141592653589793, // End angle in radians
  },
  animate: { enter: { type: 'waveIn', duration: 800 } }, // Configure enter animation
  axis: { y: { tickFilter: (d, i) => i !== 0 } }, // Filter y axis ticks, hide 0 tick
});

chart.render();
```

### style

Configure the style of the `interval` mark.

| Property               | Description                                                                                                                                                                          | Type                                                             | Default            | Required |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------ | -------- |
| columnWidthRatio       | Set the bar width ratio, range `0` - `1`                                                                                                                                             | number \| (d, index, data, column) => number                     | `0.9`              |          |
| minWidth               | Minimum width of the interval bar, in pixels                                                                                                                                         | number \| (d, index, data, column) => number                     | `- Infinity`       |          |
| maxWidth               | Maximum width of the interval bar, in pixels                                                                                                                                         | number \| (d, index, data, column) => number                     | `Infinity`         |          |
| minHeight              | Minimum height of the interval bar, in pixels                                                                                                                                        | number \| (d, index, data, column) => number                     | `- Infinity`       |          |
| radius                 | Border radius for all four corners of the outer rectangle                                                                                                                            | number \| (d, index, data, column) => number                     | `0`                |          |
| radiusTopLeft          | Top-left corner radius                                                                                                                                                               | number \| (d, index, data, column) => number                     | `0`                |          |
| radiusTopRight         | Top-right corner radius                                                                                                                                                              | number \| (d, index, data, column) => number                     | `0`                |          |
| radiusBottomRight      | Bottom-right corner radius                                                                                                                                                           | number \| (d, index, data, column) => number                     | `0`                |          |
| radiusBottomLeft       | Bottom-left corner radius                                                                                                                                                            | number \| (d, index, data, column) => number                     | `0`                |          |
| innerRadius            | Border radius for all four corners of the inner rectangle                                                                                                                            | number \| (d, index, data, column) => number                     | `0`                |          |
| innerRadiusTopLeft     | Top-left corner radius of the inner rectangle                                                                                                                                        | number \| (d, index, data, column) => number                     | `0`                |          |
| innerRadiusTopRight    | Top-right corner radius of the inner rectangle                                                                                                                                       | number \| (d, index, data, column) => number                     | `0`                |          |
| innerRadiusBottomRight | Bottom-right corner radius of the inner rectangle                                                                                                                                    | number \| (d, index, data, column) => number                     | `0`                |          |
| innerRadiusBottomLeft  | Bottom-left corner radius of the inner rectangle                                                                                                                                     | number \| (d, index, data, column) => number                     | `0`                |          |
| inset                  | Inset padding for all four directions of the rectangle                                                                                                                               | number \| (d, index, data, column) => number                     | `0`                |          |
| insetLeft              | Left inset padding                                                                                                                                                                   | number \| (d, index, data, column) => number                     | `0`                |          |
| insetRight             | Right inset padding                                                                                                                                                                  | number \| (d, index, data, column) => number                     | `0`                |          |
| insetBottom            | Bottom inset padding                                                                                                                                                                 | number \| (d, index, data, column) => number                     | `0`                |          |
| insetTop               | Top inset padding                                                                                                                                                                    | number \| (d, index, data, column) => number                     | `0`                |          |
| fill                   | Fill color of the graphic                                                                                                                                                            | string \| (d, index, data, column) => string                     | '' (when `hollow`) |          |
| fillOpacity            | Fill opacity of the graphic                                                                                                                                                          | number \| (d, index, data, column) => number                     | 0.95 (when `rect`) |          |
| stroke                 | Stroke of the graphic                                                                                                                                                                | string \| (d, index, data, column) => string                     | -                  |          |
| strokeOpacity          | Stroke opacity                                                                                                                                                                       | number \| (d, index, data, column) => number                     | 1 (when `hollow`)  |          |
| lineWidth              | Width of the graphic stroke                                                                                                                                                          | number \| (d, index, data, column) => number                     | 2 (when `hollow`)  |          |
| lineDash               | Dashed stroke configuration. The first value is the length of each dash segment, the second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke. | [number,number] \| (d, index, data, column) => [number , number] | -                  |          |
| opacity                | Overall opacity of the graphic                                                                                                                                                       | number \| (d, index, data, column) => number                     | -                  |          |
| shadowColor            | Shadow color of the graphic                                                                                                                                                          | string \| (d, index, data, column) => string                     | -                  |          |
| shadowBlur             | Gaussian blur coefficient of the graphic shadow                                                                                                                                      | number \| (d, index, data, column) => number                     | -                  |          |
| shadowOffsetX          | Horizontal distance of the shadow from the graphic                                                                                                                                   | number \| (d, index, data, column) => number                     | -                  |          |
| shadowOffsetY          | Vertical distance of the shadow from the graphic                                                                                                                                     | number \| (d, index, data, column) => number                     | -                  |          |
| cursor                 | Mouse cursor style. Same as CSS cursor style.                                                                                                                                        | string \| (d, index, data, column) => string                     | `default`          |          |

Try it out:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  data: [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
  ],
  encode: { x: '月份', y: '月均降雨量', color: 'name' },
  transform: [{ type: 'stackY' }],
  style: {
    minHeight: 20,
    columnWidthRatio: 0.5,
    radiusTopLeft: 20,
    radiusTopRight: 20,
    insetBottom: 5,
    // 绘图属性
    fill: (d) => (d.name === 'London' ? '#688FD4' : '#55BECC'), // 绘图属性也可以是一个回调函数
    fillOpacity: 0.9,
    stroke: '#fff',
    lineWidth: 1,
    lineDash: [4, 5],
    strokeOpacity: 0.5,
    opacity: 1,
    shadowColor: '#BABBBD',
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    cursor: 'pointer',
  },
});

chart.render();
```

## Examples

- How to draw a symmetric bar chart?

When configuring the `y` channel, return a callback function to distinguish positive and negative values based on a categorical field.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { age: 0, sex: 1, people: 9735380 },
    { age: 0, sex: 2, people: 9310714 },
    { age: 5, sex: 1, people: 10552146 },
    { age: 5, sex: 2, people: 10069564 },
    { age: 10, sex: 1, people: 10563233 },
    { age: 10, sex: 2, people: 10022524 },
    { age: 15, sex: 1, people: 10237419 },
    { age: 15, sex: 2, people: 9692669 },
    { age: 20, sex: 1, people: 9731315 },
    { age: 20, sex: 2, people: 9324244 },
    { age: 25, sex: 1, people: 9659493 },
    { age: 25, sex: 2, people: 9518507 },
    { age: 30, sex: 1, people: 10205879 },
    { age: 30, sex: 2, people: 10119296 },
    { age: 35, sex: 1, people: 11475182 },
    { age: 35, sex: 2, people: 11635647 },
    { age: 40, sex: 1, people: 11320252 },
    { age: 40, sex: 2, people: 11488578 },
    { age: 45, sex: 1, people: 9925006 },
    { age: 45, sex: 2, people: 10261253 },
    { age: 50, sex: 1, people: 8507934 },
    { age: 50, sex: 2, people: 8911133 },
    { age: 55, sex: 1, people: 6459082 },
    { age: 55, sex: 2, people: 6921268 },
    { age: 60, sex: 1, people: 5123399 },
    { age: 60, sex: 2, people: 5668961 },
    { age: 65, sex: 1, people: 4453623 },
    { age: 65, sex: 2, people: 4804784 },
    { age: 70, sex: 1, people: 3792145 },
    { age: 70, sex: 2, people: 5184855 },
    { age: 75, sex: 1, people: 2912655 },
    { age: 75, sex: 2, people: 4355644 },
    { age: 80, sex: 1, people: 1902638 },
    { age: 80, sex: 2, people: 3221898 },
    { age: 85, sex: 1, people: 970357 },
    { age: 85, sex: 2, people: 1981156 },
    { age: 90, sex: 1, people: 336303 },
    { age: 90, sex: 2, people: 1064581 },
  ],
  encode: {
    x: 'age',
    y: (d) => (d.sex === 1 ? -d.people : d.people),
    color: 'sex',
  },
  scale: {
    color: { type: 'ordinal' }, // Map color channel to an ordered discrete range, usually for categorical data
    x: { range: [1, 0] }, // Reverse the x channel scale range
  },
  coordinate: { transform: [{ type: 'transpose' }] }, // Configure coordinate transpose to draw a column chart
  axis: { y: { labelFormatter: '~s' } }, // Configure y-axis tick label formatting
  legend: { color: { labelFormatter: (d) => (d === 1 ? 'Male' : 'Female') } }, // Configure color channel legend label formatting
  tooltip: {
    items: [
      (d) => ({
        value: d.people,
        name: d.sex === 1 ? 'Male' : 'Female',
      }),
    ],
  }, // Configure tooltip items
});

chart.render();
```
