---
title: "核密度图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/violin/density/"
version: "5.4.8"
---

# 核密度图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/violin/density/)

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
  type: 'density',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
    transform: [
      {
        type: 'kde',
        field: 'y',
        groupBy: ['x'],
        size: 20,
      },
    ],
  },
  encode: { x: 'x', y: 'y', color: 'x', size: 'size' },
  tooltip: false,
});

chart.render();
```
