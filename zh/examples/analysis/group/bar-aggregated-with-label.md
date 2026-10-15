---
title: "带数据标签的聚合条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-aggregated-with-label/"
version: "5.4.8"
---

# 带数据标签的聚合条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-aggregated-with-label/)

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
  encode: { x: 'clarity', y: 'price' },
  axis: { y: { labelFormatter: '~s' } },
  labels: [{ text: (d, i, data, { channel }) => channel.y[i] }],
  style: {
    fill: (d, i, data, { channel }) =>
      channel.y[i] < 11700 ? '#E49361' : '#4787F7',
  },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```
