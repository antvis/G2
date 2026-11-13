---
title: "Facet Rect"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/composition/facet/rect/"
version: "5.4.8"
---

# Facet Rect

[Live example](https://g2.antv.antgroup.com/en/examples/composition/facet/rect/)

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
  paddingBottom: 60,
  paddingLeft: 60,
  height: 640,
});

chart.options({
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      {
        type: 'map',
        callback: ({
          culmen_depth_mm: depth,
          culmen_length_mm: length,
          ...d
        }) => ({
          ...d,
          culmen_depth_mm: depth === 'NaN' ? NaN : depth,
          culmen_length_mm: length === 'NaN' ? NaN : length,
        }),
      },
    ],
  },
  encode: { x: 'sex', y: 'species' },
  children: [
    {
      type: 'point',
      facet: false,
      frame: false,
      encode: { x: 'culmen_depth_mm', y: 'culmen_length_mm' },
      style: { fill: '#ddd', lineWidth: 0 },
    },
    {
      type: 'point',
      encode: { x: 'culmen_depth_mm', y: 'culmen_length_mm', color: 'island' },
    },
  ],
});

chart.render();
```
