---
title: "数据标签超出隐藏"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/label/overflowhide/"
version: "5.4.8"
---

# 数据标签超出隐藏

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/label/overflowhide/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  autoFit: false,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/alphabet.json',
  },
  encode: { x: 'letter', y: 'frequency', color: 'steelblue' },
  axis: { y: { labelFormatter: '.0%' } },
  labels: [
    {
      text: 'frequency',
      position: 'inside',
      formatter: '.0%',
      transform: [{ type: 'overflowHide' }],
    },
  ],
});

chart.render();
```
