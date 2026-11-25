---
title: "grouped Boxplot with Outlier"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/box/grouped-boxplot-outlier/"
version: "5.4.8"
---

# grouped Boxplot with Outlier

[Live example](https://g2.antv.antgroup.com/en/examples/general/box/grouped-boxplot-outlier/)

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
  type: 'boxplot',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'sex',
    series: 'sex',
  },
});

chart.render();
```
