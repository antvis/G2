---
title: "Var Width Bar Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/interval/bar-var-width/"
version: "5.4.8"
---

# Var Width Bar Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/interval/bar-var-width/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 1000,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/90873879-09d7-4842-a493-03fb560267bc.csv',
  },
  encode: { x: 'country', y: 'value', color: 'country', size: 'gdp' },
  scale: { size: { range: [10, 60] } },
  legend: { size: false },
  axis: { y: { labelFormatter: '~s' } },
  tooltip: { items: ['value', 'gdp'] },
});

chart.render();
```
