---
title: "World Map"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/geo/geo/world-map/"
version: "5.4.8"
---

# World Map

[Live example](https://g2.antv.antgroup.com/en/examples/geo/geo/world-map/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/world-map
 */
import { Chart, register } from '@antv/g2';
import { feature } from 'topojson-client';

register('data.feature', ({ name }) => {
  return (data) => feature(data, data.objects[name]).features;
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'geoView',
  coordinate: { type: 'orthographic' },
  children: [
    {
      type: 'geoPath',
      data: { type: 'graticule10' },
      style: { stroke: '#ccc', fill: 'none' },
    },
    {
      type: 'geoPath',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/countries-50m.json',
        transform: [{ type: 'feature', name: 'land' }],
      },
      style: { fill: 'black' },
    },
    {
      type: 'geoPath',
      data: { type: 'sphere' },
      style: { stroke: 'black', fill: 'none' },
    },
  ],
});

chart.render();
```
