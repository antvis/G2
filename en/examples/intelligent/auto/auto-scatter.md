---
title: "Auto Chart - Point"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/intelligent/auto/auto-scatter/"
version: "5.4.8"
---

# Auto Chart - Point

[Live example](https://g2.antv.antgroup.com/en/examples/intelligent/auto/auto-scatter/)

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
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
});

chart.render();
```
