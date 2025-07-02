---
title: jitterX
order: 2
---

## Overview

`jitterX` is a shortcut function for [jitter](/en/manual/core/transform/jitter), specifically designed to handle discrete `x` channel scales, generating a `dx` channel to achieve the effect of spreading data points in the `x` direction within a certain area.
It adds random offsets along the x-axis to visually disperse data points, thereby avoiding overlap and improving readability.

## Use Cases

`jitterX` is suitable for the same scenarios as `jitter`, mainly used in scatter plots, bee swarm plots, and other charts that need to display individual data points. It helps users better understand data distribution, especially when data points are densely packed.

## Configuration

| Property | Description                           | Type           | Default     |
| -------- | ------------------------------------- | -------------- | ----------- |
| padding  | Spacing between each group [0 ~ 1]    | `number`       | 0           |
| random   | Random function, returns value [0, 1) | `() => number` | Math.random |

## Examples

For simple examples, you can refer to the [jitter](/en/manual/core/transform/jitter) examples. Below are specific demonstrations for `jitterX` function usage scenarios.

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  },
  encode: {
    y: 'Horsepower',
    x: 'Cylinders',
    shape: 'hollow',
    color: 'Cylinders',
  },
  transform: [{ type: 'sortX', channel: 'x' }, { type: 'jitterX' }],
  scale: { x: { type: 'point' }, color: { type: 'ordinal' } },
});

chart.render();
```

Additional note: Like the `jitter` function, `jitterX` is a visual adjustment method that may slightly alter the precise position of data, making it unsuitable for scenarios that require extremely high positional accuracy.
When using `jitterX`, it's recommended to adjust parameters appropriately based on specific data and requirements to achieve the best visual effects and data presentation results.
