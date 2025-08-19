---
title: Violin Plot
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QXpmQaR71yYAAAAAAAAAAAAADmJ7AQ/original'
category: ['distribution']
similar: ['boxplot', 'histogram', 'density']
---

<img alt="violin" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QXpmQaR71yYAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Violin Plot

A Violin Plot is a data visualization chart that combines [boxplot](/en/charts/boxplot) and [kernel density estimation](/en/manual/core/data/kde), used to display the distribution shape and statistical summary of data. The violin plot is named after its violin-like shape.

Violin plots show the density distribution of data across different value intervals through density curves, while overlaying statistical information from boxplots (such as median, quartiles, etc.), providing a more intuitive reflection of data distribution characteristics, including multimodality, skewness, and outlier situations.

Compared to traditional boxplots, violin plots provide richer distribution information and are particularly suitable for comparing data distribution characteristics across multiple groups, making them an important tool for exploratory data analysis and statistical visualization.

**English Name**: Violin Plot

## Components of Violin Plot

### Basic Violin Plot

<img alt="basic-violin" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QXpmQaR71yYAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| Chart Type                | Violin Plot                                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Suitable Data             | One categorical data field, one continuous data field                                                                                        |
| Function                  | Display data distribution shape, density, and statistical summary; compare distribution characteristics across different groups             |
| Data to Graphics Mapping  | Categorical data field maps to horizontal axis position<br>Continuous data field transforms to density distribution via KDE<br>Statistical values map to boxplot elements<br>Density maps to graphic width |
| Suitable Data Volume      | At least 20-30 data points recommended per group                                                                                             |

The main components of a violin plot include:

- **Density Contour**: Smooth curves generated through kernel density estimation (KDE), showing the density distribution of data at different values
- **Boxplot**: Traditional boxplot overlaid on the density contour, displaying statistical information such as median and quartiles
- **Median Line**: Marks the median position of the data
- **Quartile Lines**: Mark the positions of upper and lower quartiles
- **Outliers**: Data points beyond the normal range

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
  },
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'y',
            groupBy: ['x', 'species'],
          },
        ],
      },
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        size: 'size',
      },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        shape: 'violin',
      },
      style: {
        opacity: 0.5,
        strokeOpacity: 0.5,
        point: false,
      },
    },
  ],
});

chart.render();
```

---

### Kernel Density Plot

<img alt="density" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-EcIQ7sKufsAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| Chart Type                | Kernel Density Plot                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Suitable Data             | One categorical data field, one continuous data field                                                                 |
| Function                  | Display probability density distribution of data, identify data distribution patterns                                 |
| Data to Graphics Mapping  | Categorical data field maps to horizontal axis position<br>Continuous data field transforms to density distribution via KDE<br>Density values map to area size |
| Suitable Data Volume      | At least 50+ data points recommended                                                                                  |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'density',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
    transform: [
      {
        type: 'kde',
        field: 'y',
        groupBy: ['x'],
        size: 20,
      },
    ],
  },
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
    size: 'size',
  },
  tooltip: false,
});

chart.render();
```

---

### Polar Violin Plot

<img alt="polar-violin" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*r027Q4SUC3kAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| Chart Type                | Polar Violin Plot                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Suitable Data             | Cyclical or periodic data: time series, angular data, etc.                                                             |
| Function                  | Display data distribution in polar coordinate system, suitable for visualization of periodic or cyclical data         |
| Data to Graphics Mapping  | Categorical data field maps to angle<br>Continuous data field maps to radial distance<br>Density information maps to area shape after KDE transformation |
| Suitable Scenarios        | Time period analysis, directional data analysis                                                                        |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  coordinate: { type: 'polar' },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
  },
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'y',
            groupBy: ['x', 'species'],
          },
        ],
      },
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        size: 'size',
      },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        shape: 'violin',
      },
      style: {
        opacity: 0.5,
        strokeOpacity: 0.5,
        point: false,
      },
    },
  ],
});

chart.render();
```

## Application Scenarios for Violin Plot

### Suitable Scenarios

Example 1: **Multi-group Data Distribution Comparison**

When comparing data distribution characteristics across multiple groups or categories, violin plots can simultaneously display the distribution shape, central tendency, and dispersion of each group, making it easy to identify differences between groups.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
  },
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'y',
            groupBy: ['x', 'species'],
          },
        ],
      },
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        size: 'size',
      },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        shape: 'violin',
      },
      style: {
        opacity: 0.5,
        strokeOpacity: 0.5,
        point: false,
      },
    },
  ],
  axis: {
    x: { title: 'Groups' },
    y: { title: 'Value Distribution' },
  },
});

chart.render();
```

