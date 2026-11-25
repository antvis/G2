---
title: "ZoomIn"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/animation/general/zoom-in/"
version: "5.4.8"
---

# ZoomIn

[运行示例](https://g2.antv.antgroup.com/zh/examples/animation/general/zoom-in/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  insetLeft: 30,
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    color: 'continent',
    size: 'Population',
    shape: 'point',
  },
  scale: { size: { range: [4, 65] }, y: { domain: [65, 90] } },
  style: { fillOpacity: 0.3, lineWidth: 1 },
  legend: { size: false },
  animate: { enter: { type: 'zoomIn', duration: 1000 } },
});

chart.render();
```
