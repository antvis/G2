---
title: "Basic"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/unit/unit/basic/"
version: "5.4.8"
---

# Basic

[Live example](https://g2.antv.antgroup.com/en/examples/unit/unit/basic/)

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
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic.json',
    transform: [
      {
        type: 'sortBy',
        fields: ['survived'],
      },
      {
        type: 'map',
        callback: ({ survived, ...d }) => ({
          ...d,
          survived: survived + '',
        }),
      },
    ],
  },
  encode: { x: 'pclass' },
  children: [
    {
      type: 'point',
      transform: [{ type: 'pack' }],
      legend: { color: { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') } },
      encode: { color: 'survived', shape: 'point', size: 3 },
      tooltip: {
        title: '',
        items: ['pclass', 'survived'],
      },
    },
  ],
});

chart.render();
```
