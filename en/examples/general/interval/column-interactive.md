---
title: "Interactive Column Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/interval/column-interactive/"
version: "5.4.8"
---

# Interactive Column Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/interval/column-interactive/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/bar-chart
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
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  axis: { y: { labelFormatter: '.0%' } },
  state: {
    selected: { fill: '#1783FF', stroke: 'black', strokeWidth: 1 },
    unselected: { fill: '#ccc' },
  },
  interaction: {
    // 开启元素选中交互
    elementSelect: true,
  },
});

chart.render();
```
