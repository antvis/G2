---
title: band
order: 2
---

## Overview

The band scale is a special type of ordinal scale that maps discrete domains (such as categories, names, etc.) to continuous numerical ranges, allocating equal-width intervals (bands) for each category. Unlike regular [ordinal](/en/manual/core/scale/ordinal) scales, band scales not only focus on point positions but also consider the interval width occupied by each category.

Key characteristics of band scales:

- Maps discrete data (such as categories) to continuous intervals
- Allocates equal-width intervals (bands) for each category
- Supports setting inner spacing between categories (paddingInner) and outer spacing (paddingOuter)
- Commonly used in visualizations that need to represent categorical data, such as bar charts and column charts

In G2, the band scale is the default x-axis scale for bar charts (interval marks), automatically handling the mapping and layout of categorical data.

## Configuration Options

| Property     | Description                                                                                 | Type                                                   | Default     | Required |
| ------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------- | -------- |
| domain       | Sets the domain array, i.e., possible values of input data                                  | `number[] \| string[] \| Date[]`                       | `[]`        |          |
| range        | Sets the range of data mapping, i.e., the output range                                      | `number[]` \| `string[]`                               | `[0, 1]`    |          |
| unknown      | Return value for `undefined`, `NaN`, `null` empty values                                    | `any`                                                  | `undefined` |          |
| round        | Whether to round the output values                                                          | `boolean`                                              | `false`     |          |
| paddingInner | Sets inner spacing between categories, in range [0, 1], larger values mean larger spacing   | `number`                                               | `0`         |          |
| paddingOuter | Sets outer spacing at both ends, in range [0, 1], larger values mean larger spacing         | `number`                                               | `0`         |          |
| padding      | Shortcut to set both `paddingInner` and `paddingOuter`                                      | `number`                                               | `0`         |          |
| align        | Alignment, in range [0, 1], 0 means left-aligned, 0.5 means centered, 1 means right-aligned | `number`                                               | `0.5`       |          |
| compare      | Sorting function for domain mapping                                                         | `(a: string or number, b: string or number) => number` | `undefined` |          |
| flex         | Sets width allocation ratio for each category                                               | `number[]`                                             | `[]`        |          |

### Layout Principles of Band Scale

The band scale divides the continuous range into equal-width intervals, with each interval corresponding to a discrete value in the domain. The following diagram illustrates the layout principles of the band scale:

```plain
|<------------------------------------------- range ------------------------------------------->|
|             |                   |             |                   |             |             |
|<--step*PO-->|<----bandWidth---->|<--step*PI-->|<----bandWidth---->|<--step*PI-->|<--step*PO-->|
|             | ***************** |             | ***************** |             |             |
|             | ******* A ******* |             | ******* B ******* |             |             |
|             | ***************** |             | ***************** |             |             |
|             |<--------------step------------->|                                               |
|-----------------------------------------------------------------------------------------------|
```

Where:

- **range**: The entire range of the scale
- **bandWidth**: The width occupied by each category
- **step**: The distance between the center points of adjacent categories
- **step\*PI (paddingInner)**: Inner spacing between categories
- **step\*PO (paddingOuter)**: Outer spacing at both ends

## Bandwidth Concept Explained

### What is Bandwidth

Bandwidth is the actual width occupied by each category in a band scale. It determines the width of bars in bar charts, the height of bars in horizontal bar charts, etc. Bandwidth is the core concept that distinguishes band scales from other scales.

### Bandwidth Calculation Formula

The bandwidth calculation involves multiple parameters, with the specific formula as follows:

```plain
step = rangeLength / (domain.length - paddingInner + paddingOuter * 2)
bandWidth = step * (1 - paddingInner)
```

Where:

- `rangeLength`: The length of the range (range[1] - range[0])
- `domain.length`: The number of categories in the domain
- `paddingInner`: Inner spacing ratio [0, 1]
- `paddingOuter`: Outer spacing ratio [0, 1]

### Impact of Parameters on Bandwidth

#### 1. Impact of paddingInner

`paddingInner` controls the spacing between categories and directly affects bandwidth size:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { category: 'A', value: 100 },
  { category: 'B', value: 80 },
  { category: 'C', value: 120 },
  { category: 'D', value: 90 },
];

// Create three charts showing different paddingInner effects
const charts = [
  { paddingInner: 0, title: 'paddingInner: 0 (Maximum bandwidth)' },
  { paddingInner: 0.3, title: 'paddingInner: 0.3 (Medium bandwidth)' },
  { paddingInner: 0.8, title: 'paddingInner: 0.8 (Minimum bandwidth)' },
];

