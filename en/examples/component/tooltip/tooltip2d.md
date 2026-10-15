---
title: "Tooltip 2D"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/tooltip/tooltip2d/"
version: "5.4.8"
---

# Tooltip 2D

[Live example](https://g2.antv.antgroup.com/en/examples/component/tooltip/tooltip2d/)

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
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height', y: 'weight', color: 'gender' },
});

chart.render();
```
