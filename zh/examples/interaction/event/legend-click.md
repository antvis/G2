---
title: "图例点击"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/event/legend-click/"
version: "5.4.8"
---

# 图例点击

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/event/legend-click/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { type: 'theta', outerRadius: 0.8 },
  data: data,
  transform: [{ type: 'stackY' }],
  encode: { y: 'percent', color: 'item' },
  labels: [
    {
      position: 'outside',
      text: (data) => `${data.item}: ${data.percent * 100}%`,
    },
  ],
  tooltip: {
    items: [
      (data) => ({
        name: data.item,
        value: `${data.percent * 100}%`,
      }),
    ],
  },
});

chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  // https://github.com/antvis/G2/blob/v5/src/interaction/legendFilter.ts
  const items = document.getElementsByClassName('items-item');
  const datum = items.map((item) => item.__data__);
  items.forEach((item, index) => {
    item.addEventListener('click', (ev) => {
      console.log(datum[index]);
    });
  });
  // 简单点击事件
  // document
  //   .getElementsByClassName('legend-category')[0]
  //   .addEventListener('click', (ev) => {
  //     console.log('click legend');
  //   });
});

chart.render();
```
