---
title: Stacked Bar Chart
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*69WQTY8YrWgAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison', 'proportion']
similar: ['bar', 'grouped-bar', 'stacked-area', 'pie']
---

<img alt="stacked-bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*69WQTY8YrWgAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Stacked Bar Charts

A stacked bar chart is used to compare values of different sub-items within each category and show the proportion of each sub-item in the whole. By stacking multiple series in the same bar, it visually reflects the relationship between parts and the whole.

**Other Names**: Stacked Bar, Grouped Stacked Bar

## Components of a Stacked Bar Chart

- **X-Axis (Category Axis)**: Represents the categories being compared.
- **Y-Axis (Value Axis)**: Represents the value magnitude.
- **Bars**: Each category corresponds to a bar, which is stacked by different series.
- **Color**: Different series are distinguished by color.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { genre: 'Sports', sold: 275, type: 'Online' },
    { genre: 'Sports', sold: 115, type: 'Offline' },
    { genre: 'Strategy', sold: 120, type: 'Online' },
    { genre: 'Strategy', sold: 350, type: 'Offline' },
    { genre: 'Action', sold: 150, type: 'Online' },
    { genre: 'Action', sold: 80, type: 'Offline' },
  ],
  encode: { x: 'genre', y: 'sold', color: 'type', series: 'type' },
  transform: [{ type: 'stackY' }],
  axis: {
    x: { title: 'Genre' },
    y: { title: 'Sales' },
  },
  legend: { color: { title: 'Channel' } },
});

chart.render();
```

---

## Use Cases of Stacked Bar Charts

### Suitable Use Cases

- Comparing values and proportions of different sub-items within each category.
- Showing the relationship between parts and the whole.
- Highlighting the cumulative effect of each series.

### Unsuitable Use Cases

- Too many categories or series make colors hard to distinguish.
- When focusing on the precise comparison of a single series, use grouped bar charts.

---

## Extensions of Stacked Bar Charts

### Percentage Stacked Bar Chart

Normalize the sum of each category to 100% to highlight the proportion of each part.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { genre: 'Sports', sold: 275, type: 'Online' },
    { genre: 'Sports', sold: 115, type: 'Offline' },
    { genre: 'Strategy', sold: 120, type: 'Online' },
    { genre: 'Strategy', sold: 350, type: 'Offline' },
    { genre: 'Action', sold: 150, type: 'Online' },
    { genre: 'Action', sold: 80, type: 'Offline' },
  ],
  encode: { x: 'genre', y: 'sold', color: 'type', series: 'type' },
  transform: [{ type: 'normalizeY' }, { type: 'stackY' }],
  axis: {
    x: { title: 'Genre' },
    y: { title: 'Percentage', labelFormatter: (v) => `${(v * 100).toFixed(0)}%` },
  },
  legend: { color: { title: 'Channel' } },
});

chart.render();
```

---

## Comparing Stacked Bar Charts to Other Charts

### Stacked Bar Charts and [Bar Charts](/en/charts/bar)

- Bar charts are suitable for comparing values of a single series, while stacked bar charts are suitable for comparing cumulative values and proportions of multiple series.

### Stacked Bar Charts and [Grouped Bar Charts](/en/charts/grouped-bar)

- Grouped bar charts are suitable for comparing absolute values of each series, while stacked bar charts highlight the relationship between parts and the whole.

### Stacked Bar Charts and [Stacked Area Charts](/en/charts/stacked-area)

- Both can show accumulation and proportion, but stacked area charts are better for trend data.

---

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>