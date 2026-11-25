---
title: "Bullet"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/bullet/bullet/"
version: "5.4.8"
---

# Bullet

[Live example](https://g2.antv.antgroup.com/en/examples/general/bullet/bullet/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  {
    title: '满意度',
    ranges: 100,
    measures: 80,
    target: 85,
  },
];

chart.options({
  type: 'view',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: data,
  children: [
    {
      type: 'interval',
      encode: { x: 'title', y: 'ranges', color: '#f0efff' },
      style: { maxWidth: 30 },
      axis: {
        y: {
          grid: true,
          gridLineWidth: 2,
        },
        x: {
          title: false,
        },
      },
    },
    {
      type: 'interval',
      encode: { x: 'title', y: 'measures', color: '#5B8FF9' },
      style: { maxWidth: 20 },
      labels: [
        {
          text: 'measures',
          position: 'right',
          textAlign: 'left',
          dx: 5,
        },
      ],
    },
    {
      type: 'point',
      encode: {
        x: 'title',
        y: 'target',
        shape: 'line',
        color: '#3D76DD',
        size: 8,
      },
      tooltip: {
        title: false,
        items: [{ channel: 'y' }],
      },
    },
  ],
});

chart.render();
```
