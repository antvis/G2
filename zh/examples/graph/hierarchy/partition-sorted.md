---
title: "火焰图（排序）"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/graph/hierarchy/partition-sorted/"
version: "5.4.8"
---

# 火焰图（排序）

[运行示例](https://g2.antv.antgroup.com/zh/examples/graph/hierarchy/partition-sorted/)

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
  type: 'partition',
  data: {
    type: 'fetch',
    value:
      'https://raw.githubusercontent.com/antvis/G2/refs/heads/v5/__tests__/data/partition.json',
  },
  encode: { value: 'value', color: 'name' },
  layout: {
    sort: (a, b) => b.value - a.value,
  },
  scale: {
    color: {
      range: [
        'rgb(236, 160, 57)',
        'rgb(196, 68, 57)',
        'rgb(211, 180, 60)',
        'rgb(230, 67, 63)',
      ],
    },
  },
  labels: [
    {
      text: 'name',
      position: 'left',
      dx: 8,
      transform: [
        {
          type: 'overflowHide',
        },
      ],
    },
  ],
  style: {
    inset: 0.5,
  },
  axis: {
    x: {
      title: 'Time/Order',
    },
  },
});

chart.render();
```
