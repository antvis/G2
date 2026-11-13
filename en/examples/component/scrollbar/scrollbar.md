---
title: "Scrollbar"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/scrollbar/scrollbar/"
version: "5.4.8"
---

# Scrollbar

[Live example](https://g2.antv.antgroup.com/en/examples/component/scrollbar/scrollbar/)

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
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  scrollbar: {
    // 开启 X 轴方向上的滚动条
    x: {},
    y: { value: 0.2 },
  },
});

chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  document
    .querySelector('.g2-scrollbar')
    .addEventListener('valuechange', (evt) => {
      console.info(evt.detail);
    });
});

chart.render();
```
