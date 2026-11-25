---
title: "共享尺寸定义域"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/unit/unit/share-size/"
version: "5.4.8"
---

# 共享尺寸定义域

[运行示例](https://g2.antv.antgroup.com/zh/examples/unit/unit/share-size/)

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
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic.json',
    transform: [
      {
        type: 'sortBy',
        fields: ['survived'],
      },
      {
        type: 'map',
        callback: ({ survived, ...d }) => ({
          ...d,
          survived: survived + '',
        }),
      },
    ],
  },
  encode: { x: 'pclass' },
  shareSize: true,
  children: [
    {
      type: 'point',
      transform: [{ type: 'pack' }],
      legend: { color: { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') } },
      encode: { color: 'survived', shape: 'point', size: 3 },
      tooltip: {
        title: '',
        items: ['pclass', 'survived'],
      },
    },
  ],
});

chart.render();
```
