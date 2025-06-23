---
title: log
order: 2
---

## Overview

The **logarithmic scale (log scale)** in G2 uses logarithmic functions for data mapping, based on exponential relationships with non-linear distribution, specifically designed for data showing exponential growth. When the numerical range in `data` spans a very large range and causes parts of the chart to be too dense or have too much blank space, logarithmic scale should be prioritized.

Based on the mathematical formula `y = log(base) + b`.

- **Linear Scale**
  <img height='300' src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zBZMSJnqBXkAAAAAAAAAAAAAemJ7AQ/original" />

- **Logarithmic Scale (log scale)**
  <img height='300' src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*iCVLTYouo14AAAAAAAAAAAAAemJ7AQ/original" />

## Usage

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  height: 300,
  data: [
    { year: '1991', value: 1 },
    { year: '1992', value: 10 },
    { year: '1993', value: 100 },
    { year: '1994', value: 1000 },
    { year: '1995', value: 10000 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: {
    y: {
      type: 'log',
      // Tick count
      tickCount: 5,
      // Generate uniform ticks
      tickMethod: (min, max, count, base) => {
        // Calculate logarithmic range
        const logMin = Math.log(min) / Math.log(base);
        const logMax = Math.log(max) / Math.log(base);

        // Calculate logarithmic step
        const logStep = (logMax - logMin) / (count - 1);

        // Generate tick array
        const ticks = [];
        for (let i = 0; i < count; i++) {
          const logValue = logMin + i * logStep;
          const value = Math.pow(base, logValue);
          // Filter values outside the range
          if (value >= min && value <= max) {
            ticks.push(Math.round(value));
          }
        }
        return ticks;
      },
    },
  },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render(); // Render chart
```

## Options

| Property    | Description                                                                     | Type                                                    | Default Value                          | Required |
| ----------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- | -------- |
| domain      | Set the domain range of the data                                                | `number[]`                                              | Min and max range of input data        |          |
| domainMin   | Set the minimum value of the data domain                                        | `number`                                                | Minimum value of input data            |          |
| domainMax   | Set the maximum value of the data domain                                        | `number`                                                | Maximum value of input data            |          |
| range       | Set the range of mapped values                                                  | `number[]` \| `string[]`                                | `[0, 1]`                               |          |
| rangeMin    | Set the minimum value of the mapped range                                       | `number \| string`                                      | `0`                                    |          |
| rangeMax    | Set the maximum value of the mapped range                                       | `number \| string`                                      | `1`                                    |          |
| unknown     | Return value for `undefined`, `NaN`, `null` empty values                        | `any`                                                   | `undefined`                            |          |
| tickCount   | Set the recommended number of ticks to generate; tickCount is only a suggestion | `number`                                                | `5`                                    |          |
| tickMethod  | Set the method for generating ticks, commonly used for custom ticks             | `(min: number, max: number, count: number) => number[]` | `calculateLogTicks`                    |          |
| round       | Round output values                                                             | `boolean`                                               | `false`                                |          |
| clamp       | Limit mapped values to the range                                                | `boolean`                                               | `false`                                |          |
| nice        | Extend domain range to make output ticks display more friendly                  | `boolean`                                               | `false`                                |          |
| interpolate | Custom interpolation function                                                   | `(a: number, b: number) => (t: number) => T`            | `(a, b) => (t) => a * (1 - t) + b * t` |          |
| base        | Set the logarithmic base                                                        | `number`                                                | `10`                                   |          |

Configuration and notes:

```js
{
  scale: {
    y: {
      type: 'log', // Note: Do not use log when data returns both positive and negative values.
      domainMin: 10,
      domainMax: 1000,
      base: 100, // Set base to 100,
    }
  }
}
```

If you need a minimum value `domainMin: 0`, please refer to the [Chart Examples - Logarithmic Column Chart](/en/examples#column-log) page.

## Examples

### Format conversion to `linear`

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  height: 300,
  data: [
    { year: '1991', value: 1 },
    { year: '1992', value: 10 },
    { year: '1993', value: 1000 },
    { year: '1994', value: 0.1 },
    { year: '1995', value: 100 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { type: 'log', tickCount: 4 } },
  axis: {
    y: {
      labelFormatter: (v) => {
        return Math.log10(v) + 1;
      },
    },
  },
  children: [
    {
      type: 'line',
      labels: [
        {
          text: 'value',
          formatter: (v) => {
            return Math.log10(v) + 1;
          },
          style: { dx: -10, dy: -12 },
        },
      ],
    },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render(); // Render chart
```
