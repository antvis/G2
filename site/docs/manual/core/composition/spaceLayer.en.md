---
title: spaceLayer
order: 2
---

Does not divide space in any way, multiple views use the same spatial area, commonly used for view layering.

## Getting Started

Draw a common combined bar and pie chart.

<img alt="spaceLayer" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qPbkQb8c6F4AAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const layer = chart.spaceLayer().data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  format: 'csv',
});

// Bar chart
layer
  .interval()
  .attr('paddingLeft', 50)
  .transform({ type: 'sortX', reverse: true, by: 'y' })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'letter');

// Pie chart
layer
  .interval()
  .attr('paddingLeft', 400)
  .attr('paddingBottom', 200)
  .coordinate({ type: 'theta' })
  .transform({ type: 'stackY' })
  .legend(false)
  .encode('y', 'frequency')
  .encode('color', 'letter');

chart.render();
```

For more examples, visit the [Chart Examples](/en/examples) page.

## Options

No additional configuration options.
