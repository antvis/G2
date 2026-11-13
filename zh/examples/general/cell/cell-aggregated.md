---
title: "聚合热力图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/cell/cell-aggregated/"
version: "5.4.8"
---

# 聚合热力图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/cell/cell-aggregated/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/rect_heatmap_weather.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 300,
});

chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  transform: [{ type: 'group', color: 'max' }],
  encode: {
    x: (d) => new Date(d.date).getUTCDate(),
    y: (d) => new Date(d.date).getUTCMonth(),
    color: 'temp_max',
  },
  style: { inset: 0.5 },
  scale: { color: { palette: 'gnBu' } },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```
