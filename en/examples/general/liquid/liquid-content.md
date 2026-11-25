---
title: "Content Text Liquid Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/liquid/liquid-content/"
version: "5.4.8"
---

# Content Text Liquid Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/liquid/liquid-content/)

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
  data: 0.581,
  style: {
    contentFill: '#000',
    contentText: 'center text',
    contentStroke: '#fff',
    contentLineWidth: 2,
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
});

chart.render();
```
