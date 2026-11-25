---
title: "出现顺序堆叠面积图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/area/cascade-area/"
version: "5.4.8"
---

# 出现顺序堆叠面积图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/area/cascade-area/)

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
  type: 'view',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json',
  },
  interaction: { tooltip: { filter: (d) => parseInt(d.value) > 0 } },
  children: [
    {
      type: 'area',
      transform: [{ type: 'stackY', orderBy: 'maxIndex', reverse: true }],
      encode: {
        x: (d) => new Date(d.year),
        y: 'revenue',
        series: 'format',
        color: 'group',
        shape: 'smooth',
      },
      axis: { y: { labelFormatter: '~s' } },
      tooltip: { items: [{ channel: 'y', valueFormatter: '.2f' }] },
    },
    {
      type: 'line',
      transform: [
        { type: 'stackY', orderBy: 'maxIndex', reverse: true, y: 'y1' },
      ],
      encode: {
        x: (d) => new Date(d.year),
        y: 'revenue',
        series: 'format',
        shape: 'smooth',

        // For legendFilter.
        color: 'group',
      },
      style: { stroke: 'white' },
      tooltip: false,
    },
  ],
});

chart.render();
```
