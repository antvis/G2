---
title: Line Chart
order: 2
screenshot: 'https://os.alipayobjects.com/rmsportal/VVPAIRTNYwbbZut.jpg'
category: ['trend']
similar: ['area', 'bar', 'scatter']
---

<img alt="line" src="https://os.alipayobjects.com/rmsportal/VVPAIRTNYwbbZut.jpg" width=600/>

## Introduction to Line Charts

A line chart is a statistical chart that connects data points in chronological or categorical order to form a line, used to display data trends over time or ordered categories. Through the rise or fall of the line, it can intuitively show the speed, amplitude, range, and periodicity of data changes.

Line charts are particularly suitable for displaying continuous time series data changes and can effectively reflect data trends, fluctuations, periodicity, and anomalies. When comparing multiple data series, line charts use lines of different colors or styles to clearly show the comparison and relationships between different data series.

Compared to area charts, line charts focus more on showing trends and trajectories of data changes rather than total quantities. Compared to bar charts, line charts are more suitable for showing continuous trends rather than discrete numerical comparisons.

**Other Names**: Line Chart, Line Graph

## Components of a Line Chart

### Basic Line Chart

<img alt="basic-line" src="https://t.alipayobjects.com/images/T1c7djXjhXXXXXXXXX.png" width=600 />

| Chart Type | Basic Line Chart |
| ---------- | ---------------- |
| Suitable Data | Time series data: one ordered/continuous data field (usually time), one continuous data field |
| Function | Display data trends over time or ordered dimensions |
| Data-to-Graphics Mapping | Time field maps to x-axis position<br>Value field maps to y-axis height<br>Data points are connected by lines to show change trajectory |
| Suitable Scenarios | Single data series change trends over time |

---

### Multi-Series Line Chart

<img alt="multi-series-line" src="https://os.alipayobjects.com/rmsportal/VVPAIRTNYwbbZut.jpg" width=600/>

| Chart Type | Multi-Series Line Chart |
| ---------- | ----------------------- |
| Suitable Data | Multi-series time data: one ordered/continuous data field (usually time), one continuous data field, one categorical data field |
| Function | Display trends of multiple data series over time, facilitating comparison of relationships between different series |
| Data-to-Graphics Mapping | Time field maps to x-axis position<br>Value field maps to y-axis height<br>Category field maps to different colored lines |
| Suitable Scenarios | Comparison of multiple data series trends over time |

## Use Cases of Line Charts

### Suitable Use Cases

Example 1: **Suitable for displaying continuous time series trends**

The following chart is a line chart of stock price trends, showing the change trend of a company's stock price over time.

| date | close |
| ---- | ----- |
| 2015/1/5 | 121.73 |
| 2015/1/6 | 115.07 |
| 2015/1/7 | 116.75 |
| ... | ... |

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          date: new Date(d.date),
        }),
      },
    ],
  },
  encode: { x: 'date', y: 'close' },
  axis: {
    x: {
      title: null,
    },
    y: {
      title: null,
    },
  },
  style: {
    lineWidth: 2,
    stroke: '#1890ff',
  },
});

chart.render();
```

**Explanation**:

- The `date` field maps to the x-axis position, representing chronological order
- The `close` field maps to the y-axis height, showing price trends over time
- Data points are connected by lines, clearly displaying the trajectory of data changes

Example 2: **Suitable for displaying comparative trends of multiple data series**

Multi-series line charts can simultaneously display changes of multiple data series over time, facilitating comparative analysis. The following chart shows unemployment rate trends in different regions.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/bmw-prod/728a4bdc-9d0b-49e0-a92f-6320a6cddeed.csv',
  },
  encode: { 
    x: 'date', 
    y: 'unemployment', 
    color: 'division' 
  },
  axis: {
    x: {
      title: null,
    },
    y: {
      title: null,
    },
  },
});

chart.render();
```

**Explanation**:
- The `date` field maps to the x-axis, representing the time dimension
- The `unemployment` field maps to the y-axis, representing unemployment rate
- The `division` field maps to color, distinguishing different regions
- Multiple lines facilitate intuitive comparison of unemployment rate trends and differences across regions

Example 3: **Displaying subtle data changes and fluctuations**

