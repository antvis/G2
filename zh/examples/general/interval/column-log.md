---
title: "对数柱形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/column-log/"
version: "5.4.8"
---

# 对数柱形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/column-log/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const EPSILON = 1e-6;

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: {
    x: 'letter',
    y: 'frequency',
    // Log scale cant' map zero, set a value close to zero.
    y1: EPSILON,
  },
  scale: { y: { type: 'log' } },
  axis: { y: { labelFormatter: (d) => (d === EPSILON ? 0 : d) } },
});

chart.render();
```
