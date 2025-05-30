---
title: Scatter Plot
order: 11
screenshot: "https://os.alipayobjects.com/rmsportal/EFRpgfUCANawLBP.jpg"
category: ['relation', 'trend',]
similar: ['bubble', 'line', 'area']
---

<img alt="scatter" src="https://os.alipayobjects.com/rmsportal/EFRpgfUCANawLBP.jpg" width=600/>

## Introduction to Scatter Plots

A scatter plot is a visualization chart that displays the relationship between two continuous variables through points on a two-dimensional coordinate plane. The position of each data point is determined by the values of two variables, where one variable determines the horizontal position (x-axis) and the other determines the vertical position (y-axis).

Scatter plots differ from [line charts](/charts/line) in that scatter plots are primarily used for exploring and displaying correlations between variables, distribution patterns, and identifying outliers, while line charts are better suited for showing trends in continuous data.

![Variable Relationship Example](https://t.alipayobjects.com/images/T1xypjXj4bXXXXXXXX.png)

By observing the distribution of data points on a scatter plot, we can infer correlations between variables. If there is no relationship between variables, they will appear as randomly distributed discrete points on the scatter plot. If there is some correlation, most data points will be relatively dense and show some trend. Data correlation relationships mainly include: positive correlation (both variable values increase simultaneously), negative correlation (one variable value increases while the other decreases), no correlation, linear correlation, exponential correlation, etc.

**Other Names**: Scatter chart, Point plot, XY plot

## Components of a Scatter Plot

<img alt="scatter-components" src="https://t.alipayobjects.com/images/T1wy8jXnlgXXXXXXXX.png" width=600 />

| Chart Type           | Scatter Plot                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Suitable Data        | List: Two continuous data fields                                                                                   |
| Function             | Explore correlations between two variables, identify data patterns and outliers                                   |
| Data-Graphics Mapping| First continuous data field mapped to horizontal axis position<br>Second continuous data field mapped to vertical axis position<br>Optional categorical field mapped to point color or size |
| Suitable Data Volume | 10-1000 data points, consider sampling or using density plots for larger datasets                                |

**Components:**
1. **Data Points**: Circles or other shapes representing each observation in the dataset
2. **X-axis**: The horizontal coordinate axis, usually representing the independent variable
3. **Y-axis**: The vertical coordinate axis, usually representing the dependent variable
4. **Grid**: Reference lines that assist in reading values
5. **Legend**: When there are multiple data series, explains the meaning of different points

```js | ob { autoMount: true }

  import { Chart } from "@antv/g2";

  const chart = new Chart({ container: "container" });

  chart.options({
    type: "view",
    autoFit: true,
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
    encode: { x: "height", y: "weight" },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    children: [
      { 
        type: "point", 
        style: { 
          fill: "#1890ff", 
          fillOpacity: 0.7,
          stroke: "#1890ff",
          strokeWidth: 2,
          r: 6
        }
      }
    ],
    axis: {
      x: { title: "Height (cm)" },
      y: { title: "Weight (kg)" }
    }
  });

  chart.render();

```

## Use Cases of Scatter Plots

### Suitable Use Cases

Example 1: **Suitable for Correlation Analysis**

The following chart shows the relationship between advertising spend and sales revenue, clearly demonstrating a positive correlation between the two variables.

| adSpend (Advertising in 10k) | revenue (Sales Revenue in 10k) |
| ----------------------------- | ------------------------------- |
| 10                           | 120                             |
| 15                           | 180                             |
| 20                           | 220                             |
| ...                          | ...                             |

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

chart.options({
  type: "view",
  autoFit: true,
  data: [
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
  ],
  encode: { x: "adSpend", y: "revenue" },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    { 
      type: "point", 
      style: { 
        fill: "#52c41a", 
        fillOpacity: 0.8,
        stroke: "#52c41a",
        strokeWidth: 2,
        r: 8
      }
    }
  ],
  axis: {
    x: { title: "Advertising Spend (10k)" },
    y: { title: "Sales Revenue (10k)" }
  },
  title: "Advertising Spend vs Sales Revenue Analysis"
});