charts.forEach((config, index) => {
  const container = document.createElement('div');
  container.style.width = '300px';
  container.style.height = '200px';
  container.style.display = 'inline-block';
  container.style.margin = '10px';
  document.getElementById('container').appendChild(container);

  const chart = new Chart({
    container,
    autoFit: true,
  });

  chart.options({
    type: 'interval',
    data,
    encode: {
      x: 'category',
      y: 'value',
      color: 'category',
    },
    scale: {
      x: {
        type: 'band',
        paddingInner: config.paddingInner,
        paddingOuter: 0.1,
      },
    },
    axis: {
      x: { title: config.title },
      y: { title: null },
    },
  });

  chart.render();
});
```

#### 2. Impact of paddingOuter

`paddingOuter` controls the spacing at both ends and indirectly affects bandwidth:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { category: 'A', value: 100 },
  { category: 'B', value: 80 },
  { category: 'C', value: 120 },
  { category: 'D', value: 90 },
];

const charts = [
  { paddingOuter: 0, title: 'paddingOuter: 0' },
  { paddingOuter: 0.3, title: 'paddingOuter: 0.3' },
  { paddingOuter: 0.6, title: 'paddingOuter: 0.6' },
];

charts.forEach((config, index) => {
  const container = document.createElement('div');
  container.style.width = '300px';
  container.style.height = '200px';
  container.style.display = 'inline-block';
  container.style.margin = '10px';
  document.getElementById('container').appendChild(container);

  const chart = new Chart({
    container,
    autoFit: true,
  });

  chart.options({
    type: 'interval',
    data,
    encode: {
      x: 'category',
      y: 'value',
      color: 'category',
    },
    scale: {
      x: {
        type: 'band',
        paddingInner: 0.2,
        paddingOuter: config.paddingOuter,
      },
    },
    axis: {
      x: { title: config.title },
      y: { title: null },
    },
  });

  chart.render();
});
```

#### 3. Impact of Category Count

The more categories there are, the smaller the bandwidth for each category:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const datasets = [
  {
    data: [
      { category: 'A', value: 100 },
      { category: 'B', value: 80 },
    ],
    title: '2 Categories',
  },
  {
    data: [
      { category: 'A', value: 100 },
      { category: 'B', value: 80 },
      { category: 'C', value: 120 },
      { category: 'D', value: 90 },
    ],
    title: '4 Categories',
  },
  {
    data: [
      { category: 'A', value: 100 },
      { category: 'B', value: 80 },
      { category: 'C', value: 120 },
      { category: 'D', value: 90 },
      { category: 'E', value: 110 },
      { category: 'F', value: 95 },
    ],
    title: '6 Categories',
  },
];

datasets.forEach((dataset, index) => {
  const container = document.createElement('div');
  container.style.width = '300px';
  container.style.height = '200px';
  container.style.display = 'inline-block';
  container.style.margin = '10px';
  document.getElementById('container').appendChild(container);

  const chart = new Chart({
    container,
    autoFit: true,
  });

  chart.options({
    type: 'interval',
    data: dataset.data,
    encode: {
      x: 'category',
      y: 'value',
      color: 'category',
    },
    scale: {
      x: {
        type: 'band',
        padding: 0.3, // Fixed spacing ratio
      },
    },
    axis: {
      x: { title: dataset.title },
      y: { title: null },
    },
  });

  chart.render();
});
```

### How to Get Bandwidth Value

In actual development, sometimes you need to get the calculated bandwidth value, which can be done in the following way:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', value: 100 },
    { category: 'B', value: 80 },
    { category: 'C', value: 120 },
    { category: 'D', value: 90 },
  ],
  encode: {
    x: 'category',
    y: 'value',
    color: 'category',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.3,
    },
  },
});

chart.render().then(() => {
  // Get x-axis scale
  const xScale = chart.getScale().x;

  // Get bandwidth value - use no-parameter call
  const bandWidth = xScale.getBandWidth?.() ?? 0;
  console.log('Current bandwidth value:', bandWidth);

  // You can also get bandwidth for specific category (if needed)
  const categoryABandWidth = xScale.getBandWidth?.(xScale.invert('A')) ?? 0;
  console.log('Category A bandwidth value:', categoryABandWidth);

  // Calculate step value (distance between adjacent category centers)
  const domain = xScale.getOptions()?.domain || [];
  const range = xScale.getOptions()?.range || [0, 1];
  const rangeLength = range[1] - range[0];
  const paddingInner = xScale.getOptions()?.paddingInner || 0;
  const paddingOuter = xScale.getOptions()?.paddingOuter || 0;
  const step = rangeLength / (domain.length - paddingInner + paddingOuter * 2);
  console.log('Current step value:', step);

  // Display bandwidth information on the chart
  const container = chart.getContainer();
  const info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '10px';
  info.style.left = '10px';
  info.style.background = 'rgba(0,0,0,0.8)';
  info.style.color = 'white';
  info.style.padding = '5px 10px';
  info.style.borderRadius = '4px';
  info.style.fontSize = '12px';
  info.innerHTML = `Bandwidth: ${bandWidth.toFixed(2)}<br>Step: ${step.toFixed(2)}`;
  container.appendChild(info);
});
```

