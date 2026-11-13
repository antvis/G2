---
title: "Mini area"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/mini/area/"
version: "5.4.8"
---

# Mini area

[Live example](https://g2.antv.antgroup.com/en/examples/general/mini/area/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const data = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
  546, 983, 340, 539, 243, 226, 192,
];

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 80,
});

chart.options({
  type: 'area',
  data: data,
  interaction: {
    tooltip: {
      render: (e, { title, items }) => items[0].value,
    },
  },
  encode: { x: (_, idx) => idx, y: (d) => d, shape: 'smooth' },
  scale: { y: { zero: true } },
  style: {
    fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
    fillOpacity: 0.6,
  },
  animate: { enter: { type: 'fadeIn' } },
  axis: false,
});

chart.render();
```
