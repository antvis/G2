---
title: Histogram Chart
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJFaSp1JLHQAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison', 'distribution']
similar: ['bar', 'column']
---


<img alt="histogram" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJFaSp1JLHQAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Histogram Charts

A histogram is a statistical chart used to display the distribution of data by dividing continuous data into multiple intervals (bins) and counting the frequency of data points in each interval. Unlike regular bar charts, histograms have no gaps between adjacent bars, indicating that the data is continuous.

Histograms are particularly suitable for exploring and analyzing the shape of data distributions, such as skewness, kurtosis, and whether the data follows a normal distribution. By observing a histogram, you can quickly understand the central tendency, dispersion, and presence of outliers in a dataset.

In data analysis and statistics, histograms are fundamental and important visualization tools, commonly used during the data preprocessing phase to help researchers understand data characteristics and provide a foundation for subsequent analysis.

**Other Names**: Frequency Distribution Chart

## Components of a Histogram Chart

### Basic Histogram

<img alt="basic-histogram" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJFaSp1JLHQAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| Chart Type       | Basic Histogram                                                                      |
| ---------------- | ----------------------------------------------------------------------------------- |
| Suitable Data    | Continuous data: Shows the distribution of a single variable                          |
| Function         | Counts frequency distribution, displays the shape of data distribution                |
| Data-to-Visual Mapping | Horizontal axis represents data intervals<br>Vertical axis represents frequency<br>Bar height corresponds to frequency or count |
| Suitable Scenarios | Exploratory data analysis, understanding central tendency and dispersion           |

---

### Density Histogram

<img alt="density-histogram" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*j-D7RILbV8oAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| Chart Type       | Density Histogram                                                               |
| ---------------- | ------------------------------------------------------------------------------- |
| Suitable Data    | Continuous data: Shows the probability density of a single variable distribution |
| Function         | Displays density distribution through normalization instead of raw frequency     |
| Data-to-Visual Mapping | Horizontal axis represents data intervals<br>Vertical axis represents frequency density<br>Bar height corresponds to probability density |
| Suitable Scenarios | Comparing distributions of different-sized datasets, probability distribution analysis |

## Use Cases of Histogram Charts

### Suitable Use Cases

Example 1: **Statistical Analysis of Data Distribution**

The following chart shows a histogram of diamond weight distribution, displaying how diamond weights are distributed across different intervals.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'histogram',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  encode: { 
    x: 'carat',
    y: 'count' 
  },
  scale: {
    y: { nice: true }
  },
  axis: {
    x: {
      title: 'Diamond Weight (Carats)',
    },
    y: {
      title: 'Frequency',
    },
  },
  style: {
    fill: '#1890FF',
    fillOpacity: 0.9,
    stroke: '#FFF',
  }
});

chart.render();
```


**Notes**:

- The `carat` field is mapped to the horizontal axis, representing the range of diamond weights
- The system automatically calculates the frequency of data in different intervals, mapped to the vertical axis
- There are no gaps between bars, indicating that the data is continuously distributed

Example 2: **Using Different Binning Methods**

The key to histograms is how to divide data intervals (i.e., "binning"). Different binning methods affect the understanding of data distribution. The chart below uses a custom number of bins.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'histogram',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  encode: { 
    x: 'carat',
    y: 'count' 
  },
  transform: [{ 
    type: 'binX', 
    y: 'count',
    bins: 30 // Specify number of bins
  }],
  scale: {
    y: { nice: true }
  },
  axis: {
    x: {
      title: 'Diamond Weight (Carats)',
    },
    y: {
      title: 'Frequency',
    },
  },
  style: {
    fill: '#1890FF',
    fillOpacity: 0.9,
    stroke: '#FFF',
  }
});

chart.render();
```

**Notes**:
- Using `transform: [{ type: 'binX', bins: 30 }]` to specify 30 bins
- The choice of bin number affects the display of distribution details; more bins can show more detailed distribution patterns
- Fewer bins can highlight the main distribution trends

Example 3: **Probability Distribution Analysis with Density Histogram**

