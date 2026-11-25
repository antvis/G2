---
title: "Contrast Reverse"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/label/contrastreverse/"
version: "5.4.8"
---

# Contrast Reverse

[Live example](https://g2.antv.antgroup.com/en/examples/component/label/contrastreverse/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/alphabet.json',
  },
  encode: { x: 'letter', y: 'frequency', color: 'letter' },
  labels: [
    {
      text: 'frequency',
      position: 'inside',
      formatter: '.0%',
      fill: '#000',
      transform: [
        {
          type: 'contrastReverse',
          threshold: 21,
          palette: ['#000', '#fff'], // Use full color string to avoid screenshot error.
        },
      ],
    },
  ],
});

chart.render();
```