### Bandwidth Applications in Different Chart Types

#### 1. Bandwidth in Bar Charts

In bar charts, bandwidth directly determines the width of bars:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { month: 'Jan', sales: 1200 },
    { month: 'Feb', sales: 1100 },
    { month: 'Mar', sales: 1350 },
    { month: 'Apr', sales: 1280 },
  ],
  encode: {
    x: 'month',
    y: 'sales',
    color: 'month',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.2, // Smaller spacing, wider bars
    },
  },
  style: {
    stroke: '#fff',
    strokeWidth: 2,
  },
});

chart.render();
```

#### 2. Bandwidth in Horizontal Bar Charts

In horizontal bar charts, bandwidth determines the height of bars:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: [
    { department: 'Sales', count: 45 },
    { department: 'Marketing', count: 32 },
    { department: 'Technology', count: 28 },
    { department: 'HR', count: 15 },
  ],
  encode: {
    x: 'department',
    y: 'count',
    color: 'department',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.4, // Larger spacing between bars
    },
  },
});

chart.render();
```

#### 3. Bandwidth in Grouped Bar Charts

In grouped bar charts, the overall bandwidth is divided equally among the sub-groups:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { quarter: 'Q1', type: 'Actual', value: 120 },
    { quarter: 'Q1', type: 'Budget', value: 100 },
    { quarter: 'Q2', type: 'Actual', value: 140 },
    { quarter: 'Q2', type: 'Budget', value: 130 },
    { quarter: 'Q3', type: 'Actual', value: 160 },
    { quarter: 'Q3', type: 'Budget', value: 150 },
  ],
  encode: {
    x: 'quarter',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  scale: {
    x: {
      type: 'band',
      padding: 0.3, // Overall bandwidth for each quarter
    },
  },
});

chart.render();
```

### Bandwidth Optimization Recommendations

#### 1. Adjust Spacing Based on Data Volume

- **Small data (< 5 categories)**: Use smaller padding (0.1-0.3) to make bars wider and more prominent
- **Medium data (5-10 categories)**: Use medium padding (0.3-0.5) to balance readability and visual effect
- **Large data (> 10 categories)**: Use larger padding (0.5-0.8) or consider paginated display

#### 2. Consider Chart Container Size

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Simulate bandwidth effects under different container widths
const widths = [300, 600, 900];
const data = Array.from({ length: 8 }, (_, i) => ({
  category: `Category ${String.fromCharCode(65 + i)}`,
  value: Math.random() * 100 + 50,
}));

widths.forEach((width, index) => {
  const container = document.createElement('div');
  container.style.width = `${width}px`;
  container.style.height = '200px';
  container.style.display = 'inline-block';
  container.style.margin = '10px';
  container.style.border = '1px solid #ccc';
  document.getElementById('container').appendChild(container);

  const chart = new Chart({
    container,
    width,
    height: 200,
  });

  chart.options({
    type: 'interval',
    data,
    encode: {
      x: 'category',
      y: 'value',
      color: 'category',
    },
    scale: {
      x: {
        type: 'band',
        padding: 0.2, // Fixed spacing ratio
      },
    },
    axis: {
      x: { title: `Container width: ${width}px` },
      y: { title: null },
    },
  });

  chart.render();
});
```

#### 3. Responsive Bandwidth Design

For charts that need to adapt to different screen sizes, you can dynamically adjust padding:

