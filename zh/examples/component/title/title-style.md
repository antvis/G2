---
title: "标题样式"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/title/title-style/"
version: "5.4.8"
---

# 标题样式

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/title/title-style/)

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
    align: 'right',
    title: 'Sold by genre, sorted by sold',
    titleFontSize: 15,
    subtitle: 'It shows the sales volume of genre, sored by sold.',
    subtitleFill: 'red',
    subtitleFontSize: 12,
    subtitleShadowColor: 'yellow',
    subtitleShadowBlur: 5,
    subtitleFontStyle: 'italic',
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
