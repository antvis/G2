---
title: "高亮"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/element/highlight/"
version: "5.4.8"
---

# 高亮

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/element/highlight/)

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
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
  encode: { x: 'letter', y: 'frequency' },
  axis: { y: { labelFormatter: '.0%' } },
  interaction: { elementHighlight: { background: true } },
});

chart.render();
```
