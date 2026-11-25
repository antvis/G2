---
title: "Histogram"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/analysis/bin/binx/"
version: "5.4.8"
---

# Histogram

[Live example](https://g2.antv.antgroup.com/en/examples/analysis/bin/binx/)

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
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment2.json',
  },
  encode: { x: 'rate' },
  transform: [{ type: 'binX', y: 'count' }],
  style: { inset: 0.5 },
});

chart.render();
```
