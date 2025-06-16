---
title: parallel
order: 2
---

## Overview

The Parallel coordinate system is a coordinate system used for visualizing multi-dimensional data. It maps multiple variables to parallel coordinate axes, with each data record represented as a polyline connecting corresponding values on each coordinate axis. Parallel coordinate systems are particularly suitable for analyzing relationships and patterns among multiple variables, as well as identifying outliers and clusters in datasets.

In G2, the parallel coordinate system is implemented by transforming Cartesian rectangular coordinate systems into parallel coordinate systems, with each data dimension corresponding to a vertical coordinate axis.

### Coordinate System Principles

The basic principles of parallel coordinate systems are:

1. Map multiple data dimensions to parallel arranged coordinate axes
2. Each data record is represented as a polyline passing through all coordinate axes
3. The position of the line on each coordinate axis corresponds to the data value for that dimension

Parallel coordinate systems have two common layout types:

- Vertical layout: coordinate axes arranged vertically (default)
- Horizontal layout: coordinate axes arranged horizontally through transpose transformation

### Getting Started

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Define dimensions array
const dimensions = [
  'Cylinders',
  'Displacement',
  'Weight_in_lbs',
  'Horsepower',
  'Acceleration',
  'Miles_per_Gallon',
  'Year',
];

chart.options({
  type: 'line',
  width: 720,
  paddingLeft: 60,
  coordinate: { type: 'parallel' },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
    callback: (d) => Object.assign(d, { year: new Date(d.year) }),
    transform: [
      {
        type: 'filter',
        callback: (d) => d.Horsepower != null && d.Miles_per_Gallon != null,
      },
    ],
  },
  encode: {
    position: dimensions,
    color: 'Origin',
    size: 1.01,
  },
  style: {
    strokeOpacity: 0.3,
  },
  scale: {
    position: { nice: true },
    position1: { nice: true },
    position2: { nice: true },
    position3: { nice: true },
    position4: { nice: true },
    position5: { nice: true },
  },
  axis: {
    position: { zIndex: 1 },
    position1: { zIndex: 1 },
    position2: { zIndex: 1 },
    position3: { zIndex: 1 },
    position4: { zIndex: 1 },
    position5: { zIndex: 1 },
  },
});

chart.render();
```

## Use Cases

Parallel coordinate systems are particularly suitable for the following scenarios:

1. **Multi-dimensional data analysis**: When you need to analyze relationships among multiple variables simultaneously, parallel coordinate systems can display all dimensions in one view
2. **Pattern recognition**: By observing line trajectories, you can identify patterns and trends in the data
3. **Outlier detection**: Abnormal data typically appears as lines with significantly different paths from most line trajectories
4. **Cluster analysis**: Similar data records will form similar line paths, making it easy to identify data clusters

### Notes

1. **Data volume**: When there are too many data records, lines will overlap causing visual confusion; it's recommended to use transparency or interactive filtering
2. **Axis order**: The arrangement order of coordinate axes affects visualization results; variables with strong correlations placed adjacent usually facilitate analysis
3. **Axis scaling**: Different dimensions may have vastly different data ranges, requiring appropriate scale settings for better comparison

## Configuration

The configuration options for parallel coordinate systems are relatively simple, mainly set through the `coordinate` property:

| Property  | Description                                     | Type          | Default | Required |
| --------- | ----------------------------------------------- | ------------- | ------- | -------- |
| transform | Coordinate system transformations, can be used to implement horizontal layout | Transform[] | []      |          |

### Coordinate System Transformations

Parallel coordinate systems support the following coordinate system transformations:

| Transform Type | Description                           | Example                                  |
| -------------- | ------------------------------------- | ---------------------------------------- |
| transpose      | Convert vertical layout to horizontal layout | `{ transform: [{ type: 'transpose' }] }` |

## Common Use Cases

### 1. Vertical Parallel Coordinate System

Vertical parallel coordinate system is the most common parallel coordinate layout, with coordinate axes arranged vertically.

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  coordinate: { type: 'parallel' },
  data: [
    { dim1: 10, dim2: 30, dim3: 20, dim4: 60, category: 'A' },
    { dim1: 20, dim2: 20, dim3: 30, dim4: 40, category: 'B' },
    { dim1: 30, dim2: 10, dim3: 40, dim4: 20, category: 'C' },
  ],
  encode: {
    position: ['dim1', 'dim2', 'dim3', 'dim4'],
    color: 'category',
  },
  style: {
    lineWidth: 2,
    strokeOpacity: 0.7,
  },
  scale: {
    color: {
      palette: 'spectral',
    },
  },
  axis: {
    position: { zIndex: 1 },
    position1: { zIndex: 1 },
    position2: { zIndex: 1 },
    position3: { zIndex: 1 },
  },
});

chart.render();
```

### 2. Horizontal Parallel Coordinate System

