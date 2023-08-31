---
title: GeoView
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
      autoFit: true,
    });
    const layer = chart.spaceLayer();
    layer
      .call(worldMap, geoPolyconic, '#f00')
      .call(worldMap, geoRectangularPolyconic, '#00f');

    chart.render();
  });
```

## 创建可视化

### `geoView.interval`

添加 interval 图形，具体见 [mark](/spec/mark/interval)。

### `geoView.rect`

添加 rect 图形，具体见 [mark](/spec/mark/rect)。

### `geoView.point`

添加 point 图形，具体见 [mark](/spec/mark/point)。

### `geoView.area`

添加 area 图形，具体见 [mark](/spec/mark/area)。

### `geoView.line`

添加 line 图形，具体见 [mark](/spec/mark/line)。

### `geoView.vector`

添加 vector 图形，具体见 [mark](/spec/mark/vector)。

### `geoView.link`

添加 link 图形，具体见 [mark](/spec/mark/link)。

### `geoView.polygon`

添加 polygon 图形，具体见 [mark](/spec/mark/polygon)。

### `geoView.image`

添加 image 图形，具体见 [mark](/spec/mark/image)。

### `geoView.text`

添加 text 图形，具体见 [mark](/spec/mark/text)。

### `geoView.lineX`

添加 lineX 图形，具体见 [mark](/spec/mark/line-x)。

### `geoView.lineY`

添加 lineY 图形，具体见 [mark](/spec/mark/line-y)。

### `geoView.range`

添加 range 图形，具体见 [mark](/spec/mark/range)。

### `geoView.rangeX`

添加 rangeX 图形，具体见 [mark](/spec/mark/range-x)。

### `geoView.rangeY`

添加 rangeY 图形，具体见 [mark](/spec/mark/range-y)。

### `geoView.connector`

添加 connector 图形，具体见 [mark](/spec/mark/connector)。

### `geoView.sankey`

添加 sankey 图形，具体见 [mark](/spec/mark/sankey)。

### `geoView.treemap`

添加 treemap 图形，具体见 [graph](/spec/graph/treemap)。

### `geoView.boxplot`

添加 boxplot 图形，具体见 [mark](/spec/mark/boxplot)。

### `geoView.shape`

添加 shape 图形，具体见 [mark](/spec/mark/shape)。

### `geoView.pack`

添加 pack 图形，具体见 [graph](/spec/graph/pack)。

### `geoView.forceGraph`

添加 forceGraph 图形，具体见 [graph](/spec/graph/force-graph)。

### `geoView.tree`

添加 tree 图形，具体见 [graph](/spec/graph/tree)。

### `geoView.wordCloud`

添加 wordCloud 图形，具体见 [mark](/spec/mark/word-cloud)。

### `geoView.gauge`

添加 gauge 图形，具体见 [mark](/spec/mark/gauge)。

## 设置属性

### `geoView.attr`

获取或设置图表的配置项。

### `geoView.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/spec/data/overview)。

### `geoView.encode`

设置图形每个通道的字段名称，具体见 [encode](/api/encode/overview)。

### `geoView.scale`

设置图形每个通道的比例尺，具体见 [scale](/spec/overview#scale)。

### `geoView.legend`

设置图形的图例，具体见 [legend](/spec/component/legend)。

### `geoView.tooltip`

设置图形的 Tooltip，具体见 [tooltip](/spec/component/tooltip)。

### `geoView.axis`

设置图形的坐标轴，具体见 [axis](/spec/component/axis)。

### `geoView.label`

设置图形的标签，具体见 [label](/spec/label/overview)。

### `geoView.style`

设置图形的样式，具体见 [style](/spec/common/style)。

### `geoView.theme`

设置图形的主题，具体见 [theme](/spec/theme/overview)。
