---
title: "Column with minHeight"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/interval/column-min-height/"
version: "5.4.8"
---

# Column with minHeight

[Live example](https://g2.antv.antgroup.com/en/examples/general/interval/column-min-height/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 0 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  style: { minHeight: 50 },
});

chart.render();
```
