---
title: "Mini pie"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/mini/pie/"
version: "5.4.8"
---

# Mini pie

[Live example](https://g2.antv.antgroup.com/en/examples/general/mini/pie/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 100,
  height: 100,
});

chart.options({
  type: 'interval',
  coordinate: { type: 'theta' },
  interaction: {
    tooltip: {
      render: (e, { title, items }) => items[0].value,
    },
  },
  data: [
    { id: 'c', value: 526 },
    { id: 'sass', value: 220 },
    { id: 'php', value: 325 },
    { id: 'elixir', value: 561 },
    { id: 'rust', value: 54 },
  ],
  transform: [{ type: 'stackY' }],
  encode: { y: 'value', color: 'id' },
  style: { radius: 4, stroke: '#fff', lineWidth: 1 },
  animate: { enter: { type: 'waveIn' } },
  axis: false,
  legend: false,
});

chart.render();
```
