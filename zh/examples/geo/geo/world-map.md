---
title: "世界地图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/geo/geo/world-map/"
version: "5.4.8"
---

# 世界地图

[运行示例](https://g2.antv.antgroup.com/zh/examples/geo/geo/world-map/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/world-map
 */
import { Chart, register } from '@antv/g2';
import { feature } from 'topojson-client';

register('data.feature', ({ name }) => {
  return (data) => feature(data, data.objects[name]).features;
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'geoView',
  coordinate: { type: 'orthographic' },
  children: [
    {
      type: 'geoPath',
      data: { type: 'graticule10' },
      style: { stroke: '#ccc', fill: 'none' },
    },
    {
      type: 'geoPath',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/countries-50m.json',
        transform: [{ type: 'feature', name: 'land' }],
      },
      style: { fill: 'black' },
    },
    {
      type: 'geoPath',
      data: { type: 'sphere' },
      style: { stroke: 'black', fill: 'none' },
    },
  ],
});

chart.render();
```
