---
title: selectY
order: 2
---

## Overview

`selectY` filters data based on the y channel, selecting a subset of data that meets specific ranges or conditions.

<img alt="selectY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pwabTpvQCUEAAAAAAAAAAAAAemJ7AQ/original" width="500" />

## Use Cases

- Peak annotation: Mark the highest/lowest points in line charts

- Start/end annotation: Highlight start/end points in time series

- Category annotation: Apply differentiated marking for different data categories

- Trend annotation: Mark statistical features like mean, median values

## Configuration

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

As shown below, annotate the highest temperature for each city in the chart:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { month: 1, city: 'Tokyo', temperature: 7 },
  { month: 1, city: 'London', temperature: 3.9 },
  { month: 2, city: 'Tokyo', temperature: 6.9 },
  { month: 2, city: 'London', temperature: 4.2 },
  { month: 3, city: 'Tokyo', temperature: 9.5 },
  { month: 3, city: 'London', temperature: 5.7 },
  { month: 4, city: 'Tokyo', temperature: 14.5 },
  { month: 4, city: 'London', temperature: 8.5 },
  { month: 5, city: 'Tokyo', temperature: 18.4 },
  { month: 5, city: 'London', temperature: 11.9 },
  { month: 6, city: 'Tokyo', temperature: 21.5 },
  { month: 6, city: 'London', temperature: 15.2 },
  { month: 7, city: 'Tokyo', temperature: 25.2 },
  { month: 7, city: 'London', temperature: 17 },
  { month: 8, city: 'Tokyo', temperature: 26.5 },
  { month: 8, city: 'London', temperature: 16.6 },
  { month: 9, city: 'Tokyo', temperature: 23.3 },
  { month: 9, city: 'London', temperature: 14.2 },
  { month: 10, city: 'Tokyo', temperature: 18.3 },
  { month: 10, city: 'London', temperature: 10.3 },
  { month: 11, city: 'Tokyo', temperature: 13.9 },
  { month: 11, city: 'London', temperature: 6.6 },
  { month: 12, city: 'Tokyo', temperature: 9.6 },
  { month: 12, city: 'London', temperature: 4.8 },
];

const chart = new Chart({
  container: 'container',
});
chart.options({
  width: 800,
  paddingLeft: 50,
  paddingRight: 100,
  data,
  children: [
    // Line chart mark configuration
    {
      type: 'line',
      encode: {
        x: 'month',
        y: 'temperature',
        color: 'city',
      },
      axis: {
        y: {
          title: 'Temperature',
        },
      },
    },
    // Text mark configuration
    {
      type: 'text',
      encode: {
        x: 'month',
        y: 'temperature',
        series: 'city',
        text: (d) => `Max Temperature: ${d.temperature}°C`,
      },
      transform: [
        {
          // Use selectY transform
          type: 'selectY',
          // Select maximum value
          selector: 'max',
        },
      ],
      style: {
        // Offset annotation text by 12 pixels along y-axis
        dy: -12,
      },
      // Disable tooltip for text mark
      tooltip: false,
    },
    // Point mark configuration
    {
      type: 'point',
      encode: {
        x: 'month',
        y: 'temperature',
        color: 'city',
        series: 'city',
      },
      transform: [
        {
          // Use selectY transform
          type: 'selectY',
          // Select maximum value
          selector: 'max',
        },
      ],
      // Disable tooltip for point mark
      tooltip: false,
    },
  ],
});

chart.render();
```
