---
title: "Bin Opacity Channel"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/analysis/bin/bin-opacity/"
version: "5.4.8"
---

# Bin Opacity Channel

[Live example](https://g2.antv.antgroup.com/en/examples/analysis/bin/bin-opacity/)

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
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  },
  encode: { x: 'weight', y: 'height', color: 'sex' },
  transform: [{ type: 'bin', opacity: 'count' }],
  legend: { opacity: false },
  style: { inset: 0.5 },
  tooltip: {
    title: { channel: 'opacity' },
    items: [
      (d, i, data, column) => ({
        name: 'weight',
        value: `${column.x.value[i]}, ${column.x1.value[i]}`,
      }),
      (d, i, data, column) => ({
        name: 'height',
        value: `${column.y.value[i]}, ${column.y1.value[i]}`,
      }),
    ],
  },
});

chart.render();
```
