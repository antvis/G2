---
title: "Aggregated Stacked Bar Chart, 1D"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/analysis/group/bar-stacked-normalized-1d/"
version: "5.4.8"
---

# Aggregated Stacked Bar Chart, 1D

[Live example](https://g2.antv.antgroup.com/en/examples/analysis/group/bar-stacked-normalized-1d/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of one of these demos: https://observablehq.com/@observablehq/plot-group?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 120,
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  transform: [
    { type: 'groupColor', y: 'count' },
    { type: 'stackY' },
    { type: 'normalizeY' },
  ],
  axis: { y: { labelFormatter: '.0%' } },
  encode: { color: 'sex' },
  labels: [{ text: 'sex', position: 'inside' }],
  tooltip: { items: [{ channel: 'y', valueFormatter: '.0%' }] },
});

chart.render();
```
