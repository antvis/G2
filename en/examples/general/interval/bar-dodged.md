---
title: "Dodged Bar Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/interval/bar-dodged/"
version: "5.4.8"
---

# Dodged Bar Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/interval/bar-dodged/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/grouped-bar-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  title: {
    title: 'Population by age and state',
    subtitle: 'It shows the population of U.S. by age and state.',
  },
  interaction: {
    tooltip: { shared: true },
    elementHighlightByColor: { background: true },
  },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  encode: { x: 'state', y: 'population', color: 'age' },
  scale: { y: { nice: true } },
  axis: { y: { labelFormatter: '~s' } },
});

chart.render();
```
