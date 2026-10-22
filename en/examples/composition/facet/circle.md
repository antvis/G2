---
title: "Facet Circle"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/composition/facet/circle/"
version: "5.4.8"
---

# Facet Circle

[Live example](https://g2.antv.antgroup.com/en/examples/composition/facet/circle/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const M = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
];
const N = ['A', 'B', 'C', 'D'];
const data = M.flatMap((month) =>
  N.map((name) => ({
    month,
    name,
    value: Math.random(),
  })),
);

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 480,
});

chart.options({
  type: 'facetCircle',
  data: data,
  encode: { position: 'month' },
  children: [
    { type: 'interval', encode: { x: 'name', y: 'value', color: 'name' } },
  ],
});

chart.render();
```
