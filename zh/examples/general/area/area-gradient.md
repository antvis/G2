---
title: "渐变色面积图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/area/area-gradient/"
version: "5.4.8"
---

# 渐变色面积图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/area/area-gradient/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/area_gradient.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stocks.json',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.symbol === 'GOOG',
      },
    ],
  },
  children: [
    {
      type: 'area',
      encode: { x: (d) => new Date(d.date), y: 'price' },
      style: { fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)' },
    },
    {
      type: 'line',
      encode: { x: (d) => new Date(d.date), y: 'price' },
      style: { stroke: 'darkgreen', lineWidth: 2 },
    },
  ],
});

chart.render();
```
