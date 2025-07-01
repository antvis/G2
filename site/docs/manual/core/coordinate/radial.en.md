---
title: radial
order: 3
---

## Overview

The Radial coordinate system is a special type of polar coordinate system obtained by applying a transpose operation to the polar coordinate system. In the radial coordinate system, angles are mapped to the Y-axis, and radius is mapped to the X-axis, which is the reverse of the traditional polar coordinate system mapping.

Radial coordinate systems are commonly used for drawing the following types of charts:

- Coxcomb charts
- Radial bar charts
- Radial stacked bar charts
- Apple Activity charts and other special visualizations

These charts typically use `interval` marks to display data, effectively showing data distribution and comparisons.

### Coordinate System Principles

The radial coordinate system is obtained by applying the following transforms to a polar coordinate system:

1. Transpose: Exchange the mapping of X-axis and Y-axis
2. Translate and reflect: Adjust the position and direction of the coordinate system

This transformation gives data a radial effect that differs from traditional bar charts, particularly suitable for displaying periodic data or scenarios that require emphasizing central radiation effects.

### Getting Started

```js | ob { inject: true }
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

Radial coordinate systems are suitable for the following scenarios:

1. **Emphasizing central radiation effects**: When data has a concept of radiating from the center outward, such as resource allocation, influence, etc.
2. **Displaying periodic data**: When data has cyclical characteristics but is not suitable for traditional polar coordinate systems
3. **Space-saving needs**: Compared to traditional bar charts, radial bar charts can display data more compactly while maintaining data readability
4. **Aesthetic requirements**: When creating visually more attractive visualizations is needed

### Notes

1. **Data volume**: Radial coordinate systems are suitable for displaying a moderate number of categories (approximately 5-15), too many or too few categories may not be suitable
2. **Label placement**: In radial coordinate systems, label placement requires special attention. You can use the `autoRotate` and `rotateToAlignArc` properties in the `label` configuration
3. **Radius settings**: Properly setting `innerRadius` can improve readability, especially when data value differences are small

## Configuration

The radial coordinate system is primarily responsible for mapping positional data from data space to canvas space. Other visual attributes, such as color and size, are still mapped through corresponding scales. For detailed information about scales, please refer to the [Scale](/en/manual/core/scale/overview) documentation.

| Parameter   | Description                                 | Type   | Default             | Required |
| ----------- | ------------------------------------------- | ------ | ------------------- | -------- |
| startAngle  | Starting angle of polar coordinate system   | number | `-Math.PI / 2`      |          |
| endAngle    | Ending angle of polar coordinate system     | number | `(Math.PI * 3) / 2` |          |
| innerRadius | Inner radius of polar coordinate, range 0-1 | number | `0`                 |          |
| outerRadius | Outer radius of polar coordinate, range 0-1 | number | `1`                 |          |

### Angle Unit Description

In the radial coordinate system, angles use radians as the unit, not degrees. Here's a comparison of common angles in radians:

| Degrees | Radians | Position                          |
| ------- | ------- | --------------------------------- |
| 0°      | 0       | 3 o'clock direction               |
| 90°     | π/2     | 12 o'clock direction              |
| 180°    | π       | 9 o'clock direction               |
| 270°    | 3π/2    | 6 o'clock direction               |
| 360°    | 2π      | 3 o'clock direction (full circle) |

You can use `Math.PI` to represent π, for example `Math.PI / 2` represents 90°.

## Common Use Cases

### 1. Coxcomb Chart (Radial Bar Chart)

Coxcomb charts are one of the most common applications of radial coordinate systems, displaying traditional bar charts in a radial coordinate system to create a radial visual effect.

```js | ob {  pin: false , inject: true }
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

By applying stacking transforms in the radial coordinate system, you can create radial stacked bar charts suitable for displaying hierarchical data.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.coordinate({ type: 'radial' });

chart
  .interval()
  .data([
    { category: 'Category A', type: 'Type1', value: 40 },
    { category: 'Category A', type: 'Type2', value: 20 },
    { category: 'Category B', type: 'Type1', value: 30 },
    { category: 'Category B', type: 'Type2', value: 50 },
    { category: 'Category C', type: 'Type1', value: 25 },
    { category: 'Category C', type: 'Type2', value: 35 },
  ])
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type')
  .transform({ type: 'stackY' });

chart.render();
```

### 3. Apple Activity Chart

By setting appropriate inner radius and styles, you can create visualization effects similar to Apple Watch activity rings.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { name: 'activity1', percent: 0.6, color: '#1ad5de' },
  { name: 'activity2', percent: 0.2, color: '#a0ff03' },
  { name: 'activity3', percent: 0.3, color: '#e90b3a' },
];

chart.coordinate({ type: 'radial', innerRadius: 0.2, outerRadius: 0.9 });

chart
  .interval()
  .data(data)
  .encode('y', 'percent')
  .encode('color', 'color')
  .scale('color', { type: 'identity' })
  .style({
    stroke: '#fff',
    lineWidth: 10,
    lineCap: 'round',
  })
  .animate('enter', { type: 'waveIn', duration: 1000 });

chart.render();
```

## Complete Example

Here's a complete example that combines radial coordinate system with animations to create an engaging visualization:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { category: 'Design', score: 85, maxScore: 100 },
  { category: 'Development', score: 72, maxScore: 100 },
  { category: 'Marketing', score: 91, maxScore: 100 },
  { category: 'Sales', score: 67, maxScore: 100 },
  { category: 'Support', score: 78, maxScore: 100 },
  { category: 'Research', score: 83, maxScore: 100 },
];

chart.coordinate({
  type: 'radial',
  innerRadius: 0.3,
  outerRadius: 0.8,
});

chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'score')
  .encode('color', 'score')
  .scale('color', {
    range: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
  })
  .style({
    stroke: 'white',
    lineWidth: 2,
  })
  .animate('enter', {
    type: 'waveIn',
    duration: 1500,
    delay: (d, i) => i * 100,
  })
  .label({
    text: 'score',
    position: 'outside',
    style: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

chart.render();
```
