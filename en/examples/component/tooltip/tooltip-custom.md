---
title: "Custom Tooltip"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/tooltip/tooltip-custom/"
version: "5.4.8"
---

# Custom Tooltip

[Live example](https://g2.antv.antgroup.com/en/examples/component/tooltip/tooltip-custom/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  inset: 6,
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: { x: 'Expt', y: 'Speed' },
  tooltip: {
    items: [
      { name: 'min', channel: 'y' },
      { name: 'q1', channel: 'y1' },
      { name: 'q2', channel: 'y2' },
      { name: 'q3', channel: 'y3' },
      { name: 'max', color: 'red', channel: 'y4' },
    ],
  },
});

chart.render();
```
