---
title: "堆叠面积图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/area/stacked-area/"
version: "5.4.8"
---

# 堆叠面积图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/area/stacked-area/)

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
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  },
  transform: [
    { type: 'stackY' }, // Try to remove this line.
  ],
  encode: {
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
    shape: 'smooth',
  },
});

chart.render();
```
