---
title: "分组条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/bar-dodged/"
version: "5.4.8"
---

# 分组条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/bar-dodged/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/grouped-bar-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  title: {
    title: 'Population by age and state',
    subtitle: 'It shows the population of U.S. by age and state.',
  },
  interaction: {
    tooltip: { shared: true },
    elementHighlightByColor: { background: true },
  },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  encode: { x: 'state', y: 'population', color: 'age' },
  scale: { y: { nice: true } },
  axis: { y: { labelFormatter: '~s' } },
});

chart.render();
```
