---
title: "One Dimension Scatterplot"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/point/point-one-dimension/"
version: "5.4.8"
---

# One Dimension Scatterplot

[Live example](https://g2.antv.antgroup.com/en/examples/general/point/point-one-dimension/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 120,
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height' },
});

chart.render();
```
