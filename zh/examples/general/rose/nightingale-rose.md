---
title: "南丁格尔玫瑰图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/rose/nightingale-rose/"
version: "5.4.8"
---

# 南丁格尔玫瑰图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/rose/nightingale-rose/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
const data = [
  { year: '2001', population: 41.8 },
  { year: '2002', population: 38 },
  { year: '2003', population: 33.7 },
  { year: '2004', population: 30.7 },
  { year: '2005', population: 25.8 },
  { year: '2006', population: 31.7 },
  { year: '2007', population: 33 },
  { year: '2008', population: 46 },
  { year: '2009', population: 38.3 },
  { year: '2010', population: 28 },
  { year: '2011', population: 42.5 },
  { year: '2012', population: 30.3 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 720,
  width: 720,
});

chart.options({
  type: 'interval',
  coordinate: { type: 'polar' },
  interaction: { elementHighlight: true },
  data: data,
  encode: { x: 'year', y: 'population' },
  scale: { x: { padding: 0 } },
  style: {
    lineWidth: 1,
    stroke: '#fff',
  },
  axis: false,
  labels: [
    {
      text: 'year',
      fontSize: 16,
      fontWeight: 800,
      position: 'inside',
    },
  ],
  state: {
    active: {
      fill: '#288AFF',
      stroke: 'black',
      lineWidth: 1,
      zIndex: 101,
    },
    inactive: { opacity: 0.5, zIndex: 100 },
  },
});

chart.render();
```
