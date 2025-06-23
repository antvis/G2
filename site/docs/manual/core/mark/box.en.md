---
title: box
order: 3
---

## Overview

The `box` mark is used to draw boxplots (also known as box-and-whisker plots), which are statistical charts used to display the distribution of a dataset. Boxplots typically contain the following key statistical values:

- **Minimum**: The smallest value in the dataset (excluding outliers)
- **Lower Quartile (Q1)**: The value at the 25th percentile of the dataset
- **Median (Q2)**: The value at the 50th percentile of the dataset
- **Upper Quartile (Q3)**: The value at the 75th percentile of the dataset
- **Maximum**: The largest value in the dataset (excluding outliers)

The special characteristic of the `box` mark is that its `y` channel corresponds to data that is an array containing these statistical values. G2 maps this data to a collection of 14 points needed for the boxplot, forming a complete boxplot graphic.

<img alt="box" width="100%" style="max-width: 400px" src="https://gw.alipayobjects.com/zos/antfincdn/f6WEf%24CrgE/20220913111713.jpg" />

The difference between the `box` mark and the [`boxplot`](/en/manual/core/mark/boxplot) mark is:

- `box` is an atomic mark that requires developers to manually specify data for the 5 statistical points
- `boxplot` is a high-level mark with built-in data grouping and statistical aggregation functionality

Therefore, `box` is more suitable for visualization after backend computation and statistics on large datasets, while `boxplot` is more suitable for frontend data exploration and analysis.

### Point Collection Structure of Boxplot

The `box` mark internally maps data to the following collection of 14 points, forming a complete boxplot:

```text
p0           p2          p1
   ──────────┬──────────
             │
             │
             │
             │ p3
p4 ┌─────────┴──────────┐ p5
   │                    │
   │                    │
p8 ├────────────────────┤ p9
   │                    │
   │        p10         │
p7 └─────────┬──────────┘ p6
             │
             │
             │
  ───────────┴───────────
p12         p11           p13
```

## Configuration

| Property   | Description                                                                              | Type                      | Default Value          | Required |
| ---------- | ---------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | -------- |
| encode     | Configure visual channels for the `box` mark, including `x`, `y`, `color`, `shape`, etc. | [encode](#encode)         | -                      | ✓        |
| coordinate | Configure the coordinate system for the `box` mark, which performs point transformations | [coordinate](#coordinate) | `{type: 'cartesian' }` |          |
| style      | Configure the graphic style of the `box` mark                                            | [style](#style)           | -                      |          |

### encode

Configure visual channels for the `box` mark.

| Property | Description                                                                                                                                   | Type                             | Default Value | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------- | -------- |
| x        | Bind the `x` property channel for the `box` mark, usually a categorical field                                                                 | [encode](/en/manual/core/encode) | -             | ✓        |
| y        | Bind the `y` property channel for the `box` mark, usually an array containing 5 statistical values in order: minimum, Q1, median, Q3, maximum | [encode](/en/manual/core/encode) | -             | ✓        |
| color    | Bind the `color` property channel for the `box` mark, used to distinguish boxplots of different categories                                    | [encode](/en/manual/core/encode) | -             |          |
| shape    | Bind the `shape` property channel for the `box` mark, available values are `box`, `violin`                                                    | `'box'` \| `'violin'`            | `'box'`       |          |
| series   | Bind the `series` property channel for the `box` mark, used for grouped display of boxplots                                                   | [encode](/en/manual/core/encode) | -             |          |

### coordinate

The display of `box` marks varies under different coordinate systems. Different boxplot forms can be drawn based on coordinate systems or coordinate transformations.

| Coordinate System or Transform | Coordinate Configuration | Chart            |
| ------------------------------ | ------------------------ | ---------------- |
| Cartesian Coordinate System    | `{ type: 'cartesian' }`  | Standard Boxplot |
| Polar Coordinate System        | `{ type: 'polar' }`      | Polar Boxplot    |

### style

Configure the graphic style of the `box` mark. The `box` mark supports two shapes: `box` (default) and `violin`.

| Property      | Description                                                                                       | Type                                                                    | Default Value | Required |
| ------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------- | -------- |
| fill          | Fill color of the graphic                                                                         | `string` \| `(datum, index, data, column) => string`                    | -             |          |
| fillOpacity   | Fill opacity of the graphic                                                                       | `number` \| `(datum, index, data, column) => number`                    | `0.95`        |          |
| stroke        | Stroke color of the graphic                                                                       | `string` \| `(datum, index, data, column) => string`                    | `#000`        |          |
| strokeOpacity | Stroke opacity                                                                                    | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| lineWidth     | Width of the graphic stroke                                                                       | `number` \| `(datum, index, data, column) => number`                    | `1`           |          |
| lineDash      | Dash pattern for stroke, first value is length of each dash segment, second is gap between dashes | `[number,number]` \| `(datum, index, data, column) => [number, number]` | -             |          |
| opacity       | Overall opacity of the graphic                                                                    | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| shadowColor   | Shadow color of the graphic                                                                       | `string` \| `(datum, index, data, column) => string`                    | -             |          |
| shadowBlur    | Gaussian blur coefficient for the graphic shadow                                                  | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| shadowOffsetX | Horizontal distance of shadow from graphic                                                        | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| shadowOffsetY | Vertical distance of shadow from graphic                                                          | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| cursor        | Mouse cursor style. Same as CSS cursor style                                                      | `string` \| `(datum, index, data, column) => string`                    | `'default'`   |          |

## Examples

### Basic Boxplot

Use the `box` mark to create a basic boxplot with array data containing 5 statistical values.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'box',
  data: [
    { x: 'Oceania', y: [1, 9, 16, 22, 24] },
    { x: 'East Europe', y: [1, 5, 8, 12, 16] },
    { x: 'Australia', y: [1, 8, 12, 19, 26] },
    { x: 'South America', y: [2, 8, 12, 21, 28] },
    { x: 'North Africa', y: [1, 8, 14, 18, 24] },
    { x: 'North America', y: [3, 10, 17, 28, 30] },
    { x: 'West Europe', y: [1, 7, 10, 17, 22] },
    { x: 'West Africa', y: [1, 6, 8, 13, 16] },
  ],
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
  },
  scale: {
    x: { paddingInner: 0.6, paddingOuter: 0.3 },
    y: { zero: true },
  },
  legend: false,
  style: {
    stroke: 'black',
  },
});