Density histograms normalize frequency counts, making them more suitable for comparing distributions of datasets of different sizes.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'histogram',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  encode: { 
    x: 'carat',
    y: 'density'
  },
  transform: [{ 
    type: 'binX', 
    y: 'count',
    bins: 20
  }, {
    type: 'normalizeY'
  }],
  axis: {
    x: { 
      title: 'Diamond Weight (Carats)' 
    },
    y: { 
      title: 'Density',
      labelFormatter: '.0%'
    }
  },
  style: {
    fill: '#2FC25B',
    fillOpacity: 0.85,
    stroke: '#FFF',
  }
});

chart.render();
```

**Notes**:
- Combining `binX` and `normalizeY` transforms to convert frequency to density
- The vertical axis is formatted as a percentage, more intuitively showing the probability density of the data distribution
- The total area of a density histogram is 1, making it more suitable for probability distribution analysis

### Unsuitable Use Cases

Example 1: **Not Suitable for Comparing Categorical Data**

Histograms are designed for continuous numerical data distribution and are not suitable for comparing non-numerical categorical data. For counting statistics of categorical data, regular bar charts should be used instead.

Example 2: **Not Suitable for Showing Time Series Trends**

Histograms focus on showing data distribution characteristics rather than trends over time. If you need to display how data changes over time, line charts or area charts should be used instead.

## Extensions of Histogram Charts

### Multi-distribution Histogram

A multi-distribution histogram can display the distribution of multiple datasets in the same coordinate system, facilitating comparison of distribution characteristics between different datasets.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'histogram',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          group: d.cut === 'Ideal' ? 'Ideal' : 'Others',
        }),
      },
    ],
  },
  encode: { 
    x: 'price',
    y: 'count',
    color: 'group'
  },
  transform: [{ 
    type: 'binX', 
    y: 'count',
    bins: 30,
    groupBy: ['group']
  }],
  scale: {
    y: { nice: true },
    color: {
      range: ['#1890FF', '#FF6B3B']
    }
  },
  axis: {
    x: { title: 'Price (USD)' },
    y: { title: 'Frequency' }
  },
  style: {
    fillOpacity: 0.7,
    stroke: '#FFF',
    lineWidth: 1
  },
  legend: true
});

chart.render();
```

**Notes**:
- Using `color: 'group'` and `groupBy: ['group']` to achieve multi-distribution comparison
- Using different colors and transparencies to facilitate observation of distribution differences between groups

### Combining Density Curve with Histogram

Combining density curves with histograms can provide a more comprehensive view of data distribution characteristics.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  children: [
    {
      type: 'histogram',
      encode: { 
        x: 'price',
        y: 'count'
      },
      transform: [{ 
        type: 'binX', 
        y: 'count',
        bins: 30
      }],
      style: {
        fill: '#1890FF',
        fillOpacity: 0.6,
        stroke: '#FFF'
      }
    },
    {
      type: 'line',
      encode: { 
        x: 'price',
        y: 'density',
        shape: 'smooth'
      },
      transform: [{ 
        type: 'kde', 
        field: 'price',
        as: ['price', 'density'],
        extent: [0, 20000],
        bandwidth: 50
      }],
      style: {
        stroke: '#FF6B3B',
        lineWidth: 2
      }
    }
  ],
  scale: {
    y: { nice: true }
  },
  axis: {
    x: { title: 'Price (USD)' },
    y: { title: 'Frequency' }
  }
});

chart.render();
```

**Notes**:
- Using both histogram and density curve to show distribution characteristics
- Histogram shows actual frequency distribution, while the density curve smoothly shows the overall trend
- Using the `kde` transform to calculate kernel density estimates

## Comparing Histogram Charts to Other Charts

### Histograms and [Bar Charts](/en/charts/bar)

- Histograms are used to show the distribution of continuous numerical data, emphasizing the shape of data distribution
- Bar charts are used to compare numerical values across different categories or time points, emphasizing comparison
- Histograms have no gaps between bars, while bar charts have gaps between bars

### Histograms and [Box Plots](/en/charts/boxplot)

- Histograms show data concentration and dispersion through frequency distribution
- Box plots show data concentration and dispersion through quartiles, making it easier to identify outliers
- Histograms provide more detailed distribution patterns, while box plots provide more concise statistical summaries

### Histograms, [Line Charts](/en/charts/line), and [Area Charts](/en/charts/area)

- Histograms focus on showing data distribution characteristics
- Line and area charts focus on showing data trends over time
- Histograms are suitable for single time-point data analysis, while line and area charts are suitable for continuous multi-time-point data analysis

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>
