---
title: Bullet Chart
order: 22
screenshot: 'https://zos.alipayobjects.com/rmsportal/XVYqTvtBBwzoSSHDDrQb.png'
category: ['comparison', 'distribution']
similar: ['bar', 'multi-set-bar', 'stacked-bar']
---

<img alt="bullet" src="https://zos.alipayobjects.com/rmsportal/XVYqTvtBBwzoSSHDDrQb.png" width=600/>

## Introduction to Bullet Charts

A Bullet Chart is a linear chart type originally designed by data visualization expert Stephen Few as a more compact and information-rich alternative to traditional dashboard gauges. Bullet charts can simultaneously display actual values, target values, and performance ranges within a limited space, clearly showing the completion rate and performance status through comparison.

The design philosophy of bullet charts is to maximize the data-ink ratio, displaying the most useful information in the smallest space, making them particularly suitable for dashboard and performance monitoring scenarios.

**English Names**: Bullet Chart

**Other Names**: Progress Bar Chart, Target Comparison Chart, Bullet Graph

## Components of a Bullet Chart

### Basic Bullet Chart

<img alt="bullet-anatomy" src="https://zos.alipayobjects.com/rmsportal/DkOloAVoymGGRJgmezOc.png" width=600 />

| Chart Type       | Bullet Chart                                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Suitable Data    | One categorical data field, one continuous data field (actual value), one target value, optional performance ranges                                                       |
| Functionality    | Display comparison between actual and target values, evaluate performance levels                                                                                           |
| Data Mapping     | Categorical data field maps to vertical axis position<br>Continuous data field maps to bar length<br>Target value maps to marker line<br>Performance ranges map to background color bands |
| Data Size Limit  | Single or multiple indicators, recommended not to exceed 10                                                                                                               |

The main components of a bullet chart include:

- **Actual Value Bar**: Represented by a thick, dark-colored bar showing the current actual achieved value
- **Target Value Marker**: Represented by a vertical line or other marker, indicating the target to be achieved
- **Performance Ranges**: Background uses color bands of different shades, typically divided into poor, good, and excellent ranges
- **Scale Axis**: Provides numerical reference to help readers understand specific numerical values

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

const data = [
  {
    title: 'Sales Completion Rate',
    ranges: 100,
    measures: 80,
    target: 85,
  },
];

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart.data(data);

chart
  .interval()
  .encode('x', 'title')
  .encode('y', 'ranges')
  .encode('color', '#f0efff')
  .style('maxWidth', 30)
  .axis({
    y: {
      grid: true,
      gridLineWidth: 2,
      title: 'Completion Rate (%)',
    },
    x: {
      title: false,
    },
  });

chart
  .interval()
  .encode('x', 'title')
  .encode('y', 'measures')
  .encode('color', '#5B8FF9')
  .style('maxWidth', 20)
  .label({
    text: 'measures',
    position: 'right',
    textAlign: 'left',
    dx: 5,
    formatter: (d) => `${d}%`,
  });

chart
  .point()
  .encode('x', 'title')
  .encode('y', 'target')
  .encode('shape', 'line')
  .encode('color', '#3D76DD')
  .encode('size', 8)
  .tooltip({
    title: false,
    items: [{ channel: 'y', name: 'Target Value', valueFormatter: (d) => `${d}%` }],
  });

chart.render();
```

---

## Use Cases for Bullet Charts

### Appropriate Use Cases

**Scenario 1: Performance Indicator Monitoring**

Bullet charts are ideal tools for displaying performance indicator completion status, clearly comparing actual performance with target requirements.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

const performanceData = [
  {
    indicator: 'Sales Revenue',
    ranges: [60, 80, 100],
    measures: 85,
    target: 90,
  },
  {
    indicator: 'Customer Satisfaction',
    ranges: [70, 85, 100],
    measures: 88,
    target: 85,
  },
  {
    indicator: 'Cost Control',
    ranges: [60, 80, 100],
    measures: 75,
    target: 80,
  },
];

// Transform data to suitable format
const chartData = [];
performanceData.forEach(item => {
  // Add performance ranges
  item.ranges.forEach((range, index) => {
    chartData.push({
      indicator: item.indicator,
      value: range,
      type: ['Poor', 'Good', 'Excellent'][index],
      category: 'range'
    });
  });
  // Add actual value
  chartData.push({
    indicator: item.indicator,
    value: item.measures,
    type: 'Actual Value',
    category: 'measure'
  });
  // Add target value
  chartData.push({
    indicator: item.indicator,
    value: item.target,
    type: 'Target Value',
    category: 'target'
  });
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart.data(chartData);

// Draw performance ranges
chart
  .interval()
  .transform({ type: 'stackY' })
  .encode('x', 'indicator')
  .encode('y', 'value')
  .encode('color', 'type')
  .encode('series', 'category')
  .style('maxWidth', 30)
  .scale('color', {
    domain: ['Poor', 'Good', 'Excellent', 'Actual Value', 'Target Value'],
    range: ['#ffcccb', '#ffe4b5', '#e0ffe0', '#5B8FF9', '#ff6b6b']
  })
  .axis({
    y: {
      grid: true,
      title: 'Completion Rate (%)',
    },
    x: {
      title: 'Performance Indicators',
    },
  });

chart.render();
```

