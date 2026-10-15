---
title: "多形状散点图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/point/point-shape/"
version: "5.4.8"
---

# 多形状散点图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/point/point-shape/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/scatterplot-with-shapes
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
      'https://gw.alipayobjects.com/os/bmw-prod/bd73a175-4417-4749-8b88-bc04d955e899.csv',
  },
  encode: { x: 'x', y: 'y', shape: 'category', color: 'category', size: 5 },
  scale: { shape: { range: ['point', 'plus', 'diamond'] } },
});

chart.render();
```
