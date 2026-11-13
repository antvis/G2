---
title: "Heatmap"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/cell/cell-heatmap/"
version: "5.4.8"
---

# Heatmap

[Live example](https://g2.antv.antgroup.com/en/examples/general/cell/cell-heatmap/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@mbostock/the-impact-of-vaccines
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 1300,
  height: 900,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/vaccines.json',
  },
  axis: {
    y: { labelAutoRotate: false },
    x: {
      tickFilter: (d) => d % 10 === 0,
      position: 'top',
    },
  },
  scale: {
    color: {
      palette: 'puRd',
      relations: [
        [(d) => d === null, '#eee'],
        [0, '#fff'],
      ],
    },
  },
  children: [
    {
      type: 'cell',
      encode: { x: 'year', y: 'name', color: 'value' },
      style: { inset: 0.5 },
      tooltip: { title: { channel: 'color', valueFormatter: '.2f' } },
    },
    {
      type: 'lineX',
      data: [1963],
      style: { stroke: 'black' },
      labels: [
        {
          text: '1963',
          position: 'bottom',
          textBaseline: 'top',
          fontSize: 10,
        },
        {
          text: 'Measles vaccine introduced',
          position: 'bottom',
          textBaseline: 'top',
          fontSize: 10,
          fontWeight: 'bold',
          dy: 10,
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
```