**Scenario 2: Budget Execution Tracking**

Bullet charts can effectively display budget execution status, including actual expenditure, budget targets, and warning ranges.

**Scenario 3: Resource Utilization Monitoring**

Through bullet charts, you can intuitively understand the usage of various resources and identify overused or underutilized resources.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

const resourceData = [
  {
    resource: 'CPU Usage',
    ranges: 100,
    measures: 65,
    target: 80,
  },
  {
    resource: 'Memory Usage',
    ranges: 100,
    measures: 45,
    target: 70,
  },
  {
    resource: 'Disk Usage',
    ranges: 100,
    measures: 88,
    target: 85,
  },
  {
    resource: 'Network Bandwidth',
    ranges: 100,
    measures: 72,
    target: 75,
  },
];

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart.data(resourceData);

// Background range
chart
  .interval()
  .encode('x', 'resource')
  .encode('y', 'ranges')
  .encode('color', '#f5f5f5')
  .style('maxWidth', 30);

// Actual usage
chart
  .interval()
  .encode('x', 'resource')
  .encode('y', 'measures')
  .encode('color', (d) => d.measures > d.target ? '#ff7875' : '#52c41a')
  .style('maxWidth', 20)
  .label({
    text: 'measures',
    position: 'right',
    textAlign: 'left',
    dx: 5,
    formatter: (d) => `${d}%`,
  });

// Target line
chart
  .point()
  .encode('x', 'resource')
  .encode('y', 'target')
  .encode('shape', 'line')
  .encode('color', '#1890ff')
  .encode('size', 6)
  .axis({
    y: {
      grid: true,
      title: 'Usage Rate (%)',
    },
    x: {
      title: 'System Resources',
    },
  });

chart.render();
```

### Inappropriate Use Cases

**Scenario 1: Time Trend Analysis**

Bullet charts primarily display status comparisons at a specific point in time and are not suitable for showing trends over time. Line charts should be used in such cases.

**Scenario 2: Part-to-Whole Relationships**

If you need to show the proportional relationship of parts to the whole, pie charts or donut charts are more appropriate.

**Scenario 3: Large Data Volume**

When displaying a large number of indicators, bullet charts can cause visual confusion. It's recommended to use grouped displays or other chart types.

## Extensions of Bullet Charts

### Multi-dimensional Bullet Charts

Display the performance of multiple related indicators through grouping, facilitating horizontal comparison.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

const multiData = [
  {
    department: 'Sales',
    indicator: 'Sales Revenue',
    ranges: 100,
    measures: 85,
    target: 90,
  },
  {
    department: 'Sales',
    indicator: 'Customer Count',
    ranges: 100,
    measures: 92,
    target: 85,
  },
  {
    department: 'Marketing',
    indicator: 'Brand Awareness',
    ranges: 100,
    measures: 78,
    target: 80,
  },
  {
    department: 'Marketing',
    indicator: 'Marketing ROI',
    ranges: 100,
    measures: 88,
    target: 85,
  },
];

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart.data(multiData);

// Background
chart
  .interval()
  .encode('x', 'indicator')
  .encode('y', 'ranges')
  .encode('color', '#f0f0f0')
  .style('maxWidth', 30);

// Actual values
chart
  .interval()
  .encode('x', 'indicator')
  .encode('y', 'measures')
  .encode('color', 'department')
  .style('maxWidth', 20)
  .label({
    text: 'measures',
    position: 'right',
    textAlign: 'left',
    dx: 5,
  });

// Target values
chart
  .point()
  .encode('x', 'indicator')
  .encode('y', 'target')
  .encode('shape', 'line')
  .encode('color', '#666')
  .encode('size', 6)
  .axis({
    y: {
      grid: true,
      title: 'Completion Rate',
    },
    x: {
      title: 'Key Indicators',
    },
  });

chart.render();
```

