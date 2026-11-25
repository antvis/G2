---
title: "Tree"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/graph/hierarchy/tree/"
version: "5.4.8"
---

# Tree

[Live example](https://g2.antv.antgroup.com/en/examples/graph/hierarchy/tree/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

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
