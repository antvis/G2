---
title: "自适应过滤"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/slider/slider-adaptive/"
version: "5.4.8"
---

# 自适应过滤

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/slider/slider-adaptive/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import { randomPoisson } from 'd3-random';

const random = randomPoisson(Math.pow(10, 2.6));
const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'rect',
  data: new Array(5000).fill(0).map(random),
  encode: { x: (d) => d },
  transform: [{ type: 'binX', y: 'count' }],
  style: { stroke: 'white' },
  slider: { x: {} },
  tooltip: {
    title: (d, i, data, column) => ({
      value: `${column.x.value[i]} ~ ${column.x1.value[i]}`,
    }),
  },
});

chart.render();
```
