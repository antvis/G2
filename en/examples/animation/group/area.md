---
title: "Area with Animation"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/animation/group/area/"
version: "5.4.8"
---

# Area with Animation

[Live example](https://g2.antv.antgroup.com/en/examples/animation/group/area/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=os_1
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/os.json',
  },
  encode: {
    x: 'Year',
    y: 'Share',
    color: 'OperatingSystem',
    shape: 'smooth',
  },
  transform: [
    { type: 'stackEnter', groupBy: 'color', duration: 5000 },
    { type: 'stackY', orderBy: 'value' },
  ],
  animate: { enter: { type: 'growInX' } },
});

chart.render();
```
