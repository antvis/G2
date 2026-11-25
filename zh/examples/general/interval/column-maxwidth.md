---
title: "限制宽度的柱形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/column-maxwidth/"
version: "5.4.8"
---

# 限制宽度的柱形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/column-maxwidth/)

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
  data: [{ letter: 'A', frequency: 120 }],
  encode: { x: 'letter', y: 'frequency' },
  scale: { x: { padding: 0.5 } },
  style: {
    // minWidth: 500,
    maxWidth: 200,
  },
});

chart.render();
```
