---
title: "可交互柱形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/column-interactive/"
version: "5.4.8"
---

# 可交互柱形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/column-interactive/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/bar-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  axis: { y: { labelFormatter: '.0%' } },
  state: {
    selected: { fill: '#1783FF', stroke: 'black', strokeWidth: 1 },
    unselected: { fill: '#ccc' },
  },
  interaction: {
    // 开启元素选中交互
    elementSelect: true,
  },
});

chart.render();
```
