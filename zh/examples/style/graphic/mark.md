---
title: "配置图形样式"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/style/graphic/mark/"
version: "5.4.8"
---

# 配置图形样式

[运行示例](https://g2.antv.antgroup.com/zh/examples/style/graphic/mark/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 30 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  style: {
    fill: 'skyblue',
    fillOpacity: 0.5,
    stroke: 'black',
    lineWidth: 1,
    lineDash: [4, 5],
    strokeOpacity: 0.7,
    opacity: 0.9,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    cursor: 'pointer',
  },
});

chart.render();
```
