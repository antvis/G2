---
title: "Axis Polar"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/axis/axis-polar/"
version: "5.4.8"
---

# Axis Polar

[Live example](https://g2.antv.antgroup.com/en/examples/component/axis/axis-polar/)

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
  coordinate: { type: 'polar' },
  scale: {
    x: {
      type: 'linear',
      domain: [5, 10],
      range: [0, 1],
    },
    y: {
      type: 'linear',
      domain: [5, 10],
      range: [1, 0],
    },
  },
  children: [
    {
      type: 'axisX',
      title: 'AxisX',
      tickFilter: (_, i, ticks) => i && i !== ticks.length - 1,
    },
    {
      type: 'axisY',
      title: 'AxisY',
      style: { labelFontSize: 14, gridLineWidth: 10, gridStroke: 'red' },
    },
  ],
});

chart.render();
```
