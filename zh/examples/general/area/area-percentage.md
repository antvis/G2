---
title: "百分比堆叠面积图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/area/area-percentage/"
version: "5.4.8"
---

# 百分比堆叠面积图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/area/area-percentage/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const data = [
  { country: 'Asia', year: '1750', value: 502 },
  { country: 'Asia', year: '1800', value: 635 },
  { country: 'Asia', year: '1850', value: 809 },
  { country: 'Asia', year: '1900', value: 947 },
  { country: 'Asia', year: '1950', value: 1402 },
  { country: 'Asia', year: '1999', value: 3634 },
  { country: 'Asia', year: '2050', value: 5268 },
  { country: 'Africa', year: '1750', value: 106 },
  { country: 'Africa', year: '1800', value: 107 },
  { country: 'Africa', year: '1850', value: 111 },
  { country: 'Africa', year: '1900', value: 133 },
  { country: 'Africa', year: '1950', value: 221 },
  { country: 'Africa', year: '1999', value: 767 },
  { country: 'Africa', year: '2050', value: 1766 },
  { country: 'Europe', year: '1750', value: 163 },
  { country: 'Europe', year: '1800', value: 203 },
  { country: 'Europe', year: '1850', value: 276 },
  { country: 'Europe', year: '1900', value: 408 },
  { country: 'Europe', year: '1950', value: 547 },
  { country: 'Europe', year: '1999', value: 729 },
  { country: 'Europe', year: '2050', value: 628 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: data,
  transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
  encode: { x: 'year', y: 'value', color: 'country' },
  axis: { x: { title: false }, y: { title: false, labelFormatter: '.0%' } },
  children: [
    {
      type: 'area',
      tooltip: { items: [{ channel: 'y0', valueFormatter: '.0%' }] },
      style: { fillOpacity: 0.3 },
    },
    { type: 'line', tooltip: false },
  ],
});

chart.render();
```
