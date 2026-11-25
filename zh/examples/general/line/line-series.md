---
title: "系列折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/line-series/"
version: "5.4.8"
---

# 系列折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/line-series/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/multi-line-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  interaction: { tooltip: { filter: (d, i) => i < 10 } },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/728a4bdc-9d0b-49e0-a92f-6320a6cddeed.csv',
  },
  encode: { x: 'date', y: 'unemployment', series: 'division' },
});

chart.render();
```