```js
// Dynamically adjust padding based on container width
function getResponsivePadding(containerWidth, dataLength) {
  const baseWidth = containerWidth / dataLength;

  if (baseWidth > 100) {
    return 0.6; // Increase spacing when container is very wide
  } else if (baseWidth > 50) {
    return 0.4; // Medium width
  } else {
    return 0.2; // Reduce spacing when container is narrow
  }
}
```

By deeply understanding the bandwidth concept, you can better control the visual effects of charts and create both beautiful and practical data visualizations.

## Usage Examples

### Basic Bar Chart

The most common application of band scales is in bar charts. By setting `padding`, you can control the spacing between bars:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.5, // Set spacing between bars
    },
  },
});

chart.render();
```

### Grouped Bar Chart

In grouped bar charts, band scales work together with dodgeX transform to create grouping effects:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { month: 'Jan', value: 86.5, type: 'Precipitation' },
    { month: 'Feb', value: 86.5, type: 'Precipitation' },
    { month: 'Mar', value: 86.5, type: 'Precipitation' },
    { month: 'Apr', value: 86.5, type: 'Precipitation' },
    { month: 'May', value: 86.5, type: 'Precipitation' },
    { month: 'Jun', value: 86.5, type: 'Precipitation' },
    { month: 'Jan', value: 30.5, type: 'Evaporation' },
    { month: 'Feb', value: 30.5, type: 'Evaporation' },
    { month: 'Mar', value: 30.5, type: 'Evaporation' },
    { month: 'Apr', value: 30.5, type: 'Evaporation' },
    { month: 'May', value: 30.5, type: 'Evaporation' },
    { month: 'Jun', value: 30.5, type: 'Evaporation' },
  ],
  encode: {
    x: 'month',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  scale: {
    x: {
      type: 'band',
      padding: 0.2, // Set spacing between groups
    },
  },
});

chart.render();
```

### Custom Bar Width

Using the `flex` property allows setting different width ratios for different categories:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { country: 'USA', value: 12394, gdp: 21.4 },
    { country: 'China', value: 9608, gdp: 14.7 },
    { country: 'Japan', value: 4731, gdp: 5.0 },
    { country: 'Germany', value: 3861, gdp: 4.2 },
    { country: 'UK', value: 2678, gdp: 2.9 },
  ],
  encode: {
    x: 'country',
    y: 'value',
    color: 'country',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.4,
      flex: [2.14, 1.47, 0.5, 0.42, 0.29], // Set different widths based on GDP
    },
  },
});

chart.render();
```

### Horizontal Bar Chart

By transposing the coordinate system, you can create horizontal bar charts where band scales still apply:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.5,
    },
  },
});

chart.render();
```

### Stacked Bar Chart

Using `stackY` transform can create stacked bar charts showing cumulative effects of each part:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { quarter: 'Q1', department: 'Sales', value: 120 },
    { quarter: 'Q1', department: 'Marketing', value: 100 },
    { quarter: 'Q1', department: 'Technology', value: 80 },
    { quarter: 'Q2', department: 'Sales', value: 140 },
    { quarter: 'Q2', department: 'Marketing', value: 110 },
    { quarter: 'Q2', department: 'Technology', value: 90 },
    { quarter: 'Q3', department: 'Sales', value: 160 },
    { quarter: 'Q3', department: 'Marketing', value: 95 },
    { quarter: 'Q3', department: 'Technology', value: 120 },
    { quarter: 'Q4', department: 'Sales', value: 180 },
    { quarter: 'Q4', department: 'Marketing', value: 100 },
    { quarter: 'Q4', department: 'Technology', value: 130 },
  ],
  encode: {
    x: 'quarter',
    y: 'value',
    color: 'department',
  },
  transform: [{ type: 'stackY' }],
  scale: {
    x: {
      type: 'band',
      padding: 0.3,
    },
  },
});

chart.render();
```

### Variable-Width Bar Chart (Using flexX Transform)

Automatically adjust bar width based on specified field values, suitable for representing weight or proportional relationships:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { region: 'East', sales: 8500, population: 2.4 },
    { region: 'South', sales: 6200, population: 1.8 },
    { region: 'North', sales: 7800, population: 2.1 },
    { region: 'Southwest', sales: 4500, population: 1.2 },
    { region: 'Northeast', sales: 3200, population: 0.9 },
    { region: 'Northwest', sales: 2800, population: 0.7 },
  ],
  encode: {
    x: 'region',
    y: 'sales',
    color: 'region',
  },
  transform: [{ type: 'flexX', field: 'population' }], // Adjust bar width based on population data
  scale: {
    x: {
      type: 'band',
      padding: 0.2,
    },
  },
});

chart.render();
```

