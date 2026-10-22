---
title: "数据缺失面积图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/area/missing-data-area/"
version: "5.4.8"
---

# 数据缺失面积图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/area/missing-data-area/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  },
  encode: {
    x: (d) => new Date(d.date),
    // Mock missing data. Set NaN from Jan. to Mar.
    y: (d) => (new Date(d.date).getUTCMonth() <= 3 ? NaN : d.close),
  },
  style: {
    connect: true,
    // 配置connector样式
    connectFill: 'grey',
    connectFillOpacity: 0.15,
    // 配置area样式
    fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    opacity: 0.9,
    stroke: 'yellow',
  },
});

chart.render();
```