Example 2: **Exploring Data Distribution Patterns**

Used to identify data distribution characteristics, such as whether it follows a normal distribution, existence of multimodality, degree of skewness, etc., providing richer distribution information than boxplots.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'density',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
    transform: [
      {
        type: 'kde',
        field: 'y',
        groupBy: ['x'],
        size: 30,
      },
    ],
  },
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
    size: 'size',
  },
  style: {
    fillOpacity: 0.6,
    stroke: '#FFF',
    lineWidth: 1,
  },
  axis: {
    x: { title: 'Category' },
    y: { title: 'Density Distribution' },
  },
  tooltip: {
    title: (d) => `Category: ${d.x}`,
    items: [
      { field: 'y', name: 'Density Value' },
      { field: 'size', name: 'Probability' },
    ],
  },
});

chart.render();
```

Example 3: **Outlier Detection**

By combining density distribution with statistical information from boxplots, outliers can be more accurately identified and their position within the overall distribution can be better understood.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'Speed',
            groupBy: ['Expt'],
          },
        ],
      },
      encode: {
        x: 'Expt',
        y: 'Speed',
        size: 'size',
        color: 'Expt',
      },
      style: {
        fillOpacity: 0.4,
      },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'Expt',
        y: 'Speed',
        color: 'Expt',
        shape: 'violin',
      },
      style: {
        opacity: 0.8,
        point: { fill: 'red', size: 3 },
      },
    },
  ],
  axis: {
    x: { title: 'Experiment Group' },
    y: { title: 'Speed of Light Measurement' },
  },
});

chart.render();
```

### Unsuitable Scenarios

❌ **Insufficient Data**: When each group has fewer than 20 data points, kernel density estimation may not be accurate enough. Consider using boxplots or scatter plots instead.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Simulate small dataset
const smallData = [
  { group: 'A', value: 12 },
  { group: 'A', value: 15 },
  { group: 'A', value: 13 },
  { group: 'B', value: 18 },
  { group: 'B', value: 16 },
  { group: 'B', value: 20 },
  { group: 'C', value: 25 },
  { group: 'C', value: 22 },
  { group: 'C', value: 24 },
];

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  data: smallData,
  encode: {
    x: 'group',
    y: 'value',
    color: 'group',
  },
  style: {
    boxFill: 'lightblue',
    boxFillOpacity: 0.6,
    point: { fill: 'red', size: 4 },
  },
  axis: {
    x: { title: 'Groups' },
    y: { title: 'Values' },
  },
  title: 'Use boxplot for small datasets',
});

chart.render();
```

❌ **Discrete Data**: For categorical or count data, the continuous density distribution of violin plots has no practical meaning. Consider using bar charts or column charts instead.

The following example shows the correct visualization approach for discrete data:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Simulate discrete count data
const discreteData = [
  { category: 'Product A', count: 45 },
  { category: 'Product B', count: 67 },
  { category: 'Product C', count: 33 },
  { category: 'Product D', count: 52 },
  { category: 'Product E', count: 28 },
];

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  data: discreteData,
  encode: {
    x: 'category',
    y: 'count',
    color: 'category',
  },
  style: {
    fillOpacity: 0.8,
  },
  axis: {
    x: { title: 'Product Category' },
    y: { title: 'Sales Quantity' },
  },
  title: 'Use bar chart for discrete data',
});

chart.render();
```

❌ **Single Data Series**: If there's only one data series without need for group comparison, histograms or density plots might be more concise and effective.

❌ **Real-time Data Monitoring**: Violin plots require complete datasets for density estimation and are not suitable for streaming or real-time updating data scenarios.

## Comparison with Other Charts

### Violin Plot vs [Boxplot](/en/charts/boxplot)

- Violin plots display complete data distribution shape and density, providing richer distribution information
- Boxplots mainly show statistical summaries (five-number summary), more concise but with limited information
- Violin plots are suitable for exploring detailed distribution characteristics, while boxplots are suitable for quick comparison of multiple groups

### Violin Plot vs [Histogram](/en/charts/histogram)

- Violin plots show distribution through smooth density curves and support multi-group comparison
- Histograms show frequency distribution through binning, suitable for distribution analysis of single datasets
- Violin plots are more suitable for continuous distribution visualization, while histograms are suitable for discretized distribution statistics

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Category

<code src="./demos/list-category.tsx"></code> 
