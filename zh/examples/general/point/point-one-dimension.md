---
title: "一维散点图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/point/point-one-dimension/"
version: "5.4.8"
---

# 一维散点图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/point/point-one-dimension/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 120,
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height' },
});

chart.render();
```