### Layered Performance Ranges

Provide more detailed performance evaluation criteria through background ranges of different color shades.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

const colors = {
  ranges: ['#ffebee', '#fff3e0', '#e8f5e8'],
  measures: '#1890ff',
  target: '#ff4d4f',
};

const layeredData = [
  {
    title: 'Project Progress',
    poor: 40,
    good: 70,
    excellent: 100,
    measures: 75,
    target: 80,
  },
];

// Transform data structure
const transformedData = [
  { title: 'Project Progress', value: 40, level: 'Poor' },
  { title: 'Project Progress', value: 30, level: 'Good' },
  { title: 'Project Progress', value: 30, level: 'Excellent' },
];

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart.data(transformedData);

// Layered background
chart
  .interval()
  .transform({ type: 'stackY' })
  .encode('x', 'title')
  .encode('y', 'value')
  .encode('color', 'level')
  .style('maxWidth', 30)
  .scale('color', {
    domain: ['Poor', 'Good', 'Excellent'],
    range: colors.ranges
  });

// Add actual and target values
chart.data([
  { title: 'Project Progress', value: 75, type: 'Actual Progress' },
  { title: 'Project Progress', value: 80, type: 'Target Progress' }
]);

chart
  .interval()
  .encode('x', 'title')
  .encode('y', 'value')
  .encode('color', colors.measures)
  .style('maxWidth', 20)
  .transform({ type: 'filter', callback: (d) => d.type === 'Actual Progress' });

chart
  .point()
  .encode('x', 'title')
  .encode('y', 'value')
  .encode('shape', 'line')
  .encode('color', colors.target)
  .encode('size', 8)
  .transform({ type: 'filter', callback: (d) => d.type === 'Target Progress' })
  .axis({
    y: {
      grid: true,
      title: 'Progress (%)',
    },
    x: {
      title: false,
    },
  });

chart.render();
```

### Vertical Bullet Charts

When space is limited or special layouts are needed, vertical bullet charts can be used.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

const verticalData = [
  {
    metric: 'Q1 Sales',
    ranges: 100,
    measures: 80,
    target: 85,
  },
  {
    metric: 'Q2 Sales',
    ranges: 100,
    measures: 92,
    target: 88,
  },
  {
    metric: 'Q3 Sales',
    ranges: 100,
    measures: 76,
    target: 90,
  },
];

// Don't use transpose, keep vertical direction
chart.data(verticalData);

// Background
chart
  .interval()
  .encode('x', 'metric')
  .encode('y', 'ranges')
  .encode('color', '#f0f0f0')
  .style('maxWidth', 30);

// Actual values
chart
  .interval()
  .encode('x', 'metric')
  .encode('y', 'measures')
  .encode('color', '#52c41a')
  .style('maxWidth', 20)
  .label({
    text: 'measures',
    position: 'top',
    textAlign: 'center',
    dy: -5,
  });

// Target line
chart
  .point()
  .encode('x', 'metric')
  .encode('y', 'target')
  .encode('shape', 'line')
  .encode('color', '#ff4d4f')
  .encode('size', 6)
  .axis({
    y: {
      grid: true,
      title: 'Sales (10k CNY)',
    },
    x: {
      title: 'Quarter',
    },
  });

chart.render();
```

## Comparison with Other Charts

### Bullet Chart vs [Bar Chart](/charts/bar)

- Bullet charts add target values and performance ranges to bar charts, providing richer comparison dimensions
- Bar charts are mainly used to compare numerical values across different categories, while bullet charts focus on comparing actual values with target values

### Bullet Chart vs [Gauge Chart](/charts/gauge)

- Bullet charts save more space than gauge charts and can display more information in the same space
- Gauge charts more intuitively display the status of a single indicator, while bullet charts are more suitable for multi-indicator comparison

### Bullet Chart vs [Progress Chart](/charts/progress)

- Bullet charts provide more contextual information, including target values and performance ranges
- Progress charts mainly show completion progress, while bullet charts can show the quality of performance

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Category

<code src="./demos/list-category.tsx"></code>
