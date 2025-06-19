---
title: transpose
order: 2
---

Transpose is a coordinate system transformation that transforms (x, y) to (y, x), commonly used for converting between bar charts and column charts.

## Getting Started

<img alt="bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4ddPToEry_cAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    format: 'csv',
  })
  .transform({
    type: 'sortX',
    reverse: true,
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'steelblue')
  .axis('y', { labelFormatter: '.0%' })
  .label({
    text: 'frequency',
    formatter: '.1%',
    style: {
      textAnchor: (d) => (+d.frequency > 0.008 ? 'right' : 'start'),
      fill: (d) => (+d.frequency > 0.008 ? '#fff' : '#000'),
      dx: (d) => (+d.frequency > 0.008 ? -5 : 5),
    },
  });

chart.render();
```
