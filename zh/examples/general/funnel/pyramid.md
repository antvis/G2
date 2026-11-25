---
title: "金字塔图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/funnel/pyramid/"
version: "5.4.8"
---

# 金字塔图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/funnel/pyramid/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const data = [
  { action: '浏览网站', pv: 50000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8000 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingRight: 80,
});

chart.options({
  type: 'interval',
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'custom',
        callback: (data) =>
          data.map((d) => ({ ...d, rate: d.pv / data[0].pv })),
      },
    ],
  },
  encode: { x: 'action', y: 'pv', color: 'action', shape: 'pyramid' },
  transform: [{ type: 'symmetryY' }],
  scale: { x: { padding: 0 } },
  animate: { enter: { type: 'fadeIn' } },
  labels: [
    {
      text: (d) => `${d.action} ${d.pv}`,
      textAlign: 'left',
    },
    {
      text: (d) => `${(d.rate * 100).toFixed(1)}%`,
      position: 'inside',
      transform: [{ type: 'contrastReverse' }],
    },
  ],
  legend: { color: { position: 'bottom' } },
  axis: false,
});

chart.render();
```
