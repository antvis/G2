---
title: "嵌套"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/unit/unit/nested/"
version: "5.4.8"
---

# 嵌套

[运行示例](https://g2.antv.antgroup.com/zh/examples/unit/unit/nested/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingBottom: 60,
  paddingLeft: 85,
});

chart.options({
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic.json',
    transform: [
      {
        type: 'sortBy',
        fields: ['survived', 'sex'],
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
  encode: { y: 'pclass' },
  shareSize: true,
  children: [
    {
      type: 'facetRect',
      encode: { x: 'survived' },
      axis: {
        y: false,
        x: {
          labelFormatter: (d) => (d === '1' ? 'Yes' : 'No'),
          position: 'bottom',
        },
      },
      shareSize: true,
      children: [
        {
          type: 'facetRect',
          encode: { y: 'sex' },
          shareSize: true,
          axis: { x: false, y: { position: 'left' } },
          children: [
            {
              type: 'point',
              transform: [{ type: 'pack' }],
              legend: {
                color: { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') },
              },
              encode: { color: 'survived', shape: 'point', size: 3 },
              tooltip: {
                title: '',
                items: ['pclass', 'survived', 'sex'],
              },
            },
          ],
        },
      ],
    },
  ],
});

chart.render();
```
