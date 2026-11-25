---
title: "自动可视化 - 散点图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/intelligent/auto/auto-scatter/"
version: "5.4.8"
---

# 自动可视化 - 散点图

[运行示例](https://g2.antv.antgroup.com/zh/examples/intelligent/auto/auto-scatter/)

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
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
});

chart.render();
```
