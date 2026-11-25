---
title: "缺失变宽折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/line-var-size-missing/"
version: "5.4.8"
---

# 缺失变宽折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/line-var-size-missing/)

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
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    transform: [
      { type: 'slice', end: 100 },
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          close1: d.date.getDate() <= 5 ? NaN : d.close,
        }),
      },
    ],
  },
  encode: { x: (d) => new Date(d.date), y: 'close1', size: 'close' },
  style: { shape: 'trail' },
});

chart.render();
```
