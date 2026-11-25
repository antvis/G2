---
title: "缺失折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/line/line-connect-nulls/"
version: "5.4.8"
---

# 缺失折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/line/line-connect-nulls/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/line-with-missing-data
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    transform: [
      // Mock missing data.
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          close: d.date.getUTCMonth() < 3 ? NaN : d.close,
        }),
      },
    ],
  },
  encode: { x: 'date', y: 'close' },
  style: { connect: true, connectStroke: '#aaa' },
});

chart.render();
```
