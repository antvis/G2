---
title: "自定义提示"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/tooltip/tooltip-custom/"
version: "5.4.8"
---

# 自定义提示

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/tooltip/tooltip-custom/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  inset: 6,
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: { x: 'Expt', y: 'Speed' },
  tooltip: {
    items: [
      { name: 'min', channel: 'y' },
      { name: 'q1', channel: 'y1' },
      { name: 'q2', channel: 'y2' },
      { name: 'q3', channel: 'y3' },
      { name: 'max', color: 'red', channel: 'y4' },
    ],
  },
});

chart.render();
```
