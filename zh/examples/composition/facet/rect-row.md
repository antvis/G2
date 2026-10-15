---
title: "行矩行分面"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/composition/facet/rect-row/"
version: "5.4.8"
---

# 行矩行分面

[运行示例](https://g2.antv.antgroup.com/zh/examples/composition/facet/rect-row/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of one of these demos: https://observablehq.com/@observablehq/plot-facets?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 928,
  height: 320,
  paddingLeft: 60,
  paddingBottom: 60,
});

chart.options({
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  },
  encode: { x: 'series' },
  children: [
    {
      type: 'point',
      inset: 10,
      encode: { x: 'x', y: 'y' },
      style: { stroke: '#000' },
    },
  ],
});

chart.render();
```
