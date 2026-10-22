---
title: "徽章标记的折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/annotation/shape/line-badge/"
version: "5.4.8"
---

# 徽章标记的折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/annotation/shape/line-badge/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  insetTop: 50,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    transform: [
      {
        type: 'fold',
        fields: ['blockchain', 'nlp'],
        key: 'type',
        value: 'value',
      },
    ],
  },
  axis: { x: { labelAutoHide: 'greedy' } },
  children: [
    {
      type: 'line',
      encode: { x: (d) => new Date(d.date), y: 'value', color: 'type' },
    },
    {
      type: 'text',
      data: [new Date('2017-12-17'), 100],
      encode: { shape: 'badge' },
      style: {
        text: '100',
        dy: -1,
        markerSize: 24,
        markerFill: '#6395FA',
        markerFillOpacity: 0.55,
      },
    },
  ],
});

chart.render();
```
