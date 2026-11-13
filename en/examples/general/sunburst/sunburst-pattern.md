---
title: "Sunburst Pattern Chart"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/sunburst/sunburst-pattern/"
version: "5.4.8"
---

# Sunburst Pattern Chart

[Live example](https://g2.antv.antgroup.com/en/examples/general/sunburst/sunburst-pattern/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { lines } from '@antv/g-pattern';
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const colors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];

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
    fill: (_, idx) => {
      return {
        image: lines({
          backgroundColor: colors[idx % colors.length],
          backgroundOpacity: 0.65,
          stroke: colors[idx % colors.length],
          lineWidth: 4,
          spacing: 5,
        }),
        repetition: 'repeat',
        transform: 'rotate(30deg)',
      };
    },
  },
});

chart.render();
```
