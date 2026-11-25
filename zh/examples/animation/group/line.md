---
title: "折线图动画"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/animation/group/line/"
version: "5.4.8"
---

# 折线图动画

[运行示例](https://g2.antv.antgroup.com/zh/examples/animation/group/line/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=purchases_1
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
    value: 'https://assets.antv.antgroup.com/g2/doughnut-purchases.json',
  },
  children: [
    {
      type: 'line',
      encode: { x: 'year', y: 'count', color: 'year', shape: 'smooth' },
      scale: { y: { zero: true, nice: true } },
      style: { gradient: 'x', gradientColor: 'start' },
      animate: { enter: { type: 'pathIn', duration: 3000 } },
      axis: { y: { labelFormatter: '~s' } },
    },
    {
      type: 'point',
      transform: [{ type: 'stackEnter' }],
      encode: { x: 'year', y: 'count', color: 'year', shape: 'point' },
      animate: { enter: { duration: 300 } },
    },
    {
      type: 'text',
      transform: [{ type: 'stackEnter' }],
      encode: { x: 'year', y: 'count', text: 'year' },
      animate: { enter: { duration: 300 } },
      style: { lineWidth: 5, stroke: '#fff', textAlign: 'center', dy: -8 },
    },
  ],
});

chart.render();
```
