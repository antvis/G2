---
title: Stacked Bar Chart
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*69WQTY8YrWgAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison', 'proportion']
similar: ['bar', 'multi-set-bar', 'stacked-area', 'percentage-bar']
---

<img alt="stacked-bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*69WQTY8YrWgAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Stacked Bar Charts

A stacked bar chart is an extension of the basic bar chart that displays categorical data by stacking multiple data series within a single bar. Each bar represents the total amount for a category, while the different colored segments within the bar represent the values of various subcategories. Stacked bar charts not only show the total quantity for each category but also display how each subcategory contributes to the total.

Stacked bar charts are particularly suitable for comparing the compositional structure of multiple categories and observing the distribution of subcategories across different main categories. Through color coding, users can easily identify different subcategories and compare their proportions within each main category.

When you need to display both totals and composition simultaneously, stacked bar charts are an excellent choice. They can be further extended to percentage stacked bar charts to show the relative proportions of each part.

**Other Names**: Stacked Bar Chart, Stacked Column Chart

## Components of Stacked Bar Charts

### Vertical Stacked Bar Chart

<img alt="stacked-bar-vertical" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*RqV4T4LZxaAAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| Chart Type           | Vertical Stacked Bar Chart                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| Suitable Data        | Multi-series categorical data: one categorical field, one continuous field, one series categorical field      |
| Function             | Compare totals of different categories and composition of subcategories                                        |
| Data-to-Visual Mapping | Categorical field mapped to horizontal axis position<br>Numerical field mapped to bar height<br>Series field mapped to color, displayed stacked in the same bar |
| Suitable Data Volume | Main categories no more than 12, subcategories no more than 8                                                 |

---

### Horizontal Stacked Bar Chart

<img alt="stacked-bar-horizontal" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4Rr_Q4VSLkEAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| Chart Type           | Horizontal Stacked Bar Chart                                                       |
| -------------------- | ---------------------------------------------------------------------------------- |
| Suitable Data        | Multi-series categorical data: one categorical field, one continuous field, one series categorical field |
| Function             | Compare totals of different categories and composition of subcategories            |
| Data-to-Visual Mapping | Categorical field mapped to vertical axis position<br>Numerical field mapped to bar width<br>Series field mapped to color |
| Suitable Data Volume | Main categories no more than 30, subcategories no more than 8                     |

## Use Cases for Stacked Bar Charts

### Suitable Scenarios

Example 1: **Suitable for displaying monthly rainfall composition across multiple cities**

The chart below shows the rainfall distribution in London and Berlin across different months, clearly showing both the total monthly rainfall and each city's contribution.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { name: 'London', month: 'Jan.', rainfall: 18.9 },
    { name: 'London', month: 'Feb.', rainfall: 28.8 },
    { name: 'London', month: 'Mar.', rainfall: 39.3 },
    { name: 'London', month: 'Apr.', rainfall: 81.4 },
    { name: 'London', month: 'May', rainfall: 47 },
    { name: 'London', month: 'Jun.', rainfall: 20.3 },
    { name: 'London', month: 'Jul.', rainfall: 24 },
    { name: 'London', month: 'Aug.', rainfall: 35.6 },
    { name: 'Berlin', month: 'Jan.', rainfall: 12.4 },
    { name: 'Berlin', month: 'Feb.', rainfall: 23.2 },
    { name: 'Berlin', month: 'Mar.', rainfall: 34.5 },
    { name: 'Berlin', month: 'Apr.', rainfall: 99.7 },
    { name: 'Berlin', month: 'May', rainfall: 52.6 },
    { name: 'Berlin', month: 'Jun.', rainfall: 35.5 },
    { name: 'Berlin', month: 'Jul.', rainfall: 37.4 },
    { name: 'Berlin', month: 'Aug.', rainfall: 42.4 },
  ],
  encode: { x: 'month', y: 'rainfall', color: 'name' },
  transform: [{ type: 'stackY' }],
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
      region: true,
    },
  ],
});

