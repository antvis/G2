---
title: "Multi-Shape Scatterplot"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/point/point-shape/"
version: "5.4.8"
---

# Multi-Shape Scatterplot

[Live example](https://g2.antv.antgroup.com/en/examples/general/point/point-shape/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/scatterplot-with-shapes
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd73a175-4417-4749-8b88-bc04d955e899.csv',
  },
  encode: { x: 'x', y: 'y', shape: 'category', color: 'category', size: 5 },
  scale: { shape: { range: ['point', 'plus', 'diamond'] } },
});

chart.render();
```
