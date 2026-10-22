---
title: "图例项样式"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/legend/item-style/"
version: "5.4.8"
---

# 图例项样式

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/legend/item-style/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });
const shapeList = ['bowtie', 'smooth', 'hv', 'rect', 'hollowPoint'];
const data = [
  { genre: 'Sports', sold: 50 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
chart.options({
  type: 'interval',
  data,
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      size: 100,
      itemWidth: 120,
      // itemMarker
      itemMarker: (d, index) => shapeList[index],
      // itemLabel
      itemLabelFill: 'red',
      // itemValue
      itemValueText: (d, index) => data[index]['sold'],
      // itemBackground
      itemBackgroundFill: (d) => d.color,
      itemBackgroundFillOpacity: 0.2,
    },
  },
});

chart.render();
```
