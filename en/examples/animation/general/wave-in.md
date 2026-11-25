---
title: "WaveIn"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/animation/general/wave-in/"
version: "5.4.8"
---

# WaveIn

[Live example](https://g2.antv.antgroup.com/en/examples/animation/general/wave-in/)

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
  coordinate: { type: 'theta' },
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  transform: [{ type: 'stackY' }],
  encode: { color: 'genre', y: 'sold' },
  animate: { enter: { type: 'waveIn', duration: 1000 } },
});

chart.render();
```
