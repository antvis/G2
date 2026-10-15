---
title: "玫瑰图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/rose/rose/"
version: "5.4.8"
---

# 玫瑰图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/rose/rose/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 720,
  height: 720,
});

chart.options({
  type: 'interval',
  coordinate: { type: 'polar' },
  transform: [{ type: 'groupX', y: 'sum' }],
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
  },
  encode: { x: 'year', y: 'people' },
  scale: { y: { type: 'sqrt' } },
  axis: {
    y: {
      titleSpacing: 28,
      labelFormatter: '~s',
      tickCount: 5,
      tickFilter: (d, i) => i !== 0,
      direction: 'right',
    },
  },
  animate: { enter: { type: 'waveIn' } },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```
