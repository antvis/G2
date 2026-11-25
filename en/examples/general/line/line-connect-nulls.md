---
title: "Missing Data Line Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/line/line-connect-nulls/"
version: "5.4.8"
---

# Missing Data Line Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/line/line-connect-nulls/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/line-with-missing-data
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    transform: [
      // Mock missing data.
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          close: d.date.getUTCMonth() < 3 ? NaN : d.close,
        }),
      },
    ],
  },
  encode: { x: 'date', y: 'close' },
  style: { connect: true, connectStroke: '#aaa' },
});

chart.render();
```
