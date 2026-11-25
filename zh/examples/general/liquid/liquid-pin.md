---
title: "水滴形状水波图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/liquid/liquid-pin/"
version: "5.4.8"
---

# 水滴形状水波图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/liquid/liquid-pin/)

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
  type: 'liquid',
  data: 0.581,
  style: {
    shape: 'pin', // Build-in shapes: rect, circle, pin, diamond, triangle.
    contentFill: '#fff',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
});

chart.render();
```
