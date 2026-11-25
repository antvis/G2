---
title: "韦恩图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/venn/venn/"
version: "5.4.8"
---

# 韦恩图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/venn/venn/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: http://benfred.github.io/venn.js/examples/intersection_tooltip.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/lastfm.json',
    transform: [
      {
        type: 'venn',
        padding: 8,
        sets: 'sets',
        size: 'size',
        as: ['key', 'path'],
      },
    ],
  },
  encode: { d: 'path', color: 'key' },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
      transform: [{ type: 'contrastReverse' }],
    },
  ],
  style: { opacity: (d) => (d.sets.length > 1 ? 0.001 : 0.5) },
  state: { inactive: { opacity: 0.2 }, active: { opacity: 0.8 } },
  interaction: { elementHighlight: true },
  legend: false,
});

chart.render();
```
