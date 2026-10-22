---
title: "美国行政地图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/geo/geo/choropleth-usa/"
version: "5.4.8"
---

# 美国行政地图

[运行示例](https://g2.antv.antgroup.com/zh/examples/geo/geo/choropleth-usa/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/geo_choropleth.html
 */
import { Chart, register } from '@antv/g2';
import { feature } from 'topojson-client';

register('data.feature', ({ name }) => {
  return (data) => feature(data, data.objects[name]).features;
});

fetch('https://assets.antv.antgroup.com/g2/unemployment2.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });

    chart.options({
      type: 'geoPath',
      coordinate: { type: 'albersUsa' },
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/us-10m.json',
        transform: [
          { type: 'feature', name: 'counties' },
          {
            type: 'join',
            join: data,
            on: ['id', 'id'],
            select: ['rate'],
          },
        ],
      },
      scale: {
        color: {
          palette: 'ylGnBu',
          unknown: '#fff',
        },
      },
      encode: { color: 'rate' },
      legend: { color: { layout: { justifyContent: 'center' } } },
    });

    chart.render();
  });
```
