---
title: "Step Line Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/line/step/"
version: "5.4.8"
---

# Step Line Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/line/step/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', value: 51 },
  { month: 'Feb', value: 91 },
  { month: 'Mar', value: 34 },
  { month: 'Apr', value: 47 },
  { month: 'May', value: 63 },
  { month: 'June', value: 58 },
  { month: 'July', value: 56 },
  { month: 'Aug', value: 77 },
  { month: 'Sep', value: 99 },
  { month: 'Oct', value: 106 },
  { month: 'Nov', value: 88 },
  { month: 'Dec', value: 56 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: data,
  encode: { x: 'month', y: 'value', shape: 'hv' },
  scale: {
    x: {
      range: [0, 1],
    },
    y: {
      nice: true,
    },
  },
});

chart.render();
```
