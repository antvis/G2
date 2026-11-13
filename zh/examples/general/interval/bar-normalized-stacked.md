---
title: "归一化堆叠条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/bar-normalized-stacked/"
version: "5.4.8"
---

# 归一化堆叠条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/bar-normalized-stacked/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 *  A recreation of this demo: https://observablehq.com/@d3/stacked-normalized-horizontal-bar
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 1000,
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true },
    { type: 'normalizeY' },
  ],
  encode: { x: 'state', y: 'population', color: 'age' },
  axis: { y: { labelFormatter: '.0%' } },
  tooltip: { items: [{ channel: 'y0', valueFormatter: '.0%' }] },
});

chart.render();
```
