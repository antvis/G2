---
title: quantize
order: 2
---

## Overview

The quantize scale is a discretization scale that divides a continuous data domain into several equal-width intervals and maps these intervals to discrete values in the range. It belongs to a type of segmented scale, primarily used for discretizing continuous data.

Similar to the [threshold](/en/manual/core/scale/threshold) scale, quantize also maps continuous data to discrete values, but with the following differences:

- The threshold scale requires manually specifying split points (thresholds)
- The quantize scale automatically calculates equal-width intervals based on the data domain and the number of range values

The difference from the [quantile](/en/manual/core/scale/quantile) scale is:

- The quantile scale segments based on data distribution quantiles, ensuring each interval contains the same number of data points
- The quantize scale segments based on equal-width intervals of data value ranges, without considering data distribution

### Mapping Principle

The quantize scale works as follows:

1. Divide the data domain [min, max] into n equal intervals, where n is the length of the range array
2. For input value x, determine which interval it falls into
3. Return the range element corresponding to that interval

For example, with data domain [0, 100] and range ['Small', 'Medium', 'Large']:

- Input values 0-33.33 map to 'Small'
- Input values 33.33-66.67 map to 'Medium'
- Input values 66.67-100 map to 'Large'

### Use Cases

The quantize scale is suitable for the following scenarios:

- Need to group continuous data (such as temperature, income, ratings) into a limited number of categories
- Creating heatmaps, contour maps, and other visualizations that require mapping numerical data to discrete colors
- Data distribution is relatively uniform, suitable for equal-width segmentation

### Getting Started

```ts
chart.options({
  type: 'cell',
  data: salaryData,
  encode: {
    color: 'salary',
  },
  scale: {
    color: {
      type: 'quantize',
      range: ['#eee', 'pink', 'red'], // Divide data into three groups, each corresponding to a color
    },
  },
});
```

## Configuration Options

The quantize scale is primarily responsible for mapping continuous data domains to discrete ranges. Here are the configuration options for the quantize scale:

| Property   | Description                                                                           | Type                                                    | Default Value        | Required |
| ---------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------- | -------- |
| type       | Scale type, must be 'quantize'                                                        | `string`                                                | None                 | ✓        |
| domain     | Set the domain range of the data                                                      | `number[]`                                              | `[0, 1]`             |          |
| range      | Set the range of data mapping values                                                  | `any[]`                                                 | `[0.5]`              |          |
| unknown    | Return value for `undefined`, `NaN`, `null` empty values                              | `any`                                                   | `undefined`          |          |
| tickCount  | Set the recommended number of ticks to generate, tickCount is only a suggestion value | `number`                                                | `5`                  |          |
| tickMethod | Set the method for generating ticks, commonly used for custom ticks                   | `(min: number, max: number, count: number) => number[]` | `wilkinson-extended` |          |
| nice       | Extend the domain range to make the output ticks display more friendly                | `boolean`                                               | `false`              |          |

## Common Use Cases

### 1. Basic Heatmap Example

Below is an example of creating a heatmap using the quantize scale, dividing salary data into three equal-width intervals based on numerical values and mapping them to different colors:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Create a container element
const container = document.createElement('div');

const chart = new Chart({
  container: 'container',
  container,
  height: 340,
});

chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
    transform: [{ type: 'map', callback: (d) => ({ salary: d }) }],
  },
  scale: {
    color: {
      type: 'quantize',
      range: ['#eee', 'pink', 'red'], // Divide data into three groups, corresponding to three colors
    },
  },
  legend: {
    color: {
      length: 400,
      labelFormatter: '.0s', // Format legend labels using abbreviations (e.g., 10K instead of 10000)
    },
  },
  encode: {
    y: (_, i) => (i % 5) + 1, // Set the row position of the cell
    x: (_, i) => ((i / 5) | 0) + 1, // Set the column position of the cell
    color: 'salary', // Map salary data to the color channel
  },
  style: {
    stroke: '#000', // Set cell border color
    inset: 2, // Set cell padding
  },
  animate: {
    enter: { type: 'fadeIn' }, // Add fade-in animation effect
  },
});

