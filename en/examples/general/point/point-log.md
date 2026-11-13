---
title: "Log Scatterplot"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/point/point-log/"
version: "5.4.8"
---

# Log Scatterplot

[Live example](https://g2.antv.antgroup.com/en/examples/general/point/point-log/)

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
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: { size: { type: 'log', range: [4, 20] } },
  style: { fillOpacity: 0.3, lineWidth: 1 },
  legend: { size: false },
});

chart.render();
```
