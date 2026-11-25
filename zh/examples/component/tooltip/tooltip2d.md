---
title: "多维度提示"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/tooltip/tooltip2d/"
version: "5.4.8"
---

# 多维度提示

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/tooltip/tooltip2d/)

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
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height', y: 'weight', color: 'gender' },
});

chart.render();
```
