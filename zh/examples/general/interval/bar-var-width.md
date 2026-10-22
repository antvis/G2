---
title: "可变宽度条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/bar-var-width/"
version: "5.4.8"
---

# 可变宽度条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/bar-var-width/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 1000,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/90873879-09d7-4842-a493-03fb560267bc.csv',
  },
  encode: { x: 'country', y: 'value', color: 'country', size: 'gdp' },
  scale: { size: { range: [10, 60] } },
  legend: { size: false },
  axis: { y: { labelFormatter: '~s' } },
  tooltip: { items: ['value', 'gdp'] },
});

chart.render();
```
