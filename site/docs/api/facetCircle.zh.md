---
title: FacetCircle
order: 7
---

## 开始使用

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

## 创建可视化

### `facetCircle.interval`

添加 interval 图形，具体见 [mark](/spec/mark/interval)。

### `facetCircle.rect`

添加 rect 图形，具体见 [mark](/spec/mark/rect)。

### `facetCircle.point`

添加 point 图形，具体见 [mark](/spec/mark/point)。

### `facetCircle.area`

添加 area 图形，具体见 [mark](/spec/mark/area)。

### `facetCircle.line`

添加 line 图形，具体见 [mark](/spec/mark/line)。

### `facetCircle.vector`

添加 vector 图形，具体见 [mark](/spec/mark/vector)。

### `facetCircle.link`

添加 link 图形，具体见 [mark](/spec/mark/link)。

### `facetCircle.polygon`

添加 polygon 图形，具体见 [mark](/spec/mark/polygon)。

### `facetCircle.image`

添加 image 图形，具体见 [mark](/spec/mark/image)。

### `facetCircle.text`

添加 text 图形，具体见 [mark](/spec/mark/text)。

### `facetCircle.lineX`

添加 lineX 图形，具体见 [mark](/spec/mark/line-x)。

### `facetCircle.lineY`

添加 lineY 图形，具体见 [mark](/spec/mark/line-y)。

### `facetCircle.range`

添加 range 图形，具体见 [mark](/spec/mark/range)。

### `facetCircle.rangeX`

添加 rangeX 图形，具体见 [mark](/spec/mark/range-x)。

### `facetCircle.rangeY`

添加 rangeY 图形，具体见 [mark](/spec/mark/range-y)。

### `facetCircle.connector`

添加 connector 图形，具体见 [mark](/spec/mark/connector)。

### `facetCircle.sankey`

添加 sankey 图形，具体见 [graph](/spec/graph/sankey)。

### `facetCircle.treemap`

添加 treemap 图形，具体见 [graph](/spec/graph/treemap)。

### `facetCircle.boxplot`

添加 boxplot 图形，具体见 [mark](/spec/mark/boxplot)。

### `facetCircle.shape`

添加 shape 图形，具体见 [mark](/spec/mark/shape)。

### `facetCircle.pack`

添加 pack 图形，具体见 [graph](/spec/graph/pack)。

### `facetCircle.forceGraph`

添加 forceGraph 图形，具体见 [graph](/spec/graph/force-graph)。

### `facetCircle.tree`

添加 tree 图形，具体见 [graph](/spec/graph/tree)。

### `facetCircle.wordCloud`

添加 wordCloud 图形，具体见 [mark](/spec/mark/word-cloud)。

### `facetCircle.gauge`

添加 gauge 图形，具体见 [mark](/spec/mark/gauge)。

## 设置属性

### `facetCircle.attr`

获取或设置图表的配置项。

### `facetCircle.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/spec/data/overview)。

### `facetCircle.scale`

设置图形每个通道的比例尺，具体见 [scale](/spec/overview#scale)。

### `facetCircle.legend`

设置图形的图例，具体见 [legend](/spec/component/legend)。

### `facetCircle.axis`

设置图形的坐标轴，具体见 [axis](/spec/component/axis)。

### `facetCircle.style`

设置图形的样式，具体见 [style](/spec/common/style)。

### `facetCircle.theme`

设置图形的主题，具体见 [theme](/spec/theme/overview)。
