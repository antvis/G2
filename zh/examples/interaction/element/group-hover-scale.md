---
title: "分组柱状图元素放大"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/element/group-hover-scale/"
version: "5.4.8"
---

# 分组柱状图元素放大

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/element/group-hover-scale/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { year: '2018', type: 'A', value: 100 },
  { year: '2018', type: 'B', value: 80 },
  { year: '2019', type: 'A', value: 120 },
  { year: '2019', type: 'B', value: 90 },
  { year: '2020', type: 'A', value: 140 },
  { year: '2020', type: 'B', value: 110 },
  { year: '2021', type: 'A', value: 160 },
  { year: '2021', type: 'B', value: 130 },
];

chart.options({
  type: 'interval',
  height: 300,
  data,
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  interaction: {
    elementHoverScale: {
      scale: 1.08,
      createGroup: (view) => (d) => d.type,
    },
  },
});

chart.render();
```
