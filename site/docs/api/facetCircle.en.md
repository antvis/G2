---
title: FacetCircle
order: 7
---

## start using

```js
import { Chart } from '@antv/g2';

const M = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
];
const N = ['A', 'B', 'C', 'D'];
const data = M.flatMap((month) =>
  N.map((name) => ({
    month,
    name,
    value: Math.random(),
  })),
);

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 480,
});

const facetCircle = chart.facetCircle().data(data).encode('position', 'month');

facetCircle
  .interval()
  .encode('x', 'name')
  .encode('y', 'value')
  .encode('color', 'name');

chart.render();
```

## Create a visualization

### `facetCircle.interval`

Add interval graphics, see for details[mark](/spec/mark/interval)。

### `facetCircle.rect`

Add rect graphics, see for details[mark](/spec/mark/rect)。

### `facetCircle.point`

Add point graphics, see for details[mark](/spec/mark/point)。

### `facetCircle.area`

Add area graphics, see for details[mark](/spec/mark/area)。

### `facetCircle.line`

Add line graphics, see for details[mark](/spec/mark/line)。

### `facetCircle.vector`

Add vector graphics, see details[mark](/spec/mark/vector)。

### `facetCircle.link`

Add link graphics, see for details[mark](/spec/mark/link)。

### `facetCircle.polygon`

Add polygon graphics, see details[mark](/spec/mark/polygon)。

### `facetCircle.image`

Add image graphics, see for details[mark](/spec/mark/image)。

### `facetCircle.text`

Add text graphics, see details[mark](/spec/mark/text)。

### `facetCircle.lineX`

Add lineX graphics, see for details[mark](/spec/mark/line-x)。

### `facetCircle.lineY`

Add lineY graphics, see for details[mark](/spec/mark/line-y)。

### `facetCircle.range`

Add range graphics, see for details[mark](/spec/mark/range)。

### `facetCircle.rangeX`

Add rangeX graphics, see for details[mark](/spec/mark/range-x)。

### `facetCircle.rangeY`

Add rangeY graphics, see for details[mark](/spec/mark/range-y)。

### `facetCircle.connector`

Add connector graphics, see for details[mark](/spec/mark/connector)。

### `facetCircle.sankey`

Add sankey graphics, see details[graph](/spec/graph/sankey)。

### `facetCircle.treemap`

Add treemap graphics, see details[graph](/spec/graph/treemap)。

### `facetCircle.boxplot`

Add boxplot graphics, see[mark](/spec/mark/boxplot)。

### `facetCircle.shape`

Add shape graphics, see for details[mark](/spec/mark/shape)。

### `facetCircle.pack`

Add pack graphics, see[graph](/spec/graph/pack)。

### `facetCircle.forceGraph`

Add forceGraph graph, see for details[graph](/spec/graph/force-graph)。

### `facetCircle.tree`

Add tree graphics, see details[graph](/spec/graph/tree)。

### `facetCircle.wordCloud`

Add wordCloud graphics, see details[mark](/spec/mark/word-cloud)。

### `facetCircle.gauge`

Add gauge graphics, see for details[mark](/spec/mark/gauge)。

## Set properties

### `facetCircle.attr`

Gets or sets the configuration items of the chart.

### `facetCircle.data`

Set graphic data to support multiple data sources and data transformations. For details, see[data](/spec/data/overview)。

### `facetCircle.scale`

Set the scale of each channel of the graph. For details, see[scale](/spec/overview#scale)。

### `facetCircle.legend`

Set the legend of the graph. For details, see[legend](/spec/component/legend)。

### `facetCircle.axis`

Set the coordinate axis of the graph. For details, see[axis](/spec/component/axis)。

### `facetCircle.style`

Set the graphic style. For details, see[style](/spec/common/style)。

### `facetCircle.theme`

Set the theme of the graphic. For details, see[theme](/spec/theme/overview)。
