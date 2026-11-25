---
title: "Column with maxWidth"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/interval/column-maxwidth/"
version: "5.4.8"
---

# Column with maxWidth

[Live example](https://g2.antv.antgroup.com/en/examples/general/interval/column-maxwidth/)

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
  data: [{ letter: 'A', frequency: 120 }],
  encode: { x: 'letter', y: 'frequency' },
  scale: { x: { padding: 0.5 } },
  style: {
    // minWidth: 500,
    maxWidth: 200,
  },
});

chart.render();
```
