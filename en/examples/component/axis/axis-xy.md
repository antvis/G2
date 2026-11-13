---
title: "AxisX and AxisY"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/axis/axis-xy/"
version: "5.4.8"
---

# AxisX and AxisY

[Live example](https://g2.antv.antgroup.com/en/examples/component/axis/axis-xy/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  scale: {
    x: {
      type: 'linear',
      domain: [5, 10],
      range: [0, 1],
    },
    y: {
      type: 'linear',
      domain: [5, 10],
      range: [0, 1],
    },
  },
  children: [
    { type: 'axisX', title: 'AxisX' },
    {
      type: 'axisY',
      title: 'AxisY',
      tickCount: 10,
      style: { labelFontSize: 14, gridLineWidth: 10, gridStroke: 'red' },
    },
  ],
});

chart.render();
```
