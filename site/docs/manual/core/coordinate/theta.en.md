---
title: theta
order: 2
---

## Overview

Theta is a special polar coordinate system that combines the features of Transpose and Polar coordinate systems. It maps data to angles at a fixed radius, commonly used for transforming bar charts into pie charts/donut charts/fan charts.

The Theta coordinate system is essentially a combination of Transpose and Polar coordinate systems.

1. First, it swaps the x/y axes through Transpose
2. Then, it converts Cartesian coordinates to polar coordinates through Polar
3. Finally, it achieves data encoding on angles at a fixed radius

## Configuration Options

| Property    | Description                                                                                                                                                                                                                                                                                            | Type     | Default Value       | Required |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------------------- | -------- |
| startAngle  | Starting angle in radians, controls the starting angular position of pie/donut charts                                                                                                                                                                                                                 | `number` | `-Math.PI / 2`      |          |
| endAngle    | Ending angle in radians, controls the ending angular position of pie/donut charts                                                                                                                                                                                                                     | `number` | `(Math.PI * 3) / 2` |          |
| innerRadius | Inner radius (ratio 0-1), controls the inner circle radius of donut charts. 0 represents a solid pie chart, greater than 0 represents a donut chart. Generally, this value should be smaller than outerRadius. If it exceeds, it can still be displayed but may affect label presentation        | `number` | `0`                 |          |
| outerRadius | Outer radius (ratio 0-1), controls the outer circle radius of pie/donut charts. 1 represents filling the entire drawing area. Values greater than 1 will exceed the container (the excess part will be clipped)                                                                                    | `number` | `1`                 |          |

## Examples

### Basic Pie Chart

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', value: 40 },
    { category: 'B', value: 25 },
    { category: 'C', value: 20 },
    { category: 'D', value: 15 },
  ],
  encode: { y: 'value', color: 'category' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },
  style: { stroke: 'white' },
  labels: [{ text: 'category', radius: 0.8 }],
});

chart.render();
```

### Basic Donut Chart

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', value: 40 },
    { category: 'B', value: 25 },
    { category: 'C', value: 20 },
    { category: 'D', value: 15 },
  ],
  encode: { y: 'value', color: 'category' },
  transform: [{ type: 'stackY' }],
  coordinate: {
    type: 'theta',
    innerRadius: 0.5, // Set inner radius to create donut chart
  },
  style: { stroke: 'white' },
  labels: [
    { text: 'category', radius: 0.5 },
    { text: 'value', radius: 0.5, style: { dy: 12 } },
  ],
});

chart.render();
```

### Custom Starting Angle

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', value: 40 },
    { category: 'B', value: 25 },
    { category: 'C', value: 20 },
    { category: 'D', value: 15 },
  ],
  encode: { y: 'value', color: 'category' },
  transform: [{ type: 'stackY' }],
  coordinate: {
    type: 'theta',
    startAngle: -Math.PI / 2, // Start from π radians
    endAngle: Math.PI * 3, // End at 3π radians
  },
  style: { stroke: 'white' },
  labels: [{ text: 'category', radius: 0.8 }],
});

chart.render();
```

### Compositional Approach

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const data = [
  { item: 'Case One', count: 40, percent: 0.4 },
  { item: 'Case Two', count: 21, percent: 0.21 },
  { item: 'Case Three', count: 17, percent: 0.17 },
  { item: 'Case Four', count: 13, percent: 0.13 },
  { item: 'Case Five', count: 9, percent: 0.09 },
];

const chart = new Chart({
  container: 'container',
});
chart.coordinate({ type: 'theta' });

chart
  .interval()
  .data(data)
  .transform({ type: 'stackY' })
  .encode('y', 'percent')
  .encode('color', 'item')
  .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
  .label({
    position: 'outside',
    text: (data) => `${data.item}: ${data.percent * 100}%`,
  })
  .tooltip((data) => ({
    name: data.item,
    value: `${data.percent * 100}%`,
  }));

chart.render();
```

