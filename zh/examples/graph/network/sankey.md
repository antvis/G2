---
title: "桑基图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/graph/network/sankey/"
version: "5.4.8"
---

# 桑基图

[运行示例](https://g2.antv.antgroup.com/zh/examples/graph/network/sankey/)

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

chart.options({
  type: 'sankey',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/energy.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => ({ links: data }),
      },
    ],
  },
  layout: {
    nodeAlign: 'center',
    nodePadding: 0.03,
  },
  scale: { color: { range: schemeTableau10 } },
  style: {
    labelSpacing: 3,
    labelFontWeight: 'bold',
    nodeLineWidth: 1.2,
    linkFillOpacity: 0.4,
  },
});

chart.render();
```
