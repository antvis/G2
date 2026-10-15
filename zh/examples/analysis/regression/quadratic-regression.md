---
title: "二项式回归线"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/regression/quadratic-regression/"
version: "5.4.8"
---

# 二项式回归线

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/regression/quadratic-regression/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@harrystevens/introducing-d3-regression#quadratic
 */
import { Chart } from '@antv/g2';
import { regressionQuad } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const regression = regressionQuad()
  .x((d) => d.x)
  .y((d) => d.y)
  .domain([-4, 4]);

chart.options({
  type: 'view',
  data: [
    { x: -3, y: 7.5 },
    { x: -2, y: 3 },
    { x: -1, y: 0.5 },
    { x: 0, y: 1 },
    { x: 1, y: 3 },
    { x: 2, y: 6 },
    { x: 3, y: 14 },
  ],
  children: [
    {
      type: 'point',
      encode: { x: 'x', y: 'y', shape: 'point' },
      scale: { x: { domain: [-4, 4] }, y: { domain: [-2, 14] } },
      style: { fillOpacity: 0.75 },
      axis: { x: { title: false }, y: { title: false } },
    },
    {
      type: 'line',
      data: {
        transform: [
          {
            type: 'custom',
            callback: regression,
          },
        ],
      },
      encode: { x: (d) => d[0], y: (d) => d[1] },
      style: { stroke: '#30BF78', lineWidth: 2 },
      tooltip: false,
    },
    { type: 'lineX', data: [0] },
    { type: 'lineY', data: [0] },
  ],
});

chart.render();
```
