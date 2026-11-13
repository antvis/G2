---
title: "Stacked histogram"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/histogram/histogram-stacked/"
version: "5.4.8"
---

# Stacked histogram

[Live example](https://g2.antv.antgroup.com/en/examples/general/histogram/histogram-stacked/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    chart.options({
      type: 'interval',
      encode: { x: 'depth', y: 'count', color: 'cut' },
      data: data,
      transform: [
        {
          type: 'binX',
          y: 'count',
          thresholds: 25,
        },
      ],
      style: {
        columnWidthRatio: 1,
        inset: 0.5,
      },
    });

    chart.render();
  });
```
