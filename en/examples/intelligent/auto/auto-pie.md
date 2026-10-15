---
title: "Auto Chart - Pie"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/intelligent/auto/auto-pie/"
version: "5.4.8"
---

# Auto Chart - Pie

[Live example](https://g2.antv.antgroup.com/en/examples/intelligent/auto/auto-pie/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * AVA: https://github.com/antvis/AVA
 * g2-extension-ava: https://github.com/antvis/g2-extensions/tree/master/ava
 */
import { Chart } from '@antv/g2';
import { Auto } from '@antv/g2-extension-ava';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: Auto,
  data: [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: 'Other', value: 5 },
  ],
});

chart.render();
```
