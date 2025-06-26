---
title: selectX
order: 2
---

## Overview

`selectX` filters data based on the x channel, selecting a subset of data that meets the specified range or condition.

<img alt="selectX" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*R-q2QaIHGccAAAAAAAAAAAAAemJ7AQ/original" width="500">

## Use Cases

- Peak annotation: Mark the highest/lowest points in line charts

- Start/end annotation: Highlight start/end points in time series

- Category annotation: Differentiate marks for different data categories

- Trend annotation: Mark statistical feature points like mean, median, etc.

## Options

| Property | Description                                      | Type                   | Default  |
| -------- | ------------------------------------------------ | ---------------------- | -------- |
| groupBy  | Group by specified channels                      | `string` \| `string[]` | `series` |
| selector | Specify data extraction operation for each group | [Selector](#selector)  | `first`  |

### selector

```ts
type Selector =
  | 'min' // Minimum value
  | 'max' // Maximum value
  | 'first' // First value
  | 'last' // Last value
  | 'mean' // Mean value
  | 'median' // Median value
  | ((I: number[], V: number[]) => number[]); // Custom selection function
```

## Examples

As shown below, annotate different data types:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  width: 800,
  paddingLeft: 50,
  paddingRight: 100,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  },
  children: [
    // Line mark configuration
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
        color: 'Symbol',
      },
      axis: {
        y: {
          title: '↑ Change in price (%)',
        },
      },
    },
    // Text annotation configuration
    {
      type: 'text',
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
        series: 'Symbol',
        color: 'Symbol',
        text: 'Symbol',
      },
      transform: [
        {
          // Use selectX transform
          type: 'selectX',
          // Select the last data point
          selector: 'last',
        },
      ],
      style: {
        // Offset annotation text 12 pixels to the right
        dx: 12,
      },
      // Disable tooltip for text
      tooltip: false,
    },
  ],
});

chart.render();
```
