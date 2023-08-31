---
title: SpaceLayer
order: 5
---

## 开始使用

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

## 创建可视化

### `spaceLayer.interval`

添加 interval 图形，具体见 [mark](/spec/mark/interval)。

### `spaceLayer.rect`

添加 rect 图形，具体见 [mark](/spec/mark/rect)。

### `spaceLayer.point`

添加 point 图形，具体见 [mark](/spec/mark/point)。

### `spaceLayer.area`

添加 area 图形，具体见 [mark](/spec/mark/area)。

### `spaceLayer.line`

添加 line 图形，具体见 [mark](/spec/mark/line)。

### `spaceLayer.vector`

添加 vector 图形，具体见 [mark](/spec/mark/vector)。

### `spaceLayer.link`

添加 link 图形，具体见 [mark](/spec/mark/link)。

### `spaceLayer.polygon`

添加 polygon 图形，具体见 [mark](/spec/mark/polygon)。

### `spaceLayer.image`

添加 image 图形，具体见 [mark](/spec/mark/image)。

### `spaceLayer.text`

添加 text 图形，具体见 [mark](/spec/mark/text)。

### `spaceLayer.lineX`

添加 lineX 图形，具体见 [mark](/spec/mark/line-x)。

### `spaceLayer.lineY`

添加 lineY 图形，具体见 [mark](/spec/mark/line-y)。

### `spaceLayer.range`

添加 range 图形，具体见 [mark](/spec/mark/range)。

### `spaceLayer.rangeX`

添加 rangeX 图形，具体见 [mark](/spec/mark/range-x)。

### `spaceLayer.rangeY`

添加 rangeY 图形，具体见 [mark](/spec/mark/range-y)。

### `spaceLayer.connector`

添加 connector 图形，具体见 [mark](/spec/mark/connector)。

### `spaceLayer.sankey`

添加 sankey 图形，具体见 [graph](/spec/graph/sankey)。

### `spaceLayer.treemap`

添加 treemap 图形，具体见 [graph](/spec/graph/treemap)。

### `spaceLayer.boxplot`

添加 boxplot 图形，具体见 [mark](/spec/mark/boxplot)。

### `spaceLayer.shape`

添加 shape 图形，具体见 [mark](/spec/mark/shape)。

### `spaceLayer.pack`

添加 pack 图形，具体见 [graph](/spec/graph/pack)。

### `spaceLayer.forceGraph`

添加 forceGraph 图形，具体见 [graph](/spec/graph/force-graph)。

### `spaceLayer.tree`

添加 tree 图形，具体见 [graph](/spec/graph/tree)。

### `spaceLayer.wordCloud`

添加 wordCloud 图形，具体见 [mark](/spec/mark/word-cloud)。

### `spaceLayer.gauge`

添加 gauge 图形，具体见 [mark](/spec/mark/gauge)。

## 设置属性

### `spaceLayer.attr`

获取或设置图表的配置项。

### `spaceLayer.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/spec/data/overview)。
