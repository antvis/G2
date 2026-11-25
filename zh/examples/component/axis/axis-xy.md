---
title: "x 和 y 方向坐标轴"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/axis/axis-xy/"
version: "5.4.8"
---

# x 和 y 方向坐标轴

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/axis/axis-xy/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  scale: {
    x: {
      type: 'linear',
      domain: [5, 10],
      range: [0, 1],
    },
    y: {
      type: 'linear',
      domain: [5, 10],
      range: [0, 1],
    },
  },
  children: [
    { type: 'axisX', title: 'AxisX' },
    {
      type: 'axisY',
      title: 'AxisY',
      tickCount: 10,
      style: { labelFontSize: 14, gridLineWidth: 10, gridStroke: 'red' },
    },
  ],
});

chart.render();
```
