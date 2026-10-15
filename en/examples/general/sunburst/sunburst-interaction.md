---
title: "Sunburst Interaction Config Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/sunburst/sunburst-interaction/"
version: "5.4.8"
---

# Sunburst Interaction Config Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/sunburst/sunburst-interaction/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: { value: 'sum' },
  labels: [
    {
      text: 'name',
      transform: [
        {
          type: 'overflowHide',
        },
      ],
    },
  ],
  interaction: {
    drillDown: {
      breadCrumb: {
        rootText: '起始',
        style: {
          fontSize: '18px',
          fill: '#333',
        },
        active: {
          fill: 'red',
        },
      },
      // FixedColor default: true, true -> drillDown update scale, false -> scale keep.
      isFixedColor: false,
    },
  },
  state: {
    active: { zIndex: 2, stroke: 'red' },
    inactive: { zIndex: 1, stroke: '#fff' },
  },
});

chart.render();
```
