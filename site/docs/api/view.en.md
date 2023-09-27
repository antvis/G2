---
title: View
order: 3
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
  .view()
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

### `view.interval`

Add interval graphics, see for details[mark](/spec/mark/interval)。

### `view.rect`

Add rect graphics, see for details[mark](/spec/mark/rect)。

### `view.point`

Add point graphics, see for details[mark](/spec/mark/point)。

### `view.area`

Add area graphics, see for details[mark](/spec/mark/area)。

### `view.line`

Add line graphics, see for details[mark](/spec/mark/line)。

### `view.vector`

Add vector graphics, see details[mark](/spec/mark/vector)。

### `view.link`

Add link graphics, see for details[mark](/spec/mark/link)。

### `view.polygon`

Add polygon graphics, see details[mark](/spec/mark/polygon)。

### `view.image`

Add image graphics, see for details[mark](/spec/mark/image)。

### `view.text`

Add text graphics, see details[mark](/spec/mark/text)。

### `view.lineX`

Add lineX graphics, see for details[mark](/spec/mark/line-x)。

### `view.lineY`

Add lineY graphics, see for details[mark](/spec/mark/line-y)。

### `view.range`

Add range graphics, see for details[mark](/spec/mark/range)。

### `view.rangeX`

Add rangeX graphics, see for details[mark](/spec/mark/range-x)。

### `view.rangeY`

Add rangeY graphics, see for details[mark](/spec/mark/range-y)。

### `view.connector`

Add connector graphics, see for details[mark](/spec/mark/connector)。

### `view.sankey`

Add sankey graphics, see details[graph](/spec/graph/sankey)。

### `view.treemap`

Add treemap graphics, see details[graph](/spec/graph/treemap)。

### `view.boxplot`

Add boxplot graphics, see[mark](/spec/mark/boxplot)。

### `chart.density`

Add density graphics, see[mark](/spec/mark/density)。

### `chart.heatmap`

Add heatmap graphics, see[mark](/spec/mark/heatmap)。

### `view.shape`

Add shape graphics, see for details[mark](/spec/mark/shape)。

### `view.pack`

Add pack graphics, see[graph](/spec/graph/pack)。

### `view.forceGraph`

Add forceGraph graph, see for details[graph](/spec/graph/force-graph)。

### `view.tree`

Add tree graphics, see details[graph](/spec/graph/tree)。

### `view.wordCloud`

Add wordCloud graphics, see details[mark](/spec/mark/word-cloud)。

### `view.gauge`

Add gauge graphics, see for details[mark](/spec/mark/gauge)。

## Set properties

### `view.attr`

Gets or sets the configuration items of the chart.

### `view.data`

Set graphic data to support multiple data sources and data transformations. For details, see[data](/spec/data/overview)。

### `view.encode`

Set the field name of each channel of the graph. For details, see[encode](/api/encode/overview)。

### `view.scale`

Set the scale of each channel of the graph. For details, see[scale](/spec/overview#scale)。

### `view.legend`

Set the legend of the graph. For details, see[legend](/spec/component/legend)。

### `view.tooltip`

Set the Tooltip of the graphic. For details, see[tooltip](/spec/component/tooltip)。

### `view.axis`

Set the coordinate axis of the graph. For details, see[axis](/spec/component/axis)。

### `view.slider`

Set the coordinate axis of the graph. For details, see[slider](/spec/component/slider)。

### `view.label`

Set the label of the graph. For details, see[label](/spec/label/overview)。

### `view.style`

Set the graphic style. For details, see[style](/spec/common/style)。

### `view.theme`

Set the theme of the graphic. For details, see[theme](/spec/theme/overview)。

## Get instance

### `view.getView`

Returns the view instance when the view is rendered.

### `view.getCoordinate`

Returns the coordinate instance when the view is rendered.

### `view.getTheme`

Returns the theme instance when the view is rendered.

### `view.getGroup`

Returns the canvas group instance when the view is rendered.

### `view.getScale`

Returns all scale instances when the view is rendered.

### `view.getScaleByChannel`

Search by channel name to return the corresponding scale instance when the view is rendered.

### `view.getNodesByType`

Find all node child nodes by type.

### `view.getNodeByKey`

Find the child nodes of the current node by key.
