---
title: "索引图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/other/chart-index/"
version: "5.4.8"
---

# 索引图

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/other/chart-index/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  interaction: {
    chartIndex: {
      ruleStroke: '#aaa',
      labelDx: 5,
      labelTextAlign: 'center',
      labelStroke: '#fff',
      labelLineWidth: 5,
      labelFormatter: (d) => `${d.toLocaleDateString()}`,
    },
    tooltip: false,
  },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  },
  encode: {
    x: (d) => new Date(d.Date),
    y: 'Close',
    color: 'Symbol',
    key: 'Symbol',
    title: (d) => d.Date.toLocaleString(),
  },
  axis: { y: { title: '↑ Change in price (%)', labelAutoRotate: false } },
  scale: { y: { type: 'log' } },
  labels: [
    {
      text: 'Symbol',
      selector: 'last',
      fontSize: 10,
    },
  ],
});

chart.render();
```
