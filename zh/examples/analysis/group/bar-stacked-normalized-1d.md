---
title: "一维聚合堆叠条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-stacked-normalized-1d/"
version: "5.4.8"
---

# 一维聚合堆叠条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-stacked-normalized-1d/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of one of these demos: https://observablehq.com/@observablehq/plot-group?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 120,
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  transform: [
    { type: 'groupColor', y: 'count' },
    { type: 'stackY' },
    { type: 'normalizeY' },
  ],
  axis: { y: { labelFormatter: '.0%' } },
  encode: { color: 'sex' },
  labels: [{ text: 'sex', position: 'inside' }],
  tooltip: { items: [{ channel: 'y', valueFormatter: '.0%' }] },
});

chart.render();
```
