---
title: " Title"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/component/title/title/"
version: "5.4.8"
---

# Title

[Live example](https://g2.antv.antgroup.com/en/examples/component/title/title/)

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
  type: 'interval',
  title: {
    title: 'Sold by genre, sorted by sold', // 标题内容
    subtitle: 'It shows the sales volume of genre, sored by sold.', // 副标题内容
  },
  data: [
    { genre: 'Sports', sold: 0 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  style: { minHeight: 50 },
});

chart.render();
```
