---
title: "Round Shape Gauge Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/gauge/gauge-round/"
version: "5.4.8"
---

# Round Shape Gauge Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/gauge/gauge-round/)

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
  type: 'gauge',
  data: {
    value: {
      target: 159,
      total: 400,
      name: 'score',
      thresholds: [100, 200, 400],
    },
  },
  scale: {
    color: {
      range: ['#F4664A', '#FAAD14', 'green'],
    },
  },
  style: {
    ...{
      arcShape: 'round',
      arcLineWidth: 2,
      arcStroke: '#fff',
    },
    textContent: (target, total) =>
      `得分：${target}\n占比：${(target / total) * 100}%`,
  },
  legend: false,
});

chart.render();
```
