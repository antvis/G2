---
title: "x 方向坐标轴"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/axis/axis-x/"
version: "5.4.8"
---

# x 方向坐标轴

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/axis/axis-x/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 80,
});

chart.options({
  type: 'axisX',
  scale: {
    x: {
      type: 'linear',
      domain: [5, 10],
      range: [0, 1],
    },
  },
  tickCount: 10,
  title: 'AxisX',
});

chart.render();
```
