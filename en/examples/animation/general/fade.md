---
title: "FadeIn"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/animation/general/fade/"
version: "5.4.8"
---

# FadeIn

[Live example](https://g2.antv.antgroup.com/en/examples/animation/general/fade/)

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
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  animate: {
    enter: { type: 'fadeIn', duration: 1000 },
    exit: { type: 'fadeOut', duration: 2000 },
  },
});

chart.render();
```