chart.render();
```

**Explanation**:

- The `month` field is mapped to horizontal axis position, representing the time dimension
- The `rainfall` field is mapped to bar height, stacked using the `stackY` transform
- The `name` field is mapped to color to distinguish different cities
- You can simultaneously compare total monthly rainfall and each city's contribution

Example 2: **Suitable for displaying age structure comparison across regions**

Stacked bar charts are very suitable for showing population age structure distribution across different regions, allowing you to see both total population and age composition.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [{ type: 'stackY' }, { type: 'sortX', by: 'y', reverse: true }],
  axis: {
    x: {
      labelSpacing: 4,
      labelTransform: 'rotate(90)',
    },
    y: {
      labelFormatter: '~s',
      title: null,
    },
  },
  legend: {
    color: {
      position: 'right',
      title: 'Age Group',
    },
  },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
    },
  ],
});

chart.render();
```

**Explanation**:

- Uses `sortX` transform to sort by total population for easier comparison
- `labelFormatter: '~s'` formats numeric display (e.g., 1M for 1 million)
- Rotates x-axis labels to avoid overlap

Example 3: **Horizontal stacked bar charts are suitable for scenarios with many categories**

When there are many categories, horizontal stacked bar charts can better display labels and avoid text overlap.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  width: 800,
  height: 600,
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [{ type: 'stackY' }, { type: 'sortX', by: 'y', reverse: true }],
  axis: {
    y: {
      labelFormatter: '~s',
      title: null,
    },
    x: {
      title: null,
    },
  },
  legend: {
    color: {
      position: 'bottom',
      title: 'Age Group',
    },
  },
});

chart.render();
```

**Explanation**:

- Uses `coordinate: { transform: [{ type: 'transpose' }] }` to achieve horizontal orientation
- Labels can be arranged horizontally, improving readability
- Suitable for data with many categories

Example 4: **Percentage stacked bar charts display proportional relationships**

When focusing on the proportion of each part rather than absolute values, percentage stacked bar charts are a better choice.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  width: 800,
  height: 600,
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'stackY' },
    { type: 'normalizeY' },
    { type: 'sortX', by: 'y', reverse: true },
  ],
  axis: {
    y: {
      labelFormatter: '.0%',
      title: null,
    },
    x: {
      title: null,
    },
  },
  legend: {
    color: {
      position: 'bottom',
      title: 'Age Group',
    },
  },
  tooltip: {
    channel: 'y0',
    valueFormatter: '.0%',
  },
});

chart.render();
```

**Explanation**:

- Combines `stackY` and `normalizeY` transforms to achieve percentage stacking
- `labelFormatter: '.0%'` formats y-axis labels as percentages
- Facilitates comparison of age structure proportions across states

### Unsuitable Scenarios

Example 1: **Not suitable for simple stacking of negative value data**

Traditional stacked bar charts are not suitable for data containing negative values, as the stacking logic can cause visual confusion.

Example 2: **Poor visual effect when there are too many subcategories**

When the number of subcategories exceeds 8-10, color differentiation decreases, making it difficult for users to effectively distinguish and compare.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

// Simulate data with too many subcategories
const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { category: 'A', type: 'Type1', value: 10 },
    { category: 'A', type: 'Type2', value: 8 },
    { category: 'A', type: 'Type3', value: 6 },
    { category: 'A', type: 'Type4', value: 4 },
    { category: 'A', type: 'Type5', value: 3 },
    { category: 'A', type: 'Type6', value: 2 },
    { category: 'A', type: 'Type7', value: 2 },
    { category: 'A', type: 'Type8', value: 1 },
    { category: 'A', type: 'Type9', value: 1 },
    { category: 'A', type: 'Type10', value: 1 },
    { category: 'A', type: 'Type11', value: 1 },
    { category: 'A', type: 'Type12', value: 1 },
    { category: 'B', type: 'Type1', value: 12 },
    { category: 'B', type: 'Type2', value: 9 },
    { category: 'B', type: 'Type3', value: 7 },
    { category: 'B', type: 'Type4', value: 5 },
    { category: 'B', type: 'Type5', value: 4 },
    { category: 'B', type: 'Type6', value: 3 },
    { category: 'B', type: 'Type7', value: 2 },
    { category: 'B', type: 'Type8', value: 2 },
    { category: 'B', type: 'Type9', value: 1 },
    { category: 'B', type: 'Type10', value: 1 },
    { category: 'B', type: 'Type11', value: 1 },
    { category: 'B', type: 'Type12', value: 1 },
  ],
  encode: { x: 'category', y: 'value', color: 'type' },
  transform: [{ type: 'stackY' }],
});

