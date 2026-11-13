---
title: "forceGraph with disjoint"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/graph/network/forcegraph-disjoint/"
version: "5.4.8"
---

# forceGraph with disjoint

[Live example](https://g2.antv.antgroup.com/en/examples/graph/network/forcegraph-disjoint/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

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
