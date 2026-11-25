---
title: "Waffle"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/cell/cell-basic/"
version: "5.4.8"
---

# Waffle

[Live example](https://g2.antv.antgroup.com/en/examples/general/cell/cell-basic/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 640,
});

chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
  },
  scale: { color: { type: 'ordinal' } },
  encode: { x: 'x', y: 'y', color: 'index' },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```