### Time Series Bar Chart

When handling time data, band scales can well handle the visualization of time intervals:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { month: '2024-01', sales: 1200 },
    { month: '2024-02', sales: 1100 },
    { month: '2024-03', sales: 1350 },
    { month: '2024-04', sales: 1280 },
    { month: '2024-05', sales: 1400 },
    { month: '2024-06', sales: 1520 },
    { month: '2024-07', sales: 1680 },
    { month: '2024-08', sales: 1590 },
    { month: '2024-09', sales: 1450 },
    { month: '2024-10', sales: 1380 },
    { month: '2024-11', sales: 1250 },
    { month: '2024-12', sales: 1600 },
  ],
  encode: {
    x: 'month',
    y: 'sales',
    color: (d) => (d.sales > 1500 ? 'high' : d.sales > 1300 ? 'medium' : 'low'),
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.1,
    },
    color: {
      domain: ['low', 'medium', 'high'],
      range: ['#faad14', '#1890ff', '#52c41a'],
    },
  },
});

chart.render();
```

### Multi-Level Categorical Bar Chart

Displaying categorical data with hierarchical structure:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { category: 'Clothing-Men', subcategory: 'Shirts', value: 850 },
    { category: 'Clothing-Men', subcategory: 'Pants', value: 750 },
    { category: 'Clothing-Men', subcategory: 'Jackets', value: 650 },
    { category: 'Clothing-Women', subcategory: 'Dresses', value: 950 },
    { category: 'Clothing-Women', subcategory: 'Tops', value: 800 },
    { category: 'Clothing-Women', subcategory: 'Skirts', value: 700 },
    { category: 'Electronics-Phones', subcategory: 'iPhone', value: 1200 },
    { category: 'Electronics-Phones', subcategory: 'Huawei', value: 1100 },
    { category: 'Electronics-Phones', subcategory: 'Xiaomi', value: 900 },
    { category: 'Electronics-Computers', subcategory: 'Laptops', value: 1500 },
    { category: 'Electronics-Computers', subcategory: 'Desktops', value: 800 },
    { category: 'Electronics-Computers', subcategory: 'Tablets', value: 600 },
  ],
  encode: {
    x: 'category',
    y: 'value',
    color: 'subcategory',
  },
  transform: [{ type: 'dodgeX' }],
  scale: {
    x: {
      type: 'band',
      padding: 0.4, // Larger spacing to distinguish different main categories
      paddingInner: 0.3, // Inner spacing
      paddingOuter: 0.1, // Outer spacing
    },
  },
});

chart.render();
```

### Comparative Analysis Bar Chart

Using paddingInner and paddingOuter to precisely control spacing, suitable for comparative analysis:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { product: 'Product A', current: 320, target: 400 },
    { product: 'Product B', current: 280, target: 350 },
    { product: 'Product C', current: 410, target: 450 },
    { product: 'Product D', current: 180, target: 250 },
    { product: 'Product E', current: 350, target: 380 },
  ].flatMap((d) => [
    { product: d.product, type: 'Current Sales', value: d.current },
    { product: d.product, type: 'Target Sales', value: d.target },
  ]),
  encode: {
    x: 'product',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  scale: {
    x: {
      type: 'band',
      paddingInner: 0.2, // Smaller intra-group spacing
      paddingOuter: 0.3, // Larger inter-group spacing
    },
    color: {
      domain: ['Current Sales', 'Target Sales'],
      range: ['#1890ff', '#52c41a'],
    },
  },
});

chart.render();
```

### Dynamic Bar Width Chart

Combine compare function to sort data and use different bar width strategies:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { brand: 'Apple', market_share: 23.4, revenue: 365 },
  { brand: 'Samsung', market_share: 20.1, revenue: 220 },
  { brand: 'Huawei', market_share: 15.8, revenue: 180 },
  { brand: 'Xiaomi', market_share: 12.3, revenue: 120 },
  { brand: 'OPPO', market_share: 8.9, revenue: 95 },
  { brand: 'vivo', market_share: 7.2, revenue: 85 },
  { brand: 'Others', market_share: 12.3, revenue: 150 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'brand',
    y: 'market_share',
    color: 'brand',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.2,
      compare: (a, b) => {
        // Sort by market share in descending order
        const dataA = data.find((d) => d.brand === a);
        const dataB = data.find((d) => d.brand === b);
        return (dataB?.market_share || 0) - (dataA?.market_share || 0);
      },
      flex: [2.34, 2.01, 1.58, 1.23, 0.89, 0.72, 1.23], // Set width based on market share
    },
  },
});

chart.render();
```

