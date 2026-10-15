---
title: "Rose Chart, Label"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/rose/rose-label/"
version: "5.4.8"
---

# Rose Chart, Label

[Live example](https://g2.antv.antgroup.com/en/examples/general/rose/rose-label/)

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
  coordinate: { type: 'polar', outerRadius: 0.85 },
  transform: [{ type: 'groupX', y: 'sum' }],
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
  },
  encode: { x: 'year', color: 'year', y: 'people' },
  scale: { y: { type: 'sqrt' }, x: { padding: 0 } },
  axis: false,
  labels: [
    {
      text: 'people',
      position: 'outside',
      formatter: '~s',
      transform: [{ type: 'overlapDodgeY' }],
    },
  ],
  legend: { color: { length: 400, layout: { justifyContent: 'center' } } },
  animate: { enter: { type: 'waveIn' } },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```
