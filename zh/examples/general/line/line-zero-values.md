---
title: "零值折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/line-zero-values/"
version: "5.4.8"
---

# 零值折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/line-zero-values/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { date: '06-10', count: 0, type: '测试' },
    { date: '06-11', count: 0, type: '测试' },
    { date: '06-12', count: 0, type: '测试' },
    { date: '06-13', count: 0, type: '测试' },
    { date: '06-14', count: 0, type: '测试' },
    { date: '06-15', count: 0, type: '测试' },
    { date: '06-16', count: 0, type: '测试' },
  ],
  encode: { x: 'date', y: 'count' },
  scale: {
    y: {
      domain: [0, 1],
    },
  },
});

chart.render();
```
