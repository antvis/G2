---
title: "斜率图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/line-slope/"
version: "5.4.8"
---

# 斜率图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/line-slope/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/slope-chart
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
      'https://gw.alipayobjects.com/os/bmw-prod/f0bbdcaa-9dbf-4d44-95c1-ac2e26765023.csv',
  },
  encode: { x: 'year', y: 'receipts', series: 'country', color: '#000' },
  scale: { x: { type: 'point', padding: 0.25 } },
  labels: [
    {
      text: (d) => `${d.country} ${d.receipts}`,
      selector: 'first',
      transform: [{ type: 'overlapDodgeY' }],
      fontSize: 10,
      dx: -3,
      textAlign: 'end',
    },
    {
      text: (d) => `${d.receipts} ${d.country}`,
      selector: 'last',
      transform: [{ type: 'overlapDodgeY' }],
      fontSize: 10,
      dx: 3,
    },
  ],
});

chart.render();
```
