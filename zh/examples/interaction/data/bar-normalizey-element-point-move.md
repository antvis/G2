---
title: "条形图-百分比堆叠-数形交互"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/data/bar-normalizey-element-point-move/"
version: "5.4.8"
---

# 条形图-百分比堆叠-数形交互

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/data/bar-normalizey-element-point-move/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const data = [
  { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
  { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
  { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
  { name: 'London', 月份: 'May', 月均降雨量: 47 },
  { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
  { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
  { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
  { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
  { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
  { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
  { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
  { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
  { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
  { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: data,
  transform: [
    { type: 'stackY' },
    { type: 'normalizeY' },
    { type: 'sortX', by: 'y', reverse: true },
  ],
  encode: {
    x: '月份',
    y: '月均降雨量',
    color: 'name',
    key: (d) => d['name'] + d['月份'],
  },
  interaction: {
    legendFilter: false,
    elementPointMove: {
      precision: 3,
    },
  },
  coordinate: { transform: [{ type: 'transpose' }] },
});

chart.render();
```
