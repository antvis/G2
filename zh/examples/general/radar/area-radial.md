---
title: "径向面积图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/radar/area-radial/"
version: "5.4.8"
---

# 径向面积图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/radar/area-radial/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/radial-area-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 954,
  height: 954,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seasonal-weather.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          date: new Date(d.date),
        }),
      },
    ],
  },
  coordinate: { type: 'polar', innerRadius: 0.4 },
  axis: {
    y: {
      zIndex: 1,
      direction: 'center',
      title: null,
      labelFormatter: (d, i, array) =>
        i === array.length - 1 ? `${d}°F` : `${d}`,
      labelStroke: '#fff',
      labelLineWidth: 5,
    },
    x: {
      grid: true,
      position: 'inner',
    },
  },
  scale: { x: { utc: true } },
  children: [
    {
      type: 'area',
      encode: { x: 'date', y: ['minmin', 'maxmax'] },
      style: { fill: 'lightsteelblue', fillOpacity: 0.2 },
    },
    {
      type: 'area',
      encode: { x: 'date', y: ['min', 'max'] },
      style: { fill: 'steelblue', fillOpacity: 0.2 },
    },
    {
      type: 'line',
      encode: { x: 'date', y: 'avg' },
      style: { stroke: 'steelblue', lineWidth: 1.5 },
      tooltip: { items: [{ channel: 'y', valueFormatter: '.1f' }] },
    },
  ],
});

chart.render();
```
