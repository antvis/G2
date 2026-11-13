---
title: "WaveIn"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/animation/general/wave-in/"
version: "5.4.8"
---

# WaveIn

[运行示例](https://g2.antv.antgroup.com/zh/examples/animation/general/wave-in/)

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
  coordinate: { type: 'theta' },
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  transform: [{ type: 'stackY' }],
  encode: { color: 'genre', y: 'sold' },
  animate: { enter: { type: 'waveIn', duration: 1000 } },
});

chart.render();
```
