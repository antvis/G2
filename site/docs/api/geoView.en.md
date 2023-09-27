---
title: GeoView
order: 4
---

## start using

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

## Create a visualization

### `geoView.interval`

Add interval graphics, see for details[mark](/spec/mark/interval)。

### `geoView.rect`

Add rect graphics, see for details[mark](/spec/mark/rect)。

### `geoView.point`

Add point graphics, see for details[mark](/spec/mark/point)。

### `geoView.area`

Add area graphics, see for details[mark](/spec/mark/area)。

### `geoView.line`

Add line graphics, see for details[mark](/spec/mark/line)。

### `geoView.vector`

Add vector graphics, see details[mark](/spec/mark/vector)。

### `geoView.link`

Add link graphics, see for details[mark](/spec/mark/link)。

### `geoView.polygon`

Add polygon graphics, see details[mark](/spec/mark/polygon)。

### `geoView.image`

Add image graphics, see for details[mark](/spec/mark/image)。

### `geoView.text`

Add text graphics, see details[mark](/spec/mark/text)。

### `geoView.lineX`

Add lineX graphics, see for details[mark](/spec/mark/line-x)。

### `geoView.lineY`

Add lineY graphics, see for details[mark](/spec/mark/line-y)。

### `geoView.range`

Add range graphics, see for details[mark](/spec/mark/range)。

### `geoView.rangeX`

Add rangeX graphics, see for details[mark](/spec/mark/range-x)。

### `geoView.rangeY`

Add rangeY graphics, see for details[mark](/spec/mark/range-y)。

### `geoView.connector`

Add connector graphics, see for details[mark](/spec/mark/connector)。

### `geoView.sankey`

Add sankey graphics, see details[mark](/spec/mark/sankey)。

### `geoView.treemap`

Add treemap graphics, see details[graph](/spec/graph/treemap)。

### `geoView.boxplot`

Add boxplot graphics, see[mark](/spec/mark/boxplot)。

### `geoView.shape`

Add shape graphics, see for details[mark](/spec/mark/shape)。

### `geoView.pack`

Add pack graphics, see[graph](/spec/graph/pack)。

### `geoView.forceGraph`

Add forceGraph graph, see for details[graph](/spec/graph/force-graph)。

### `geoView.tree`

Add tree graphics, see details[graph](/spec/graph/tree)。

### `geoView.wordCloud`

Add wordCloud graphics, see details[mark](/spec/mark/word-cloud)。

### `geoView.gauge`

Add gauge graphics, see for details[mark](/spec/mark/gauge)。

## Set properties

### `geoView.attr`

Gets or sets the configuration items of the chart.

### `geoView.data`

Set graphic data to support multiple data sources and data transformations. For details, see[data](/spec/data/overview)。

### `geoView.encode`

Set the field name of each channel of the graph. For details, see[encode](/api/encode/overview)。

### `geoView.scale`

Set the scale of each channel of the graph. For details, see[scale](/spec/overview#scale)。

### `geoView.legend`

Set the legend of the graph. For details, see[legend](/spec/component/legend)。

### `geoView.tooltip`

Set the Tooltip of the graphic. For details, see[tooltip](/spec/component/tooltip)。

### `geoView.axis`

Set the coordinate axis of the graph. For details, see[axis](/spec/component/axis)。

### `geoView.label`

Set the label of the graph. For details, see[label](/spec/label/overview)。

### `geoView.style`

Set the graphic style. For details, see[style](/spec/common/style)。

### `geoView.theme`

Set the theme of the graphic. For details, see[theme](/spec/theme/overview)。
