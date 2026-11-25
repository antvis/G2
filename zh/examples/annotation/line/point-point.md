---
title: "点标记的散点图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/annotation/line/point-point/"
version: "5.4.8"
---

# 点标记的散点图

[运行示例](https://g2.antv.antgroup.com/zh/examples/annotation/line/point-point/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 180,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({ ...d, body_mass_g: +d.body_mass_g }),
      },
    ],
  },
  children: [
    {
      type: 'point',
      encode: { x: 'body_mass_g', y: 'species' },
      style: { stroke: '#000' },
      tooltip: { items: [{ channel: 'x' }] },
    },
    {
      type: 'link',
      transform: [{ type: 'groupY', x: 'min', x1: 'max' }],
      encode: { x: 'body_mass_g', y: 'species' },
      style: { stroke: '#000' },
      tooltip: false,
    },
    {
      type: 'point',
      transform: [{ type: 'groupY', x: 'median' }],
      encode: { y: 'species', x: 'body_mass_g', shape: 'line', size: 12 },
      style: { stroke: 'red' },
      tooltip: { items: [{ channel: 'x' }] },
    },
  ],
});

chart.render();
```
