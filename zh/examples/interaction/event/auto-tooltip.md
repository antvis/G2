---
title: "自动提示"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/event/auto-tooltip/"
version: "5.4.8"
---

# 自动提示

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/event/auto-tooltip/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 0 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  style: { minHeight: 50 },
});

chart.on(ChartEvent.AFTER_RENDER, () =>
  chart.emit('tooltip:show', {
    data: {
      data: {
        genre: 'Action',
        sold: 120,
      },
    },
    offsetY: 100,
  }),
);

chart.render();
```
