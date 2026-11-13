---
title: "颜色编码折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/line-gradient-encoding/"
version: "5.4.8"
---

# 颜色编码折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/line-gradient-encoding/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/gradient-encoding
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
    value: 'https://assets.antv.antgroup.com/g2/temperatures2.json',
  },
  scale: {
    x: { utc: true },
    y: { nice: true },
    color: { palette: 'turbo' },
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'value',
    shape: 'hvh',
    color: 'value',
    series: () => undefined,
  },
  style: { gradient: 'y', lineWidth: 2, lineJoin: 'round' },
  axis: { x: { title: 'date' } },
});

chart.render();
```
