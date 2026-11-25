---
title: " 柱线混合"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/dual/line-bar/"
version: "5.4.8"
---

# 柱线混合

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/dual/line-bar/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const data = [
  { time: '10:10', call: 4, waiting: 2, people: 2 },
  { time: '10:15', call: 2, waiting: 6, people: 3 },
  { time: '10:20', call: 13, waiting: 2, people: 5 },
  { time: '10:25', call: 9, waiting: 9, people: 1 },
  { time: '10:30', call: 5, waiting: 2, people: 3 },
  { time: '10:35', call: 8, waiting: 2, people: 1 },
  { time: '10:40', call: 13, waiting: 1, people: 2 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: data,
  children: [
    {
      type: 'interval',
      encode: { x: 'time', y: 'waiting' },
      axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
    },
    {
      type: 'line',
      encode: { x: 'time', y: 'people', shape: 'smooth' },
      style: { stroke: '#fdae6b', lineWidth: 2 },
      scale: { y: { independent: true } },
      axis: {
        y: {
          position: 'right',
          grid: null,
          title: 'People',
          titleFill: '#fdae6b',
        },
      },
    },
  ],
});

chart.render();
```
