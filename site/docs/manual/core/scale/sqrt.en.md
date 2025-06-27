---
title: sqrt
order: 2
---

## Overview

sqrt is a continuous non-linear scale that is essentially a [pow](/en/manual/core/scale/pow) scale with a fixed exponent of `0.5`. The mapping function of the sqrt scale is `y = x ^ 0.5 + b`, where `x` is the input data and `b` is the offset.

The sqrt scale is a type of **continuous scale** that is suitable for:

- Data with large numerical range differences that need compression
- Visualization scenarios that emphasize smaller numerical differences
- Visual channels that require square root transformation, such as area mapping

Compared to linear scales, sqrt scales have a higher compression degree for large values and are suitable for handling data with large variation ranges.

### Mapping Effect Examples

The sqrt scale can make data more evenly distributed visually, especially for datasets with large numerical ranges.

- Using sqrt scale effect

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 1 },
    { year: '1992', value: 4 },
    { year: '1993', value: 9 },
    { year: '1994', value: 16 },
    { year: '1995', value: 25 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { y: { type: 'sqrt' } },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
```

- Without sqrt scale effect

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 1 },
    { year: '1992', value: 4 },
    { year: '1993', value: 9 },
    { year: '1994', value: 16 },
    { year: '1995', value: 25 },
  ],
  encode: { x: 'year', y: 'value' },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
```

## Options

| Property    | Description                                                                                        | Type                                                    | Default Value                          | Required |
| ----------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- | -------- |
| domain      | Set the domain range of the data                                                                   | `number[]`                                              | Min-max range of input data            |          |
| domainMin   | Set the minimum value of the data domain                                                           | `number`                                                | Minimum value of input data            |          |
| domainMax   | Set the maximum value of the data domain                                                           | `number`                                                | Maximum value of input data            |          |
| range       | Set the value range for data mapping                                                               | `number[]` \| `string[]`                                | `[0, 1]`                               |          |
| rangeMin    | Set the minimum value of the data mapping range                                                    | `number \| string`                                      | `0`                                    |          |
| rangeMax    | Set the maximum value of the data mapping range                                                    | `number \| string`                                      | `1`                                    |          |
| unknown     | The returned data for null values like `undefined`, `NaN`, `null`                                  | `any`                                                   | `undefined`                            |          |
| tickCount   | Set the recommended number of ticks to generate, tickCount is only a suggested value, not absolute | `number`                                                | `5`                                    |          |
| tickMethod  | Set the method for generating ticks, commonly used for custom ticks                                | `(min: number, max: number, count: number) => number[]` | `d3-ticks`                             |          |
| round       | Round the output values                                                                            | `boolean`                                               | `false`                                |          |
| clamp       | Limit the mapped values to the range                                                               | `boolean`                                               | `false`                                |          |
| nice        | Extend the domain range to make the output ticks display more nicely                               | `boolean`                                               | `false`                                |          |
| interpolate | Custom interpolation function                                                                      | `(a: number, b: number) => (t: number) => T`            | `(a, b) => (t) => a * (1 - t) + b * t` |          |
| exponent    | Set the exponent, for sqrt scale, this value is fixed at `0.5`                                     | `number`                                                | `0.5`                                  |          |

## Examples

### Basic Usage

Use sqrt scale to map point sizes in a scatter plot to make numerical differences more apparent.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: { size: { type: 'sqrt', range: [4, 50] } },
  style: { fillOpacity: 0.3, lineWidth: 1 },
  legend: { size: false },
});

chart.render();
```

#### Code Explanation

- This is a bubble chart (point chart), where each point represents a country.
- Data is fetched remotely and includes fields like GDP, life expectancy, population, etc.
- The `encode` section maps GDP to the x-axis, life expectancy to the y-axis, population to point size, and continent to color.
- `scale.size` uses `sqrt` to map population through power transformation to point radius, with `range: [4, 20]` controlling the minimum and maximum point sizes.
- Visual styles set transparency and stroke width, with size legend disabled.
- The chart is rendered with `chart.render()`.

### Combined with Color Gradient

Using sqrt scale for color gradient mapping

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/56b6b137-e04e-4757-8af5-d75bafaef886.csv',
      },
      encode: { x: 'date', y: 'value', color: 'value', shape: 'point' },
      scale: {
        color: { type: 'sqrt', domain: [0, 1], range: ['#1689F1', '#1AC07D'] },
      },
      style: { stroke: '#000', strokeOpacity: 0.2 },
      tooltip: {
        items: [
          {
            channel: 'x',
            name: 'year',
            valueFormatter: (d) => d.getFullYear(),
          },
          { channel: 'y' },
        ],
      },
    },
    { type: 'lineY', data: [0], style: { stroke: '#000', strokeOpacity: 0.2 } },
  ],
});
chart.render();
```

#### Code Explanation

- This is a point chart (scatter plot) with auxiliary lines.
- The main component is a point chart with data also fetched remotely, including date and value fields.
- The `encode` section maps date to the x-axis, value to the y-axis, and value is also mapped to color.
- `scale.color` uses `sqrt` to map value through power transformation to color gradient (blue to green), with `domain: [0, 1]` specifying the input data range.
- Points have black strokes with some transparency.
- Tooltip is configured with custom year formatting.
- A y=0 auxiliary line (lineY) is also added.
- The chart is rendered with `chart.render()`.

In this example, data is mapped to color through the sqrt scale, which can better display regional differences compared to linear mapping.
