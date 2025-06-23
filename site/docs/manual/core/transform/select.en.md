---
title: select
order: 2
---

## Overview

The `select` mark transform is a very flexible and efficient selection. It groups data by specified channels and selects data from each group according to specified channels and selectors. Through the select transform, you can filter data based on conditions and implement marking at specific positions.

<img alt="select" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LbTfQL1VLtIAAAAAAAAAAAAAemJ7AQ/original" width="500" />

## Use Cases

- **Peak Annotation**: Mark the highest/lowest points in line charts

- **Start/End Annotation**: Highlight start/end points in time series

- **Category Annotation**: Differentiate marks for different data categories

- **Trend Annotation**: Mark statistical feature points like mean, median, etc.

## Configuration

| Property | Description                                                         | Type                   | Default  |
| -------- | ------------------------------------------------------------------- | ---------------------- | -------- |
| groupBy  | Group by specified channels                                         | `string` \| `string[]` | `series` |
| channel  | For each group, use specified channel for data extraction           | [Channel](#channel)    |          |
| selector | For each group, specify the corresponding data extraction operation | [Selector](#selector)  | `first`  |

### channel

Theoretically, `channel` can be set to all channel values. For details, please refer to the [encode](/en/manual/core/encode) documentation. All enumeration values are as follows:

```ts
type Channel =
  | 'x'
  | 'y'
  | 'z'
  | 'x1'
  | 'y1'
  | 'series'
  | 'color'
  | 'opacity'
  | 'shape'
  | 'size'
  | 'key'
  | 'groupKey'
  | 'position'
  | 'series'
  | 'enterType'
  | 'enterEasing'
  | 'enterDuration'
  | 'enterDelay'
  | 'updateType'
  | 'updateEasing'
  | 'updateDuration'
  | 'updateDelay'
  | 'exitType'
  | 'exitEasing'
  | 'exitDuration'
  | 'exitDelay'
  | `position${number}`;
```

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

## Example

As shown below, add value annotations to the top of bar charts:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
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
    // Bar chart mark configuration
    {
      type: 'interval',
      encode: {
        x: 'letter',
        y: 'frequency',
      },
    },
    // Text mark configuration
    {
      type: 'text',
      encode: {
        x: 'letter',
        y: 'frequency',
        text: 'frequency',
        series: 'frequency',
      },
      transform: [
        {
          // Use select transform mark
          type: 'select',
          // Based on y channel
          channel: 'y',
          // Select the highest point
          selector: 'max',
        },
      ],
      style: {
        // Annotation text offset 12 pixels to the left
        dx: -12,
        // Annotation text offset 12 pixels upward
        dy: -12,
      },
    },
  ],
});

chart.render();
```
