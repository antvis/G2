---
title: "Transposed Beeswarm"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/beeswarm/transpose/"
version: "5.4.8"
---

# Transposed Beeswarm

[Live example](https://g2.antv.antgroup.com/en/examples/general/beeswarm/transpose/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = Array.from({ length: 500 }, (_, i) => {
  return {
    x: `G${(i % 6) + 1}`,
    y: 20 + Math.random() * 220,
  };
});

chart.options({
  type: 'beeswarm',
  data,
  encode: {
    x: 'x',
    y: 'y',
    size: 'y',
    color: 'x',
  },
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  scale: {
    y: {
      nice: true,
      domainMin: 0,
    },
    size: { range: [2, 6] },
  },
  legend: {
    size: false,
  },
  axis: {
    x: { title: false },
    y: { title: false },
  },
});

chart.render();
```
