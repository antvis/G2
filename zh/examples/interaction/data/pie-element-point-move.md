---
title: "饼图-数形交互"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/data/pie-element-point-move/"
version: "5.4.8"
---

# 饼图-数形交互

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/data/pie-element-point-move/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { type: 'theta', outerRadius: 0.8 },
  data: data,
  transform: [{ type: 'stackY' }],
  interaction: {
    legendFilter: false,
    elementPointMove: {
      pathLineDash: [2, 4],
      pathStroke: '#fff',
      pathLineWidth: 2,
    },
  },
  encode: { y: 'count', color: 'item', key: 'item' },
  tooltip: {
    items: [
      (data) => ({
        name: data.item,
        value: `${data.percent * 100}%`,
      }),
    ],
  },
});

chart.render();
```
