---
title: "迷你柱形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/mini/column/"
version: "5.4.8"
---

# 迷你柱形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/mini/column/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const data = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
  546, 983, 340, 539, 243, 226, 192,
];

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 80,
});

chart.options({
  type: 'view',
  data: data,
  interaction: {
    tooltip: {
      render: (e, { title, items }) => items[0].value,
    },
  },
  children: [
    {
      type: 'interval',
      encode: { x: (_, idx) => idx, y: (d) => d },
      axis: false,
    },
    {
      type: 'lineY',
      data: [700],
      style: { arrow: true, stroke: 'red', lineDash: [2, 2] },
      labels: [
        {
          text: 'value = 700',
          position: 'right',
          dx: -10,
          textBaseline: 'bottom',
        },
      ],
    },
  ],
});

chart.render();
```
