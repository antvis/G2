---
title: radial
order: 3
---

## Overview

The Radial coordinate system is a special type of polar coordinate system that is obtained by transposing the polar coordinate system. In the radial coordinate system, angles are mapped to the Y-axis and radius is mapped to the X-axis, which is opposite to the traditional polar coordinate mapping.

The radial coordinate system is commonly used to create the following types of charts:

- Coxcomb charts
- Radial bar charts
- Radial stacked bar charts
- Apple Activity rings and other special visualizations

These charts typically use `interval` marks to display data and can effectively show data distribution and comparisons.

### Coordinate System Principles

The radial coordinate system is obtained by applying the following transformations to the polar coordinate system:

1. Transpose: Exchange the mapping of X-axis and Y-axis
2. Translate and reflect: Adjust the position and orientation of the coordinate system

This transformation makes the data visually present a radial effect different from traditional bar charts, particularly suitable for displaying periodic data or scenarios that need to emphasize central radiation effects.

### Getting Started

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  coordinate: {
    type: 'radial',
    innerRadius: 0.1,
    endAngle: Math.PI,
  },
  data: [
    { question: 'Question 1', percent: 0.21 },
    { question: 'Question 2', percent: 0.4 },
    { question: 'Question 3', percent: 0.49 },
    { question: 'Question 4', percent: 0.52 },
    { question: 'Question 5', percent: 0.53 },
    { question: 'Question 6', percent: 0.84 },
    { question: 'Question 7', percent: 1.0 },
    { question: 'Question 8', percent: 1.2 },
  ],
  encode: {
    x: 'question',
    y: 'percent',
    color: 'percent',
  },
  style: {
    stroke: 'white',
  },
  scale: {
    color: {
      range: '#BAE7FF-#1890FF-#0050B3',
    },
  },
  legend: {
    color: {
      length: 400,
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
  axis: {
    y: {
      tickFilter: (d, i) => i !== 0,
    },
  },
});

chart.render();
```

## Use Cases

The radial coordinate system is suitable for the following scenarios:

1. **Emphasizing central radiation effects**: When data has the concept of radiating outward from the center, such as resource allocation, influence, etc.
2. **Displaying periodic data**: When data has cyclical characteristics but is not suitable for traditional polar coordinate systems
3. **Space-saving needs**: Compared to traditional bar charts, radial bar charts can display data more compactly while maintaining readability
4. **Aesthetic requirements**: When creating visually more attractive visualizations

### Considerations

1. **Data volume**: The radial coordinate system is suitable for displaying moderate numbers of categories (approximately 5-15), too many or too few categories may not be appropriate
2. **Label placement**: In radial coordinate systems, label placement requires special attention. You can use the `autoRotate` and `rotateToAlignArc` properties in the `label` configuration
3. **Radius settings**: Properly setting `innerRadius` can improve readability, especially when data value differences are small

## Configuration Options

The radial coordinate system is primarily responsible for mapping positions from data space to canvas space. Other visual attributes, such as color and size, are still mapped through corresponding scales. For detailed information about scales, please refer to the [Scale](/en/manual/core/scale/overview) documentation.

| Parameter   | Description                            | Type   | Default Value        | Required |
| ----------- | -------------------------------------- | ------ | -------------------- | -------- |
| startAngle  | Starting angle of polar coordinate (radians) | number | `-Math.PI / 2`       |          |
| endAngle    | Ending angle of polar coordinate (radians)   | number | `(Math.PI \* 3) / 2` |          |
| innerRadius | Inner radius of polar coordinate, range 0-1  | number | `0`                  |          |
| outerRadius | Outer radius of polar coordinate, range 0-1  | number | `1`                  |          |

### Angle Unit Description

In the radial coordinate system, angles use radians as the unit, not degrees. Here is a reference table for common angle conversions:

| Degrees | Radians | Position           |
| ------- | ------- | ------------------ |
| 0°      | 0       | 3 o'clock position |
| 90°     | π/2     | 12 o'clock position |
| 180°    | π       | 9 o'clock position |
| 270°    | 3π/2    | 6 o'clock position |
| 360°    | 2π      | 3 o'clock position (full circle) |

You can use `Math.PI` to represent π, for example, `Math.PI / 2` represents 90°.

## Common Use Cases

### 1. Coxcomb Chart (Radial Bar Chart)

The coxcomb chart is one of the most common applications of the radial coordinate system. It displays traditional bar charts in a radial coordinate system, creating a radial visual effect.

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.coordinate({ type: 'radial', innerRadius: 0.1, endAngle: Math.PI });

chart
  .interval()
  .data([
    { category: 'Category A', value: 40 },
    { category: 'Category B', value: 60 },
    { category: 'Category C', value: 80 },
  ])
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'value');

chart.render();
```

