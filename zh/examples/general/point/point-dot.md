---
title: "点图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/point/point-dot/"
version: "5.4.8"
---

# 点图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/point/point-dot/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/dot-plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 1200,
});

chart.options({
  type: 'view',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/b6f2ff26-b232-447d-a613-0df5e30104a0.csv',
  },
  interaction: { tooltip: { shared: true } },
  children: [
    {
      type: 'link',
      scale: { y: { labelFormatter: '.0%' } },
      transform: [{ type: 'groupX', y: 'min', y1: 'max' }],
      encode: { x: 'state', y: 'population' },
      style: { stroke: '#000' },
      tooltip: false,
    },
    {
      type: 'point',
      scale: { color: { palette: 'spectral' } },
      encode: { x: 'state', y: 'population', shape: 'point', color: 'age' },
      tooltip: {
        title: 'state',
        items: ['population'],
      },
    },
  ],
});

chart.render();
```
