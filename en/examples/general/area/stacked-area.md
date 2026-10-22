---
title: "Stacked Area Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/area/stacked-area/"
version: "5.4.8"
---

# Stacked Area Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/area/stacked-area/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  },
  transform: [
    { type: 'stackY' }, // Try to remove this line.
  ],
  encode: {
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
    shape: 'smooth',
  },
});

chart.render();
```
