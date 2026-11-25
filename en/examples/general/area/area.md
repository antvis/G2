---
title: "Area Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/area/area/"
version: "5.4.8"
---

# Area Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/area/area/)

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
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  },
  encode: { x: (d) => new Date(d.date), y: 'close' },
});

chart.render();
```
