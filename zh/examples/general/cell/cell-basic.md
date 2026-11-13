---
title: "华夫饼图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/cell/cell-basic/"
version: "5.4.8"
---

# 华夫饼图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/cell/cell-basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 640,
});

chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
  },
  scale: { color: { type: 'ordinal' } },
  encode: { x: 'x', y: 'y', color: 'index' },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```
