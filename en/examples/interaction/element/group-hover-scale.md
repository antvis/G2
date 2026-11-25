---
title: "Grouped Column Hover Interaction Scale"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/interaction/element/group-hover-scale/"
version: "5.4.8"
---

# Grouped Column Hover Interaction Scale

[Live example](https://g2.antv.antgroup.com/en/examples/interaction/element/group-hover-scale/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { year: '2018', type: 'A', value: 100 },
  { year: '2018', type: 'B', value: 80 },
  { year: '2019', type: 'A', value: 120 },
  { year: '2019', type: 'B', value: 90 },
  { year: '2020', type: 'A', value: 140 },
  { year: '2020', type: 'B', value: 110 },
  { year: '2021', type: 'A', value: 160 },
  { year: '2021', type: 'B', value: 130 },
];

chart.options({
  type: 'interval',
  height: 300,
  data,
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  interaction: {
    elementHoverScale: {
      scale: 1.08,
      createGroup: (view) => (d) => d.type,
    },
  },
});

chart.render();
```
