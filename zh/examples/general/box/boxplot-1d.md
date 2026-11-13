---
title: "一维箱线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/box/boxplot-1d/"
version: "5.4.8"
---

# 一维箱线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/box/boxplot-1d/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 120,
  inset: 6,
});

chart.options({
  type: 'boxplot',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
    transform: [{ type: 'filter', callback: (d) => d.Expt === 1 }],
  },
  encode: { y: 'Speed' },
  style: { boxFill: '#aaa', pointStroke: '#000' },
});

chart.render();
```
