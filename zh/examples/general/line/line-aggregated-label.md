---
title: "聚合折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/line-aggregated-label/"
version: "5.4.8"
---

# 聚合折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/line-aggregated-label/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/line_overlay.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  },
  transform: [{ type: 'groupX', y: 'mean' }],
  encode: {
    x: (d) => new Date(d.date).getFullYear(),
    y: 'price',
    color: 'symbol',
  },
  labels: [
    {
      text: 'price',
      transform: [{ type: 'overlapDodgeY' }],
      fontSize: 10,
    },
  ],
  tooltip: { items: [{ channel: 'y', valueFormatter: '.1f' }] },
});

chart.render();
```
