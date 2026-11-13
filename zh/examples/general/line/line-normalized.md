---
title: "归一化折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/line-normalized/"
version: "5.4.8"
---

# 归一化折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/line-normalized/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  insetRight: 10,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  },
  transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
  encode: { x: (d) => new Date(d.Date), y: 'Close', color: 'Symbol' },
  scale: { y: { type: 'log' } },
  axis: { y: { title: '↑ Change in price (%)' } },
  labels: [
    {
      text: 'Symbol',
      selector: 'last',
      fontSize: 10,
    },
  ],
  tooltip: { items: [{ channel: 'y', valueFormatter: '.1f' }] },
});

chart.render();
```
