---
title: "Circle Packing"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/graph/hierarchy/circle-packing/"
version: "5.4.8"
---

# Circle Packing

[Live example](https://g2.antv.antgroup.com/en/examples/graph/hierarchy/circle-packing/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';
import { interpolateHcl } from 'd3-interpolate';

const chart = new Chart({
  container: 'container',
  width: 1000,
  height: 1000,
});

chart.options({
  type: 'pack',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  },
  layout: {
    padding: 5,
  },
  encode: { value: 'value', color: 'depth' },
  scale: {
    color: {
      domain: [0, 5],
      range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
      interpolate: interpolateHcl,
    },
  },
  legend: false,
  style: {
    labelText: (d) => (d.r >= 10 && d.height === 0 ? `${d.data.name}` : ''),
  },
});

chart.render();
```
