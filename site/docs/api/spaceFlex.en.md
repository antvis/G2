---
title: SpaceFlex
order: 6
---

## start using

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 900,
});

const flex = chart
  .spaceFlex()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  })
  .attr('direction', 'col')
  .attr('ratio', [1, 2]);

flex
  .interval()
  .attr('paddingBottom', 0)
  .attr('paddingRight', 300)
  .transform({ type: 'groupX', y: 'max' })
  .axis('x', false)
  .encode('x', (d) => new Date(d.date).getUTCDate())
  .encode('y', 'temp_max')
  .encode('color', 'steelblue');

flex
  .spaceFlex()
  .attr('ratio', [2, 1])
  .call((node) =>
    node
      .cell()
      .attr('paddingRight', 0)
      .attr('paddingBottom', 50)
      .transform({ type: 'group', color: 'max' })
      .encode('x', (d) => new Date(d.date).getUTCDate())
      .encode('y', (d) => new Date(d.date).getUTCMonth())
      .encode('color', 'temp_max')
      .style('inset', 0.5)
      .axis('x', { title: 'Date' })
      .axis('y', { title: 'Month' })
      .legend({ color: false })
      .scale('color', {
        type: 'sequential',
        palette: 'gnBu',
      }),
  )
  .call((node) =>
    node
      .spaceFlex()
      .coordinate({ transform: [{ type: 'transpose' }] })
      .interval()
      .attr('paddingBottom', 50)
      .transform({ type: 'groupX', y: 'max' })
      .axis('x', false)
      .encode('x', (d) => new Date(d.date).getUTCMonth())
      .encode('y', 'temp_max')
      .encode('color', 'steelblue'),
  );

chart.render();
```

### Create a visualization

### `spaceFlex.interval`

Add interval graphics, see for details[mark](/spec/mark/interval)。

### `spaceFlex.rect`

Add rect graphics, see for details[mark](/spec/mark/rect)。

### `spaceFlex.point`

Add point graphics, see for details[mark](/spec/mark/point)。

### `spaceFlex.area`

Add area graphics, see for details[mark](/spec/mark/area)。

### `spaceFlex.line`

Add line graphics, see for details[mark](/spec/mark/line)。

### `spaceFlex.vector`

Add vector graphics, see details[mark](/spec/mark/vector)。

### `spaceFlex.link`

Add link graphics, see for details[mark](/spec/mark/link)。

### `spaceFlex.polygon`

Add polygon graphics, see details[mark](/spec/mark/polygon)。

### `spaceFlex.image`

Add image graphics, see for details[mark](/spec/mark/image)。

### `spaceFlex.text`

Add text graphics, see details[mark](/spec/mark/text)。

### `spaceFlex.lineX`

Add lineX graphics, see for details[mark](/spec/mark/line-x)。

### `spaceFlex.lineY`

Add lineY graphics, see for details[mark](/spec/mark/line-y)。

### `spaceFlex.range`

Add range graphics, see for details[mark](/spec/mark/range)。

### `spaceFlex.rangeX`

Add rangeX graphics, see for details[mark](/spec/mark/range-x)。

### `spaceFlex.rangeY`

Add rangeY graphics, see for details[mark](/spec/mark/range-y)。

### `spaceFlex.connector`

Add connector graphics, see for details[mark](/spec/mark/connector)。

### `spaceFlex.sankey`

Add sankey graphics, see details[graph](/spec/graph/sankey)。

### `spaceFlex.treemap`

Add treemap graphics, see details[graph](/spec/graph/treemap)。

### `spaceFlex.boxplot`

Add boxplot graphics, see[mark](/spec/mark/boxplot)。

### `spaceFlex.shape`

Add shape graphics, see for details[mark](/spec/mark/shape)。

### `spaceFlex.pack`

Add pack graphics, see[graph](/spec/graph/pack)。

### `spaceFlex.forceGraph`

Add forceGraph graph, see for details[graph](/spec/graph/force-graph)。

### `spaceFlex.tree`

Add tree graphics, see details[graph](/spec/graph/tree)。

### `spaceFlex.wordCloud`

Add wordCloud graphics, see details[mark](/spec/mark/word-cloud)。

### `spaceFlex.gauge`

Add gauge graphics, see for details[mark](/spec/mark/gauge)。

### Set properties

#### `spaceFlex.attr`

Gets or sets the configuration items of the chart.

#### `spaceFlex.data`

Set graphic data to support multiple data sources and data transformations. For details, see[data](/spec/data/overview)。
