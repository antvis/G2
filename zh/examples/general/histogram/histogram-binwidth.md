---
title: "直方图范围刻度"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/histogram/histogram-binwidth/"
version: "5.4.8"
---

# 直方图范围刻度

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/histogram/histogram-binwidth/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const ds = new DataSet();
    const dv = ds.createView('diamond').source(data);
    dv.transform({
      type: 'bin.histogram',
      field: 'depth',
      binWidth: 4, // 在此修改矩形的宽度，代表真实数值的大小
      as: ['depth', 'count'],
    });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    chart.options({
      type: 'interval',
      encode: { x: 'depth', y: 'count' },
      data: dv.rows,
      scale: {
        depth: {
          tickInterval: 4,
        },
        count: {
          nice: true,
        },
      },
    });

    chart.render();
  });
```
