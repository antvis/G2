---
title: "Linear Regression"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/analysis/regression/linear-regression/"
version: "5.4.8"
---

# Linear Regression

[Live example](https://g2.antv.antgroup.com/en/examples/analysis/regression/linear-regression/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://echarts.apache.org/examples/zh/editor.html?c=scatter-linear-regression
 */
import { Chart } from '@antv/g2';
import { regressionLinear } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/linear-regression.json',
  },
  children: [
    {
      type: 'point',
      encode: { x: (d) => d[0], y: (d) => d[1], shape: 'point' },
      scale: { x: { domain: [0, 1] }, y: { domain: [0, 5] } },
      style: { fillOpacity: 0.75 },
    },
    {
      type: 'line',
      data: {
        transform: [
          {
            type: 'custom',
            callback: regressionLinear(),
          },
        ],
      },
      encode: { x: (d) => d[0], y: (d) => d[1] },
      style: { stroke: '#30BF78', lineWidth: 2 },
      labels: [
        {
          text: 'y = 1.7x+3.01',
          selector: 'last',
          position: 'right',
          textAlign: 'end',
          dy: -8,
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
```
