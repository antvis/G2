---
title: Scatter Plot
order: 11
screenshot: /screenshots/scatter-plot.webp
category: ['correlation', 'distribution']
similar: ['bubble', 'line', 'area']
---

## Introduction

A scatter plot is a visualization chart that displays the relationship between two continuous variables through points on a two-dimensional coordinate plane. The position of each data point is determined by the values of two variables, where one variable determines the horizontal position (x-axis) and the other determines the vertical position (y-axis). Scatter plots are particularly useful for exploring and displaying correlations between variables, distribution patterns, and identifying outliers.

## Components

A scatter plot consists of several main components:

1. **Data Points**: Circles or other shapes representing each observation in the dataset
2. **X-axis**: The horizontal coordinate axis, usually representing the independent variable
3. **Y-axis**: The vertical coordinate axis, usually representing the dependent variable
4. **Grid**: Reference lines that assist in reading values
5. **Legend**: When there are multiple data series, explains the meaning of different points

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    data: [
      { height: 161, weight: 50 },
      { height: 167, weight: 55 },
      { height: 171, weight: 63 },
      { height: 174, weight: 58 },
      { height: 176, weight: 65 },
      { height: 178, weight: 70 },
      { height: 180, weight: 72 },
      { height: 182, weight: 75 },
      { height: 185, weight: 78 },
      { height: 188, weight: 82 }
    ],
    encode: {
      x: 'height',
      y: 'weight'
    },
    style: {
      fill: '#1890ff',
      fillOpacity: 0.7,
      stroke: '#1890ff',
      strokeWidth: 2,
      r: 6
    },
    axis: {
      x: { title: 'Height (cm)' },
      y: { title: 'Weight (kg)' }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

## Use Cases

Scatter plots have wide applications in data analysis and visualization:

### Correlation Analysis

Used to explore linear or non-linear relationships between two continuous variables:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated data for advertising spend vs sales revenue relationship
  const data = [
    { adSpend: 10, revenue: 120 },
    { adSpend: 15, revenue: 180 },
    { adSpend: 20, revenue: 220 },
    { adSpend: 25, revenue: 280 },
    { adSpend: 30, revenue: 320 },
    { adSpend: 35, revenue: 380 },
    { adSpend: 40, revenue: 420 },
    { adSpend: 45, revenue: 480 },
    { adSpend: 50, revenue: 520 },
    { adSpend: 55, revenue: 580 },
    { adSpend: 60, revenue: 620 },
    { adSpend: 65, revenue: 680 }
  ];

  chart.options({
    type: 'point',
    data,
    encode: {
      x: 'adSpend',
      y: 'revenue'
    },
    style: {
      fill: '#52c41a',
      fillOpacity: 0.8,
      stroke: '#52c41a',
      strokeWidth: 2,
      r: 8
    },
    axis: {
      x: { title: 'Ad Spend (10K)' },
      y: { title: 'Sales Revenue (10K)' }
    },
    title: 'Advertising Spend vs Sales Revenue Analysis'
  });

  chart.render();

  return chart.getContainer();
})();
```

### Data Distribution Exploration

Scatter plots can observe distribution patterns, clustering, and outliers in data:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated student exam score distribution data
  const data = [
    { math: 85, english: 78, category: 'Science Class' },
    { math: 92, english: 75, category: 'Science Class' },
    { math: 88, english: 82, category: 'Science Class' },
    { math: 95, english: 79, category: 'Science Class' },
    { math: 89, english: 85, category: 'Science Class' },
    { math: 76, english: 88, category: 'Liberal Arts Class' },
    { math: 72, english: 92, category: 'Liberal Arts Class' },
    { math: 78, english: 85, category: 'Liberal Arts Class' },
    { math: 74, english: 89, category: 'Liberal Arts Class' },
    { math: 80, english: 91, category: 'Liberal Arts Class' },
    { math: 82, english: 83, category: 'Mixed Class' },
    { math: 86, english: 84, category: 'Mixed Class' },
    { math: 84, english: 86, category: 'Mixed Class' },
    { math: 87, english: 81, category: 'Mixed Class' }
  ];

  chart.options({
    type: 'point',
    data,
    encode: {
      x: 'math',
      y: 'english',
      color: 'category'
    },
    style: {
      fillOpacity: 0.8,
      strokeWidth: 2,
      r: 8
    },
    scale: {
      color: {
        palette: ['#1890ff', '#52c41a', '#fa8c16']
      }
    },
    axis: {
      x: { title: 'Math Score' },
      y: { title: 'English Score' }
    },
    legend: {
      color: { title: 'Class Type' }
    },
    title: 'Student Score Distribution by Class Type'
  });

  chart.render();

  return chart.getContainer();
})();
```

### Time Series Analysis

