---
title: SpaceFlex
order: 6
---

## 开始使用

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

### 创建可视化

### `spaceFlex.interval`

添加 interval 图形，具体见 [mark](/spec/mark/interval)。

### `spaceFlex.rect`

添加 rect 图形，具体见 [mark](/spec/mark/rect)。

### `spaceFlex.point`

添加 point 图形，具体见 [mark](/spec/mark/point)。

### `spaceFlex.area`

添加 area 图形，具体见 [mark](/spec/mark/area)。

### `spaceFlex.line`

添加 line 图形，具体见 [mark](/spec/mark/line)。

### `spaceFlex.vector`

添加 vector 图形，具体见 [mark](/spec/mark/vector)。

### `spaceFlex.link`

添加 link 图形，具体见 [mark](/spec/mark/link)。

### `spaceFlex.polygon`

添加 polygon 图形，具体见 [mark](/spec/mark/polygon)。

### `spaceFlex.image`

添加 image 图形，具体见 [mark](/spec/mark/image)。

### `spaceFlex.text`

添加 text 图形，具体见 [mark](/spec/mark/text)。

### `spaceFlex.lineX`

添加 lineX 图形，具体见 [mark](/spec/mark/line-x)。

### `spaceFlex.lineY`

添加 lineY 图形，具体见 [mark](/spec/mark/line-y)。

### `spaceFlex.range`

添加 range 图形，具体见 [mark](/spec/mark/range)。

### `spaceFlex.rangeX`

添加 rangeX 图形，具体见 [mark](/spec/mark/range-x)。

### `spaceFlex.rangeY`

添加 rangeY 图形，具体见 [mark](/spec/mark/range-y)。

### `spaceFlex.connector`

添加 connector 图形，具体见 [mark](/spec/mark/connector)。

### `spaceFlex.sankey`

添加 sankey 图形，具体见 [graph](/spec/graph/sankey)。

### `spaceFlex.treemap`

添加 treemap 图形，具体见 [graph](/spec/graph/treemap)。

### `spaceFlex.boxplot`

添加 boxplot 图形，具体见 [mark](/spec/mark/boxplot)。

### `spaceFlex.shape`

添加 shape 图形，具体见 [mark](/spec/mark/shape)。

### `spaceFlex.pack`

添加 pack 图形，具体见 [graph](/spec/graph/pack)。

### `spaceFlex.forceGraph`

添加 forceGraph 图形，具体见 [graph](/spec/graph/force-graph)。

### `spaceFlex.tree`

添加 tree 图形，具体见 [graph](/spec/graph/tree)。

### `spaceFlex.wordCloud`

添加 wordCloud 图形，具体见 [mark](/spec/mark/word-cloud)。

### `spaceFlex.gauge`

添加 gauge 图形，具体见 [mark](/spec/mark/gauge)。

### 设置属性

#### `spaceFlex.attr`

获取或设置图表的配置项。

#### `spaceFlex.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/spec/data/overview)。