Line charts can clearly display subtle data changes and fluctuations, especially when there are many data points with frequent changes.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: [
    { month: 'Jan', city: 'Tokyo', temperature: 7 },
    { month: 'Jan', city: 'London', temperature: 3.9 },
    { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
    { month: 'Feb', city: 'London', temperature: 4.2 },
    { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
    { month: 'Mar', city: 'London', temperature: 5.7 },
    { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
    { month: 'Apr', city: 'London', temperature: 8.5 },
    { month: 'May', city: 'Tokyo', temperature: 18.4 },
    { month: 'May', city: 'London', temperature: 11.9 },
    { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
    { month: 'Jun', city: 'London', temperature: 15.2 },
    { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
    { month: 'Jul', city: 'London', temperature: 17 },
    { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
    { month: 'Aug', city: 'London', temperature: 16.6 },
    { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
    { month: 'Sep', city: 'London', temperature: 14.2 },
    { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
    { month: 'Oct', city: 'London', temperature: 10.3 },
    { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
    { month: 'Nov', city: 'London', temperature: 6.6 },
    { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
    { month: 'Dec', city: 'London', temperature: 4.8 },
  ],
  encode: { x: 'month', y: 'temperature', color: 'city' },
  axis: {
    y: { 
      title: null,
      labelFormatter: (d) => d + '°C' 
    },
    x: { 
      title: null 
    }
  },
  style: {
    lineWidth: 2,
  },
});

chart.render();
```

**Explanation**:
- The line chart clearly displays annual temperature change curves for Tokyo and London
- Through different colored lines, temperature differences and change patterns between the two cities can be intuitively compared

### Unsuitable Use Cases

Example 1: **Not suitable for displaying discrete category comparisons**

Line charts are primarily used to show trends in continuous data and are not suitable for displaying numerical comparisons between discrete categories. If the main purpose is to compare specific values across different categories, bar charts or column charts would be better choices.

Example 2: **Poor effectiveness when data points are few or changes are insignificant**

When there are few data points or changes are insignificant, line charts may not fully leverage their advantage of showing trend changes. In such cases, consider using bar charts or dot plots to emphasize comparisons between individual data points.

## Extensions of Line Charts

### Step Line Chart

Step line charts use horizontal and vertical line segments to connect data points, creating a step-like effect, suitable for displaying data that changes abruptly at specific time points.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: [
    { month: 'Jan', value: 51 },
    { month: 'Feb', value: 91 },
    { month: 'Mar', value: 34 },
    { month: 'Apr', value: 47 },
    { month: 'May', value: 63 },
    { month: 'June', value: 58 },
    { month: 'July', value: 56 },
    { month: 'Aug', value: 77 },
    { month: 'Sep', value: 99 },
    { month: 'Oct', value: 106 },
    { month: 'Nov', value: 88 },
    { month: 'Dec', value: 56 },
  ],
  encode: { x: 'month', y: 'value', shape: 'hv' },
  axis: {
    x: { 
      title: null 
    },
    y: { 
      title: null
    }
  },
  style: {
    lineWidth: 2,
    stroke: '#1890ff',
  },
});

chart.render();
```

**Explanation**:
- Use `encode: { shape: 'hv' }` to specify step-like line shape
- Suitable for displaying data that changes at specific time points and remains stable until the next change point, such as tiered electricity prices, inventory level changes, etc.

### Dashed Line Chart

Dashed line charts use different line styles to distinguish different data series or represent specific meanings, such as predicted values, reference lines, etc.

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
    { year: '1991', value: 3, type: 'Actual' },
    { year: '1992', value: 4, type: 'Actual' },
    { year: '1993', value: 3.5, type: 'Actual' },
    { year: '1994', value: 5, type: 'Actual' },
    { year: '1995', value: 4.9, type: 'Actual' },
    { year: '1996', value: 6, type: 'Actual' },
    { year: '1997', value: 7, type: 'Actual' },
    { year: '1998', value: 9, type: 'Actual' },
    { year: '1999', value: 13, type: 'Actual' },
    { year: '1999', value: 13, type: 'Predicted' },
    { year: '2000', value: 16, type: 'Predicted' },
    { year: '2001', value: 21, type: 'Predicted' },
    { year: '2002', value: 25, type: 'Predicted' },
    { year: '2003', value: 30, type: 'Predicted' },
  ],
  children: [
    {
      type: 'line',
      encode: { x: 'year', y: 'value', color: 'type' },
      style: {
        lineWidth: 2,
        lineDash: (d) => (d[0].type === 'Predicted' ? [4, 4] : null),
      },
    },
    {
      type: 'point',
      encode: { x: 'year', y: 'value', color: 'type', shape: 'circle' },
    },
  ],
  scale: {
    color: {
      range: ['#1890FF', '#FF6B3B'],
    },
  },
  axis: {
    x: { title: null },
    y: { title: null },
  },
});

chart.render();
```

**Explanation**:
- Use `lineDash: (d) => (d[0].type === 'Predicted' ? [4, 4] : null)` to set dashed line style for predicted values
- Solid lines represent existing historical data, dashed lines represent predicted or estimated data, enhancing data readability

## Comparing Line Charts to Other Charts

### Line Charts and [Area Charts](/en/charts/area)

- Line charts focus on displaying trends and trajectories of data changes, emphasizing direction and speed of change
- Area charts emphasize visual effects of quantities through filled areas, more suitable for displaying total quantity changes
- Choose line charts when highlighting change trends, choose area charts when emphasizing magnitude changes

### Line Charts, [Bar Charts](/en/charts/bar), and [Pie Charts](/en/charts/pie)

- Line charts are more suitable for displaying continuous time series change trends, emphasizing data fluidity and continuity
- Bar charts are more suitable for displaying numerical comparisons between discrete categories, emphasizing size comparisons of individual independent values
- Choose line charts when data points are numerous and trend changes are the focus, choose bar charts when data points are fewer and specific value comparisons are the focus

### Line Charts and [Scatter Plots](/en/charts/scatter)

- Line charts show data change trends and continuity through connecting lines, emphasizing relationships between data points
- Scatter plots display distribution of individual independent data points, without emphasizing continuous relationships between data points
- Choose line charts when displaying data trends, choose scatter plots when displaying data distribution or correlation

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>