---
title: "Slider"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/interaction/element/slider/"
version: "5.4.8"
---

# Slider

[Live example](https://g2.antv.antgroup.com/en/examples/interaction/element/slider/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  slider: { y: true, x: true },
});

chart.render();
```
