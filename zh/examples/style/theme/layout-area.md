---
title: "视图模型"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/style/theme/layout-area/"
version: "5.4.8"
---

# 视图模型

[运行示例](https://g2.antv.antgroup.com/zh/examples/style/theme/layout-area/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/circle_github_punchcard.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 240,
  marginLeft: 40,
  marginTop: 30,
  marginRight: 20,
  marginBottom: 10,
  inset: 10,
});

chart.options({
  type: 'point',
  viewStyle: {
    viewFill: '#4e79a7',
    plotFill: '#f28e2c',
    mainFill: '#e15759',
    contentFill: '#76b7b2',
  },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/commits.json',
  },
  transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
  axis: {
    x: { title: 'time (hours)', tickCount: 24 },
    y: { title: 'time (day)', grid: true },
  },
  scale: { y: { type: 'point' } },
  encode: {
    x: (d) => new Date(d.time).getUTCHours(),
    y: (d) => new Date(d.time).getUTCDay(),
    size: 'count',
    shape: 'point',
  },
  legend: { size: false },
  style: { shape: 'point', fill: '#59a14f' },
});

chart.render();
```
