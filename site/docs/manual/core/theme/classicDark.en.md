---
title: classicDark
order: 2
---

Classic dark theme. When using a dark theme, it's usually necessary to configure additional view styles to ensure the chart has better visual effects on dark backgrounds.

### Configuring View Background

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  theme: { type: 'classicDark', view: { viewFill: '#141414' } },
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Role-playing', sold: 120 },
    { genre: 'Action', sold: 350 },
    { genre: 'Simulation', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
});

chart.render();
```

### Using viewStyle for More Detailed View Configuration

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  theme: 'classicDark',
  data: [
    { category: 'A', value: 23 },
    { category: 'B', value: 45 },
    { category: 'C', value: 56 },
    { category: 'D', value: 78 },
    { category: 'E', value: 32 },
  ],
  encode: { x: 'category', y: 'value', color: 'category' },
  axis: {
    x: { grid: true, gridStroke: '#404040' },
    y: { grid: true, gridStroke: '#404040' },
  },
  viewStyle: {
    viewFill: '#1f1f1f',
    plotFill: '#2a2a2a',
    plotStroke: '#404040',
    plotLineWidth: 1,
  },
});

chart.render();
```

### Complete Dark Theme Configuration Example

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'line',
  theme: {
    type: 'classicDark',
    view: { viewFill: '#0f0f0f', plotFill: '#1a1a1a' },
  },
  data: [
    { year: '2018', value: 30 },
    { year: '2019', value: 40 },
    { year: '2020', value: 35 },
    { year: '2021', value: 50 },
    { year: '2022', value: 49 },
    { year: '2023', value: 70 },
  ],
  encode: { x: 'year', y: 'value' },
  style: { stroke: '#60a5fa', lineWidth: 3 },
  axis: {
    x: {
      grid: true,
      gridStroke: '#fff',
      gridLineWidth: 2,
      labelFill: '#d1d5db',
    },
    y: {
      grid: true,
      gridStroke: '#fff',
      gridLineWidth: 2,
      labelFill: '#d1d5db',
    },
  },
});

chart.render();
```

### Coordinating with Container Background Color

If your webpage or application uses a dark theme, it's recommended to ensure the chart's background color coordinates with the container background color:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Simulate dark container background
const container = document.getElementById('container');
if (container) {
  container.style.backgroundColor = '#111827';
  container.style.padding = '20px';
  container.style.borderRadius = '8px';
}

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  theme: { type: 'classicDark', view: { viewFill: '#111827' } },
  data: [
    { month: 'Jan', sales: 120 },
    { month: 'Feb', sales: 140 },
    { month: 'Mar', sales: 110 },
    { month: 'Apr', sales: 180 },
    { month: 'May', sales: 160 },
    { month: 'Jun', sales: 200 },
  ],
  encode: { x: 'month', y: 'sales' },
  style: {
    fill: 'linear-gradient(to top, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.1))',
    stroke: '#3b82f6',
    lineWidth: 2,
  },
});

chart.render();
```
