---
title: "Boxplot"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/box/boxplot/"
version: "5.4.8"
---

# Boxplot

[Live example](https://g2.antv.antgroup.com/en/examples/general/box/boxplot/)

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
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: { x: 'Expt', y: 'Speed' },
  style: { point: false },
});

chart.render();
```
