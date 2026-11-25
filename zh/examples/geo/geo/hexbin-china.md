---
title: "六边形中国地图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/geo/geo/hexbin-china/"
version: "5.4.8"
---

# 六边形中国地图

[运行示例](https://g2.antv.antgroup.com/zh/examples/geo/geo/hexbin-china/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'polygon',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/hexbin-china.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => {
          const dv = new DataSet.View().source(data).transform({
            type: 'bin.hexagon',
            fields: ['longitude', 'latitude'],
            binWidth: [2, 3],
            as: ['longitude', 'latitude', 'count'],
          });
          return dv.rows;
        },
      },
    ],
  },
  encode: { x: 'longitude', y: 'latitude', color: 'count' },
  scale: {
    color: {
      range: '#BAE7FF-#1890FF-#0050B3',
    },
  },
  style: { lineWidth: 5, stroke: '#fff' },
  axis: false,
  legend: false,
  tooltip: {
    items: [
      {
        field: 'count',
      },
    ],
  },
  state: { active: { fill: 'orange' }, inactive: { opacity: 0.8 } },
  interaction: { elementHighlight: true },
});

chart.render();
```
