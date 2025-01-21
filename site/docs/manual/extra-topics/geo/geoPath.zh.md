---
title: geoPath
order: 1
---

`geoPath` 可以用来结合 geojson 绘制地图。

## 开始使用

<img alt="geoPath" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vcI7RqX24U0AAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/unemployment2.json').then((res) =>
    res.json(),
  ),
]).then((values) => {
  const [us, unemployment] = values;
  const counties = feature(us, us.objects.counties).features;

  const chart = new Chart({
    container: 'container',
  });

  chart
    .geoPath()
    .projection({ type: 'albersUsa' })
    .data({
      value: counties,
      transform: [
        {
          type: 'join',
          join: unemployment,
          on: ['id', 'id'],
          select: ['rate'],
        },
      ],
    })
    .scale('color', {
      type: 'sequential',
      palette: 'ylGnBu',
      unknown: '#fff',
    })
    .encode('color', 'rate');

  chart.render();
});
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 `geoPath` 除了和通用 mark 相同的 API 和配置项，还有一个特殊的就是 `projection` 映射，当前 G2 内置了 [d3-geo](https://github.com/d3/d3-geo) 的所有映射。

## FAQ

### 如何绘制一个中国地图？

地图最终是由 geojson 数据决定，所以需要找到一个中国行政地图的 geojson，并将此数据应用于当前的示例 DEMO 中。

```ts
chart
  .geoPath()
  .data(geojson)
  .encode('latitude', 'latitude')
  .encode('longitude', 'longitude')
  .encode('color', 'rate');
  .scale('color', {
    type: 'sequential',
    palette: 'ylGnBu',
    unknown: '#fff',
  });

  chart.render();
```
