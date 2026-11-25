---
title: "自定义视图边框"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/composition/facet/rect-frame/"
version: "5.4.8"
---

# 自定义视图边框

[运行示例](https://g2.antv.antgroup.com/zh/examples/composition/facet/rect-frame/)

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

      // Hide the default frame.
      frame: false,
      viewStyle: {
        // Customize the plot area to mock a frame.
        plotStroke: 'red',
        plotLineWidth: 2,
        plotOpacity: 0.5,
      },
    },
  ],
});

chart.render();
```
