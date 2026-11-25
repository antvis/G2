---
title: "矩形树图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/graph/hierarchy/treemap/"
version: "5.4.8"
---

# 矩形树图

[运行示例](https://g2.antv.antgroup.com/zh/examples/graph/hierarchy/treemap/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
  height: 900,
  width: 1100,
});

chart.options({
  type: 'treemap',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare-treemap.json',
  },
  layout: {
    path: (d) => d.name.replace(/\./g, '/'),
    tile: 'treemapBinary',
    paddingInner: 1,
  },
  encode: { value: 'size' },
  scale: { color: { range: schemeTableau10 } },
  style: {
    labelText: (d) =>
      d.data.name
        .split('.')
        .pop()
        .split(/(?=[A-Z][a-z])/g)[0],
    labelFill: '#000',
    labelPosition: 'top-left',
    fillOpacity: 0.5,
  },
});

chart.render();
```
