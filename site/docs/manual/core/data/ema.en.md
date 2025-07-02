---
title: ema

order: 2
---

## Overview

EMA (Exponential Moving Average) is a commonly used data smoothing algorithm that reduces data volatility by assigning higher weights to recent data points, making it clearer to observe trend changes in data.

In G2's implementation, EMA is calculated as follows:

![EMA formula diagram](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3EIiS59AD8AAAAAAAAAAAAAAemJ7AQ/original)

Where:

- P<sub>t</sub>: The raw data value at the current time;
- EMA<sub>t-1</sub>: The EMA value at the previous time;
- α: The smoothing factor, ranging between (0, 1).

> ⚠️ Note: G2's EMA implementation has the α weight position reversed from the traditional definition, therefore:
>
> - The closer `α` is to 1, the more pronounced the smoothing effect;
> - The closer `α` is to 0, the closer EMA is to the original data.

## Use Cases

- When data in time series has dramatic fluctuations and you want to highlight trends;
- Technical analysis of financial data such as stock prices;
- Smoothing and dynamic tracking of metrics during model training.

## Configuration Properties

| Property | Description                                                                           | Type     | Default         | Required |
| -------- | ------------------------------------------------------------------------------------- | -------- | --------------- | -------- |
| field    | Name of the field to be smoothed                                                      | `string` | `'y'`           | ✓        |
| alpha    | Smoothing factor, controls smoothing degree (larger values mean more smoothing)       | `number` | `0.6`           |          |
| as       | Name of the new field to generate, if not specified will overwrite the original field | `string` | Same as `field` |          |

> If you need to retain the original field, it's recommended to set the `as` property to output to a new field.
> This default value is defined internally by the component, not from the theme.
> ⚠️ Note: The `field` must be numeric, otherwise it will cause calculation errors.

## Implementation Examples

### Base Example: Stock Price Smoothing

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
        transform: [
          {
            type: 'ema',
            field: 'close',
            alpha: 0.8,
            as: 'emaClose',
          },
        ],
      },
      encode: {
        x: 'date',
        y: 'emaClose',
      },
    },
    {
      type: 'line',
      style: {
        opacity: 0.3,
      },
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
      },
      encode: {
        x: 'date',
        y: 'close',
      },
    },
  ],
});

chart.render();
```

### Example 1: Highlighting Trend Changes (Time Series)

```js | ob {  pin:false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'inline',
        value: [
          { t: 0, y: 100 },
          { t: 1, y: 180 },
          { t: 2, y: 120 },
          { t: 3, y: 200 },
          { t: 4, y: 150 },
          { t: 5, y: 250 },
        ],
        transform: [
          {
            type: 'ema',
            field: 'y',
            alpha: 0.6,
            as: 'emaY',
          },
        ],
      },
      encode: { x: 't', y: 'emaY' },
      style: { stroke: '#f90' },
    },
    {
      type: 'line',
      data: {
        type: 'inline',
        value: [
          { t: 0, y: 100 },
          { t: 1, y: 180 },
          { t: 2, y: 120 },
          { t: 3, y: 200 },
          { t: 4, y: 150 },
          { t: 5, y: 250 },
        ],
      },
      encode: { x: 't', y: 'y' },
      style: { stroke: '#ccc', lineDash: [4, 2] },
    },
  ],
});
chart.render();
```

### Example 2: Financial Market Trend Smoothing

```js | ob {  pin:false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-01-${String(i + 1).padStart(2, '0')}`,
  close:
    100 + Math.sin(i / 3) * 20 + (i % 5 === 0 ? 20 : 0) + Math.random() * 10,
}));

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'inline',
        value: data,
        transform: [
          {
            type: 'ema',
            field: 'close',
            alpha: 0.7,
            as: 'emaClose',
          },
        ],
      },
      encode: {
        x: 'date',
        y: 'emaClose',
      },
      style: {
        stroke: '#007aff',
        lineWidth: 2,
      },
    },
    {
      type: 'line',
      data: {
        type: 'inline',
        value: data,
      },
      encode: {
        x: 'date',
        y: 'close',
      },
      style: {
        stroke: '#bbb',
        lineDash: [4, 2],
      },
    },
  ],
});

chart.render();
```

### Example 3: Training Process Metric Smoothing

```js | ob {  pin:false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'inline',
        value: Array.from({ length: 50 }, (_, i) => ({
          epoch: i,
          loss: Math.sin(i / 5) * 20 + 60 + Math.random() * 5,
        })),
        transform: [
          {
            type: 'ema',
            field: 'loss',
            alpha: 0.4,
            as: 'emaLoss',
          },
        ],
      },
      encode: {
        x: 'epoch',
        y: 'emaLoss',
      },
      style: { stroke: '#52c41a' },
    },
    {
      type: 'line',
      data: {
        type: 'inline',
        value: Array.from({ length: 50 }, (_, i) => ({
          epoch: i,
          loss: Math.sin(i / 5) * 20 + 60 + Math.random() * 5,
        })),
      },
      encode: {
        x: 'epoch',
        y: 'loss',
      },
      style: { stroke: '#ddd', lineDash: [4, 2] },
    },
  ],
});
chart.render();
```

## Interactive Demo

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 300,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'inline',
        value: [
          { x: 0, y: 30 },
          { x: 1, y: 80 },
          { x: 2, y: 45 },
          { x: 3, y: 90 },
          { x: 4, y: 20 },
          { x: 5, y: 60 },
          { x: 6, y: 30 },
          { x: 7, y: 85 },
          { x: 8, y: 40 },
          { x: 9, y: 70 },
        ],
        transform: [
          {
            type: 'ema',
            field: 'y',
            alpha: 0.6,
            as: 'emaY',
          },
        ],
      },
      encode: {
        x: 'x',
        y: 'emaY',
      },
      style: {
        stroke: '#f90',
        lineWidth: 2,
      },
    },
    {
      type: 'line',
      data: {
        type: 'inline',
        value: [
          { x: 0, y: 30 },
          { x: 1, y: 80 },
          { x: 2, y: 45 },
          { x: 3, y: 90 },
          { x: 4, y: 20 },
          { x: 5, y: 60 },
          { x: 6, y: 30 },
          { x: 7, y: 85 },
          { x: 8, y: 40 },
          { x: 9, y: 70 },
        ],
      },
      encode: {
        x: 'x',
        y: 'y',
      },
      style: {
        stroke: '#ccc',
        lineDash: [4, 2],
      },
    },
  ],
});

chart.render();
```
