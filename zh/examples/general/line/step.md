---
title: "阶梯折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/step/"
version: "5.4.8"
---

# 阶梯折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/step/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', value: 51 },
  { month: 'Feb', value: 91 },
  { month: 'Mar', value: 34 },
  { month: 'Apr', value: 47 },
  { month: 'May', value: 63 },
  { month: 'June', value: 58 },
  { month: 'July', value: 56 },
  { month: 'Aug', value: 77 },
  { month: 'Sep', value: 99 },
  { month: 'Oct', value: 106 },
  { month: 'Nov', value: 88 },
  { month: 'Dec', value: 56 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: data,
  encode: { x: 'month', y: 'value', shape: 'hv' },
  scale: {
    x: {
      range: [0, 1],
    },
    y: {
      nice: true,
    },
  },
});

chart.render();
```
