---
title: "Click Series Tooltip"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/tooltip/tooltip-click-line/"
version: "5.4.8"
---

# Click Series Tooltip

[Live example](https://g2.antv.antgroup.com/en/examples/component/tooltip/tooltip-click-line/)

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
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  axis: { y: { labelFormatter: '.0%' } },
  interaction: {
    tooltip: {
      disableNative: true, // Disable pointerover and pointerout events.
      bounding: {
        x: -Infinity,
        y: -Infinity,
        width: Infinity,
        height: Infinity,
      },
      mount: 'body',
    },
  },
});

chart.on('plot:click', ({ offsetX, target }) => {
  chart.emit('tooltip:show', { offsetX, offsetY: 20, target });
});

chart.render();
```
