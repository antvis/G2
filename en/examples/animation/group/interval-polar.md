---
title: "Animation in Polar"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/animation/group/interval-polar/"
version: "5.4.8"
---

# Animation in Polar

[Live example](https://g2.antv.antgroup.com/en/examples/animation/group/interval-polar/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=nightingale_1
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { type: 'polar' },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/deaths.json',
  },
  transform: [
    { type: 'stackY' },
    { type: 'stackEnter', groupBy: ['color', 'x'], duration: 2000 },
  ],
  encode: { x: 'Month', y: 'Death', color: 'Type' },
  scale: {
    y: {
      type: 'sqrt',
    },
  },
  animate: { enter: { type: 'waveIn' } },
  axis: { y: false },
});

chart.render();
```
