---
title: fisheye
order: 2
---

## Overview

The Fisheye coordinate system is a special coordinate transformation that applies a Cartesian fisheye effect to input dimensions, magnifying the focus area while compressing areas away from the focus. This transformation is similar to the visual effect of a fisheye lens, allowing you to highlight local details while maintaining a global view.

Fisheye coordinate system transformations are mainly used in the following scenarios:

1. **Data exploration**: When you need to focus on both overall data distribution and local details simultaneously
2. **Dense data visualization**: When data points are too dense to distinguish individual items
3. **Interactive data analysis**: Combined with mouse interaction, dynamically adjust focus position to achieve dynamic zooming in and out of data

In G2, the fisheye coordinate system can be implemented through coordinate system transformations, or applied dynamically through interactive components.

### Coordinate System Principles

The basic principles of the fisheye coordinate system are:

1. Define a focus position (focusX, focusY)
2. Set distortion levels (distortionX, distortionY)
3. Apply non-linear transformations based on distance from points to the focus
4. Points closer to the focus have larger spacing after transformation (magnification effect)
5. Points farther from the focus have smaller spacing after transformation (compression effect)

### Getting Started

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  coordinate: {
    transform: [{ type: 'fisheye', focusX: 0.5, focusY: 0.5 }],
  },
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: {
    size: {
      type: 'log',
      range: [4, 20],
    },
  },
  style: {
    fillOpacity: 0.3,
    lineWidth: 1,
  },
});

chart.render();
```

## Use Cases

Fisheye coordinate systems are particularly suitable for the following scenarios:

1. **Dense data visualization**: When data points are too dense, fisheye effects can help users focus on specific areas while maintaining perception of overall data
2. **Network graph analysis**: In large network graphs, fisheye effects can magnify nodes and connections of interest while maintaining the overall network structure
3. **Map navigation**: In map visualizations, fisheye effects can magnify specific areas while maintaining awareness of surrounding environments
4. **Interactive data exploration**: Combined with mouse interaction, users can dynamically adjust focus positions to achieve dynamic data zooming

### Notes

1. **Distortion level**: Setting distortion levels (distortionX/distortionY) too high will cause severe visual distortion; it's recommended to adjust based on actual data distribution
2. **Focus position**: Focus position (focusX/focusY) should be set based on data distribution and user attention points
3. **Interactive experience**: In interactive applications, fisheye effect changes should be smooth, avoiding sudden changes that cause visual discomfort

## Configuration

The configuration options for fisheye coordinate systems are as follows:

| Property    | Description                                         | Type      | Default | Required |
| ----------- | --------------------------------------------------- | --------- | ------- | -------- |
| focusX      | X-direction position of fisheye transform center   | `number`  | `0`     |          |
| focusY      | Y-direction position of fisheye transform center   | `number`  | `0`     |          |
| distortionX | X-direction distortion magnitude of fisheye transform | `number`  | `2`     |          |
| distortionY | Y-direction distortion magnitude of fisheye transform | `number`  | `2`     |          |
| visual      | Whether focusX and focusY values are visual coordinate points | `boolean` | `false` |          |

### Parameter Description

- **focusX/focusY**: Define the focus position of the fisheye effect. When `visual=false`, the value range is [0, 1], representing normalized coordinates; when `visual=true`, it represents actual visual coordinate points.
- **distortionX/distortionY**: Control the distortion level of the fisheye effect; larger values mean more obvious distortion effects.
- **visual**: Determines the coordinate system for focusX and focusY. When set to true, uses visual coordinate system; when set to false, uses normalized coordinate system.

## Common Use Cases

### 1. Static Fisheye Effect

The simplest usage is to set a fixed fisheye focus, suitable for scenarios that need to highlight specific areas.

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  coordinate: {
    transform: [
      {
        type: 'fisheye',
        focusX: 0.7,
        focusY: 0.3,
        distortionX: 3,
        distortionY: 3,
      },
    ],
  },
  type: 'point',
  data: [
    { x: 1, y: 1, category: 'A' },
    { x: 2, y: 2, category: 'B' },
    { x: 3, y: 3, category: 'C' },
    { x: 4, y: 4, category: 'D' },
    { x: 5, y: 5, category: 'E' },
    { x: 6, y: 6, category: 'F' },
    { x: 7, y: 7, category: 'G' },
    { x: 8, y: 8, category: 'H' },
    { x: 9, y: 9, category: 'I' },
  ],
  encode: {
    x: 'x',
    y: 'y',
    color: 'category',
    shape: 'point',
  },
  style: {
    r: 6,
    lineWidth: 1,
  },
});

chart.render();
```

