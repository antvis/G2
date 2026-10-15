---
title: "Radial Jitter Scatter"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/pie/point-jitter-radial/"
version: "5.4.8"
---

# Radial Jitter Scatter

[Live example](https://g2.antv.antgroup.com/en/examples/general/pie/point-jitter-radial/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo:
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  coordinate: { type: 'polar' },
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  transform: [{ type: 'jitter' }],
  encode: { x: 'clarity', color: 'clarity' },
  legend: false,
});

chart.render();
```
