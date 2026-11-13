---
title: "不同形状的蜂群图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/beeswarm/shape/"
version: "5.4.8"
---

# 不同形状的蜂群图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/beeswarm/shape/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = Array.from({ length: 400 }, (_, i) => {
  return {
    x: `G${(i % 6) + 1}`,
    y: 40 + Math.random() * 220,
  };
});

chart.options({
  type: 'beeswarm',
  data,
  encode: {
    x: 'x',
    y: 'y',
    size: 'y',
    color: 'x',
    shape: 'x', // 'point'
  },
  scale: {
    y: {
      nice: true,
      domainMin: 0,
    },
    size: {
      range: [2, 6],
    },
  },
  legend: {
    size: false,
  },
  axis: {
    x: { title: false },
    y: { title: false },
  },
});

chart.render();
```
