---
title: "迷你进度条"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/mini/progress/"
version: "5.4.8"
---

# 迷你进度条

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/mini/progress/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const progress = 0.7;

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 60,
});

chart.options({
  type: 'view',
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  interaction: { tooltip: false },
  children: [
    {
      type: 'interval',
      data: [1, progress],
      encode: { y: (d) => d, color: (d, idx) => idx },
      scale: {
        y: { domain: [0, 1] },
        color: { range: ['#000000', '#a0ff03'] },
      },
      legend: false,
      axis: false,
    },
    {
      type: 'text',
      style: {
        text: `${progress * 100}%`,
        x: '50%',
        y: '50%',
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'bold',
      },
    },
  ],
});

chart.render();
```
