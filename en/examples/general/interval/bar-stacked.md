---
title: "Stacked Bar Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/interval/bar-stacked/"
version: "5.4.8"
---

# Stacked Bar Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/interval/bar-stacked/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/stacked-bar-chart
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
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [{ type: 'stackY' }, { type: 'sortX', by: 'y', reverse: true }],
  encode: { x: 'state', y: 'population', color: 'age' },
  axis: {
    x: {
      labelSpacing: 4,
      labelTransform: 'rotate(90)',
    },
    y: { labelFormatter: '~s' },
  },
});

chart.render();
```
