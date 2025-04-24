---

title: ema

order: 2

---

## Overview

Exponential Moving Average (EMA) is a widely-used data smoothing algorithm that reduces data volatility by assigning higher weights to recent data points, enabling clearer observation of trend evolution.

In G2's implementation, the EMA calculation follows this formula:

![EMA formula visualization](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3EIiS59AD8AAAAAAAAAAAAAAemJ7AQ/original)

Where:
- P<sub>t</sub>: Raw data value at current time step
- EMA<sub>t-1</sub>: EMA value from previous time step
- α: Smoothing factor (0 < α < 1)

> ⚠️ Implementation Note: G2's EMA implementation reverses the traditional α weighting convention. Therefore:
> - α closer to 1 produces stronger smoothing
> - α closer to 0 makes EMA values resemble raw data

## Use Cases 
1. **Volatile Time Series Trend Visualization**  
   Ideal for revealing underlying patterns in noisy sequential data
2. **Financial Technical Analysis**  
   Commonly applied to stock prices, market indices, and trading volumes
3. **Training Metric Smoothing**  
   Stabilizes fluctuating metrics in machine learning training processes
4. **Sensor Data Filtering**  
   Reduces measurement noise in IoT/industrial monitoring systems

## Configuration Properties

| Property | Description | Type | Default | Required |
|----------|-------------|------|---------|----------|
| field    | Target numerical field for smoothing | `string` | `'y'` | ✓ |
| alpha    | Smoothing intensity controller (higher = smoother) | `number` | `0.6` |  |
| as       | Output field name (overwrites original if unspecified) | `string` | Same as `field` |  |

> **Best Practices**  
> - Preserve original data by specifying `as` for output field  
> - Default values are component-defined, not theme-based  
> - ⚠️ Input validation: `field` must contain numerical values

## Implementation Examples

### Base Example: Stock Price Smoothing
```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
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
          value: 'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
        },
        encode: {
          x: 'date',
          y: 'close',
        },
      },
    ],
  });

  return chart.render().then((chart) => chart.getContainer());
})();
```

### Example 1: Time Series Trend Enhancement
```js | ob { pin:false }
(() => {
  const chart = new G2.Chart();
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
  return chart.render().then((chart) => chart.getContainer());
})();
```

### Example 2: Financial Data Smoothing
```js | ob { pin:false }
(() => {
  const chart = new G2.Chart();

  const data = Array.from({ length: 30 }, (_, i) => ({
    date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    close:
      100 +
      Math.sin(i / 3) * 20 +
      (i % 5 === 0 ? 20 : 0) +
      Math.random() * 10,
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

  return chart.render().then((chart) => chart.getContainer());
})();
```

### Example 3: Training Metric Stabilization
```js | ob { pin:false }
(() => {
  const chart = new G2.Chart();
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
  return chart.render().then((chart) => chart.getContainer());
})();
```

## Interactive Demo

<Playground path="general/ema/demo/ema-basic.ts" rid="ema-style"></playground>

