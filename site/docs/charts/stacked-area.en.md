---
title: Stacked Area Chart
order: 4
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*stacked-area-demo.png/original'
category: ['trend', 'composition']
similar: ['area', 'stacked-bar', 'line']
---

<img alt="stacked-area" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*stacked-area-demo.png/original" width=600/>

## Introduction to Stacked Area Charts

A stacked area chart is used to display the trends of multiple data series over time or categories, highlighting both the overall trend and the proportion of each part. It stacks multiple area series on top of each other, making it easy to see cumulative values and the contribution of each series.

**Other Names**: Stacked Area, Layered Area Chart

## Components of a Stacked Area Chart

- **X-Axis**: Usually represents time or categories.
- **Y-Axis**: Represents values, showing the cumulative sum of each series.
- **Areas**: Each series is stacked on top of the previous one; the height of the area shows the value.
- **Color**: Different series are distinguished by color.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stacked-area.json',
  },
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    series: 'type',
  },
  transform: [{ type: 'stackY' }],
  style: {
    fillOpacity: 0.7,
  },
  axis: {
    x: { title: 'Year' },
    y: { title: 'Value' },
  },
});

chart.render();
```

---

## Use Cases of Stacked Area Charts

### Suitable Use Cases

- Showing the trend and proportion of multiple series over time or categories.
- Highlighting the relationship between the whole and its parts.
- Comparing cumulative changes of different series.

### Unsuitable Use Cases

- Too many series make it hard to distinguish colors.
- When focusing on the precise change of a single series, use a line or area chart instead.

---

## Extensions of Stacked Area Charts

### Percentage Stacked Area Chart

Normalize the sum at each time point to 100% to highlight the proportion of each part.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stacked-area.json',
  },
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    series: 'type',
  },
  transform: [{ type: 'normalizeY' }, { type: 'stackY' }],
  style: {
    fillOpacity: 0.7,
  },
  axis: {
    x: { title: 'Year' },
    y: { title: 'Percentage', labelFormatter: (v) => `${(v * 100).toFixed(0)}%` },
  },
});

chart.render();
```

---

## Comparing Stacked Area Charts to Other Charts

### Stacked Area Charts and [Area Charts](/en/charts/area)

- Area charts are suitable for showing the trend of a single series, while stacked area charts show cumulative trends and proportions of multiple series.

### Stacked Area Charts and [Stacked Bar Charts](/en/charts/stacked-bar)

- Both show the relationship between parts and the whole. Stacked area charts are better for trends, stacked bar charts for categories.

### Stacked Area Charts and [Line Charts](/en/charts/line)

- Line charts are better for comparing the exact value changes of each series, while stacked area charts emphasize accumulation and proportion.

---

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>