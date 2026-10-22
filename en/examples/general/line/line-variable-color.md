---
title: "Variable Color Line Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/line/line-variable-color/"
version: "5.4.8"
---

# Variable Color Line Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/line/line-variable-color/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/variable-color-line
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperatures1.json',
  },
  scale: {
    y: { nice: true },
    color: {
      domain: ['CLR', 'FEW', 'SCT', 'BKN', 'OVC', 'VV '],
      range: [
        'deepskyblue',
        'lightskyblue',
        'lightblue',
        '#aaaaaa',
        '#666666',
        '#666666',
      ],
    },
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'value',
    shape: 'hvh',
    color: 'condition',
    series: () => 'a',
  },
  style: { gradient: 'x', lineWidth: 2 },
  axis: { x: { title: 'date' } },
});

chart.render();
```
