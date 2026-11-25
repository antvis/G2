---
title: "玫瑰图动画"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/animation/group/interval-polar/"
version: "5.4.8"
---

# 玫瑰图动画

[运行示例](https://g2.antv.antgroup.com/zh/examples/animation/group/interval-polar/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=nightingale_1
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { type: 'polar' },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/deaths.json',
  },
  transform: [
    { type: 'stackY' },
    { type: 'stackEnter', groupBy: ['color', 'x'], duration: 2000 },
  ],
  encode: { x: 'Month', y: 'Death', color: 'Type' },
  scale: {
    y: {
      type: 'sqrt',
    },
  },
  animate: { enter: { type: 'waveIn' } },
  axis: { y: false },
});

chart.render();
```
