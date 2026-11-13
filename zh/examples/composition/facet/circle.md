---
title: "圆形分面"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/composition/facet/circle/"
version: "5.4.8"
---

# 圆形分面

[运行示例](https://g2.antv.antgroup.com/zh/examples/composition/facet/circle/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const M = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
];
const N = ['A', 'B', 'C', 'D'];
const data = M.flatMap((month) =>
  N.map((name) => ({
    month,
    name,
    value: Math.random(),
  })),
);

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 480,
});

chart.options({
  type: 'facetCircle',
  data: data,
  encode: { position: 'month' },
  children: [
    { type: 'interval', encode: { x: 'name', y: 'value', color: 'name' } },
  ],
});

chart.render();
```
