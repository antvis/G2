---
title: "Aggregated Bar Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/analysis/group/bar-aggregated/"
version: "5.4.8"
---

# Aggregated Bar Chart

[Live example](https://g2.antv.antgroup.com/en/examples/analysis/group/bar-aggregated/)

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
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  transform: [
    {
      type: 'groupX',
      y: 'max',
    },
  ],
  encode: { x: 'clarity', y: 'price', color: 'clarity' },
  axis: { y: { labelFormatter: '~s' } },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```
