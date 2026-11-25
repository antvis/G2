---
title: "十字辅助线"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/tooltip/tooltip-crosshairs/"
version: "5.4.8"
---

# 十字辅助线

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/tooltip/tooltip-crosshairs/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  },
  transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
  encode: { x: (d) => new Date(d.Date), y: 'Close', color: 'Symbol' },
  axis: { y: { title: '↑ Change in price (%)' } },
  interaction: {
    tooltip: {
      crosshairs: true,
      crosshairsXStroke: 'red',
      crosshairsYStroke: 'blue',
    },
  },
  tooltip: {
    title: (d) => new Date(d.Date).toUTCString(),
    items: [
      (d, i, data, column) => ({
        name: 'Close',
        value: column.y.value[i].toFixed(1),
      }),
    ],
  },
  labels: [
    {
      text: 'Symbol',
      selector: 'last',
      fontSize: 10,
    },
  ],
});

chart.render();
```
