---
title: "小提琴图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/violin/violin/"
version: "5.4.8"
---

# 小提琴图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/violin/violin/)

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
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
  },
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'y',
            groupBy: ['x', 'species'],
          },
        ],
      },
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        size: 'size',
      },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        shape: 'violin',
      },
      style: { opacity: 0.5, strokeOpacity: 0.5, point: false },
    },
  ],
});

chart.render();
```
