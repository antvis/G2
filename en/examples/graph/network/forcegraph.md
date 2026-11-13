---
title: "forceGraph"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/graph/network/forcegraph/"
version: "5.4.8"
---

# forceGraph

[Live example](https://g2.antv.antgroup.com/en/examples/graph/network/forcegraph/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

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
