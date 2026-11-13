---
title: "标题"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/title/title/"
version: "5.4.8"
---

# 标题

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/title/title/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

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
