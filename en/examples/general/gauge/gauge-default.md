---
title: "Gauge Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/gauge/gauge-default/"
version: "5.4.8"
---

# Gauge Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/gauge/gauge-default/)

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
  type: 'gauge',
  data: {
    value: {
      target: 120,
      total: 400,
      name: 'score',
    },
  },
  legend: false,
});

chart.render();
```
