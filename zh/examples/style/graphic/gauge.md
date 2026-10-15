---
title: "配置线性渐变-仪表盘"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/style/graphic/gauge/"
version: "5.4.8"
---

# 配置线性渐变-仪表盘

[运行示例](https://g2.antv.antgroup.com/zh/examples/style/graphic/gauge/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'gauge',
  data: {
    value: { target: 159, total: 400, name: 'score', thresholds: [200, 400] },
  },
  scale: {
    color: { range: ['l(0):0:#37b38e 1:#D9C652', 'l(0):0:#D9C652 1:#f96e3e'] },
  },
  style: {
    textContent: (target, total) => `得分：${target}
占比：${(target / total) * 100}%`,
  },
  legend: false,
});

chart.render();
```
