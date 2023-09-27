---
title: RepeatMatrix
order: 8
---

## start using

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 300,
  height: 720,
  paddingLeft: 50,
  paddingBottom: 60,
});

const repeatMatrix = chart
  .repeatMatrix()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/weather.json',
    transform: [
      {
        type: 'map',
        callback: ({ date, ...d }) => ({
          ...d,
          date: new Date(date).getMonth() + '',
        }),
      },
    ],
  })
  .encode('y', ['temp_max', 'precipitation', 'wind'])
  .encode('x', 'date');

repeatMatrix
  .line()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('color', 'location')
  .scale('y', { zero: true });

chart.render();
```

## Create a visualization

### `repeatMatrix.interval`

Add interval graphics, see for details[mark](/spec/mark/interval)。

### `repeatMatrix.rect`

Add rect graphics, see for details[mark](/spec/mark/rect)。

### `repeatMatrix.point`

Add point graphics, see for details[mark](/spec/mark/point)。

### `repeatMatrix.area`

Add area graphics, see for details[mark](/spec/mark/area)。

### `repeatMatrix.line`

Add line graphics, see for details[mark](/spec/mark/line)。

### `repeatMatrix.vector`

Add vector graphics, see details[mark](/spec/mark/vector)。

### `repeatMatrix.link`

Add link graphics, see for details[mark](/spec/mark/link)。

### `repeatMatrix.polygon`

Add polygon graphics, see details[mark](/spec/mark/polygon)。

### `repeatMatrix.image`

Add image graphics, see for details[mark](/spec/mark/image)。

### `repeatMatrix.text`

Add text graphics, see details[mark](/spec/mark/text)。

### `repeatMatrix.lineX`

Add lineX graphics, see for details[mark](/spec/mark/line-x)。

### `repeatMatrix.lineY`

Add lineY graphics, see for details[mark](/spec/mark/line-y)。

### `repeatMatrix.range`

Add range graphics, see for details[mark](/spec/mark/range)。

### `repeatMatrix.rangeX`

Add rangeX graphics, see for details[mark](/spec/mark/range-x)。

### `repeatMatrix.rangeY`

Add rangeY graphics, see for details[mark](/spec/mark/range-y)。

### `repeatMatrix.connector`

Add connector graphics, see for details[mark](/spec/mark/connector)。

### `repeatMatrix.sankey`

Add sankey graphics, see details[graph](/spec/graph/sankey)。

### `repeatMatrix.treemap`

Add treemap graphics, see details[graph](/spec/graph/treemap)。

### `repeatMatrix.boxplot`

Add boxplot graphics, see[mark](/spec/mark/boxplot)。

### `repeatMatrix.shape`

Add shape graphics, see for details[mark](/spec/mark/shape)。

### `repeatMatrix.pack`

Add pack graphics, see[graph](/spec/graph/pack)。

### `repeatMatrix.forceGraph`

Add forceGraph graph, see for details[graph](/spec/graph/force-graph)。

### `repeatMatrix.tree`

Add tree graphics, see details[graph](/spec/graph/tree)。

### `repeatMatrix.wordCloud`

Add wordCloud graphics, see details[mark](/spec/mark/word-cloud)。

### `repeatMatrix.gauge`

Add gauge graphics, see for details[mark](/spec/mark/gauge)。

## Set properties

### `repeatMatrix.attr`

Gets or sets the configuration items of the chart.

### `repeatMatrix.data`

Set graphic data to support multiple data sources and data transformations. For details, see[data](/spec/data/overview)。

### `repeatMatrix.encode`

Set the field name of each channel of the graph. For details, see[encode](/api/encode/overview)。

### `repeatMatrix.scale`

Set the scale of each channel of the graph. For details, see[scale](/spec/overview#scale)。

### `repeatMatrix.legend`

Set the legend of the graph. For details, see[legend](/spec/component/legend)。

### `repeatMatrix.tooltip`

Set the Tooltip of the graphic. For details, see[tooltip](/spec/component/tooltip)。

### `repeatMatrix.axis`

Set the coordinate axis of the graph. For details, see[axis](/spec/component/axis)。

### `repeatMatrix.slider`

Set the coordinate axis of the graph. For details, see[slider](/spec/component/slider)。

### `repeatMatrix.label`

Set the label of the graph. For details, see[label](/spec/label/overview)。

### `repeatMatrix.style`

Set the graphic style. For details, see[style](/spec/common/style)。

### `repeatMatrix.theme`

Set the theme of the graphic. For details, see[theme](/spec/theme/overview)。
