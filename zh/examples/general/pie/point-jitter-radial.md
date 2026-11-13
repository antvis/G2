---
title: "径向扰动散点图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/pie/point-jitter-radial/"
version: "5.4.8"
---

# 径向扰动散点图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/pie/point-jitter-radial/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo:
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  coordinate: { type: 'polar' },
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  transform: [{ type: 'jitter' }],
  encode: { x: 'clarity', color: 'clarity' },
  legend: false,
});

chart.render();
```
