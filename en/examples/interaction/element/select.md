---
title: "Select"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/interaction/element/select/"
version: "5.4.8"
---

# Select

[Live example](https://g2.antv.antgroup.com/en/examples/interaction/element/select/)

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
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
  encode: { x: 'letter', y: 'frequency' },
  axis: { y: { labelFormatter: '.0%' } },
  state: {
    selected: { fill: '#f4bb51' },
    unselected: { opacity: 0.6 },
  },
  interaction: { elementSelect: true },
});

chart.render();
```
