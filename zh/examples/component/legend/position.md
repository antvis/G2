---
title: "图例位置"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/legend/position/"
version: "5.4.8"
---

# 图例位置

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/legend/position/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 50 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      // 图例显示位置 可选 top ｜ bottom | right | left
      position: 'top',
      layout: {
        // 主轴对齐方式 可选 flex-start | flex-end | center
        justifyContent: 'flex-start',
        // 交叉轴对齐方式 可选 flex-start | flex-end | center
        alignItems: 'flex-start',
        // 主轴方向 可选 row | column
        flexDirection: 'row',
      },
    },
  },
});

chart.render();
```
