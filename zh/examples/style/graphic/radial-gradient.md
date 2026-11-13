---
title: "配置环形渐变"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/style/graphic/radial-gradient/"
version: "5.4.8"
---

# 配置环形渐变

[运行示例](https://g2.antv.antgroup.com/zh/examples/style/graphic/radial-gradient/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  height: 350,
  data: [
    { genre: 'Sports', sold: 30 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  style: {
    fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff',
  },
});

chart.render();
```
