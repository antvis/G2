---
title: "Band Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/area/area-band/"
version: "5.4.8"
---

# Band Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/area/area-band/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/band-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperatures3.json',
  },
  scale: { color: { palette: 'reds' } },
  encode: {
    x: (d) => new Date(d.date),
    y: ['low', 'high'],
    color: (d) => d.high - d.low,
    series: () => undefined,
  },
  style: { gradient: 'x' },
  axis: { x: { title: 'date' } },
});

chart.render();
```