By adding transpose transformation, you can arrange coordinate axes horizontally to create a horizontal parallel coordinate system.

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  coordinate: {
    type: 'parallel',
    transform: [{ type: 'transpose' }],
  },
  data: [
    { dim1: 10, dim2: 30, dim3: 20, dim4: 60, category: 'A' },
    { dim1: 20, dim2: 20, dim3: 30, dim4: 40, category: 'B' },
    { dim1: 30, dim2: 10, dim3: 40, dim4: 20, category: 'C' },
  ],
  encode: {
    position: ['dim1', 'dim2', 'dim3', 'dim4'],
    color: 'category',
  },
  style: {
    lineWidth: 2,
    strokeOpacity: 0.7,
  },
  scale: {
    color: {
      palette: 'spectral',
    },
  },
  axis: {
    position: { zIndex: 1 },
    position1: { zIndex: 1 },
    position2: { zIndex: 1 },
    position3: { zIndex: 1 },
  },
});

chart.render();
```

### 3. Interactive Parallel Coordinate System

Parallel coordinate systems typically require interaction to enhance analytical capabilities, such as adding axis highlighting and filtering functionality.

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Define dimensions array
const dimensions = [
  'economy (mpg)',
  'cylinders',
  'displacement (cc)',
  'power (hp)',
  'weight (lb)',
];

chart.options({
  type: 'line',
  coordinate: { type: 'parallel' },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/cars3.json',
  },
  encode: {
    position: dimensions,
    color: 'cylinders',
  },
  style: {
    lineWidth: 1.5,
    strokeOpacity: 0.4,
  },
  scale: {
    color: {
      palette: 'brBG',
    },
  },
  axis: {
    position: { zIndex: 1 },
    position1: { zIndex: 1 },
    position2: { zIndex: 1 },
    position3: { zIndex: 1 },
    position4: { zIndex: 1 },
  },
  interaction: {
    tooltip: { series: false },
    brushAxisHighlight: true,
  },
  state: {
    active: { lineWidth: 3 },
    inactive: { stroke: 'grey', opacity: 0.3 },
  },
});

chart.render();
```

## Complete Example

The following is a complete parallel coordinate system example demonstrating how to use parallel coordinate systems to analyze multi-dimensional data:

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Define dimensions array
const dimensions = [
  'Cylinders',
  'Displacement',
  'Weight_in_lbs',
  'Horsepower',
  'Acceleration',
  'Miles_per_Gallon',
  'Year',
];

chart.options({
  type: 'line',
  width: 800,
  height: 500,
  padding: [40, 100, 60, 100], // Increase padding on all sides to provide more space for labels
  coordinate: { type: 'parallel' },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
    callback: (d) => Object.assign(d, { year: new Date(d.year) }),
    transform: [
      {
        type: 'filter',
        callback: (d) => d.Horsepower != null && d.Miles_per_Gallon != null,
      },
    ],
  },
  encode: {
    position: dimensions,
    color: 'Origin',
    size: 1.01,
  },
  style: {
    strokeOpacity: 0.3,
  },
  scale: {
    // Set the same configuration for all positions
    ...Object.fromEntries(
      dimensions.map((_, i) => [`position${i > 0 ? i : ''}`, { nice: true }]),
    ),
    // Set time format for year
    Year: {
      type: 'time',
      tickCount: 6,
      mask: 'YYYY',
    },
  },
  axis: {
    // Define base axis configuration
    ...(() => {
      // Create base configuration object
      const baseAxisConfig = {
        zIndex: 1,
        line: true,
        labelStroke: '#fff',
        labelLineWidth: 5,
        labelFontSize: 12,
        labelStrokeLineJoin: 'round',
        titleStroke: '#fff',
        titleFontSize: 14,
        titleLineWidth: 5,
        titleStrokeLineJoin: 'round',
        lineStroke: 'black',
        tickStroke: 'black',
        lineLineWidth: 1,
        grid: null, // Remove grid lines
        tickCount: 5, // Reduce number of ticks
        labelSpacing: 8, // Increase distance between labels and axis
      };

      // Create configuration for each dimension
      return Object.fromEntries(
        dimensions.map((dim, i) => {
          const key = `position${i > 0 ? i : ''}`;
          // Add special configuration for the last dimension (Year)
          if (i === dimensions.length - 1) {
            return [
              key,
              {
                ...baseAxisConfig,
                labelFormatter: (text) => text.slice(0, 4), // Show only year
              },
            ];
          }
          return [key, baseAxisConfig];
        }),
      );
    })(),
  },
  legend: {
    color: {
      position: 'bottom', // Place legend at bottom
      layout: 'horizontal',
    },
  },
  interaction: {
    tooltip: { series: false },
    brushAxisHighlight: {
      maskFill: '#d8d0c0',
      maskOpacity: 0.3,
    },
  },
  state: {
    active: { lineWidth: 3, strokeOpacity: 1 },
    inactive: { stroke: '#ccc', opacity: 0.3 },
  },
});

chart.render();
```

This example demonstrates how to create a fully functional parallel coordinate system chart, including the following features:

1. Using multiple data dimensions to create parallel coordinate axes
2. Setting line colors based on data values
3. Customizing coordinate axis styles to improve readability
4. Adding interactive functionality to support axis highlighting and filtering
5. Setting active and inactive state styles to enhance interactive experience
6. Adding legends to help understand color encoding

Through these configurations, you can create both beautiful and practical parallel coordinate system visualizations that effectively analyze relationships between multi-dimensional data.
