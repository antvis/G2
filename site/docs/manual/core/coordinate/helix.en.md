---
title: helix
order: 10
---

The `helix` coordinate system is a coordinate system that expands two-dimensional data along a spiral line. It is commonly used for visualizing time series data or gene expression data, showing the cyclical nature or trends of data through spiral extension.

## Getting Started

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

// Mock data
const data = [];
for (let i = 0; i < 372; i++) {
  const time = new Date(Date.now() + i * 1000 * 3600 * 24)
    .toISOString()
    .split('T')[0];
  data.push({ time, value: Math.random() * 100 });
}

chart.data(data);

chart.coordinate({
  type: 'helix',
  startAngle: 0.5 * Math.PI, // Starting angle
  endAngle: 12.5 * Math.PI, // Ending angle
});

chart
  .interval()
  .encode('x', 'time')
  .encode('y', 'value')
  .encode('color', 'value')
  .scale('color', { range: ['#ffffff', '#1890FF'] });

chart.render();
```

## Configuration

| Parameter   | Description                            | Type     | Default       |
| ----------- | -------------------------------------- | -------- | ------------- |
| startAngle  | Starting angle of the spiral (radians) | `number` | `0`           |
| endAngle    | Ending angle of the spiral (radians)   | `number` | `Math.PI * 6` |
| innerRadius | Inner radius of the spiral (0 to 1)    | `number` | `0`           |
| outerRadius | Outer radius of the spiral (0 to 1)    | `number` | `1`           |
