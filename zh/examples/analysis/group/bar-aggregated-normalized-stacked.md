---
title: "聚合归一化堆叠条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-aggregated-normalized-stacked/"
version: "5.4.8"
---

# 聚合归一化堆叠条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-aggregated-normalized-stacked/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/stacked_bar_h_normalized_labeled.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.year === 2000,
      },
    ],
  },
  transform: [
    { type: 'groupX', y: 'sum' },
    { type: 'stackY' },
    { type: 'normalizeY' },
  ],
  encode: { x: 'age', y: 'people', color: 'sex' },
  scale: { color: { type: 'ordinal', range: ['#ca8861', '#675193'] } },
  axis: { y: { labelFormatter: '.0%' } },
  labels: [{ text: 'people', position: 'inside', fill: 'white' }],
  tooltip: { items: [{ channel: 'y', valueFormatter: '.0%' }] },
});

chart.render();
```
