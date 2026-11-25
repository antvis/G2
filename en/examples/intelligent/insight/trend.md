---
title: "Trend"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/intelligent/insight/trend/"
version: "5.4.8"
---

# Trend

[Live example](https://g2.antv.antgroup.com/en/examples/intelligent/insight/trend/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * AVA: https://github.com/antvis/AVA
 * g2-extension-ava: https://github.com/antvis/g2-extensions/tree/master/ava
 */
import { Chart } from '@antv/g2';
import { Trend } from '@antv/g2-extension-ava';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  children: [{ type: 'line' }, { type: Trend }],
});

chart.render();
```
