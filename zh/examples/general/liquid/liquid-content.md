---
title: "水波图 文本内容"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/liquid/liquid-content/"
version: "5.4.8"
---

# 水波图 文本内容

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/liquid/liquid-content/)

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
  type: 'liquid',
  data: 0.581,
  style: {
    contentFill: '#000',
    contentText: 'center text',
    contentStroke: '#fff',
    contentLineWidth: 2,
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
});

chart.render();
```
