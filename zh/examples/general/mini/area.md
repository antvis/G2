---
title: "迷你面积图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/mini/area/"
version: "5.4.8"
---

# 迷你面积图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/mini/area/)

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
  type: 'area',
  data: data,
  interaction: {
    tooltip: {
      render: (e, { title, items }) => items[0].value,
    },
  },
  encode: { x: (_, idx) => idx, y: (d) => d, shape: 'smooth' },
  scale: { y: { zero: true } },
  style: {
    fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
    fillOpacity: 0.6,
  },
  animate: { enter: { type: 'fadeIn' } },
  axis: false,
});

chart.render();
```
