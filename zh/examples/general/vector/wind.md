---
title: "风向量场"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/vector/wind/"
version: "5.4.8"
---

# 风向量场

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/vector/wind/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'vector',
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
  axis: { x: { grid: false }, y: { grid: false } },
  legend: false,
  tooltip: { title: { channel: 'color', valueFormatter: '.1f' } },
});

chart.render();
```
