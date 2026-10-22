---
title: "极坐标下坐标轴"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/axis/axis-polar/"
version: "5.4.8"
---

# 极坐标下坐标轴

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/axis/axis-polar/)

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
  coordinate: { type: 'polar' },
  scale: {
    x: {
      type: 'linear',
      domain: [5, 10],
      range: [0, 1],
    },
    y: {
      type: 'linear',
      domain: [5, 10],
      range: [1, 0],
    },
  },
  children: [
    {
      type: 'axisX',
      title: 'AxisX',
      tickFilter: (_, i, ticks) => i && i !== ticks.length - 1,
    },
    {
      type: 'axisY',
      title: 'AxisY',
      style: { labelFontSize: 14, gridLineWidth: 10, gridStroke: 'red' },
    },
  ],
});

chart.render();
```
