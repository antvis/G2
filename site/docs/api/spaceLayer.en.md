---
title: SpaceLayer
order: 5
---

## start using

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const scaleColor = (node) =>
  node.scale('color', {
    palette: 'cool',
    offset: (t) => t * 0.8 + 0.1,
  });

const layer = chart.spaceLayer().data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  format: 'csv',
});

layer
  .interval()
  .attr('paddingLeft', 50)
  .transform({ type: 'sortX', reverse: true, by: 'y' })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'letter')
  .call(scaleColor);

layer
  .spaceLayer()
  .attr('x', 300)
  .attr('y', 50)
  .attr('width', 300)
  .attr('height', 300)
  .coordinate({ type: 'theta' })
  .interval()
  .transform({ type: 'stackY' })
  .legend(false)
  .scale('color', {
    palette: 'cool',
    offset: (t) => t * 0.8 + 0.1,
  })
  .encode('y', 'frequency')
  .encode('color', 'letter')
  .call(scaleColor);

chart.render();
```

## Create a visualization

### `spaceLayer.interval`

Add interval graphics, see for details[mark](/spec/mark/interval)。

### `spaceLayer.rect`

Add rect graphics, see for details[mark](/spec/mark/rect)。

### `spaceLayer.point`

Add point graphics, see for details[mark](/spec/mark/point)。

### `spaceLayer.area`

Add area graphics, see for details[mark](/spec/mark/area)。

### `spaceLayer.line`

Add line graphics, see for details[mark](/spec/mark/line)。

### `spaceLayer.vector`

Add vector graphics, see details[mark](/spec/mark/vector)。

### `spaceLayer.link`

Add link graphics, see for details[mark](/spec/mark/link)。

### `spaceLayer.polygon`

Add polygon graphics, see details[mark](/spec/mark/polygon)。

### `spaceLayer.image`

Add image graphics, see for details[mark](/spec/mark/image)。

### `spaceLayer.text`

Add text graphics, see details[mark](/spec/mark/text)。

### `spaceLayer.lineX`

Add lineX graphics, see for details[mark](/spec/mark/line-x)。

### `spaceLayer.lineY`

Add lineY graphics, see for details[mark](/spec/mark/line-y)。

### `spaceLayer.range`

Add range graphics, see for details[mark](/spec/mark/range)。

### `spaceLayer.rangeX`

Add rangeX graphics, see for details[mark](/spec/mark/range-x)。

### `spaceLayer.rangeY`

Add rangeY graphics, see for details[mark](/spec/mark/range-y)。

### `spaceLayer.connector`

Add connector graphics, see for details[mark](/spec/mark/connector)。

### `spaceLayer.sankey`

Add sankey graphics, see details[graph](/spec/graph/sankey)。

### `spaceLayer.treemap`

Add treemap graphics, see details[graph](/spec/graph/treemap)。

### `spaceLayer.boxplot`

Add boxplot graphics, see[mark](/spec/mark/boxplot)。

### `spaceLayer.shape`

Add shape graphics, see for details[mark](/spec/mark/shape)。

### `spaceLayer.pack`

Add pack graphics, see[graph](/spec/graph/pack)。

### `spaceLayer.forceGraph`

Add forceGraph graph, see for details[graph](/spec/graph/force-graph)。

### `spaceLayer.tree`

Add tree graphics, see details[graph](/spec/graph/tree)。

### `spaceLayer.wordCloud`

Add wordCloud graphics, see details[mark](/spec/mark/word-cloud)。

### `spaceLayer.gauge`

Add gauge graphics, see for details[mark](/spec/mark/gauge)。

## Set properties

### `spaceLayer.attr`

Gets or sets the configuration items of the chart.

### `spaceLayer.data`

Set graphic data to support multiple data sources and data transformations. For details, see[data](/spec/data/overview)。
