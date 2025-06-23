---
title: jitter
order: 2
---

## Overview

Jitter is a data processing or adjustment method primarily used to solve the problem of overlapping data points, especially in visualization scenarios such as scatter plots. When multiple data points are located at the same or similar positions, it causes visual overlap that is difficult to distinguish. Jitter adds small random offsets to the x or y coordinates of data points, dispersing them to improve visualization effects and readability.

## Use Cases

1. Avoid data point overlap: Through random offsets, separate overlapping points visually;
2. Improve data readability: In high-density data scenarios, clearly display the distribution of each data point;
3. Applicable to specific scenarios: Commonly used in scatter plots, bee swarm plots, and other charts that need to display individual data.

Note: Jitter is a visual adjustment method that may slightly change the precise position of data, so it is not suitable for scenarios that require extremely high positional accuracy.

## Configuration

| Property | Description                                 | Type           | Default     |
| -------- | ------------------------------------------- | -------------- | ----------- |
| padding  | Spacing of groups in x,y directions [0 ~ 1] | `number`       | 0           |
| paddingX | Spacing of groups in x direction [0 ~ 1]    | `number`       | 0           |
| paddingY | Spacing of groups in y direction [0 ~ 1]    | `number`       | 0           |
| random   | Random function, returns value in [0, 1)    | `() => number` | Math.random |

## Examples

Let's start with a simple example, drawing a scatter plot where data points overlap at certain positions:

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'point',
  autoFit: true,
  data: [
    { x: 1, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 4 },
  ],
  encode: { x: 'clarity', color: 'clarity' },
  transform: [{ type: 'jitter' }],
  legend: false,
});

chart.render();
```

Please note that there are two points with identical values in the `data`. Without `jitter`, the data points (1, 2) and (2, 3) would completely overlap, visually showing only one point.
After applying `jitter`, these points will be randomly offset by a small distance (usually a tiny horizontal or vertical offset) around their original positions, making each point visible.

### Scatter Plot

Here's a more complex scatter plot example using `jitter` to avoid data point overlap:

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  encode: { x: 'clarity', color: 'clarity' },
  transform: [{ type: 'jitter' }],
  coordinate: { type: 'polar' },
  legend: false,
});

chart.render();
```

In this example, we fetch data from a remote data source and use `jitter` to handle data point overlap issues. Through the `transform` property, we can easily apply `jitter` to the data, thereby improving the visualization effect.
