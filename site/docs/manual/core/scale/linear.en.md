---
title: linear
order: 2
---

## Overview

Linear is the base class for continuous scales. Its core function is to linearly map data from the data domain to the visual range while preserving the proportional relationships between data points. Each output value y can be expressed as a linear function of the input value x: `y = mx + b`.

When no scale type is explicitly declared, G2 applies the linear scale by default to numeric fields (such as temperature, sales).

## Usage

Linear scales are commonly used to map data to normalized coordinates. In this example, the scale for the y channel is configured to affect how graphics are positioned on the canvas.

```ts
chart
  .line()
  .encode('x', 'year')
  .encode('y', 'sale')
  .scale('y', {
    type: 'linear',
    range: [0.2, 0.8],
    /* other configuration options */
  });
```

It can be used not only with continuous numeric data types but also when proportional relationships need to be maintained.

```ts
chart
  .interval()
  .data([
    { time: '2023-01', sales: '100' },
    { time: '2023-01', sales: '300' },
  ])
  .encode('x', 'time')
  .encode('y', 'sales')
  .scale('y', {
    type: 'linear', // When sales values are strings, they may be incorrectly inferred as categorical data, requiring explicit setting
  });
```

## Configuration Levels

Scales can be configured at the Mark level:

```ts
({
  type: 'line',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'linear', // Specify type
      domain: [10, 100], // Specify domain
      range: [0, 1], // Specify range
    },
  },
});
```

They can also be configured at the View level:

```ts
({
  type: 'view',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'linear', // Specify type
      domain: [10, 100], // Specify domain
      range: [0, 1], // Specify range
    },
  },
});
```

## Configuration Options

| Property    | Description                                                                     | Type                                                    | Default Value                          |
| ----------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- |
| domain      | Set the domain range of the data                                                | `number[]`                                              | Min-max range of input data            |
| domainMin   | Set the minimum value of the data domain                                        | `number`                                                | Minimum value of input data            |
| domainMax   | Set the maximum value of the data domain                                        | `number`                                                | Maximum value of input data            |
| range       | Set the range of data mapping                                                   | `number[]` \| `string[]`                                | `[0, 1]`                               |
| rangeMin    | Set the minimum value of the data mapping range                                 | `number \| string`                                      | `0`                                    |
| rangeMax    | Set the maximum value of the data mapping range                                 | `number \| string`                                      | `1`                                    |
| unknown     | Return value for `undefined`, `NaN`, `null` values                              | `any`                                                   | `undefined`                            |
| tickCount   | Set the recommended number of ticks to generate; tickCount is only a suggestion | `number`                                                | `5`                                    |
| tickMethod  | Set the method for generating ticks, commonly used for custom ticks             | `(min: number, max: number, count: number) => number[]` | `d3-ticks`                             |
| round       | Round output values                                                             | `boolean`                                               | `false`                                |
| clamp       | Limit mapped values to the range                                                | `boolean`                                               | `false`                                |
| nice        | Extend domain range to make tick display more friendly                          | `boolean`                                               | `false`                                |
| interpolate | Custom interpolation function                                                   | `(a: number, b: number) => (t: number) => T`            | `(a, b) => (t) => a * (1 - t) + b * t` |

## Example

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { time: '2023-01', sales: 100 },
  { time: '2023-02', sales: 200 },
  { time: '2023-03', sales: 150 },
  { time: '2023-04', sales: 300 },
  { time: '2023-05', sales: 400 },
];

chart
  .interval()
  .data(data)
  .encode('x', 'time')
  .encode('y', 'sales')
  .scale('y', {
    type: 'linear', // Use linear scale
    nice: true,
    domain: [0, 300], // Custom scale range setting, needs to be explicitly set
  });

chart.render();
```

## FAQ

- How to customize y-axis ticks?

For example, if you only need to display 0, 100, 600 on the ticks, set the y scale as follows:

```ts
chart
  .line()
  // ...
  .scale('y', {
    type: 'linear',
    domain: [0, 700],
    tickMethod: () => [0, 100, 600],
  });
```
