---
title: "Series Variable Color Line Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/line/line-series-var-color/"
version: "5.4.8"
---

# Series Variable Color Line Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/line/line-series-var-color/)

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
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'price',
    series: 'symbol',
    color: 'price',
  },
  style: { gradient: 'y', shape: 'smooth', lineWidth: 10 },
});

chart.render();
```
