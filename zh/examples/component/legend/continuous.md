---
title: "连续图例"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/legend/continuous/"
version: "5.4.8"
---

# 连续图例

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/legend/continuous/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 360,
});

chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  transform: [{ type: 'group', color: 'max' }],
  encode: {
    x: (d) => new Date(d.date).getUTCDate(),
    y: (d) => new Date(d.date).getUTCMonth(),
    color: 'temp_max',
  },
  style: { inset: 0.5 },
  scale: { color: { palette: 'rainbow' } },
  legend: {
    color: {
      position: 'bottom',
      ribbonType: 'size',
      indicator: true,
      title: false,
      tick: false,
      layout: {
        justifyContent: 'center',
      },
    },
  },
});

chart.render();
```
