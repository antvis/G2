---
title: "区间曲线面积图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/area/range-spline-area/"
version: "5.4.8"
---

# 区间曲线面积图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/area/range-spline-area/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://www.anychart.com/zh/products/anychart/gallery/Combined_Charts/Range_Spline-Area,_Spline_and_Marker_Chart.php
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/range-spline-area.json',
    transform: [
      {
        type: 'map',
        callback: ([x, low, high, v2, v3]) => ({ x, low, high, v2, v3 }),
      },
    ],
  },
  axis: { y: { title: false } },
  scale: { x: { type: 'linear', tickCount: 10 } },
  children: [
    {
      type: 'area',
      encode: { x: 'x', y: ['low', 'high'], shape: 'smooth' },
      style: { fillOpacity: 0.65, fill: '#64b5f6', lineWidth: 1 },
    },
    {
      type: 'point',
      encode: { x: 'x', y: 'v2', size: 2, shape: 'point' },
      tooltip: { items: ['v2'] },
    },
    {
      type: 'line',
      encode: { x: 'x', y: 'v3', color: '#FF6B3B', shape: 'smooth' },
    },
  ],
});

chart.render();
```
