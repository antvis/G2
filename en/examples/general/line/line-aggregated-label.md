---
title: "Aggregated Line Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/line/line-aggregated-label/"
version: "5.4.8"
---

# Aggregated Line Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/line/line-aggregated-label/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/line_overlay.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  },
  transform: [{ type: 'groupX', y: 'mean' }],
  encode: {
    x: (d) => new Date(d.date).getFullYear(),
    y: 'price',
    color: 'symbol',
  },
  labels: [
    {
      text: 'price',
      transform: [{ type: 'overlapDodgeY' }],
      fontSize: 10,
    },
  ],
  tooltip: { items: [{ channel: 'y', valueFormatter: '.1f' }] },
});

chart.render();
```
