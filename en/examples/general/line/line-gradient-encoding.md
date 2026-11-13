---
title: "Gradient Encoding Line Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/line/line-gradient-encoding/"
version: "5.4.8"
---

# Gradient Encoding Line Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/line/line-gradient-encoding/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/gradient-encoding
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
    value: 'https://assets.antv.antgroup.com/g2/temperatures2.json',
  },
  scale: {
    x: { utc: true },
    y: { nice: true },
    color: { palette: 'turbo' },
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'value',
    shape: 'hvh',
    color: 'value',
    series: () => undefined,
  },
  style: { gradient: 'y', lineWidth: 2, lineJoin: 'round' },
  axis: { x: { title: 'date' } },
});

chart.render();
```