chart.render();
```

**Explanation**:
- `adSpend` field mapped to X-axis position, representing advertising investment
- `revenue` field mapped to Y-axis position, representing sales revenue
- Data points show a clear positive correlation trend

Example 2: **Suitable for Data Distribution Exploration**

Scatter plots can be used to observe data distribution patterns, clustering, and outliers. The following chart shows the distribution of student scores across different classes:

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

chart.options({
  type: "view",
  autoFit: true,
  data: [
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
    { math: 82, english: 83, category: 'General Class' },
    { math: 86, english: 84, category: 'General Class' },
    { math: 84, english: 86, category: 'General Class' },
    { math: 87, english: 81, category: 'General Class' }
  ],
  encode: { x: "math", y: "english", color: "category" },
  scale: { 
    x: { range: [0, 1] }, 
    y: { domainMin: 0, nice: true },
    color: { palette: ['#1890ff', '#52c41a', '#fa8c16'] }
  },
  children: [
    { 
      type: "point", 
      style: { 
        fillOpacity: 0.8,
        strokeWidth: 2,
        r: 8
      }
    }
  ],
  axis: {
    x: { title: "Math Score" },
    y: { title: "English Score" }
  },
  legend: {
    color: { title: "Class Type" }
  },
  title: "Student Score Distribution by Class Type"
});

chart.render();
```

### Unsuitable Use Cases

Example 1: **Too Many Data Points Causing Overlap**

When there are too many data points, scatter plots suffer from serious overlap issues, affecting data readability. The following chart shows a scatter plot with 1000 data points:

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

// Generate 1000 random data points
const data = Array.from({ length: 1000 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100 + Math.random() * 20,
  id: i
}));

chart.options({
  type: "view",
  autoFit: true,
  data,
  encode: { x: "x", y: "y" },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    { 
      type: "point", 
      style: { 
        fill: "#1890ff", 
        fillOpacity: 0.6,
        stroke: "#1890ff",
        strokeWidth: 1,
        r: 4
      }
    }
  ],
  axis: {
    x: { title: "X Variable" },
    y: { title: "Y Variable" }
  },
  title: "Scatter Plot with Too Many Data Points (Severe Overlap)"
});

chart.render();
```

For large datasets, **density plots** or **heatmaps** are more suitable:

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

// Use the same data but with density representation
chart.options({
  type: "view",
  autoFit: true,
  data: Array.from({ length: 1000 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100 + Math.random() * 20,
    id: i
  })),
  encode: { x: "x", y: "y" },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    { 
      type: "point", 
      style: { 
        fill: "#1890ff", 
        fillOpacity: 0.1,
        stroke: "none",
        r: 2
      }
    }
  ],
  axis: {
    x: { title: "X Variable" },
    y: { title: "Y Variable" }
  },
  title: "Optimized Scatter Plot (Reduced Opacity and Point Size)"
});

chart.render();
```

Example 2: **Unsuitable for Categorical Data Comparison**

Scatter plots are not suitable for displaying numerical comparisons of categorical data. The following chart attempts to use a scatter plot to show sales of different products:

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

chart.options({
  type: "view",
  autoFit: true,
  data: [
    { product: 'Product A', sales: 275 },
    { product: 'Product B', sales: 115 },
    { product: 'Product C', sales: 120 },
    { product: 'Product D', sales: 350 },
    { product: 'Product E', sales: 150 },
  ],
  encode: { x: "product", y: "sales" },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    { 
      type: "point", 
      style: { 
        fill: "#1890ff", 
        fillOpacity: 0.8,
        stroke: "#1890ff",
        strokeWidth: 2,
        r: 8
      }
    }
  ],
  axis: {
    x: { title: "Product Type" },
    y: { title: "Sales" }
  },
  title: "Inappropriate Usage: Using Scatter Plot for Categorical Data"
});

chart.render();
```

For categorical data comparison, [bar charts](/charts/bar) are more suitable:

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

chart.options({
  type: "interval",
  autoFit: true,
  data: [
    { product: 'Product A', sales: 275 },
    { product: 'Product B', sales: 115 },
    { product: 'Product C', sales: 120 },
    { product: 'Product D', sales: 350 },
    { product: 'Product E', sales: 150 },
  ],
  encode: { x: "product", y: "sales", color: "product" },
  axis: {
    x: { title: "Product Type" },
    y: { title: "Sales" }
  },
  title: "Better Choice: Using Bar Chart for Categorical Data"
});

chart.render();
```
  ];

  chart.options({
    type: "view",
    autoFit: true,
    data,
    encode: { x: "adSpend", y: "revenue" },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    children: [
      { 
        type: "point", 
        style: { 
          fill: "#52c41a", 
          fillOpacity: 0.8,
          stroke: "#52c41a",
          strokeWidth: 2,
          r: 8
        }
      }
    ],
    axis: {
      x: { title: "Ad Spend (10K)" },
      y: { title: "Sales Revenue (10K)" }
    },
    title: "Advertising Spend vs Sales Revenue Analysis"
  });

  chart.render();

