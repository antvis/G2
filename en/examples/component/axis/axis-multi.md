---
title: "Multi Axis"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/axis/axis-multi/"
version: "5.4.8"
---

# Multi Axis

[Live example](https://g2.antv.antgroup.com/en/examples/component/axis/axis-multi/)

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
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
      },
      encode: { x: 'letter', y: 'frequency' },
      axis: { y: { labelFormatter: '.0%' } },
    },
    {
      type: 'axisY',
      position: 'right',
      scale: {
        y: {
          type: 'linear',
          independent: true,
          domain: [0, 10],
          range: [1, 0],
        },
      },
      style: { grid: false },
    },
  ],
});

chart.render();
```
