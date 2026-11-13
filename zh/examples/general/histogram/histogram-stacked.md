---
title: "层叠直方图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/histogram/histogram-stacked/"
version: "5.4.8"
---

# 层叠直方图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/histogram/histogram-stacked/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    chart.options({
      type: 'interval',
      encode: { x: 'depth', y: 'count', color: 'cut' },
      data: data,
      transform: [
        {
          type: 'binX',
          y: 'count',
          thresholds: 25,
        },
      ],
      style: {
        columnWidthRatio: 1,
        inset: 0.5,
      },
    });

    chart.render();
  });
```