## Advanced Application Scenarios

### Waterfall Chart (Using Band Scale)

Displaying step-by-step cumulative changes in values:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Waterfall chart data processing
const rawData = [
  { name: 'Initial Balance', value: 1000, type: 'start' },
  { name: 'Revenue Increase', value: 500, type: 'positive' },
  { name: 'Cost Expense', value: -200, type: 'negative' },
  { name: 'Tax Expense', value: -150, type: 'negative' },
  { name: 'Other Income', value: 100, type: 'positive' },
  { name: 'Final Balance', value: 1250, type: 'end' },
];

// Calculate cumulative values
let cumulative = 0;
const data = rawData.map((d, i) => {
  if (d.type === 'start' || d.type === 'end') {
    const result = { ...d, start: 0, end: d.value };
    cumulative = d.value;
    return result;
  } else {
    const start = cumulative;
    cumulative += d.value;
    return { ...d, start, end: cumulative };
  }
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: data.flatMap((d) => [
    { name: d.name, value: d.end - d.start, position: d.start, type: d.type },
  ]),
  encode: {
    x: 'name',
    y: ['position', (d) => d.position + d.value],
    color: 'type',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.4,
    },
    color: {
      domain: ['start', 'positive', 'negative', 'end'],
      range: ['#722ed1', '#52c41a', '#ff4d4f', '#1890ff'],
    },
  },
});

chart.render();
```

### Faceted Bar Chart

Using band scales with faceted layout to display multi-dimensional data:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'facetRect',
  data: [
    { region: 'North', quarter: 'Q1', product: 'Product A', sales: 120 },
    { region: 'North', quarter: 'Q1', product: 'Product B', sales: 100 },
    { region: 'North', quarter: 'Q1', product: 'Product C', sales: 80 },
    { region: 'North', quarter: 'Q2', product: 'Product A', sales: 140 },
    { region: 'North', quarter: 'Q2', product: 'Product B', sales: 110 },
    { region: 'North', quarter: 'Q2', product: 'Product C', sales: 90 },
    { region: 'South', quarter: 'Q1', product: 'Product A', sales: 150 },
    { region: 'South', quarter: 'Q1', product: 'Product B', sales: 130 },
    { region: 'South', quarter: 'Q1', product: 'Product C', sales: 110 },
    { region: 'South', quarter: 'Q2', product: 'Product A', sales: 170 },
    { region: 'South', quarter: 'Q2', product: 'Product B', sales: 140 },
    { region: 'South', quarter: 'Q2', product: 'Product C', sales: 120 },
  ],
  encode: { x: 'region', y: 'quarter' },
  children: [
    {
      type: 'interval',
      encode: {
        x: 'product',
        y: 'sales',
        color: 'product',
      },
      scale: {
        x: {
          type: 'band',
          padding: 0.3,
        },
      },
    },
  ],
});

chart.render();
```

## Common Questions

### How to adjust the width of bars?

You can adjust the spacing between bars by setting the `padding` property, which indirectly adjusts the width of the bars. The larger the `padding` value, the narrower the bars; the smaller the value, the wider the bars.

```js
chart.interval().encode('x', 'type').encode('y', 'sale').scale('x', {
  type: 'band',
  padding: 0.5, // Value range is [0, 1]
});
```

### What's the difference between band scale and point scale?

- **Band Scale**: Allocates an interval (bandwidth) for each category, suitable for bar charts and other charts that need to occupy width
- **Point Scale**: Allocates a point for each category, equivalent to a band scale with `bandWidth = 0`, suitable for scatter plots and other charts that only need point positions

### How to set different widths for bars?

There are two methods:

1. Use the `flex` property to set different width ratios for different categories
2. Use the `flexX` transform to automatically set bar width based on specified field values

```js
// Method 1: Using flex property
chart
  .interval()
  .encode('x', 'country')
  .encode('y', 'value')
  .scale('x', {
    type: 'band',
    flex: [2, 1, 3, 1.5], // Manually set width ratios
  });

// Method 2: Using flexX transform
chart
  .interval()
  .encode('x', 'country')
  .encode('y', 'value')
  .transform({ type: 'flexX', field: 'gdp' }); // Automatically set width based on gdp field
```
