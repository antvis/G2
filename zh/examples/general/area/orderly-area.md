---
title: "彩条图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/area/orderly-area/"
version: "5.4.8"
---

# 彩条图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/area/orderly-area/)

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
  type: 'area',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
  },
  transform: [{ type: 'stackY', orderBy: 'value' }],
  encode: {
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
    shape: 'smooth',
  },
  scale: { x: { utc: true } },
  axis: { x: { title: 'Date' }, y: { labelFormatter: '~s' } },
  legend: { color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 } },
});

chart.render();
```
