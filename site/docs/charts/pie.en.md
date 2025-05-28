---
title: Pie Chart
order: 5
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*q_VWSqumTu4AAAAAAAAAAAAADmJ7AQ/original'
category: ['part-to-whole']
similar: ['donut', 'rose']
---

<img alt="pie" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*q_VWSqumTu4AAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Pie Charts

A pie chart is a circular statistical chart that represents data as sectors of a circle, used to display the proportional relationship of different categories within a total. Each sector's angle is proportional to the value it represents, and the entire pie represents the sum of the data.

Pie charts are particularly suitable for displaying the proportional relationships of categorical data, intuitively showing the relative importance of each part within the whole. By using different colored sectors to distinguish categories, comparing the proportions of different categories becomes simple and intuitive.

When there are fewer categories (typically no more than 5-7) and emphasis on the relationship between parts and the whole is needed, pie charts are an excellent choice. For cases with many categories, consider merging smaller proportions into an "Others" category.

**Other Names**: Pie Chart, Pie Graph

## Components of a Pie Chart

### Basic Pie Chart

<img alt="basic-pie" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*q_VWSqumTu4AAAAAAAAAAAAADmJ7AQ/original" width=600 />

| Chart Type | Basic Pie Chart |
| ---------- | --------------- |
| Suitable Data | Categorical data: one categorical data field, one continuous data field |
| Function | Display the proportional relationship of each category within the total |
| Data-to-Graphics Mapping | Category field maps to sector color and labels<br>Value field maps to sector angle size<br>The entire circle represents the data total |
| Suitable Scenarios | Proportion display with fewer categories (within 5-7) |

---

### Donut Chart

<img alt="donut-chart" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LbyiSpiAFooAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| Chart Type | Donut Chart |
| ---------- | ----------- |
| Suitable Data | Categorical data: one categorical data field, one continuous data field |
| Function | Display proportional relationships of categories while showing totals or key information in the center area |
| Data-to-Graphics Mapping | Category field maps to sector color and labels<br>Value field maps to sector angle size<br>Center area can display additional information |
| Suitable Scenarios | Proportion display with need to show totals or key metrics in the center |

## Use Cases of Pie Charts

### Suitable Use Cases

Example 1: **Display market share distribution**

The following chart shows the market share proportions of different browsers, clearly displaying the relative position of each browser in the market.

| browser | value (market share) |
| ------- | -------------------- |
| Chrome | 61.04 |
| Safari | 15.12 |
| Edge | 10.52 |
| Firefox | 7.19 |
| Samsung Internet | 2.98 |
| Opera | 3.15 |

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { browser: 'Chrome', value: 61.04 },
    { browser: 'Safari', value: 15.12 },
    { browser: 'Edge', value: 10.52 },
    { browser: 'Firefox', value: 7.19 },
    { browser: 'Samsung Internet', value: 2.98 },
    { browser: 'Opera', value: 3.15 },
  ],
  encode: {
    y: 'value',
    color: 'browser',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },
  legend: {
    color: {
      position: 'right',
      rowPadding: 5,
    },
  },
});

chart.render();
```

**Explanation**:
- The `browser` field maps to color, distinguishing different browsers
- The `value` field maps to angle size, representing market share
- Use `coordinate: { type: 'theta' }` to convert bar chart to pie chart
- Use `transform: [{ type: 'stackY' }]` to stack data

Example 2: **Display budget allocation**

Pie charts are very suitable for displaying budget, expenditure, and other resource allocation situations, allowing people to see the resource proportion of each project at a glance.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { category: 'R&D', value: 35 },
    { category: 'Marketing', value: 25 },
    { category: 'Sales', value: 20 },
    { category: 'Operations', value: 15 },
    { category: 'Others', value: 5 },
  ],
  encode: {
    y: 'value',
    color: 'category',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', outerRadius: 0.8 },
  scale: {
    color: {
      palette: 'category10',
    },
  },
  legend: {
    color: {
      position: 'right',
      rowPadding: 5,
    },
  },
  labels: [
    {
      text: (d) => `${d.category}: ${d.value}%`,
      position: 'outside',
      connector: true,
    },
  ],
});

chart.render();
```

**Explanation**:
- Use external labels to display category names and percentages
- `connector: true` adds label connection lines
- `outerRadius: 0.8` adjusts pie chart size to leave space for labels

Example 3: **Donut chart displaying multi-level data**

