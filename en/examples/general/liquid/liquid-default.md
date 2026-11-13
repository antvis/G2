---
title: "Liquid Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/liquid/liquid-default/"
version: "5.4.8"
---

# Liquid Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/liquid/liquid-default/)

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
  type: 'liquid',
  data: 0.3,
  style: {
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
});

chart.render();
```
