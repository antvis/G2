---
title: "弦图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/graph/network/chord/"
version: "5.4.8"
---

# 弦图

[运行示例](https://g2.antv.antgroup.com/zh/examples/graph/network/chord/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
  width: 900,
  height: 600,
});

const data = [
  {
    source: '北京',
    target: '天津',
    value: 30,
  },
  {
    source: '北京',
    target: '上海',
    value: 80,
  },
  {
    source: '北京',
    target: '河北',
    value: 46,
  },
  {
    source: '北京',
    target: '辽宁',
    value: 49,
  },
  {
    source: '北京',
    target: '黑龙江',
    value: 69,
  },
  {
    source: '北京',
    target: '吉林',
    value: 19,
  },
  {
    source: '天津',
    target: '河北',
    value: 62,
  },
  {
    source: '天津',
    target: '辽宁',
    value: 82,
  },
  {
    source: '天津',
    target: '上海',
    value: 16,
  },
  {
    source: '上海',
    target: '黑龙江',
    value: 16,
  },
  {
    source: '河北',
    target: '黑龙江',
    value: 76,
  },
  {
    source: '河北',
    target: '内蒙古',
    value: 24,
  },
  {
    source: '内蒙古',
    target: '北京',
    value: 32,
  },
];

chart.options({
  type: 'chord',
  data: {
    value: { links: data },
  },
  layout: {
    nodeWidthRatio: 0.05,
  },
  scale: { color: { range: schemeTableau10 } },
  style: { labelFontSize: 15, linkFillOpacity: 0.6 },
});

chart.render();
```
