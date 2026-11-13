---
title: "沃罗诺伊图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/polygon/voronoi/"
version: "5.4.8"
---

# 沃罗诺伊图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/polygon/voronoi/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import * as d3 from 'd3-voronoi';

const layout = (data) => {
  return d3
    .voronoi()
    .x((d) => d.x)
    .y((d) => d.y)
    .extent([
      [0, 0],
      [800, 600],
    ])
    .polygons(data)
    .map((p) =>
      Object.assign({}, p, {
        x: p.map((pi) => pi[0]),
        y: p.map((pi) => pi[1]),
      }),
    );
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
});

chart.options({
  type: 'polygon',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json',
    transform: [
      {
        type: 'custom',
        callback: layout,
      },
    ],
  },
  encode: { x: 'x', y: 'y', color: (d) => d.data.value },
  scale: { x: { domain: [0, 800] }, y: { domain: [0, 600] } },
  axis: false,
  style: { stroke: '#fff', fillOpacity: 0.65 },
});

chart.render();
```
