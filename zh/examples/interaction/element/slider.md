---
title: "滑动"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/element/slider/"
version: "5.4.8"
---

# 滑动

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/element/slider/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

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
  slider: { y: true, x: true },
});

chart.render();
```