Scatter plots can also be used to display patterns in time series data:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated monthly data for website traffic vs conversion rate
  const data = [
    { month: 1, visitors: 15000, conversion: 2.1 },
    { month: 2, visitors: 18000, conversion: 2.3 },
    { month: 3, visitors: 22000, conversion: 2.8 },
    { month: 4, visitors: 25000, conversion: 3.2 },
    { month: 5, visitors: 28000, conversion: 3.5 },
    { month: 6, visitors: 32000, conversion: 3.8 },
    { month: 7, visitors: 35000, conversion: 4.1 },
    { month: 8, visitors: 38000, conversion: 4.3 },
    { month: 9, visitors: 33000, conversion: 3.9 },
    { month: 10, visitors: 30000, conversion: 3.6 },
    { month: 11, visitors: 27000, conversion: 3.4 },
    { month: 12, visitors: 31000, conversion: 3.7 }
  ];

  chart.options({
    type: 'point',
    data,
    encode: {
      x: 'visitors',
      y: 'conversion',
      size: 'month'
    },
    style: {
      fill: '#722ed1',
      fillOpacity: 0.7,
      stroke: '#722ed1',
      strokeWidth: 2
    },
    scale: {
      size: { range: [6, 16] }
    },
    axis: {
      x: { title: 'Monthly Visitors' },
      y: { title: 'Conversion Rate (%)' }
    },
    title: 'Website Traffic vs Conversion Rate (Point size = Month)'
  });

  chart.render();

  return chart.getContainer();
})();
```

## Extensions

### Bubble Chart

Adding a third dimension (point size) to display more information:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated product performance data
  const data = [
    { performance: 85, satisfaction: 8.2, marketShare: 15, product: 'Product A' },
    { performance: 78, satisfaction: 7.8, marketShare: 22, product: 'Product B' },
    { performance: 92, satisfaction: 8.8, marketShare: 8, product: 'Product C' },
    { performance: 88, satisfaction: 8.5, marketShare: 18, product: 'Product D' },
    { performance: 75, satisfaction: 7.5, marketShare: 25, product: 'Product E' },
    { performance: 90, satisfaction: 8.7, marketShare: 12, product: 'Product F' }
  ];

  chart.options({
    type: 'point',
    data,
    encode: {
      x: 'performance',
      y: 'satisfaction',
      size: 'marketShare',
      color: 'product'
    },
    style: {
      fillOpacity: 0.7,
      strokeWidth: 2
    },
    scale: {
      size: { range: [8, 32] }
    },
    axis: {
      x: { title: 'Product Performance Score' },
      y: { title: 'User Satisfaction' }
    },
    legend: {
      color: { title: 'Product Type' },
      size: { title: 'Market Share (%)' }
    },
    title: 'Product Performance vs User Satisfaction (Bubble size = Market Share)'
  });

  chart.render();

  return chart.getContainer();
})();
```

### Scatter Plot with Trend Line

Adding a regression line to more clearly show data trends:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  const data = [
    { x: 1, y: 2.1 }, { x: 2, y: 3.8 }, { x: 3, y: 5.2 },
    { x: 4, y: 6.9 }, { x: 5, y: 8.1 }, { x: 6, y: 9.8 },
    { x: 7, y: 11.2 }, { x: 8, y: 13.1 }, { x: 9, y: 14.8 },
    { x: 10, y: 16.5 }
  ];

  chart.options({
    children: [
      {
        type: 'point',
        data,
        encode: {
          x: 'x',
          y: 'y'
        },
        style: {
          fill: '#1890ff',
          fillOpacity: 0.8,
          stroke: '#1890ff',
          strokeWidth: 2,
          r: 6
        }
      },
      {
        type: 'line',
        data,
        encode: {
          x: 'x',
          y: 'y'
        },
        style: {
          stroke: '#ff4d4f',
          strokeWidth: 2,
          strokeDasharray: [4, 4]
        }
      }
    ],
    axis: {
      x: { title: 'X Variable' },
      y: { title: 'Y Variable' }
    },
    title: 'Scatter Plot with Trend Line'
  });

  chart.render();

  return chart.getContainer();
})();
```

## Comparison

Comparison of scatter plots with other chart types:

| Chart Type | Use Case | Advantages | Disadvantages |
|-----------|----------|------------|---------------|
| Scatter Plot | Explore variable relationships, outlier detection | Intuitive correlation display, easy pattern recognition | Points may overlap with too much data |
| Line Chart | Time series data, trend display | Clear trend visualization | Not suitable for showing variable correlations |
| Bar Chart | Categorical data comparison | Easy comparison between categories | Cannot show continuous variable relationships |
| Bubble Chart | Three-dimensional data display | More information content | Higher complexity, harder interpretation |

## Similar Charts

- **Bubble Chart**: Extension of scatter plot, using point size to represent the third dimension
- **Line Chart**: Also uses coordinate system, but emphasizes connections between data points
- **Area Chart**: Can be seen as filled line chart, emphasizing cumulative effect of quantities
