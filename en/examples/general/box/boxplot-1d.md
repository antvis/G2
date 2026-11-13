---
title: "Boxplot 1d"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/box/boxplot-1d/"
version: "5.4.8"
---

# Boxplot 1d

[Live example](https://g2.antv.antgroup.com/en/examples/general/box/boxplot-1d/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 120,
  inset: 6,
});

chart.options({
  type: 'boxplot',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
    transform: [{ type: 'filter', callback: (d) => d.Expt === 1 }],
  },
  encode: { y: 'Speed' },
  style: { boxFill: '#aaa', pointStroke: '#000' },
});

chart.render();
```
