---
title: flexX
order: 2
---

## Overview

flexX is a transform method used to adjust the width of bar charts. It allows for dynamic adjustment of bar widths based on data values, enabling the bar width to reflect another data dimension, thus displaying more information dimensions in visualizations. This transform is particularly suitable for:

1. Scenarios that need to show two quantitative variables simultaneously, such as the relationship between country GDP (width) and GDP per capita (height)
2. Business analysis charts displaying market share and segmentation structure
3. Multi-dimensional visualization of demographic data, such as total population (width) and age distribution (height)
4. Sales data analysis, such as the relationship between total sales (width) and profit margin (height)

Through the flexX transform, we can add an additional data dimension on top of traditional bar charts, making charts more information-rich.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  width: 800,
  height: 400,
  paddingLeft: 60,
});

chart
  .interval()
  .data([
    { category: 'Electronics', sales: 1200000, profitRate: 0.15 },
    { category: 'Clothing', sales: 800000, profitRate: 0.25 },
    { category: 'Food', sales: 600000, profitRate: 0.12 },
    { category: 'Furniture', sales: 400000, profitRate: 0.18 },
    { category: 'Books', sales: 200000, profitRate: 0.3 },
  ])
  .transform({ type: 'flexX', field: 'sales' })
  .encode('x', 'category')
  .encode('y', 'profitRate')
  .encode('color', 'category')
  .scale('y', { nice: true })
  .axis('y', {
    title: 'Profit Rate',
    labelFormatter: '.0%',
  });

chart.render();
```

## Use Cases

1. **Variable-width Bar Charts**: When you need the bar width to reflect a certain dimension of data, for example, country GDP determines bar width while bar height shows GDP per capita.

2. **Marimekko Charts**: Combined with stackY and normalizeY transforms, you can create complex business analysis charts displaying market share and segmentation data.
   <br/>
   Using country GDP as bar width and GDP per capita as bar height:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  width: 1000,
  paddingBottom: 100,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/90873879-09d7-4842-a493-03fb560267bc.csv',
  })
  .transform({ type: 'flexX', field: 'gdp' })
  .encode('x', 'country')
  .encode('y', 'value')
  .encode('color', 'country')
  .axis('y', { labelFormatter: '~s' });
chart.render();
```

## Configuration

| Property | Description                                       | Type                                  | Default | Required |
| -------- | ------------------------------------------------- | ------------------------------------- | ------- | -------- |
| field    | Specifies the field for generating weight array   | `string` \| `(d: any) => Primitive[]` | -       | No       |
| channel  | Specifies the channel for generating weight array | string                                | `y`     | No       |
| reducer  | Function to aggregate weights in each group       | `Reducer`                             | sum     | No       |

### Type Definitions

```ts
// Basic data types
type Primitive = number | string | boolean | Date;

// Aggregation function type
type Reducer = 'sum' | ((I: number[], V: Primitive[]) => Primitive);
```

### Parameter Description

- **field**: Specifies the data field for bar width. When field is set, it takes priority over channel.
- **channel**: Specifies the encoding channel used to calculate bar width, defaults to using 'y' channel values.
- **reducer**: Aggregation function used to calculate the final width value. Defaults to 'sum'.

## Examples

### 1. Marimekko Chart

Creating market analysis charts by combining stackY and normalizeY transforms:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  width: 900,
  height: 800,
  paddingLeft: 0,
  paddingRight: 0,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/3041da62-1bf4-4849-aac3-01a387544bf4.csv',
  })
  .transform({ type: 'flexX', reducer: 'sum' })
  .transform({ type: 'stackY' })
  .transform({ type: 'normalizeY' })
  .encode('x', 'market')
  .encode('y', 'value')
  .encode('color', 'segment')
  .scale('x', { paddingOuter: 0, paddingInner: 0.01 });
chart.render();
```

In this example, the flexX transform makes the width of each market segment proportional to its total value. Combined with stacking and normalization processing, it clearly displays the distribution of market share.

This example demonstrates how to use flexX to visualize population data, where bar width represents the total population of states/provinces, height represents population density, and color distinguishes different regions.

### 2. Time Series Data Analysis

Displaying monthly sales data using transaction volume as width and price change rate as height:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  width: 800,
  height: 400,
  paddingLeft: 60,
  data: [
    { month: 'Jan', volume: 5000, priceChange: 0.08 },
    { month: 'Feb', volume: 8000, priceChange: -0.05 },
    { month: 'Mar', volume: 12000, priceChange: 0.12 },
    { month: 'Apr', volume: 6000, priceChange: -0.03 },
    { month: 'May', volume: 9000, priceChange: 0.15 },
    { month: 'Jun', volume: 15000, priceChange: -0.08 },
  ],
  encode: {
    x: 'month',
    y: 'priceChange',
    color: (d) => (d.priceChange > 0 ? 'red' : 'green'),
  },
  transform: [{ type: 'flexX', field: 'volume' }],
  scale: { y: { nice: true } },
  style: { radius: 4 },
  axis: { y: { title: 'Price Change Rate', labelFormatter: '.0%' } },
});

chart.render();
```

This time series example demonstrates how to use flexX to visualize trading data, where bar width represents transaction volume size, height represents price change rate, and color distinguishes between gains and losses. Through this approach, we can simultaneously observe the relationship between trading activity and price trends.
