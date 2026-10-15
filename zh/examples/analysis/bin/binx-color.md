---
title: "颜色分类直方图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/bin/binx-color/"
version: "5.4.8"
---

# 颜色分类直方图

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/bin/binx-color/)

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
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  },
  encode: { x: 'weight', color: 'sex' },
  transform: [
    { type: 'binX', y: 'count' },
    { type: 'stackY', orderBy: 'series' },
  ],
  style: { inset: 0.5 },
});

chart.render();
```
