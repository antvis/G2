---
title: "Poisson distribution"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/analysis/bin/poisson/"
version: "5.4.8"
---

# Poisson distribution

[Live example](https://g2.antv.antgroup.com/en/examples/analysis/bin/poisson/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';
import { randomPoisson } from 'd3-random';

const random = randomPoisson(Math.pow(10, 2.6));

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'rect',
  data: new Array(5000).fill(0).map(random),
  encode: { x: (d) => d },
  transform: [{ type: 'binX', y: 'count' }],
  style: { stroke: 'white' },
  tooltip: {
    title: (d, i, data, column) => ({
      value: `${column.x.value[i]} ~ ${column.x1.value[i]}`,
    }),
  },
});

chart.render();
```
