---
title: "Rose Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/rose/rose/"
version: "5.4.8"
---

# Rose Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/rose/rose/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 720,
  height: 720,
});

chart.options({
  type: 'interval',
  coordinate: { type: 'polar' },
  transform: [{ type: 'groupX', y: 'sum' }],
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
  },
  encode: { x: 'year', y: 'people' },
  scale: { y: { type: 'sqrt' } },
  axis: {
    y: {
      titleSpacing: 28,
      labelFormatter: '~s',
      tickCount: 5,
      tickFilter: (d, i) => i !== 0,
      direction: 'right',
    },
  },
  animate: { enter: { type: 'waveIn' } },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```
