---
title: "发散条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/bar-diverging/"
version: "5.4.8"
---

# 发散条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/bar-diverging/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_diverging_stack_population_pyramid.html
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
  encode: {
    x: 'age',
    y: (d) => (d.sex === 1 ? -d.people : d.people),
    color: 'sex',
  },
  scale: { color: { type: 'ordinal' }, x: { range: [1, 0] } },
  axis: { y: { labelFormatter: '~s' } },
  legend: {
    color: { labelFormatter: (d) => (d === 1 ? 'Male' : 'Female') },
  },
  tooltip: {
    items: [
      (d) => ({ value: d.people, name: d.sex === 1 ? 'Male' : 'Female' }),
    ],
  },
});

chart.render();
```
