---
title: "Treemap"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/graph/hierarchy/treemap/"
version: "5.4.8"
---

# Treemap

[Live example](https://g2.antv.antgroup.com/en/examples/graph/hierarchy/treemap/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
  height: 900,
  width: 1100,
});

chart.options({
  type: 'treemap',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare-treemap.json',
  },
  layout: {
    path: (d) => d.name.replace(/\./g, '/'),
    tile: 'treemapBinary',
    paddingInner: 1,
  },
  encode: { value: 'size' },
  scale: { color: { range: schemeTableau10 } },
  style: {
    labelText: (d) =>
      d.data.name
        .split('.')
        .pop()
        .split(/(?=[A-Z][a-z])/g)[0],
    labelFill: '#000',
    labelPosition: 'top-left',
    fillOpacity: 0.5,
  },
});

chart.render();
```
