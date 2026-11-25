---
title: "阈值折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/line-threshold/"
version: "5.4.8"
---

# 阈值折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/line-threshold/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/threshold-encoding
 */
import { Chart } from '@antv/g2';
import { median } from 'd3-array';

fetch('https://assets.antv.antgroup.com/g2/temperatures2.json')
  .then((res) => res.json())
  .then((data) => {
    const medianValue = median(data, (d) => d.value);

    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });

    chart.options({
      type: 'line',
      data: data,
      scale: {
        y: { nice: true },
        x: { utc: true },
        color: {
          type: 'threshold',
          domain: [medianValue],
          range: ['black', 'red'],
        },
      },
      encode: {
        x: (d) => new Date(d.date),
        y: 'value',
        shape: 'hvh',
        color: 'value',
        series: () => undefined,
      },
      style: { gradient: 'y', lineWidth: 1.5, lineJoin: 'round' },
      axis: { x: { title: 'date' } },
    });

    chart.render();
  });
```