chart.render();
```

In such cases, it's recommended to merge smaller categories into an "Others" category or use other chart types.

## Extensions of Stacked Bar Charts

### Diverging Stacked Bar Chart

Diverging stacked bar charts can display comparisons of positive and negative values, particularly suitable for showing profit/loss, increase/decrease contrasts.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'view',
  paddingLeft: 25,
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/nivo-gain-lost.json',
        transform: [
          {
            type: 'fold',
            fields: [
              'lost > 100$',
              'lost <= 100$',
              'gained <= 100$',
              'gained > 100$',
            ],
          },
        ],
      },
      encode: { x: 'user', y: 'value', color: 'key' },
      transform: [{ type: 'stackY' }],
      scale: {
        x: { padding: 0.2 },
        y: { domainMin: -100, domainMax: 100 },
        color: {
          domain: [
            'lost > 100$',
            'lost <= 100$',
            'gained <= 100$',
            'gained > 100$',
          ],
          range: ['#97e3d5', '#61cdbb', '#e25c3b', '#f47560'],
        },
      },
      style: { radius: 10 },
      axis: {
        y: { position: 'right', title: false, labelFormatter: (v) => `${v}%` },
      },
      legend: { color: { title: false } },
      labels: [
        {
          text: 'value',
          position: 'inside',
          formatter: (v) => (v ? `${v}%` : ''),
          transform: [{ type: 'overlapDodgeY' }],
          fill: '#000',
          fontSize: 10,
        },
      ],
    },
    {
      type: 'lineY',
      data: [0],
      style: { lineWidth: 2, stroke: '#e25c3b', strokeOpacity: 1 },
    },
    {
      type: 'text',
      style: {
        x: -10,
        y: '75%',
        text: 'lost',
        fontWeight: 'bold',
        dy: -10,
        transform: 'rotate(-90)',
        fill: '#61cdbb',
      },
    },
    {
      type: 'text',
      style: {
        x: -10,
        y: '20%',
        text: 'gain',
        fontWeight: 'bold',
        dy: -10,
        transform: 'rotate(-90)',
        fill: '#e25c3b',
      },
    },
  ],
});

chart.render();
```

**Explanation**:

- Uses positive and negative value data to show profit/loss comparison
- Sets `domainMin` and `domainMax` to control axis range
- Adds dividing line to highlight positive/negative value boundary
- Uses rounded corner style to enhance visual effect

## Comparison with Other Charts

### Stacked Bar Charts vs [Bar Charts](/charts/bar)

- Stacked bar charts show compositional relationships and totals of multiple subcategories
- Regular bar charts are mainly used to compare single values across different categories
- Stacked bar charts can simultaneously show part-to-whole relationships

### Stacked Bar Charts vs [Stacked Area Charts](/charts/stacked-area)

- Stacked bar charts are suitable for discrete categorical data comparison
- Stacked area charts are suitable for continuous time series data trend display
- Stacked bar charts are more convenient for precise numerical comparison

### Stacked Bar Charts vs [Pie Charts](/charts/pie)

- Stacked bar charts can simultaneously compare composition across multiple categories
- Pie charts can only show the composition proportion of a single whole
- Stacked bar charts have advantages when comparing multiple categories

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code> 
