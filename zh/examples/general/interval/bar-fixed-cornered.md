---
title: "固定宽度圆角条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/bar-fixed-cornered/"
version: "5.4.8"
---

# 固定宽度圆角条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/bar-fixed-cornered/)

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
  data: [
    { name: 'MODIFY', value: 138, washaway: 0.21014492753623193 },
    { name: 'PRERELEASE', value: 109, washaway: 0.5596330275229358 },
    { name: 'RELEASING', value: 48, washaway: 0 },
  ],
  encode: { x: 'name', y: 'value', color: 'name', size: 80 },
  style: {
    radiusTopLeft: 10,
    radiusTopRight: 20,
    radiusBottomRight: 30,
    radiusBottomLeft: 40,
  },
});

chart.render();
```
