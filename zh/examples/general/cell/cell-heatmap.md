---
title: "热力图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/cell/cell-heatmap/"
version: "5.4.8"
---

# 热力图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/cell/cell-heatmap/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@mbostock/the-impact-of-vaccines
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 1300,
  height: 900,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/vaccines.json',
  },
  axis: {
    y: { labelAutoRotate: false },
    x: {
      tickFilter: (d) => d % 10 === 0,
      position: 'top',
    },
  },
  scale: {
    color: {
      palette: 'puRd',
      relations: [
        [(d) => d === null, '#eee'],
        [0, '#fff'],
      ],
    },
  },
  children: [
    {
      type: 'cell',
      encode: { x: 'year', y: 'name', color: 'value' },
      style: { inset: 0.5 },
      tooltip: { title: { channel: 'color', valueFormatter: '.2f' } },
    },
    {
      type: 'lineX',
      data: [1963],
      style: { stroke: 'black' },
      labels: [
        {
          text: '1963',
          position: 'bottom',
          textBaseline: 'top',
          fontSize: 10,
        },
        {
          text: 'Measles vaccine introduced',
          position: 'bottom',
          textBaseline: 'top',
          fontSize: 10,
          fontWeight: 'bold',
          dy: 10,
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
```
