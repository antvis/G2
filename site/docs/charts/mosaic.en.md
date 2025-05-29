---
title: Mosaic Plot
order: 1
screenshot: 'https://os.alipayobjects.com/rmsportal/eXoQbOxSvByiNWd.jpg'
category: ['comparison', 'proportion']
similar: ['heatmap', 'treemap']
---

<img alt="mosaic" src="https://os.alipayobjects.com/rmsportal/eXoQbOxSvByiNWd.jpg" width=600/>

## Introduction to Mosaic Plots

A mosaic plot (also known as a Marimekko Chart) is a chart used to display relationships between categorical data. It represents data proportions and classifications through the area and color of rectangles.

Mosaic plots are divided into two types: uniform and non-uniform. Uniform mosaic plots are more common in daily life, such as subway fare charts, while non-uniform mosaic plots are more frequently used in statistical fields.

**Other Names**: Mosaic Plot, Marimekko Chart

## Components of a Mosaic Plot

### Non-uniform Axis Mosaic Plot

<img alt="mosaic-uneven" src="https://os.alipayobjects.com/rmsportal/RKlgDYrPsNzxKHt.png" width=600/>

| Chart Type      | Non-uniform Axis Mosaic Plot                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| Suitable Data   | Multi-dimensional categorical data                                                                           |
| Functionality   | Display distribution of multi-dimensional categorical data                                                   |
| Data Mapping    | Categorical data fields map to non-uniform coordinate axes<br>Area and color represent data proportions and classifications |
| Data Size Limit | More effective with higher dimensional data                                                                  |

---

### Uniform Axis Mosaic Plot

<img alt="mosaic-even" src="https://os.alipayobjects.com/rmsportal/VwBbTVppnBdxlhk.png" width=600/>

| Chart Type      | Uniform Axis Mosaic Plot                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| Suitable Data   | Two-dimensional categorical data                                                                             |
| Functionality   | Display distribution of two-dimensional categorical data                                                     |
| Data Mapping    | Categorical data fields map to uniform coordinate axes<br>Color represents data classifications              |
| Data Size Limit | More effective with lower dimensional data                                                                   |

## Use Cases of Mosaic Plots

### Suitable Use Cases

Example 1: **Suitable for multi-dimensional categorical data analysis**

![Non-uniform Mosaic Plot](https://t.alipayobjects.com/images/rmsweb/T1B.0iXcxfXXXXXXXX.png)

Example 2: **Suitable for two-dimensional categorical data analysis**

```js | ob { autoMount: true }
const chart = new G2.Chart({
  container: 'container',
  autoFit: true,
  height: 400,
});

chart.options({
  type: 'cell',
  data: [
    { product: 'Phone', region: 'North', sales: 120, category: 'Premium' },
    { product: 'Phone', region: 'East', sales: 180, category: 'Premium' },
    { product: 'Phone', region: 'South', sales: 150, category: 'Premium' },
    { product: 'Computer', region: 'North', sales: 80, category: 'Mid-range' },
    { product: 'Computer', region: 'East', sales: 110, category: 'Mid-range' },
    { product: 'Computer', region: 'South', sales: 95, category: 'Mid-range' },
    { product: 'Tablet', region: 'North', sales: 60, category: 'Mid-range' },
    { product: 'Tablet', region: 'East', sales: 85, category: 'Mid-range' },
    { product: 'Tablet', region: 'South', sales: 70, category: 'Budget' },
    { product: 'Headphone', region: 'North', sales: 40, category: 'Budget' },
    { product: 'Headphone', region: 'East', sales: 55, category: 'Budget' },
    { product: 'Headphone', region: 'South', sales: 45, category: 'Budget' },
  ],
  encode: {
    x: 'product',
    y: 'region',
    color: 'category',
    size: 'sales',
  },
  scale: {
    color: {
      palette: 'category10',
      type: 'ordinal',
    },
    size: {
      type: 'linear',
      range: [0.3, 1],
    },
  },
  style: {
    stroke: '#fff',
    strokeWidth: 2,
    inset: 2,
  },
  legend: {
    color: {
      title: 'Product Category',
      position: 'top',
    },
    size: {
      title: 'Sales Volume',
      position: 'right',
    },
  },
  axis: {
    x: {
      title: 'Product Type',
      labelAutoRotate: false,
    },
    y: {
      title: 'Sales Region',
    },
  },
  tooltip: {
    title: (d) => `${d.product} - ${d.region}`,
    items: [
      { field: 'sales', name: 'Sales', valueFormatter: (v) => `${v}K` },
      { field: 'category', name: 'Category' },
    ],
  },
});

chart.render();
```

### Unsuitable Use Cases

Mosaic plots are not suitable for:
- Displaying continuous numerical data trends
- Showing precise numerical comparisons
- Analyzing time series data
- Displaying data with too many categories (which can make the chart cluttered and hard to read)

## Comparing Mosaic Plots to Other Charts

### Mosaic Plots and [Heatmaps](/en/charts/heatmap)

- From graphical properties perspective:
  - Heatmaps represent the third dimension with **linear** color changes
  - Mosaic plots represent the third dimension with **categorical** colors
  - Standard heatmaps use smoothing algorithms with no clear boundaries
  - Mosaic plots have clear boundaries
- From data perspective:
  - Uniform mosaic plots and heatmaps have very similar meanings for continuous data
- From analytical needs perspective:
  - Heatmaps focus on distribution and can predict data in unknown areas
  - Mosaic plots have clearer boundaries and focus more on comparison

### Mosaic Plots and [Treemaps](/en/charts/treemap)

- Mosaic plots are better for showing relationships between multiple categorical variables
- Treemaps are more suitable for displaying hierarchical data structures
- Mosaic plots use position and area to encode data
- Treemaps primarily use area and nesting to represent hierarchical relationships

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>
