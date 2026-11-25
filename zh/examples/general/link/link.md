---
title: "箭线"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/link/link/"
version: "5.4.8"
---

# 箭线

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/link/link/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@observablehq/plot-link?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'link',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
  },
  encode: {
    x: ['POP_1980', 'POP_2015'],
    y: ['R90_10_1980', 'R90_10_2015'],
    color: (d) => d.R90_10_2015 - d.R90_10_1980,
  },
  scale: { x: { type: 'log' } },
  style: { arrow: true, arrowSize: 6 },
  axis: {
    x: {
      labelFormatter: '~s',
      labelTransform: 'rotate(90)',
    },
  },
  legend: false,
  tooltip: { title: { channel: 'color', valueFormatter: '.1f' } },
});

chart.render();
```
