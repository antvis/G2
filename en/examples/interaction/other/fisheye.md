---
title: "Fisheye"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/interaction/other/fisheye/"
version: "5.4.8"
---

# Fisheye

[Live example](https://g2.antv.antgroup.com/en/examples/interaction/other/fisheye/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  interaction: { fisheye: true },
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
  legend: { size: false },
  scale: { size: { type: 'log', range: [4, 20] } },
  style: { fillOpacity: 0.3, lineWidth: 1 },
});

chart.render();
```
