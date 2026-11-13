---
title: "Overlap Hide"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/label/overlaphide/"
version: "5.4.8"
---

# Overlap Hide

[Live example](https://g2.antv.antgroup.com/en/examples/component/label/overlaphide/)

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
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  },
  encode: { x: (d) => new Date(d.date), y: 'close' },
  labels: [
    {
      text: 'close',
      transform: [
        {
          type: 'overlapHide',
        },
      ],
    },
  ],
});

chart.render();
```
