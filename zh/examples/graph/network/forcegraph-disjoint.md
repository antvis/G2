---
title: "离散力导向图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/graph/network/forcegraph-disjoint/"
version: "5.4.8"
---

# 离散力导向图

[运行示例](https://g2.antv.antgroup.com/zh/examples/graph/network/forcegraph-disjoint/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 800,
});

chart.options({
  type: 'forceGraph',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/miserable-disjoint.json',
  },
  layout: {
    joint: false,
  },
  scale: { color: { range: schemeTableau10 } },
});

chart.render();
```
