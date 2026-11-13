---
title: "渐变色散点图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/point/point-sequential/"
version: "5.4.8"
---

# 渐变色散点图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/point/point-sequential/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@mbostock/global-temperature-trends
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/56b6b137-e04e-4757-8af5-d75bafaef886.csv',
      },
      encode: { x: 'date', y: 'value', color: 'value', shape: 'point' },
      scale: {
        color: {
          palette: 'rdBu',
          offset: (t) => 1 - t,
        },
      },
      style: { stroke: '#000', strokeOpacity: 0.2 },
      tooltip: {
        items: [
          {
            channel: 'x',
            name: 'year',
            valueFormatter: (d) => d.getFullYear(),
          },
          { channel: 'y' },
        ],
      },
    },
    { type: 'lineY', data: [0], style: { stroke: '#000', strokeOpacity: 0.2 } },
  ],
});

chart.render();
```
