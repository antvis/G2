---
title: "树图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/graph/hierarchy/tree/"
version: "5.4.8"
---

# 树图

[运行示例](https://g2.antv.antgroup.com/zh/examples/graph/hierarchy/tree/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 1500,
  width: 800,
  insetRight: 80,
  insetLeft: 15,
});

chart.options({
  type: 'tree',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  },
  layout: {
    sortBy: (a, b) => a.value - b.value,
  },
  style: {
    nodeFill: (d) => (d.height === 0 ? '#999' : '#000'),
    linkStroke: '#999',
    labelText: (d) => d.data.name || '-',
    labelFontSize: (d) => (d.height === 0 ? 7 : 12),
    labelTextAlign: (d) => (d.height === 0 ? 'start' : 'end'),
    labelPosition: (d) => (d.height !== 0 ? 'left' : 'right'),
    labelDx: (d) => (d.height === 0 ? 5 : -5),
    labelBackground: true,
    labelBackgroundFill: '#fff',
  },
});

chart.render();
```
