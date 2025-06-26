---
title: parallel
order: 2
---

## Overview

Parallel coordinate system (Parallel) is a coordinate system used for visualizing multi-dimensional data. It maps multiple variables to parallel coordinate axis, with each data record represented as a polyline connecting corresponding values on each coordinate axis. Parallel coordinate systems are particularly suitable for analyzing relationships and patterns among multiple variables, as well as identifying outliers and clusters in datasets.

In G2, the parallel coordinate system is implemented by transforming the Cartesian coordinate system into a parallel coordinate system, where each data dimension corresponds to a vertical coordinate axis.

### Coordinate System Principles

The basic principles of parallel coordinate systems are:

1. Map multiple data dimensions to parallel arranged coordinate axis
2. Each data record is represented as a polyline passing through all coordinate axis
3. The position of the line on each coordinate axis corresponds to the data value of that dimension

Parallel coordinate systems have two common layout methods:

- Vertical layout: Coordinate axis are arranged vertically (default)
- Horizontal layout: Coordinate axis are arranged horizontally through transpose transform

### Getting Started

```js | ob { inject: true }
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

1. **Multi-dimensional data analysis**: When you need to analyze relationships between multiple variables simultaneously, parallel coordinate systems can display all dimensions in one view
2. **Pattern recognition**: By observing the direction of lines, you can identify patterns and trends in the data
3. **Outlier detection**: Abnormal data usually appears as lines with paths significantly different from most other lines
4. **Cluster analysis**: Similar data records will form similar line paths, making it easy to identify data clusters

### Notes

1. **Data volume**: When there are too many data records, lines will overlap causing visual clutter. It's recommended to use transparency or interactive filtering
2. **Axis order**: The arrangement order of coordinate axis will affect the visualization effect. Variables with strong correlations placed in adjacent positions are usually more conducive to analysis
3. **Axis scaling**: Different dimensions may have vastly different data ranges, requiring appropriate scale settings for better comparison

## Configuration

The configuration options for parallel coordinate systems are relatively simple, mainly set through the `coordinate` property:

| Property  | Description                                                              | Type        | Default | Required |
| --------- | ------------------------------------------------------------------------ | ----------- | ------- | -------- |
| transform | Coordinate system transforms, can be used to implement horizontal layout | Transform[] | []      |          |

### Coordinate System Transforms

Parallel coordinate systems support the following coordinate system transforms:

| Transform Type | Description                                  | Example                                  |
| -------------- | -------------------------------------------- | ---------------------------------------- |
| transpose      | Convert vertical layout to horizontal layout | `{ transform: [{ type: 'transpose' }] }` |

## Common Use Cases

### 1. Vertical Parallel Coordinate System

Vertical parallel coordinate system is the most common parallel coordinate system layout, with coordinate axis arranged vertically.

```js | ob {  pin: false , inject: true }
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

By adding transpose transform, you can arrange coordinate axis horizontally to create horizontal parallel coordinate systems.

```js | ob {  pin: false , inject: true }
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

### 3. Interactive Data Analysis

Parallel coordinate systems can be combined with interaction components to implement interactive data analysis functionality.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  coordinate: { type: 'parallel' },
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/iris.json',
  },
  encode: {
    position: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'],
    color: 'species',
  },
  style: {
    strokeOpacity: 0.6,
    lineWidth: 1.5,
  },
  scale: {
    color: {
      palette: 'category10',
    },
  },
  axis: {
    position: { zIndex: 1 },
    position1: { zIndex: 1 },
    position2: { zIndex: 1 },
    position3: { zIndex: 1 },
  },
  interaction: {
    brushHighlight: true,
  },
});

chart.render();
```

## Complete Example

Here's a complete example showing how to use parallel coordinate systems for automobile data analysis:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 80,
});

const dimensions = [
  'Cylinders',
  'Displacement',
  'Horsepower',
  'Weight_in_lbs',
  'Acceleration',
  'Miles_per_Gallon',
];

chart.options({
  type: 'line',
  coordinate: { type: 'parallel' },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
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
    size: 1.2,
  },
  style: {
    strokeOpacity: 0.4,
  },
  scale: {
    position: { nice: true },
    position1: { nice: true },
    position2: { nice: true },
    position3: { nice: true },
    position4: { nice: true },
    position5: { nice: true },
    color: {
      palette: 'set2',
    },
  },
  axis: {
    position: {
      zIndex: 1,
      title: { text: 'Cylinders' },
    },
    position1: {
      zIndex: 1,
      title: { text: 'Displacement' },
    },
    position2: {
      zIndex: 1,
      title: { text: 'Horsepower' },
    },
    position3: {
      zIndex: 1,
      title: { text: 'Weight (lbs)' },
    },
    position4: {
      zIndex: 1,
      title: { text: 'Acceleration' },
    },
    position5: {
      zIndex: 1,
      title: { text: 'MPG' },
    },
  },
  legend: {
    color: {
      position: 'top',
      layout: { justifyContent: 'center' },
    },
  },
  interaction: {
    tooltip: {
      shared: true,
      crosshairsLineDash: [4, 4],
    },
    brushHighlight: {
      series: true,
    },
  },
});

chart.render();
```
