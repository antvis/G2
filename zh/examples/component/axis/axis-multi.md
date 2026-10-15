---
title: "多坐标轴"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/axis/axis-multi/"
version: "5.4.8"
---

# 多坐标轴

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/axis/axis-multi/)

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
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
      },
      encode: { x: 'letter', y: 'frequency' },
      axis: { y: { labelFormatter: '.0%' } },
    },
    {
      type: 'axisY',
      position: 'right',
      scale: {
        y: {
          type: 'linear',
          independent: true,
          domain: [0, 10],
          range: [1, 0],
        },
      },
      style: { grid: false },
    },
  ],
});

chart.render();
```
