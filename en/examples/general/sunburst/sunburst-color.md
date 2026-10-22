---
title: "Sunburst ColorField Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/sunburst/sunburst-color/"
version: "5.4.8"
---

# Sunburst ColorField Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/sunburst/sunburst-color/)

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
  encode: { value: 'sum', color: 'label' },
});

chart.render();
```
