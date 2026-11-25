---
title: "Crosshairs"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/tooltip/tooltip-crosshairs/"
version: "5.4.8"
---

# Crosshairs

[Live example](https://g2.antv.antgroup.com/en/examples/component/tooltip/tooltip-crosshairs/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  },
  transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
  encode: { x: (d) => new Date(d.Date), y: 'Close', color: 'Symbol' },
  axis: { y: { title: '↑ Change in price (%)' } },
  interaction: {
    tooltip: {
      crosshairs: true,
      crosshairsXStroke: 'red',
      crosshairsYStroke: 'blue',
    },
  },
  tooltip: {
    title: (d) => new Date(d.Date).toUTCString(),
    items: [
      (d, i, data, column) => ({
        name: 'Close',
        value: column.y.value[i].toFixed(1),
      }),
    ],
  },
  labels: [
    {
      text: 'Symbol',
      selector: 'last',
      fontSize: 10,
    },
  ],
});

chart.render();
```
