---
title: "密度热力图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/heatmap/heatmap/"
version: "5.4.8"
---

# 密度热力图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/heatmap/heatmap/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  padding: 0,
});

chart.options({
  type: 'view',
  axis: false,
  children: [
    {
      type: 'image',
      style: {
        src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        x: '50%',
        y: '50%',
        width: '100%',
        height: '100%',
      },
      tooltip: false,
    },
    {
      type: 'heatmap',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
      },
      encode: { x: 'g', y: 'l', color: 'tmp' },
      style: { opacity: 0 },
      tooltip: false,
    },
  ],
});

chart.render();
```
