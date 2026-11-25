---
title: "层叠条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-layered/"
version: "5.4.8"
---

# 层叠条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-layered/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_layered_transparent.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    format: 'csv',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.year === 2000,
      },
    ],
  },
  transform: [{ type: 'groupX', y: 'sum' }],
  encode: { x: 'age', y: 'people', color: 'sex' },
  scale: { color: { type: 'ordinal', range: ['#ca8861', '#675193'] } },
  axis: { y: { labelFormatter: '~s' } },
  style: { fillOpacity: 0.7 },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```
