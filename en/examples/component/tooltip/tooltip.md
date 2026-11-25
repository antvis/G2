---
title: "Tooltip"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/tooltip/tooltip/"
version: "5.4.8"
---

# Tooltip

[Live example](https://g2.antv.antgroup.com/en/examples/component/tooltip/tooltip/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/bar-chart
 */
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
  encode: { x: 'letter', y: 'frequency' },
  axis: { y: { labelFormatter: '.0%' } },
});

chart.render();
```
