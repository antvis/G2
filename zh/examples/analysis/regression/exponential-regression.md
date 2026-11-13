---
title: "指数回归线"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/regression/exponential-regression/"
version: "5.4.8"
---

# 指数回归线

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/regression/exponential-regression/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://echarts.apache.org/examples/zh/editor.html?c=scatter-exponential-regression
 */
import { Chart } from '@antv/g2';
import { regressionExp } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/exponential-regression.json',
  },
  children: [
    {
      type: 'point',
      encode: { x: (d) => d[0], y: (d) => d[1], shape: 'point' },
      scale: { x: { domain: [0, 18] }, y: { domain: [0, 100000] } },
      style: { fillOpacity: 0.75 },
      axis: { y: { labelFormatter: '~s' } },
    },
    {
      type: 'line',
      data: {
        transform: [
          {
            type: 'custom',
            callback: regressionExp(),
          },
        ],
      },
      encode: { x: (d) => d[0], y: (d) => d[1], shape: 'smooth' },
      style: { stroke: '#30BF78', lineWidth: 2 },
      labels: [
        {
          text: 'y = 3477.32e^(0.18x)\nThe coefficient of determination, or R^2, is 0.998',
          selector: 'last',
          textAlign: 'end',
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
```
