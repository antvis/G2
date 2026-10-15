---
title: "系列颜色编码折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/line-series-var-color/"
version: "5.4.8"
---

# 系列颜色编码折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/line-series-var-color/)

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
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'price',
    series: 'symbol',
    color: 'price',
  },
  style: { gradient: 'y', shape: 'smooth', lineWidth: 10 },
});

chart.render();
```