chart.render();
```

### Effect Description

In the above example:

1. We created a cell chart (similar to a heatmap)
2. Used the quantize scale to map salary data (continuous numerical values) to three color intervals
3. The scale automatically divides the data range into three equal-width intervals, each corresponding to a color
4. The legend uses the `.0s` formatter to display large numbers in a more readable form (e.g., 10K)

## Comparison with Other Scales

| Scale Type | Data Type  | Segmentation Method | Use Case                                               |
| ---------- | ---------- | ------------------- | ------------------------------------------------------ |
| quantize   | Continuous | Equal-width         | Uniform data distribution, need to group by range      |
| quantile   | Continuous | Equal-frequency     | Uneven data distribution, need equal data per group    |
| threshold  | Continuous | Custom thresholds   | Need to group by specific thresholds (e.g., pass/fail) |

### 2. quantize vs quantile Comparison Example

The following example shows the difference between quantize and quantile scales when handling skewed data:

```js | ob {  inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
// Create a skewed distribution dataset using integer values
const generateSkewedData = () => {
  const data = [];
  // Most data concentrated in low value area
  for (let i = 0; i < 60; i++) {
    // Use integer values to avoid decimal overlap
    data.push({
      value: Math.floor(5 + Math.random() * 25),
      type: 'Skewed Data',
    });
  }
  // Few data points distributed in high value area, more scattered
  for (let i = 0; i < 15; i++) {
    data.push({
      value: Math.floor(60 + Math.random() * 20),
      type: 'Skewed Data',
    });
  }
  // Add some middle values to make distribution more obvious
  for (let i = 0; i < 10; i++) {
    data.push({
      value: Math.floor(40 + Math.random() * 15),
      type: 'Skewed Data',
    });
  }
  return data;
};

const data = generateSkewedData();

// Create two charts for comparison
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.gap = '40px'; // Increase spacing
container.style.width = '100%';
container.style.maxWidth = '800px';
container.style.margin = '0 auto'; // Center display

// Add title
const title = document.createElement('h3');
title.textContent = 'quantize vs quantile Scale Comparison';
title.style.textAlign = 'center';
title.style.marginBottom = '10px';
container.appendChild(title);

// quantize scale chart
const chart1Container = document.createElement('div');
chart1Container.style.width = '100%';
chart1Container.style.height = '220px'; // Increase height
container.appendChild(chart1Container);

const chart1 = new G2.Chart({
  container: chart1Container,
  height: 220,
  autoFit: true, // Auto-fit container size
  padding: [50, 100, 70, 100], // Increase padding, leave more space for labels
});

chart1.options({
  type: 'point',
  data,
  title: {
    text: 'quantize Scale (Equal-width Segmentation)',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
  scale: {
    color: {
      type: 'quantize',
      range: ['#e8f4f8', '#a8d5e5', '#4ba3c3', '#0a6c93'], // 4 color segments
    },
    value: {
      nice: true,
      tickCount: 5, // Reduce tick count
      formatter: '.0f', // Use G2 built-in formatter to display integers
    },
  },
  encode: {
    x: 'value',
    y: 'type',
    color: 'value',
    shape: 'circle',
    size: 8,
  },
  style: {
    fillOpacity: 0.8,
    stroke: '#fff',
    lineWidth: 1,
  },
  legend: {
    color: {
      position: 'top',
      length: 200, // Set legend length
      labelFormatter: '.0f', // Use G2 built-in formatter to display integers
    },
  },
  axis: {
    y: false,
    x: {
      labelSpacing: 10, // Increase label spacing
      labelFormatter: '.0f', // Use G2 built-in formatter to display integers
      tickCount: 5, // Reduce tick count
    },
  },
});

chart1.render();

// quantile scale chart
const chart2Container = document.createElement('div');
chart2Container.style.width = '100%';
chart2Container.style.height = '220px'; // Increase height
container.appendChild(chart2Container);

const chart2 = new G2.Chart({
  container: 'container',
  container: chart2Container,
  height: 220,
  autoFit: true, // Auto-fit container size
  padding: [50, 100, 70, 100], // Increase padding, leave more space for labels
});

chart2.options({
  type: 'point',
  data,
  title: {
    text: 'quantile Scale (Equal-frequency Segmentation)',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
  scale: {
    color: {
      type: 'quantile',
      range: ['#e8f4f8', '#a8d5e5', '#4ba3c3', '#0a6c93'], // 4 color segments
    },
    value: {
      nice: true,
      tickCount: 5, // Reduce tick count
      formatter: '.0f', // Use G2 built-in formatter to display integers
    },
  },
  encode: {
    x: 'value',
    y: 'type',
    color: 'value',
    shape: 'circle',
    size: 8,
  },
  style: {
    fillOpacity: 0.8,
    stroke: '#fff',
    lineWidth: 1,
  },
  legend: {
    color: {
      position: 'top',
      length: 200, // Set legend length
      labelFormatter: '.0f', // Use G2 built-in formatter to display integers
    },
  },
  axis: {
    y: false,
    x: {
      labelSpacing: 10, // Increase label spacing
      labelFormatter: '.0f', // Use G2 built-in formatter to display integers
      tickCount: 5, // Reduce tick count
    },
  },
});

chart2.render();
```

In the above comparison example:

1. We created a skewed distribution dataset with most data concentrated in the low value area and few data points in the high value area
2. When using the quantize scale (equal-width segmentation), data is evenly segmented by value range, resulting in some color intervals having very few points
3. When using the quantile scale (equal-frequency segmentation), each color interval contains the same number of data points, better showing the data distribution

### 3. Custom Segmentation Example

Below is a more complex example showing how to use the quantize scale to create multiple segments and customize the data domain:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Create a container element
const container = document.createElement('div');

const chart = new Chart({
  container: 'container',
  container,
  height: 300,
});

// Generate test data
const data = Array.from({ length: 100 }, (_, i) => ({
  value: Math.random() * 100,
  id: i + 1,
}));

chart.options({
  type: 'point',
  data,
  scale: {
    color: {
      type: 'quantize',
      domain: [0, 100], // Custom data domain
      range: [
        '#e8f4f8',
        '#d1e6f0',
        '#a8d5e5',
        '#7ec2da',
        '#4ba3c3',
        '#2385ab',
        '#0a6c93',
      ], // 7 colors corresponding to 6 equal-width intervals
    },
    y: {
      nice: true,
    },
  },
  encode: {
    x: 'id',
    y: 'value',
    color: 'value', // Map values to color channel
    shape: 'circle',
    size: 10,
  },
  style: {
    fillOpacity: 0.8,
    stroke: '#fff',
    lineWidth: 1,
  },
  legend: {
    color: {
      length: 300,
      labelFormatter: '.0f', // Format legend labels as integers
    },
  },
  axis: {
    y: {
      title: 'Value',
    },
    x: {
      title: 'ID',
    },
  },
});

chart.render();
```

## Complete Example

Here is a complete example using G2 declarative syntax (G2Spec) to configure the quantize scale:

```js
const spec = {
  type: 'cell',
  width: 900,
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
    transform: [{ type: 'map', callback: (d) => ({ salary: d }) }],
  },
  scale: {
    color: {
      type: 'quantize',
      range: ['#eeeeee', '#ffc3ce', '#ff0d0d'], // Define three color intervals
    },
  },
  legend: {
    color: {
      labelFormatter: '.0s', // Format legend labels
    },
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary', // Map salary data to color channel
  },
  style: {
    stroke: '#000',
    inset: 2,
  },
};

// Create a container element
const container = document.createElement('div');

// Render using Chart
const chart = new G2.Chart(container);
chart.options(spec);
chart.render();
```

This example demonstrates how to use G2 declarative syntax to create a heatmap using the quantize scale, including the following features:

1. Use quantize scale to map continuous salary data to three discrete color intervals
2. Custom legend formatting, displaying values in abbreviated form (e.g., 10K instead of 10000)
3. Use functions to calculate cell row and column positions, creating a grid layout
4. Set cell borders and padding to improve readability

### Notes

When using the quantize scale, pay attention to the following points:

1. **Segment Boundary Calculation**: Segment boundaries are determined by the minimum and maximum values of the data domain and the length of the range array. For example, for data domain [0, 100] and range length of 3, the boundary points are 33.33 and 66.67.

2. **Scale Selection**: Choose quantize if you want to segment evenly by value range; choose quantile if you want each segment to contain the same number of data points.

3. **Data Domain Setting**: You can customize the data domain by setting the `domain` property, for example `domain: [0, 100]`. If not set, G2 will automatically calculate an appropriate data domain based on the data.

4. **Data Distribution Consideration**: The quantize scale is suitable for processing continuous numerical data with relatively uniform distribution. If the data distribution is very uneven (such as long-tail distribution), the quantile scale might be more appropriate.

5. **Nice Ticks**: When the `nice` parameter is set to `true`, it extends the range of the data domain to make boundary values more "friendly" (usually integers or easily understandable values), which helps generate more readable tick marks and legend labels.
