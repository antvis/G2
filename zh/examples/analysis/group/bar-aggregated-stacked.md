---
title: "聚合堆叠条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-aggregated-stacked/"
version: "5.4.8"
---

# 聚合堆叠条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/group/bar-aggregated-stacked/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/stacked_bar_weather.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/3ed6f372-5362-4861-a33b-a16a9efbc922.csv',
  },
  transform: [
    { type: 'groupX', y: 'count' },
    { type: 'stackY', reverse: true, orderBy: 'series' },
  ],
  encode: { x: (d) => new Date(d.date).getMonth(), color: 'weather' },
  scale: {
    color: {
      domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
      range: ['#e7ba52', '#c7c7c7', '#aec7e8', '#1f77b4', '#9467bd'],
    },
  },
});

chart.render();
```
