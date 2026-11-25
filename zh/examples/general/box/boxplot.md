---
title: "无异常点箱线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/box/boxplot/"
version: "5.4.8"
---

# 无异常点箱线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/box/boxplot/)

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
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: { x: 'Expt', y: 'Speed' },
  style: { point: false },
});

chart.render();
```
