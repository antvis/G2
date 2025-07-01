---
title: fisheye
order: 2
---

## Overview

Fisheye coordinate system (Fisheye) is a special coordinate system transform that applies Cartesian fisheye effects to input dimensions, magnifying focus areas while compressing regions far from the focus. This transform is similar to the visual effect of a fisheye lens, capable of highlighting local details while maintaining a global view.

Fisheye coordinate system transforms are mainly used in the following scenarios:

1. **Data exploration**: When you need to focus on both overall data distribution and local details simultaneously
2. **Dense data visualization**: When data points are too dense to distinguish individuals
3. **Interactive data analysis**: Combined with mouse interaction, dynamically adjusting focus position to achieve dynamic magnification and reduction of data

In G2, fisheye coordinate systems can be implemented through coordinate system transforms or applied dynamically through interaction components.

### Coordinate System Principles

The basic principles of fisheye coordinate systems are:

1. Define a focus position (focusX, focusY)
2. Set distortion levels (distortionX, distortionY)
3. Apply non-linear transforms based on distance from points to focus
4. Points closer to the focus have larger spacing after transformation (magnification effect)
5. Points farther from the focus have smaller spacing after transformation (compression effect)

### Getting Started

```js | ob { inject: true }
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
3. **Map navigation**: In map visualizations, fisheye effects can magnify specific areas while maintaining awareness of the surrounding environment
4. **Interactive data exploration**: Combined with mouse interaction, users can dynamically adjust focus positions to achieve dynamic magnification and reduction of data

### Notes

1. **Distortion level**: Setting distortion levels (distortionX/distortionY) too high will cause severe visual distortion. It's recommended to adjust based on actual data distribution
2. **Focus position**: Focus position (focusX/focusY) should be set according to data distribution and user focus points
3. **Interactive experience**: In interactive applications, changes in fisheye effects should be smooth, avoiding sudden changes that cause visual discomfort

## Configuration

The configuration options for fisheye coordinate systems are as follows:

| Property    | Description                                                   | Type      | Default | Required |
| ----------- | ------------------------------------------------------------- | --------- | ------- | -------- |
| focusX      | X-direction position of fisheye transform center              | `number`  | `0`     |          |
| focusY      | Y-direction position of fisheye transform center              | `number`  | `0`     |          |
| distortionX | X-direction distortion magnitude of fisheye transform         | `number`  | `2`     |          |
| distortionY | Y-direction distortion magnitude of fisheye transform         | `number`  | `2`     |          |
| visual      | Whether focusX and focusY values are visual coordinate points | `boolean` | `false` |          |

### Parameter Description

- **focusX/focusY**: Define the focus position of fisheye effects. When `visual=false`, the value range is [0, 1], representing normalized coordinates; when `visual=true`, it represents actual visual coordinate points.
- **distortionX/distortionY**: Control the distortion level of fisheye effects. The larger the value, the more obvious the distortion effect.
- **visual**: Determines the coordinate system for focusX and focusY. When set to true, use visual coordinate system; when set to false, use normalized coordinate system.

## Common Use Cases

### 1. Static Fisheye Effect

The simplest usage is to set a fixed fisheye focus, suitable for scenarios that need to highlight specific areas.

```js | ob {  pin: false , inject: true }
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

By adding interaction components, you can implement dynamic fisheye effects where the focus changes with mouse movement.

```js | ob {  pin: false , inject: true }
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

Here's a complete example that combines fisheye coordinate systems with scatter plots, showing how to use fisheye effects to analyze multi-dimensional data:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  coordinate: {
    transform: [
      {
        type: 'fisheye',
        focusX: 0.4,
        focusY: 0.6,
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
      range: [6, 30],
    },
    color: {
      palette: 'category10',
    },
  },
  style: {
    fillOpacity: 0.6,
    stroke: 'white',
    lineWidth: 1,
  },
  axis: {
    x: {
      title: { text: 'GDP per Capita' },
      labelFormatter: '~s',
    },
    y: {
      title: { text: 'Life Expectancy' },
    },
  },
  legend: {
    color: {
      position: 'right',
      title: { text: 'Continent' },
    },
    size: {
      position: 'bottom',
      title: { text: 'Population' },
    },
  },
  tooltip: {
    items: [
      { channel: 'x', name: 'GDP', valueFormatter: '~s' },
      { channel: 'y', name: 'Life Expectancy' },
      { channel: 'size', name: 'Population', valueFormatter: '~s' },
      { channel: 'color', name: 'Continent' },
    ],
  },
});

chart.render();
```

This example demonstrates how to use fisheye coordinate systems to analyze multi-dimensional bubble chart data, highlighting specific areas through fisheye effects while maintaining overall data perception. The fisheye effect magnifies data points around the focus (GDP: ~$20,000, Life Expectancy: ~75 years), making it easier to observe detailed patterns in this region.

## Combining with Other Coordinate Systems

Fisheye coordinate system transformations can be combined with other coordinate system transformations, such as combining with transpose transformation:

```js | ob {  pin: false , inject: true }
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
