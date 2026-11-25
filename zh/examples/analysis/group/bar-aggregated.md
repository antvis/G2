---
title: "聚合条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-aggregated/"
version: "5.4.8"
---

# 聚合条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-aggregated/)

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
  type: 'interval',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  transform: [
    {
      type: 'groupX',
      y: 'max',
    },
  ],
  encode: { x: 'clarity', y: 'price', color: 'clarity' },
  axis: { y: { labelFormatter: '~s' } },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```
