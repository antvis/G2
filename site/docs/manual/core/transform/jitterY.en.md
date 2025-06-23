---
title: jitterY
order: 2
---

## Overview

`jitterY` is a shortcut function for [jitter](/en/manual/core/transform/jitter), specifically designed to handle discrete `y` channel scales, generating a `dy` channel to achieve a scattered effect in the `y` direction within a certain area.
It adds random offsets along the y-axis, visually dispersing data points to avoid overlap and improve readability.

## Use Cases

`jitterY` has the same applicable scenarios as `jitter`, mainly used for scatter plots, beeswarm plots, and other charts that need to display individual data. It helps users better understand data distribution, especially when data points are densely packed.

## Configuration

| Property | Description                                 | Type           | Default Value |
| -------- | ------------------------------------------- | -------------- | ------------- |
| padding  | Spacing between each group [0 ~ 1]          | `number`       | 0             |
| random   | Random function that returns a value [0, 1) | `() => number` | Math.random   |

## Example

For simple examples, please refer to the [jitter](/en/manual/core/transform/jitter) examples. Below is a demonstration specific to the `jitterY` function use case.

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
  encode: { x: 'Horsepower', y: 'Cylinders', color: 'Cylinders' },
  transform: [{ type: 'sortY' }, { type: 'jitterY' }],
  scale: { y: { type: 'point' }, color: { type: 'ordinal' } },
});

chart.render();
```

Additional note: Like the `jitter` function, `jitterY` is a visual adjustment method that may slightly alter the precise position of data, making it unsuitable for scenarios that require extremely high positional accuracy.
When using `jitterY`, it's recommended to make appropriate parameter adjustments based on specific data and requirements to achieve optimal visual effects and data presentation.
