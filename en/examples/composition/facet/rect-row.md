---
title: "Row Facet Rect"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/composition/facet/rect-row/"
version: "5.4.8"
---

# Row Facet Rect

[Live example](https://g2.antv.antgroup.com/en/examples/composition/facet/rect-row/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of one of these demos: https://observablehq.com/@observablehq/plot-facets?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 928,
  height: 320,
  paddingLeft: 60,
  paddingBottom: 60,
});

chart.options({
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  },
  encode: { x: 'series' },
  children: [
    {
      type: 'point',
      inset: 10,
      encode: { x: 'x', y: 'y' },
      style: { stroke: '#000' },
    },
  ],
});

chart.render();
```