Donut charts can display total information in the center area or show multi-level nested categorical data.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { type: 'Mobile', value: 45 },
    { type: 'Desktop', value: 35 },
    { type: 'Tablet', value: 20 },
  ],
  encode: {
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { 
    type: 'theta', 
    innerRadius: 0.4,
    outerRadius: 0.8,
  },
  scale: {
    color: {
      palette: 'spectral',
    },
  },
  legend: {
    color: {
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
  labels: [
    {
      text: (d) => `${d.value}%`,
      position: 'inside',
      fill: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  ],
});

chart.render();
```

**Explanation**:
- `innerRadius: 0.4` creates the inner circle of the donut chart
- Internal labels display percentage values
- Legend placed at the bottom, horizontally centered

### Unsuitable Use Cases

Example 1: **Not suitable when there are too many categories**

When the number of categories exceeds 7, pie charts become difficult to read and compare. In such cases, consider using bar charts or column charts.

Example 2: **Not suitable for precise value comparison**

Pie charts are mainly used to display proportional relationships and are not suitable for precise value comparison. When precise comparison of specific values across categories is needed, bar charts would be a better choice.

Example 3: **Data trend display**

Pie charts are static proportion displays and are not suitable for showing data trends over time. Such needs should use line charts or area charts.

## Extensions of Pie Charts

### Rose Chart (Nightingale Chart)

Rose charts use the radius rather than the angle of sectors to represent values, suitable for displaying categorical data with large value differences.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 200 },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: 80 },
    { month: 'May', value: 70 },
    { month: 'Jun', value: 110 },
    { month: 'Jul', value: 130 },
    { month: 'Aug', value: 80 },
    { month: 'Sep', value: 140 },
    { month: 'Oct', value: 160 },
    { month: 'Nov', value: 180 },
    { month: 'Dec', value: 190 },
  ],
  encode: {
    x: 'month',
    y: 'value',
    color: 'month',
  },
  coordinate: { type: 'polar' },
  scale: {
    x: { padding: 0 },
    color: {
      palette: 'rainbow',
    },
  },
  axis: {
    x: { grid: true },
    y: { tickCount: 5, grid: true },
  },
  legend: false,
});

chart.render();
```

**Explanation**:
- Use `coordinate: { type: 'polar' }` to create polar coordinate system
- Values map to radius, months map to angle
- Suitable for displaying periodic data or cases with large value differences

### Nested Pie Chart

Nested pie charts can simultaneously display two levels of categorical data, with inner and outer rings representing different categorical dimensions.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { category: 'Electronics', subcategory: 'Phones', value: 35 },
    { category: 'Electronics', subcategory: 'Computers', value: 25 },
    { category: 'Electronics', subcategory: 'Tablets', value: 15 },
    { category: 'Clothing', subcategory: 'Menswear', value: 10 },
    { category: 'Clothing', subcategory: 'Womenswear', value: 8 },
    { category: 'Books', subcategory: 'Fiction', value: 4 },
    { category: 'Books', subcategory: 'Education', value: 3 },
  ],
  children: [
    {
      type: 'interval',
      encode: {
        y: 'value',
        color: 'category',
      },
      transform: [{ type: 'stackY' }],
      coordinate: { 
        type: 'theta', 
        innerRadius: 0.3,
        outerRadius: 0.6,
      },
      legend: false,
    },
    {
      type: 'interval',
      encode: {
        y: 'value',
        color: 'subcategory',
      },
      transform: [{ type: 'stackY' }],
      coordinate: { 
        type: 'theta', 
        innerRadius: 0.6,
        outerRadius: 0.9,
      },
      scale: {
        color: {
          palette: 'category20',
        },
      },
      legend: {
        color: {
          position: 'right',
          rowPadding: 3,
        },
      },
    },
  ],
});

chart.render();
```

**Explanation**:
- Inner ring shows main categories, outer ring shows subcategories
- Use different `innerRadius` and `outerRadius` to create two concentric rings
- Suitable for displaying hierarchical categorical data

## Comparing Pie Charts to Other Charts

### Pie Charts and [Bar Charts](/en/charts/bar)

- Pie charts emphasize the relationship between parts and the whole, suitable for displaying proportions
- Bar charts are more suitable for precise value comparison, not emphasizing the relationship with totals
- Choose pie charts when there are fewer categories and proportions need to be displayed, choose bar charts when precise value comparison is needed

### Pie Charts, [Donut Charts](/en/charts/donut), and [Rose Charts](/en/charts/rose)

- Pie charts are the most basic form, suitable for simple proportion display
- Donut charts can display additional information in the center, with higher space utilization
- Rose charts use radius to represent values, suitable for cases with large value differences

### Pie Charts and [Area Charts](/en/charts/area), [Line Charts](/en/charts/line)

- Pie charts display static proportional relationships, suitable for data snapshots at a specific time
- Area charts and line charts display data trends over time
- Choose pie charts when displaying proportions, choose area charts or line charts when displaying trends

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>