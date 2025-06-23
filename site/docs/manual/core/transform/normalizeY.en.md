---
title: normalizeY
order: 2
---

## Overview

Normalizes y-related channels (such as y, y1, etc.) based on the specified basis. Normalization converts data to proportional values between 0 and 1, allowing data of different scales to be compared within the same coordinate system. This transformation preserves the relative relationships in the data while scaling all data according to the same standard.

The following example demonstrates how to create a percentage stacked bar chart showing gender proportions across different age groups.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.year === 2000,
      },
    ],
  },
  transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
  encode: {
    x: 'age',
    y: 'people',
    color: 'sex',
  },
  scale: {
    color: { type: 'ordinal', range: ['#ca8861', '#675193'] },
  },
  axis: {
    y: { labelFormatter: '.0%' },
  },
  labels: [
    {
      text: 'people',
      position: 'inside',
      style: { fill: 'white' },
    },
  ],
});

chart.render();
```

## Use Cases

1. **Percentage Stacked Charts**: When you need to show the percentage each part represents of the whole, often used together with stackY transform.
2. **Data Standardization**: When different groups have significantly different data magnitudes, but you're more interested in their distribution or proportions.
3. **Relative Comparison**: When you need to compare the relative sizes between different categories rather than absolute values.

## Configuration

| Property | Type                                                                                                      | Default | Description                                                                           |
| :------- | :-------------------------------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------ |
| groupBy  | `string \| string[]`                                                                                      | `'x'`   | Specifies the field(s) to group data by. Each group will be normalized independently. |
| basis    | `'deviation' \| 'first' \| 'last' \| 'max' \| 'mean' \| 'median' \| 'min' \| 'sum' \| ((I, Y) => number)` | `'max'` | Specifies the basis value for normalization calculation.                              |

### groupBy Description

Specifies the field(s) to group data by. Each group will be normalized independently. The field names here refer to the visual channel names in the encode configuration, such as 'x', 'y', 'color', etc. For example, when setting `groupBy: 'color'`, the data will be grouped by the data field corresponding to encode.color.

- Type: `string | string[]`
- Default: `'x'`

### basis Description

- `'max'`: Use the maximum value within the group as the basis
- `'min'`: Use the minimum value within the group as the basis
- `'mean'`: Use the average value within the group as the basis
- `'median'`: Use the median value within the group as the basis
- `'sum'`: Use the sum of values within the group as the basis
- `'first'`: Use the first value within the group as the basis
- `'last'`: Use the last value within the group as the basis
- `'deviation'`: Use the standard deviation within the group as the basis
- Custom function: You can pass a function to customize the basis value calculation. The function receives two parameters:

  ```js
  import { max, min } from '@antv/vendor/d3-array';

  // I: index array, Y: data value array
  // Use the range of values as the basis
  (I, Y) => max(I, (i) => Y[+i]) - min(I, (i) => Y[+i]);
  ```

## Examples

### Using Custom Basis for Basis Value Calculation

The following example shows how to use different basis values for normalization:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', value: 10, group: '1' },
    { category: 'B', value: 20, group: '1' },
    { category: 'C', value: 30, group: '1' },
    { category: 'A', value: 40, group: '2' },
    { category: 'B', value: 50, group: '2' },
    { category: 'C', value: 60, group: '2' },
  ],
  encode: {
    x: 'category',
    y: 'value',
    color: 'group',
  },
  transform: [
    {
      type: 'normalizeY',
      basis: 'mean', // Use average value as the basis
    },
  ],
});

chart.render();
```

### Interactive Comparison of Different Basis Effects

```js | ob {  inject: true, pin: false }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
const valueList = [
  'first',
  'deviation',
  'last',
  'max',
  'mean',
  'median',
  'min',
  'sum',
];
const valueMap = valueList.map((p) => {
  return {
    label: p,
    value: p,
  };
});

chart.options({
  type: 'line',
  width: 900,
  height: 600,
  insetRight: 20,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  },
  encode: { x: (d) => new Date(d.Date), y: 'Close', color: 'Symbol' },
  transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
  scale: { y: { type: 'log' } },
  axis: { y: { title: '↑ Change in price (%)' } },
  labels: [{ text: 'Symbol', selector: 'last', fontSize: 10 }],
  tooltip: { items: [{ channel: 'y', valueFormatter: '.1f' }] },
});

const handleSetValue = (value) => {
  chart.options({
    transform: [{ type: 'normalizeY', basis: value, groupBy: 'color' }],
  });
  chart.render(); // Re-render the chart
};

// Insert Value selector
const selectorContainer = document.createElement('div');
selectorContainer.textContent = 'Select basis ';
const selector = document.createElement('select');
selector.innerHTML = valueMap.map(
  (value, index) =>
    `<option value="${value.value}" ${index === 0 ? 'selected' : ''}>${
      value.label
    }</option>`,
);
selector.onchange = (e) => {
  handleSetValue(e.target.value);
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
```

### Custom Grouping

You can specify how to group data using the groupBy option:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', year: '2020', value: 100 },
    { category: 'B', year: '2020', value: 200 },
    { category: 'A', year: '2021', value: 150 },
    { category: 'B', year: '2021', value: 300 },
    { category: 'A', year: '2022', value: 180 },
    { category: 'B', year: '2022', value: 360 },
  ],
  encode: {
    x: 'year',
    y: 'value',
    color: 'category',
  },
  transform: [
    {
      type: 'normalizeY',
      groupBy: 'color', // Normalize by color channel (corresponding to data field category)
    },
  ],
  axis: {
    y: { labelFormatter: '.0%' },
  },
});

chart.render();
```
