---
title: "水平条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/bar/"
version: "5.4.8"
---

# 水平条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/bar/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/horizontal-bar-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    format: 'csv',
  },
  transform: [{ type: 'sortX', reverse: true }],
  encode: { x: 'letter', y: 'frequency' },
  axis: { y: { labelFormatter: '.0%' } },
  labels: [
    {
      text: 'frequency',
      formatter: '.1%',
      textAlign: (d) => (+d.frequency > 0.008 ? 'right' : 'start'),
      fill: (d) => (+d.frequency > 0.008 ? '#fff' : '#000'),
      dx: (d) => (+d.frequency > 0.008 ? -5 : 5),
    },
  ],
});

chart.render();
```
