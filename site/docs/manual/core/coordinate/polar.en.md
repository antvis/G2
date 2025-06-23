---
title: polar
order: 2
---

## Overview

`polar` (Polar coordinate system) is a non-Cartesian coordinate system that transforms points (x, y) from the Cartesian coordinate system to points (r, θ) in the polar coordinate system, where r is the radius and θ is the angle. Polar coordinate systems are commonly used in visualization to display cyclical data, relative relationships, or distribution differences.

### Coordinate System Characteristics

- The center serves as the pole (origin), with straight lines radiating outward from the center as polar axis

- Data point positions are determined jointly by the distance to the center (radius r) and the angle with the polar axis (angle θ)

- Suitable for displaying cyclical, periodic, and distribution-type data

### Use Cases

- Rose charts: Display numerical differences in categorical data

- Radar charts: Multi-dimensional data comparison

- Polar scatter plots: Display correlation between angle and radius

- Various visualizations requiring radial layout

## Configuration

| Property    | Description                                                            | Type                    | Default             | Required |
| ----------- | ---------------------------------------------------------------------- | ----------------------- | ------------------- | -------- |
| type        | Coordinate system type, set to 'polar'                                 | `string`                | None                | ✓        |
| startAngle  | Starting angle of polar coordinate system                              | `number`                | `-Math.PI / 2`      |          |
| endAngle    | Ending angle of polar coordinate system                                | `number`                | `(Math.PI * 3) / 2` |          |
| innerRadius | Inner radius of polar coordinate, as percentage of canvas height (0-1) | `number`                | `0`                 |          |
| outerRadius | Outer radius of polar coordinate, as percentage of canvas height (0-1) | `number`                | `1`                 |          |
| transform   | Coordinate system transform configuration                              | `CoordinateTransform[]` | `undefined`         |          |

> Complex type descriptions:
>
> - `startAngle` and `endAngle` are in radians, with default values of -π/2 and 3π/2 respectively, forming a complete circle (2π).
> - `innerRadius` and `outerRadius` have a value range of [0-1], representing the inner and outer radius of the polar coordinate relative to the canvas height.
> - `transform` is used to configure additional coordinate system transforms.

## Examples

### Getting Started

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 720,
  height: 720,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
  },
  encode: { x: 'year', y: 'people' },
  transform: [{ type: 'groupX', y: 'sum' }],
  scale: { y: { type: 'sqrt' } },
  coordinate: { type: 'polar' },
  animate: { enter: { type: 'waveIn' } },
  axis: {
    y: {
      titleSpacing: 28,
      labelFormatter: '~s',
      tickCount: 5,
      tickFilter: (d, i) => i !== 0,
      direction: 'right',
    },
  },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```

### Radar Chart

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { item: 'Design', type: 'a', score: 70 },
    { item: 'Design', type: 'b', score: 30 },
    { item: 'Development', type: 'a', score: 60 },
    { item: 'Development', type: 'b', score: 70 },
    { item: 'Marketing', type: 'a', score: 50 },
    { item: 'Marketing', type: 'b', score: 60 },
    { item: 'Users', type: 'a', score: 40 },
    { item: 'Users', type: 'b', score: 50 },
    { item: 'Test', type: 'a', score: 60 },
    { item: 'Test', type: 'b', score: 70 },
    { item: 'Language', type: 'a', score: 70 },
    { item: 'Language', type: 'b', score: 50 },
    { item: 'Technology', type: 'a', score: 50 },
    { item: 'Technology', type: 'b', score: 40 },
    { item: 'Support', type: 'a', score: 30 },
    { item: 'Support', type: 'b', score: 40 },
    { item: 'Sales', type: 'a', score: 60 },
    { item: 'Sales', type: 'b', score: 40 },
    { item: 'UX', type: 'a', score: 50 },
    { item: 'UX', type: 'b', score: 60 },
  ],
  scale: { x: { padding: 0.5, align: 0 }, y: { tickCount: 5 } },
  coordinate: { type: 'polar' },
  axis: { x: { grid: true }, y: { zIndex: 1, title: false } },
  interaction: { tooltip: { crosshairsLineDash: [4, 4] } },
  children: [
    {
      type: 'area',
      encode: { x: 'item', y: 'score', color: 'type', shape: 'smooth' },
      scale: { y: { domainMax: 80 } },
      style: { fillOpacity: 0.5 },
    },
    {
      type: 'line',
      encode: { x: 'item', y: 'score', color: 'type', shape: 'smooth' },
      style: { lineWidth: 2 },
    },
  ],
});

chart.render();
```

### Vector Field Chart

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'vector',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
  },
  encode: {
    x: 'longitude',
    y: 'latitude',
    rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
    size: ({ u, v }) => Math.hypot(v, u),
    color: ({ u, v }) => Math.hypot(v, u),
  },
  scale: { size: { range: [6, 20] }, color: { palette: 'viridis' } },
  coordinate: { type: 'polar' },
  axis: { x: { grid: false }, y: { grid: false } },
  legend: false,
  tooltip: { title: { channel: 'color', valueFormatter: '.1f' } },
});

chart.render();
```
