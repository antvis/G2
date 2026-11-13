---
title: "带异常点分组箱线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/box/grouped-boxplot-outlier/"
version: "5.4.8"
---

# 带异常点分组箱线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/box/grouped-boxplot-outlier/)

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
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'sex',
    series: 'sex',
  },
});

chart.render();
```
