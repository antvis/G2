---
title: "Auto Chart - Interval"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/intelligent/auto/auto-interval/"
version: "5.4.8"
---

# Auto Chart - Interval

[Live example](https://g2.antv.antgroup.com/en/examples/intelligent/auto/auto-interval/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * AVA: https://github.com/antvis/AVA
 * g2-extension-ava: https://github.com/antvis/g2-extensions/tree/master/ava
 */
import { Chart } from '@antv/g2';
import { Auto } from '@antv/g2-extension-ava';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: Auto,
  data: [
    { price: 100, type: 'A' },
    { price: 120, type: 'B' },
    { price: 150, type: 'C' },
  ],
});

chart.render();
```
