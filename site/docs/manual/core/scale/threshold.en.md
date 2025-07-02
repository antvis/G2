---
title: threshold
order: 2
---

## Overview

The `threshold` scale is a **discretizing scale** that divides a continuous numeric domain into intervals according to specified thresholds, mapping each interval to a discrete value in the range. It's commonly used for grouping, grading, and classifying continuous data for display.

Similar to the [quantize](/en/manual/core/scale/quantize) scale, threshold also maps continuous data to discrete values, but the difference is:

- threshold scale requires manually specified split points (thresholds)
- quantize scale automatically calculates equal-width intervals based on the data domain and range count

The difference from the [quantile](/en/manual/core/scale/quantile) scale is:

- quantile scale segments based on quantiles of the data distribution, ensuring each interval contains the same number of data points
- threshold scale segments based on manually specified split points, without considering data distribution

### Mapping Effect

- Using `threshold`

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: {
    y: {
      type: 'threshold',
      range: [1, 0.5, 0],
    },
  },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
```

- Without using `threshold`

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
```

### Use Cases

- When continuous data needs to be segmented and categorized (such as grading, rating, interval coloring, etc.)
- When numeric data needs to be discretized into a finite number of categories

## Configuration

| Property | Description                                                 | Type       | Default Value | Required |
| -------- | ----------------------------------------------------------- | ---------- | ------------- | -------- |
| type     | Scale type, must be 'threshold'                             | `string`   | `'threshold'` | ✓        |
| domain   | Array of threshold values for the domain                    | `number[]` | `[0.5]`       |          |
| range    | Array of values for the range (one more than domain length) | `any[]`    | `[0, 1]`      |          |
| unknown  | Value returned when input is `undefined`, `NaN`, or `null`  | `any`      | `undefined`   |          |

## Examples

### Basic Usage

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: {
    y: {
      type: 'threshold',
      range: [1, 0.5, 0],
    },
  },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
```
