---
title: "Series Line Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/line/line-series/"
version: "5.4.8"
---

# Series Line Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/line/line-series/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/multi-line-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  interaction: { tooltip: { filter: (d, i) => i < 10 } },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/728a4bdc-9d0b-49e0-a92f-6320a6cddeed.csv',
  },
  encode: { x: 'date', y: 'unemployment', series: 'division' },
});

chart.render();
```
