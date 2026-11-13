---
title: "基础折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/base/"
version: "5.4.8"
---

# 基础折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/base/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: data,
  encode: { x: 'year', y: 'value' },
  scale: {
    x: {
      range: [0, 1],
    },
    y: {
      domainMin: 0,
      nice: true,
    },
  },
  children: [
    {
      type: 'line',
      labels: [
        {
          text: 'value',
          style: {
            dx: -10,
            dy: -12,
          },
        },
      ],
    },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
```