chart.render();
```

### Grouped Boxplot

Use the `series` channel to create grouped boxplots for comparing different categories of data.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'box',
  data: [
    { Species: 'I. setosa', type: 'SepalLength', bin: [4.3, 4.8, 5, 5.2, 5.8] },
    {
      Species: 'I. setosa',
      type: 'SepalWidth',
      bin: [2.3, 3.2, 3.4, 3.7, 4.4],
    },
    { Species: 'I. setosa', type: 'PetalLength', bin: [1, 1.4, 1.5, 1.6, 1.9] },
    {
      Species: 'I. setosa',
      type: 'PetalWidth',
      bin: [0.1, 0.2, 0.2, 0.3, 0.6],
    },
    {
      Species: 'I. versicolor',
      type: 'SepalLength',
      bin: [4.9, 5.6, 5.9, 6.3, 7],
    },
    {
      Species: 'I. versicolor',
      type: 'SepalWidth',
      bin: [2, 2.5, 2.8, 3, 3.4],
    },
    {
      Species: 'I. versicolor',
      type: 'PetalLength',
      bin: [3, 4, 4.35, 4.6, 5.1],
    },
    {
      Species: 'I. versicolor',
      type: 'PetalWidth',
      bin: [1, 1.2, 1.3, 1.5, 1.8],
    },
    {
      Species: 'I. virginica',
      type: 'SepalLength',
      bin: [4.9, 6.2, 6.5, 6.9, 7.9],
    },
    {
      Species: 'I. virginica',
      type: 'SepalWidth',
      bin: [2.2, 2.8, 3, 3.2, 3.8],
    },
    {
      Species: 'I. virginica',
      type: 'PetalLength',
      bin: [4.5, 5.1, 5.55, 5.9, 6.9],
    },
    {
      Species: 'I. virginica',
      type: 'PetalWidth',
      bin: [1.4, 1.8, 2, 2.3, 2.5],
    },
  ],
  encode: {
    x: 'type',
    y: 'bin',
    series: 'Species',
    color: 'Species',
  },
  scale: {
    x: { paddingInner: 0.2, paddingOuter: 0.1 },
    y: { zero: true },
    series: { paddingInner: 0.3, paddingOuter: 0.1 },
  },
  style: {
    stroke: 'black',
  },
  tooltip: [
    { name: 'min', channel: 'y' },
    { name: 'q1', channel: 'y1' },
    { name: 'q2', channel: 'y2' },
    { name: 'q3', channel: 'y3' },
    { name: 'max', channel: 'y4' },
  ],
});

chart.render();
```

### Polar Boxplot

Create a polar boxplot by configuring a polar coordinate system.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'box',
  data: [
    { x: 'Oceania', y: [1, 9, 16, 22, 24] },
    { x: 'East Europe', y: [1, 5, 8, 12, 16] },
    { x: 'Australia', y: [1, 8, 12, 19, 26] },
    { x: 'South America', y: [2, 8, 12, 21, 28] },
    { x: 'North Africa', y: [1, 8, 14, 18, 24] },
    { x: 'North America', y: [3, 10, 17, 28, 30] },
    { x: 'West Europe', y: [1, 7, 10, 17, 22] },
    { x: 'West Africa', y: [1, 6, 8, 13, 16] },
  ],
  coordinate: {
    type: 'polar',
    innerRadius: 0.2,
  },
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
  },
  scale: {
    x: { paddingInner: 0.6, paddingOuter: 0.3 },
    y: { zero: true },
  },
  style: {
    stroke: 'black',
  },
  axis: {
    y: { tickCount: 5 },
  },
  tooltip: [
    { name: 'min', channel: 'y' },
    { name: 'q1', channel: 'y1' },
    { name: 'q2', channel: 'y2' },
    { name: 'q3', channel: 'y3' },
    { name: 'max', channel: 'y4' },
  ],
  legend: false,
});

chart.render();
```

## FAQ

### How to perform data distribution analysis on the frontend?

G2 provides multiple ways to perform data distribution analysis:

- Use `transform` for data transformation to perform statistical analysis on data and calculate statistical values like minimum, Q1, median, Q3, and maximum:

```js
chart.box().data({
  type: 'connector',
  value: [
    /* your detail data */
  ],
  callback: (data) => {
    // Perform statistical analysis on data here
    // Can use custom algorithms or third-party libraries
    return data;
  },
});
```

- Use community-provided [algorithm libraries](https://github.com/antvis/data-set/blob/master/src/transform/aggregate.ts) for data statistics.

- Directly use the [`boxplot`](/en/manual/core/mark/boxplot) mark, which is a high-level mark with built-in data grouping and statistical aggregation functionality, more suitable for frontend data exploration and analysis:

```js
chart.boxplot().data(data).encode('x', 'category').encode('y', 'value');
```
