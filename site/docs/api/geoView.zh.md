---
title: 地图视图 - GeoView
order: 4
---

## 开始使用

```js
import { Chart } from '@antv/g2';
import { feature } from 'topojson';
import { geoPolyconic, geoRectangularPolyconic } from 'd3-geo-projection';

fetch('https://assets.antv.antgroup.com/g2/countries-50m.json')
  .then((res) => res.json())
  .then((world) => {
    const land = feature(world, world.objects.land).features;
    const worldMap = (node, projection, color, opacity = 0.7) => {
      const geoView = node.geoView().coordinate({
        type: projection,
        size: 'fitWidth',
      });
      geoView
        .geoPath()
        .data(land)
        .style('fill', color)
        .style('opacity', opacity);
      geoView
        .geoPath()
        .data({ type: 'graticule10' })
        .style('stroke', color)
        .style('strokeOpacity', 0.3);

      geoView.geoPath().data({ type: 'sphere' }).style('stroke', color);
    };
    const chart = new Chart({
      container: 'container',
      theme: 'classic',
      autoFit: true,
    });
    const layer = chart.spaceLayer();
    layer
      .call(worldMap, geoPolyconic, '#f00')
      .call(worldMap, geoRectangularPolyconic, '#00f');

    chart.render();
  });
```

## GeoView API

### 创建可视化

#### `geoView.[mark]`

设置图表的 Mark 标记，具体见 [mark](/api/mark/area)。

### 设置属性

#### `view.attr`

获取或设置图表的配置项。

#### `geoView.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/api/data/overview)。

#### `geoView.encode`

设置图形每个通道的字段名称，具体见 [encode](/api/encode/overview)。

#### `geoView.scale`

设置图形每个通道的比例尺，具体见 [scale](/api/scale/overview)。

#### `geoView.legend`

设置图形的图例，具体见 [legend](/api/component/legend)。

#### `geoView.tooltip`

设置图形的 Tooltip，具体见 [tooltip](/api/component/tooltip/overview)。

#### `geoView.axis`

设置图形的坐标轴，具体见 [axis](/api/component/axis)。

#### `geoView.label`

设置图形的标签，具体见 [label](/api/label/overview)。

#### `geoView.style`

设置图形的样式，具体见 [style](/api/style/overview)。

#### `geoView.theme`

设置图形的主题，具体见 [style](/api/theme/overview)。
