---
title: "柱形图动画"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/animation/group/interval/"
version: "5.4.8"
---

# 柱形图动画

[运行示例](https://g2.antv.antgroup.com/zh/examples/animation/group/interval/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const fruits = [
  { type: 'Apple', year: '2001', value: 260 },
  { type: 'Orange', year: '2001', value: 100 },
  { type: 'Banana', year: '2001', value: 90 },
  { type: 'Apple', year: '2002', value: 210 },
  { type: 'Orange', year: '2002', value: 150 },
  { type: 'Banana', year: '2002', value: 30 },
];

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: fruits,
  transform: [{ type: 'stackEnter', groupBy: 'color' }, { type: 'dodgeX' }],
  encode: { x: 'year', y: 'value', color: 'type' },
  animate: { enter: { duration: 500 } },
});

chart.render();
```