### 2. Radial Stacked Bar Chart

By applying stacking transforms in the radial coordinate system, you can create radial stacked bar charts, suitable for displaying hierarchical data.

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.coordinate({ type: 'radial' });

chart
  .interval()
  .data([
    { category: 'Category A', type: 'Type 1', value: 40 },
    { category: 'Category A', type: 'Type 2', value: 20 },
    { category: 'Category B', type: 'Type 1', value: 30 },
    { category: 'Category B', type: 'Type 2', value: 50 },
    { category: 'Category C', type: 'Type 1', value: 25 },
    { category: 'Category C', type: 'Type 2', value: 35 },
  ])
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type')
  .transform({ type: 'stackY' });

chart.render();
```

### 3. Apple Activity Rings

By setting appropriate inner radius and styles, you can create visualization effects similar to Apple Watch activity rings.

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { name: 'activity1', percent: 0.6, color: '#1ad5de' },
  { name: 'activity2', percent: 0.2, color: '#a0ff03' },
  { name: 'activity3', percent: 0.3, color: '#e90b3a' },
];

chart.coordinate({ type: 'radial', innerRadius: 0.2 });

// Background rings
chart
  .interval()
  .data(data)
  .encode('x', 'name')
  .encode('y', 1)
  .style('fillOpacity', 0.25);

// Data rings
chart
  .interval()
  .data(data)
  .encode('x', 'name')
  .encode('y', 'percent')
  .encode('color', 'color')
  .scale('color', { type: 'identity' })
  .style('radius', 26);

chart.render();
```

## Complete Example

Here is a complete example of a radial bar chart with labels and animation effects:

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  coordinate: {
    type: 'radial',
    innerRadius: 0.1,
    endAngle: Math.PI,
  },
  data: [
    { category: 'Category A', value: 21 },
    { category: 'Category B', value: 40 },
    { category: 'Category C', value: 49 },
    { category: 'Category D', value: 52 },
    { category: 'Category E', value: 53 },
    { category: 'Category F', value: 84 },
    { category: 'Category G', value: 100 },
    { category: 'Category H', value: 120 },
  ],
  encode: {
    x: 'category',
    y: 'value',
    color: 'value',
  },
  style: {
    stroke: 'white',
  },
  scale: {
    color: {
      range: '#BAE7FF-#1890FF-#0050B3',
    },
  },
  axis: {
    y: {
      tickFilter: (d, i) => i !== 0,
    },
  },
  legend: {
    color: {
      length: 400,
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
  label: {
    text: 'value',
    position: 'outside',
    autoRotate: true,
    rotateToAlignArc: true,
    dx: 4,
  },
  animate: {
    enter: {
      type: 'waveIn',
      duration: 800,
    },
  },
});

chart.render();
```

This example demonstrates how to create a radial bar chart with labels and animation effects, including the following features:

1. Setting up a radial coordinate system with inner radius of 0.1 and ending angle of π (semicircle)
2. Using a continuous color palette to show data value magnitude
3. Adding external labels with `autoRotate` and `rotateToAlignArc` to align labels along the arc
4. Adding wave-in animation effects
5. Customizing Y-axis ticks by filtering out the first tick (usually 0)
6. Placing a legend at the bottom center

Through these configurations, you can create radial bar charts that are both beautiful and informative.
