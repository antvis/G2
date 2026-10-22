---
title: "气泡图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/point/point-bubble/"
version: "5.4.8"
---

# 气泡图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/point/point-bubble/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/circle_natural_disasters.html
 */

import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2b48887c-56fb-437e-a91c-6f48e80e5a91.csv',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.Entity !== 'All natural disasters',
      },
    ],
  },
  encode: {
    x: 'Year',
    y: 'Entity',
    size: 'Deaths',
    color: 'Entity',
    shape: 'point',
  },
  scale: { size: { rangeMax: 35 } },
  legend: false,
  style: {
    stroke: 'black',
    strokeOpacity: 0.1,
    opacity: 0.8,
    lineWidth: 1,
  },
});

chart.render();
```
