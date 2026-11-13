---
title: "AxisX"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/axis/axis-x/"
version: "5.4.8"
---

# AxisX

[Live example](https://g2.antv.antgroup.com/en/examples/component/axis/axis-x/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 80,
});

chart.options({
  type: 'axisX',
  scale: {
    x: {
      type: 'linear',
      domain: [5, 10],
      range: [0, 1],
    },
  },
  tickCount: 10,
  title: 'AxisX',
});

chart.render();
```
