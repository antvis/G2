---
title: Box Plot
order: 3
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yeZuSY9YIEAAAAAAAAAAAAAADmJ7AQ/original'
category: ['distribution', 'comparison']
similar: ['histogram', 'bar', 'scatter']
---

<img alt="boxplot" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yeZuSY9YIEAAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Box Charts

A box plot (also known as a box-and-whisker plot) is a statistical chart used to display the distribution of a dataset. It shows five important statistical values: minimum, first quartile (Q1), median (Q2), third quartile (Q3), and maximum, while clearly identifying outliers in the data.

The box plot's design is simple and clear. Through the combination of boxes and whiskers, it allows for quick understanding of data's central tendency, dispersion, and skewed distribution, making it an important tool in statistical analysis and data exploration.

**Other Names**: Box-and-Whisker Plot, Box Chart

## Components of a Box Chart

### Basic Box Plot

<img alt="boxplot-anatomy" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pU-NQa1PgxQAAAAAAAAAAAAADmJ7AQ/fmt.webp" width=600 />

| Chart Type      | Box Plot                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Suitable Data   | One categorical data field and one continuous data field                                                                                                                  |
| Functionality   | Display data distribution, identify outliers, compare data distributions across different groups                                                                          |
| Data Mapping    | Categorical data maps to horizontal axis position<br>Continuous data automatically calculates statistics mapped to box components<br>Outliers displayed as scatter points |
| Data Size Limit | At least 5-10 data points per group recommended                                                                                                                           |

The main components of a box plot include:

- **Box**: A rectangular area from the first quartile (Q1) to the third quartile (Q3), containing the middle 50% of the data
- **Median line**: A horizontal line inside the box representing the median (Q2) of the data
- **Whiskers**: Line segments extending from the box, typically extending to the farthest data point within 1.5 times the interquartile range (IQR)
- **Outliers**: Data points beyond the whisker range, displayed as individual point markers

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  style: {
    boxFill: '#1890ff',
    boxFillOpacity: 0.3,
    pointStroke: '#f5222d',
    pointR: 3,
  },
});

chart.render();
```

---

## Use Cases of Box Charts

### Suitable Use Cases

**Use Case 1: Data Distribution Analysis**

Box plots are ideal tools for analyzing data distribution, quickly identifying central tendency, dispersion, and skewed distribution of data.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'species',
  },
  axis: {
    y: {
      title: 'Flipper Length (mm)',
    },
    x: {
      title: 'Penguin Species',
    },
  },
});

chart.render();
```

**Use Case 2: Outlier Detection**

Box plots can visually display outliers in data, helping to identify data points that require further investigation.

**Use Case 3: Multi-group Data Comparison**

By displaying multiple box plots side by side, you can effectively compare data distribution differences between different groups.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'sex',
    series: 'sex',
  },
  axis: {
    y: {
      title: 'Flipper Length (mm)',
    },
    x: {
      title: 'Penguin Species',
    },
  },
});

chart.render();
```

### Unsuitable Use Cases

**Use Case 1: Insufficient Data**

When each group has fewer than 5 data points, box plots have limited statistical significance. In such cases, scatter plots or bar charts are recommended.

**Use Case 2: Displaying Precise Values**

Box plots focus on showing overall characteristics of data distribution and are not suitable for scenarios requiring precise values. In such cases, tables or bar charts should be used.

**Use Case 3: Time Series Analysis**

For trend analysis of time series data, [line charts](/en/charts/line) or [area charts](/en/charts/area) are more appropriate.

## Extensions of Box Charts

### Grouped Box Plots

By setting different colors and series, you can compare data distributions across multiple dimensions within the same chart.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'body_mass_g',
    color: 'sex',
    series: 'sex',
  },
  axis: {
    y: {
      title: 'Body Mass (g)',
    },
    x: {
      title: 'Penguin Species',
    },
  },
});

chart.render();
```

### Horizontal Box Plots

When category labels are too long, horizontal box plots can be used to improve readability.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  coordinate: { transform: [{ type: 'transpose' }] },
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
    transform: [{ type: 'filter', callback: (d) => d.Expt <= 3 }],
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
    color: 'Expt',
  },
  axis: {
    x: {
      title: 'Speed of Light Measurement',
    },
    y: {
      title: 'Experiment Number',
    },
  },
});

chart.render();
```

### Box Plots Without Outliers

In certain scenarios, outliers can be hidden to focus only on the overall data distribution.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  style: {
    point: false,
    boxFill: '#52c41a',
    boxFillOpacity: 0.4,
  },
  axis: {
    y: {
      title: 'Speed of Light Measurement',
    },
    x: {
      title: 'Experiment Number',
    },
  },
});

chart.render();
```

## Comparing Box Charts to Other Charts

### Box Charts and [Histograms](/en/charts/histogram)

- Box charts primarily display statistical summaries (five-number summary) of data, suitable for quick comparison across multiple groups
- Histograms show the specific distribution shape of data, suitable for distribution analysis of a single variable

### Box Charts and [Bar Charts](/en/charts/bar)

- Box charts are suitable for displaying data distribution and statistical characteristics
- Bar charts are primarily used to compare numerical values across different categories

### Box Charts and [Scatter Plots](/en/charts/scatter)

- Box charts are suitable for displaying distribution overviews of grouped data
- Scatter plots are suitable for showing specific data point distributions and correlations

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>
