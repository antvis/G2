---
title: "link 内置形状"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/link/link-shape/"
version: "5.4.8"
---

# link 内置形状

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/link/link-shape/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@observablehq/plot-link?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { x1: 5, y1: 5, x2: 8, y2: 8, shape: 'link' },
  { x1: 5, y1: 12, x2: 8, y2: 15, shape: 'smooth' },
  { x1: 12, y1: 5, x2: 15, y2: 8, shape: 'vhv' },
  { x1: 12, y1: 12, x2: 15, y2: 15, shape: 'arc' },
];

chart.options({
  type: 'view',
  children: data.map((datum) => ({
    type: 'link',
    data: [datum],
    encode: { x: ['x1', 'x2'], y: ['y1', 'y2'] },
    scale: {
      x: { domainMin: 2, domainMax: 22 },
      y: { domainMin: 4, domainMax: 18 },
    },
    style: {
      arrow: true,
      arrowSize: 10,
      lineWidth: 5,
      stroke: '#1f1aa1',
      shape: datum.shape,
    },
  })),
});

chart.render();
```
