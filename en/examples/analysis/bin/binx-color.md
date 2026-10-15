---
title: "Histogram with Color"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/analysis/bin/binx-color/"
version: "5.4.8"
---

# Histogram with Color

[Live example](https://g2.antv.antgroup.com/en/examples/analysis/bin/binx-color/)

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
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  },
  encode: { x: 'weight', color: 'sex' },
  transform: [
    { type: 'binX', y: 'count' },
    { type: 'stackY', orderBy: 'series' },
  ],
  style: { inset: 0.5 },
});

chart.render();
```
