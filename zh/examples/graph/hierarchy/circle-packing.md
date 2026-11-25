---
title: "打包图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/graph/hierarchy/circle-packing/"
version: "5.4.8"
---

# 打包图

[运行示例](https://g2.antv.antgroup.com/zh/examples/graph/hierarchy/circle-packing/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import { interpolateHcl } from 'd3-interpolate';

const chart = new Chart({
  container: 'container',
  width: 1000,
  height: 1000,
});

chart.options({
  type: 'pack',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  },
  layout: {
    padding: 5,
  },
  encode: { value: 'value', color: 'depth' },
  scale: {
    color: {
      domain: [0, 5],
      range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
      interpolate: interpolateHcl,
    },
  },
  legend: false,
  style: {
    labelText: (d) => (d.r >= 10 && d.height === 0 ? `${d.data.name}` : ''),
  },
});

chart.render();
```
