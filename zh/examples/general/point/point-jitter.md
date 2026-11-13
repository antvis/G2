---
title: "扰动散点图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/point/point-jitter/"
version: "5.4.8"
---

# 扰动散点图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/point/point-jitter/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/point_offset_random.html
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
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  },
  transform: [{ type: 'sortX', channel: 'x' }, { type: 'jitterX' }],
  encode: {
    y: 'Horsepower',
    x: 'Cylinders',
    shape: 'hollow',
    color: 'Cylinders',
  },
  scale: { x: { type: 'point' }, color: { type: 'ordinal' } },
});

chart.render();
```
