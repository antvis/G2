---
title: "鱼眼"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/other/fisheye/"
version: "5.4.8"
---

# 鱼眼

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/other/fisheye/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  interaction: { fisheye: true },
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  legend: { size: false },
  scale: { size: { type: 'log', range: [4, 20] } },
  style: { fillOpacity: 0.3, lineWidth: 1 },
});

chart.render();
```
