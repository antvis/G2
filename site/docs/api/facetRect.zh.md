---
title: FacetRect
order: 6
---

## 开始使用

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 928,
  height: 270,
  paddingBottom: 50,
});

const facetRect = chart
  .facetRect()
  .attr('paddingBottom', 50)
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  })
  .encode('x', 'series');

facetRect
  .point()
  .attr('inset', 10)
  .encode('x', 'x')
  .encode('y', 'y')
  .style('stroke', '#000');

chart.render();
```

## 创建可视化

### `facetRect.interval`

添加 interval 图形，具体见 [mark](/manual/core/mark/interval)。

### `facetRect.rect`

添加 rect 图形，具体见 [mark](/manual/core/mark/rect)。

### `facetRect.point`

添加 point 图形，具体见 [mark](/manual/core/mark/point)。

### `facetRect.area`

添加 area 图形，具体见 [mark](/manual/core/mark/area)。

### `facetRect.line`

添加 line 图形，具体见 [mark](/manual/core/mark/line)。

### `facetRect.vector`

添加 vector 图形，具体见 [mark](/manual/core/mark/vector)。

### `facetRect.link`

添加 link 图形，具体见 [mark](/manual/core/mark/link)。

### `facetRect.polygon`

添加 polygon 图形，具体见 [mark](/manual/core/mark/polygon)。

### `facetRect.image`

添加 image 图形，具体见 [mark](/manual/core/mark/image)。

### `facetRect.text`

添加 text 图形，具体见 [mark](/manual/core/mark/text)。

### `facetRect.lineX`

添加 lineX 图形，具体见 [mark](/manual/core/mark/line-x)。

### `facetRect.lineY`

添加 lineY 图形，具体见 [mark](/manual/core/mark/line-y)。

### `facetRect.range`

添加 range 图形，具体见 [mark](/manual/core/mark/range)。

### `facetRect.rangeX`

添加 rangeX 图形，具体见 [mark](/manual/core/mark/range-x)。

### `facetRect.rangeY`

添加 rangeY 图形，具体见 [mark](/manual/core/mark/range-y)。

### `facetRect.connector`

添加 connector 图形。

### `facetRect.sankey`

添加 sankey 图形，具体见 [graph](/manual/extra-topics/graph/sankey)。

### `facetRect.treemap`

添加 treemap 图形，具体见 [graph](/manual/extra-topics/graph/treemap)。

### `facetRect.boxplot`

添加 boxplot 图形，具体见 [mark](/manual/core/mark/boxplot)。

### `facetRect.shape`

添加自定义图形，具体见 [mark](/manual/core/mark/shape)。

### `facetRect.pack`

添加 pack 图形，具体见 [graph](/manual/extra-topics/graph/pack)。

### `facetRect.forceGraph`

添加 forceGraph 图形，具体见 [graph](/manual/extra-topics/graph/force-graph)。

### `facetRect.tree`

添加 tree 图形，具体见 [graph](/manual/extra-topics/graph/tree)。

### `facetRect.wordCloud`

添加 wordCloud 图形，具体见 [mark](/manual/core/mark/wordcloud)。

### `facetRect.gauge`

添加 gauge 图形，具体见 [mark](/manual/core/mark/gauge)。

## 设置属性

### `facetRect.attr`

获取或设置图表的配置项。

### `facetRect.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/manual/core/data/overview)。

### `facetRect.scale`

设置图形每个通道的比例尺，具体见 [scale](/manual/core/scale/overview)。

### `facetRect.legend`

设置图形的图例，具体见 [legend](/manual/component/legend)。

### `facetRect.axis`

设置图形的坐标轴，具体见 [axis](/manual/component/axis)。

### `facetRect.style`

设置图形的样式，具体见 [style](/manual/core/style)。

### `facetRect.theme`

设置图形的主题，具体见 [theme](/manual/core/theme/overview)。
