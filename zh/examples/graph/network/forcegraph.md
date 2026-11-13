---
title: "力导向图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/graph/network/forcegraph/"
version: "5.4.8"
---

# 力导向图

[运行示例](https://g2.antv.antgroup.com/zh/examples/graph/network/forcegraph/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'forceGraph',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/miserable.json',
  },
  scale: { color: { range: schemeTableau10 } },
});

chart.render();
```
