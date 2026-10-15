---
title: "Line with Zero Values"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/line/line-zero-values/"
version: "5.4.8"
---

# Line with Zero Values

[Live example](https://g2.antv.antgroup.com/en/examples/general/line/line-zero-values/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { date: '06-10', count: 0, type: '测试' },
    { date: '06-11', count: 0, type: '测试' },
    { date: '06-12', count: 0, type: '测试' },
    { date: '06-13', count: 0, type: '测试' },
    { date: '06-14', count: 0, type: '测试' },
    { date: '06-15', count: 0, type: '测试' },
    { date: '06-16', count: 0, type: '测试' },
  ],
  encode: { x: 'date', y: 'count' },
  scale: {
    y: {
      domain: [0, 1],
    },
  },
});

chart.render();
```
