---
title: "ScaleInY"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/animation/general/scale-y/"
version: "5.4.8"
---

# ScaleInY

[运行示例](https://g2.antv.antgroup.com/zh/examples/animation/general/scale-y/)

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
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  animate: {
    enter: { type: 'scaleInY', duration: 1000 },
    exit: { type: 'scaleOutY', duration: 2000 },
  },
});

chart.render();
```
