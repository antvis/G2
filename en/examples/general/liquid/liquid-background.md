---
title: "Background Liquid Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/liquid/liquid-background/"
version: "5.4.8"
---

# Background Liquid Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/liquid/liquid-background/)

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
  type: 'liquid',
  data: 0.3,
  style: {
    backgroundFill: 'pink',
  },
});

chart.render();
```
