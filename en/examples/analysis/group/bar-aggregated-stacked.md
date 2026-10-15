---
title: "Aggregated Stacked Bar Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/analysis/group/bar-aggregated-stacked/"
version: "5.4.8"
---

# Aggregated Stacked Bar Chart

[Live example](https://g2.antv.antgroup.com/en/examples/analysis/group/bar-aggregated-stacked/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/stacked_bar_weather.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/3ed6f372-5362-4861-a33b-a16a9efbc922.csv',
  },
  transform: [
    { type: 'groupX', y: 'count' },
    { type: 'stackY', reverse: true, orderBy: 'series' },
  ],
  encode: { x: (d) => new Date(d.date).getMonth(), color: 'weather' },
  scale: {
    color: {
      domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
      range: ['#e7ba52', '#c7c7c7', '#aec7e8', '#1f77b4', '#9467bd'],
    },
  },
});

chart.render();
```
