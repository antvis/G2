---
title: "板子图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/area/area-band/"
version: "5.4.8"
---

# 板子图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/area/area-band/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/band-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperatures3.json',
  },
  scale: { color: { palette: 'reds' } },
  encode: {
    x: (d) => new Date(d.date),
    y: ['low', 'high'],
    color: (d) => d.high - d.low,
    series: () => undefined,
  },
  style: { gradient: 'x' },
  axis: { x: { title: 'date' } },
});

chart.render();
```
