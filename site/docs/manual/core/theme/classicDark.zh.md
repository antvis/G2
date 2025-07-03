---
title: classicDark
order: 2
---

经典暗黑主题。在使用暗黑主题时，通常需要配置一些额外的视图样式来确保图表在暗色背景下有更好的视觉效果。

### 配置视图背景

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  theme: { type: 'classicDark', view: { viewFill: '#141414' } },
  data: [
    { genre: '运动', sold: 275 },
    { genre: '策略', sold: 115 },
    { genre: '角色扮演', sold: 120 },
    { genre: '动作', sold: 350 },
    { genre: '模拟', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
});

chart.render();
```

### 使用 viewStyle 配置更详细的视图样式

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

### 完整的暗黑主题配置示例

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

### 与容器背景色协调

如果你的网页或应用使用了暗色主题，建议确保图表的背景色与容器背景色协调：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 模拟暗色容器背景
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
