---
title: "自动可视化 - 柱形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/intelligent/auto/auto-interval/"
version: "5.4.8"
---

# 自动可视化 - 柱形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/intelligent/auto/auto-interval/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * AVA: https://github.com/antvis/AVA
 * g2-extension-ava: https://github.com/antvis/g2-extensions/tree/master/ava
 */
import { Chart } from '@antv/g2';
import { Auto } from '@antv/g2-extension-ava';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: Auto,
  data: [
    { price: 100, type: 'A' },
    { price: 120, type: 'B' },
    { price: 150, type: 'C' },
  ],
});

chart.render();
```
