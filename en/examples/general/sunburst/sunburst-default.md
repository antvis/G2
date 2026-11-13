---
title: "Sunburst Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/sunburst/sunburst-default/"
version: "5.4.8"
---

# Sunburst Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/sunburst/sunburst-default/)

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
    value: 'https://gw.alipayobjects.com/os/antfincdn/ryp44nvUYZ/coffee.json',
  },
  animate: { enter: { type: 'waveIn' } },
  coordinate: { type: 'polar', innerRadius: 0 },
});

chart.render();
```