### 2. Interactive Fisheye Effect

By adding interactive components, you can achieve dynamic fisheye effects where the focus changes with mouse movement.

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: {
    size: {
      type: 'log',
      range: [4, 20],
    },
  },
  style: {
    fillOpacity: 0.3,
    lineWidth: 1,
  },
  interaction: {
    fisheye: true, // Enable fisheye interaction
  },
});

chart.render();
```

## Complete Example

Here's a complete example that combines fisheye coordinate systems with scatter plots, demonstrating how to use fisheye effects to analyze multi-dimensional data:

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  width: 800,
  height: 500,
  padding: [40, 60, 60, 80],
  coordinate: {
    transform: [
      {
        type: 'fisheye',
        focusX: 0.6,
        focusY: 0.4,
        distortionX: 2.5,
        distortionY: 2.5,
      },
    ],
  },
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: {
    size: {
      type: 'log',
      range: [4, 20],
    },
    x: {
      nice: true,
    },
    y: {
      nice: true,
    },
  },
  style: {
    fillOpacity: 0.6,
    lineWidth: 1,
    stroke: '#fff',
  },
  legend: {
    color: {
      position: 'bottom',
      layout: 'horizontal',
    },
    size: false,
  },
  axis: {
    x: {
      title: 'GDP',
      titleFill: '#333',
      labelFontSize: 12,
    },
    y: {
      title: 'Life Expectancy',
      titleFill: '#333',
      labelFontSize: 12,
    },
  },
  tooltip: {
    title: (d) => d.country,
    items: [
      (d) => ({ name: 'GDP', value: d.GDP }),
      (d) => ({ name: 'Life Expectancy', value: d.LifeExpectancy }),
      (d) => ({ name: 'Population', value: d.Population }),
    ],
  },
});

chart.render();
```

This example demonstrates how to create a fully functional fisheye coordinate system scatter plot, including the following features:

1. Setting appropriate fisheye focus and distortion levels to highlight key areas
2. Using multiple data dimensions (GDP, life expectancy, population) to create scatter plots
3. Setting point colors by continent and point sizes by population
4. Customizing axis and legend styles to improve readability
5. Adding interactive tooltip information to display detailed data

## Combining with Other Coordinate Systems

Fisheye coordinate system transformations can be combined with other coordinate system transformations, such as combining with transpose transformation:

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  coordinate: {
    transform: [
      { type: 'transpose' },
      {
        type: 'fisheye',
        focusX: 0.5,
        focusY: 0.5,
        distortionX: 2,
        distortionY: 2,
      },
    ],
  },
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render();
```

## Summary

The fisheye coordinate system is a powerful visualization tool, particularly suitable for handling dense data and scenarios that require attention to local details. By properly setting focus position and distortion levels, you can highlight key areas while maintaining a global view. Combined with interactive features, fisheye effects can provide more flexible and intuitive data exploration experiences.

In practical applications, it's recommended to adjust fisheye parameters based on data distribution and user needs, avoiding excessive distortion that leads to visual distortion. Additionally, consider combining with other coordinate system transformations and interactive components to create richer and more effective visualization effects.
