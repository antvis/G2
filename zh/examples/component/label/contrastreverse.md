---
title: "数据标签颜色反转"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/label/contrastreverse/"
version: "5.4.8"
---

# 数据标签颜色反转

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/label/contrastreverse/)

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
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/alphabet.json',
  },
  encode: { x: 'letter', y: 'frequency', color: 'letter' },
  labels: [
    {
      text: 'frequency',
      position: 'inside',
      formatter: '.0%',
      fill: '#000',
      transform: [
        {
          type: 'contrastReverse',
          threshold: 21,
          palette: ['#000', '#fff'], // Use full color string to avoid screenshot error.
        },
      ],
    },
  ],
});

chart.render();
```