```

### Data Distribution Exploration

Scatter plots can observe distribution patterns, clustering, and outliers in data:

```js | ob { autoMount: true }

  import { Chart } from "@antv/g2";

  const chart = new Chart({ container: "container" });

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
    type: "view",
    autoFit: true,
    data,
    encode: { x: "math", y: "english", color: "category" },
    scale: { 
      x: { range: [0, 1] }, 
      y: { domainMin: 0, nice: true },
      color: { palette: ['#1890ff', '#52c41a', '#fa8c16'] }
    },
    children: [
      { 
        type: "point", 
        style: { 
          fillOpacity: 0.8,
          strokeWidth: 2,
          r: 8
        }
      }
    ],
    axis: {
      x: { title: "Math Score" },
      y: { title: "English Score" }
    },
    legend: {
      color: { title: "Class Type" }
    },
    title: "Student Score Distribution by Class Type"
  });

  chart.render();

```

### Time Series Analysis

Scatter plots can also be used to display patterns in time series data:

```js | ob { autoMount: true }

  import { Chart } from "@antv/g2";

  const chart = new Chart({ container: "container" });

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
    type: "view",
    autoFit: true,
    data,
    encode: { x: "visitors", y: "conversion", size: "month" },
    scale: { 
      x: { range: [0, 1] }, 
      y: { domainMin: 0, nice: true },
      size: { range: [6, 16] }
    },
    children: [
      { 
        type: "point", 
        style: { 
          fill: "#722ed1", 
          fillOpacity: 0.7,
          stroke: "#722ed1",
          strokeWidth: 2
        }
      }
    ],
    axis: {
      x: { title: "Monthly Visitors" },
      y: { title: "Conversion Rate (%)" }
    },
    title: "Website Traffic vs Conversion Rate (Point size = Month)"
  });

  chart.render();
```

## Extensions

### Scatter Plot with Trend Line

Add regression lines to more clearly show data trends:

```js | ob { autoMount: true }

  import { Chart } from "@antv/g2";

  const chart = new Chart({ container: "container" });

  const data = [
    { x: 1, y: 2.1 }, { x: 2, y: 3.8 }, { x: 3, y: 5.2 },
    { x: 4, y: 6.9 }, { x: 5, y: 8.1 }, { x: 6, y: 9.8 },
    { x: 7, y: 11.2 }, { x: 8, y: 13.1 }, { x: 9, y: 14.8 },
    { x: 10, y: 16.5 }
  ];

  chart.options({
    type: "view",
    autoFit: true,
    data,
    encode: { x: "x", y: "y" },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    children: [
      {
        type: "point",
        style: {
          fill: "#1890ff",
          fillOpacity: 0.8,
          stroke: "#1890ff",
          strokeWidth: 2,
          r: 6
        }
      },
      {
        type: "line",
        style: {
          stroke: "#ff4d4f",
          strokeWidth: 2,
          strokeDasharray: [4, 4]
        }
      }
    ],
    axis: {
      x: { title: "X Variable" },
      y: { title: "Y Variable" }
    },
    title: "Scatter Plot with Trend Line"
  });

  chart.render();

```

## Comparing Scatter Plots to Other Charts

### Scatter Plots, [Line Charts](/charts/line),[Bar Charts](/charts/bar),and [Bubble Charts](/charts/bubble)

| Chart Type | Use Case | Advantages | Disadvantages |
|------------|----------|------------|---------------|
| Scatter Plot | Explore variable relationships, outlier detection | Intuitive correlation display, easy pattern recognition | Point overlap with large datasets |
| Line Chart | Time series data, trend display | Clear trend visualization | Not suitable for variable correlation |
| Bar Chart | Categorical data comparison | Easy category comparison | Cannot show continuous variable relationships |
| Bubble Chart | Three-dimensional data display | More information content | Higher complexity, harder to interpret |

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>