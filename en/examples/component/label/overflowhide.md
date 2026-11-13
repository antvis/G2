---
title: "Overflow Hide"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/label/overflowhide/"
version: "5.4.8"
---

# Overflow Hide

[Live example](https://g2.antv.antgroup.com/en/examples/component/label/overflowhide/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  autoFit: false,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/alphabet.json',
  },
  encode: { x: 'letter', y: 'frequency', color: 'steelblue' },
  axis: { y: { labelFormatter: '.0%' } },
  labels: [
    {
      text: 'frequency',
      position: 'inside',
      formatter: '.0%',
      transform: [{ type: 'overflowHide' }],
    },
  ],
});

chart.render();
```
