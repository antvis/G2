---
title: "Sunburst Style Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/sunburst/sunburst-style/"
version: "5.4.8"
---

# Sunburst Style Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/sunburst/sunburst-style/)

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
  style: {
    radius: 8,
    // 内置透明度 fillOpacity ，根据 0.85 ** depth 层级计算,
    fillOpacity: (v) => v['fillOpacity'],
    fill: (v) => {
      if (v['path'] === '类别 3') return 'red';
      if (v['name'] === '类别 2.1.1') return 'red';
    },
  },
});

chart.render();
```
