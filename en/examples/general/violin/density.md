---
title: "Density with KDE"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/violin/density/"
version: "5.4.8"
---

# Density with KDE

[Live example](https://g2.antv.antgroup.com/en/examples/general/violin/density/)

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
  type: 'density',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
    transform: [
      {
        type: 'kde',
        field: 'y',
        groupBy: ['x'],
        size: 20,
      },
    ],
  },
  encode: { x: 'x', y: 'y', color: 'x', size: 'size' },
  tooltip: false,
});

chart.render();
```
