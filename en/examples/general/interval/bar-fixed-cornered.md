---
title: "Cornered Fixed Width Bar Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/interval/bar-fixed-cornered/"
version: "5.4.8"
---

# Cornered Fixed Width Bar Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/interval/bar-fixed-cornered/)

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
  data: [
    { name: 'MODIFY', value: 138, washaway: 0.21014492753623193 },
    { name: 'PRERELEASE', value: 109, washaway: 0.5596330275229358 },
    { name: 'RELEASING', value: 48, washaway: 0 },
  ],
  encode: { x: 'name', y: 'value', color: 'name', size: 80 },
  style: {
    radiusTopLeft: 10,
    radiusTopRight: 20,
    radiusBottomRight: 30,
    radiusBottomLeft: 40,
  },
});

chart.render();
```
