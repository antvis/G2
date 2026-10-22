---
title: "Gradient Scatterplot"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/point/point-sequential/"
version: "5.4.8"
---

# Gradient Scatterplot

[Live example](https://g2.antv.antgroup.com/en/examples/general/point/point-sequential/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@mbostock/global-temperature-trends
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/56b6b137-e04e-4757-8af5-d75bafaef886.csv',
      },
      encode: { x: 'date', y: 'value', color: 'value', shape: 'point' },
      scale: {
        color: {
          palette: 'rdBu',
          offset: (t) => 1 - t,
        },
      },
      style: { stroke: '#000', strokeOpacity: 0.2 },
      tooltip: {
        items: [
          {
            channel: 'x',
            name: 'year',
            valueFormatter: (d) => d.getFullYear(),
          },
          { channel: 'y' },
        ],
      },
    },
    { type: 'lineY', data: [0], style: { stroke: '#000', strokeOpacity: 0.2 } },
  ],
});

chart.render();
```
