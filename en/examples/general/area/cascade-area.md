---
title: "Stacked Area"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/area/cascade-area/"
version: "5.4.8"
---

# Stacked Area

[Live example](https://g2.antv.antgroup.com/en/examples/general/area/cascade-area/)

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
  type: 'view',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json',
  },
  interaction: { tooltip: { filter: (d) => parseInt(d.value) > 0 } },
  children: [
    {
      type: 'area',
      transform: [{ type: 'stackY', orderBy: 'maxIndex', reverse: true }],
      encode: {
        x: (d) => new Date(d.year),
        y: 'revenue',
        series: 'format',
        color: 'group',
        shape: 'smooth',
      },
      axis: { y: { labelFormatter: '~s' } },
      tooltip: { items: [{ channel: 'y', valueFormatter: '.2f' }] },
    },
    {
      type: 'line',
      transform: [
        { type: 'stackY', orderBy: 'maxIndex', reverse: true, y: 'y1' },
      ],
      encode: {
        x: (d) => new Date(d.year),
        y: 'revenue',
        series: 'format',
        shape: 'smooth',

        // For legendFilter.
        color: 'group',
      },
      style: { stroke: 'white' },
      tooltip: false,
    },
  ],
});

chart.render();
```
