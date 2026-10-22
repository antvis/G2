---
title: "玉珏图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/radial/bar-radial/"
version: "5.4.8"
---

# 玉珏图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/radial/bar-radial/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { type: 'radial', innerRadius: 0.1, endAngle: Math.PI },
  data: [
    { question: '问题 1', percent: 0.21 },
    { question: '问题 2', percent: 0.4 },
    { question: '问题 3', percent: 0.49 },
    { question: '问题 4', percent: 0.52 },
    { question: '问题 5', percent: 0.53 },
    { question: '问题 6', percent: 0.84 },
    { question: '问题 7', percent: 1.0 },
    { question: '问题 8', percent: 1.2 },
  ],
  encode: { x: 'question', y: 'percent', color: 'percent' },
  style: { stroke: 'white' },
  scale: {
    color: {
      range: '#BAE7FF-#1890FF-#0050B3',
    },
  },
  axis: { y: { tickFilter: (d, i) => i !== 0 } },
  legend: {
    color: {
      length: 400,
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
  animate: { enter: { type: 'waveIn', duration: 800 } },
});

chart.render();
```
