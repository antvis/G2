---
title: "Highlight"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/interaction/element/highlight/"
version: "5.4.8"
---

# Highlight

[Live example](https://g2.antv.antgroup.com/en/examples/interaction/element/highlight/)

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
  interaction: { elementHighlight: { background: true } },
});

chart.render();
```
