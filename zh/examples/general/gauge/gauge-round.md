---
title: "仪表盘内置 round 形状"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/gauge/gauge-round/"
version: "5.4.8"
---

# 仪表盘内置 round 形状

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/gauge/gauge-round/)

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
  type: 'gauge',
  data: {
    value: {
      target: 159,
      total: 400,
      name: 'score',
      thresholds: [100, 200, 400],
    },
  },
  scale: {
    color: {
      range: ['#F4664A', '#FAAD14', 'green'],
    },
  },
  style: {
    ...{
      arcShape: 'round',
      arcLineWidth: 2,
      arcStroke: '#fff',
    },
    textContent: (target, total) =>
      `得分：${target}\n占比：${(target / total) * 100}%`,
  },
  legend: false,
});

chart.render();
```
