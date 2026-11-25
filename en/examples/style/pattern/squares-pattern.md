---
title: "Squares Pattern"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/style/pattern/squares-pattern/"
version: "5.4.8"
---

# Squares Pattern

[Live example](https://g2.antv.antgroup.com/en/examples/style/pattern/squares-pattern/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://nivo.rocks/pie/
 */
import { Chart } from '@antv/g2';
import { squares } from '@antv/g-pattern';

const chart = new Chart({
  container: 'container',
  width: 500,
  height: 400,
});

const colors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];

chart.options({
  type: 'interval',
  coordinate: { type: 'theta', innerRadius: 0.25, outerRadius: 0.8 },
  data: [
    { id: 'c', value: 526 },
    { id: 'sass', value: 220 },
    { id: 'php', value: 325 },
    { id: 'elixir', value: 561 },
    { id: 'rust', value: 54 },
  ],
  transform: [{ type: 'stackY' }],
  encode: { y: 'value' },
  labels: [
    {
      text: 'id',
      position: 'outside',
      fontWeight: 'bold',
    },
  ],
  style: {
    radius: 6,
    stroke: '#fff',
    lineWidth: 4,
    fill: (_, idx) => {
      return {
        image: squares({
          fill: colors[idx],
          size: 6,
          padding: 0,
        }),
        repetition: 'repeat',
        transform: 'rotate(30deg)',
      };
    },
  },
  legend: false,
});

chart.render();
```
