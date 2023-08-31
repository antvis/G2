---
title: RepeatMatrix
order: 8
---

## 开始使用

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

## 创建可视化

### `repeatMatrix.interval`

添加 interval 图形，具体见 [mark](/spec/mark/interval)。

### `repeatMatrix.rect`

添加 rect 图形，具体见 [mark](/spec/mark/rect)。

### `repeatMatrix.point`

添加 point 图形，具体见 [mark](/spec/mark/point)。

### `repeatMatrix.area`

添加 area 图形，具体见 [mark](/spec/mark/area)。

### `repeatMatrix.line`

添加 line 图形，具体见 [mark](/spec/mark/line)。

### `repeatMatrix.vector`

添加 vector 图形，具体见 [mark](/spec/mark/vector)。

### `repeatMatrix.link`

添加 link 图形，具体见 [mark](/spec/mark/link)。

### `repeatMatrix.polygon`

添加 polygon 图形，具体见 [mark](/spec/mark/polygon)。

### `repeatMatrix.image`

添加 image 图形，具体见 [mark](/spec/mark/image)。

### `repeatMatrix.text`

添加 text 图形，具体见 [mark](/spec/mark/text)。

### `repeatMatrix.lineX`

添加 lineX 图形，具体见 [mark](/spec/mark/line-x)。

### `repeatMatrix.lineY`

添加 lineY 图形，具体见 [mark](/spec/mark/line-y)。

### `repeatMatrix.range`

添加 range 图形，具体见 [mark](/spec/mark/range)。

### `repeatMatrix.rangeX`

添加 rangeX 图形，具体见 [mark](/spec/mark/range-x)。

### `repeatMatrix.rangeY`

添加 rangeY 图形，具体见 [mark](/spec/mark/range-y)。

### `repeatMatrix.connector`

添加 connector 图形，具体见 [mark](/spec/mark/connector)。

### `repeatMatrix.sankey`

添加 sankey 图形，具体见 [graph](/spec/graph/sankey)。

### `repeatMatrix.treemap`

添加 treemap 图形，具体见 [graph](/spec/graph/treemap)。

### `repeatMatrix.boxplot`

添加 boxplot 图形，具体见 [mark](/spec/mark/boxplot)。

### `repeatMatrix.shape`

添加 shape 图形，具体见 [mark](/spec/mark/shape)。

### `repeatMatrix.pack`

添加 pack 图形，具体见 [graph](/spec/graph/pack)。

### `repeatMatrix.forceGraph`

添加 forceGraph 图形，具体见 [graph](/spec/graph/force-graph)。

### `repeatMatrix.tree`

添加 tree 图形，具体见 [graph](/spec/graph/tree)。

### `repeatMatrix.wordCloud`

添加 wordCloud 图形，具体见 [mark](/spec/mark/word-cloud)。

### `repeatMatrix.gauge`

添加 gauge 图形，具体见 [mark](/spec/mark/gauge)。

## 设置属性

### `repeatMatrix.attr`

获取或设置图表的配置项。

### `repeatMatrix.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/spec/data/overview)。

### `repeatMatrix.encode`

设置图形每个通道的字段名称，具体见 [encode](/api/encode/overview)。

### `repeatMatrix.scale`

设置图形每个通道的比例尺，具体见 [scale](/spec/overview#scale)。

### `repeatMatrix.legend`

设置图形的图例，具体见 [legend](/spec/component/legend)。

### `repeatMatrix.tooltip`

设置图形的 Tooltip，具体见 [tooltip](/spec/component/tooltip)。

### `repeatMatrix.axis`

设置图形的坐标轴，具体见 [axis](/spec/component/axis)。

### `repeatMatrix.slider`

设置图形的坐标轴，具体见 [slider](/spec/component/slider)。

### `repeatMatrix.label`

设置图形的标签，具体见 [label](/spec/label/overview)。

### `repeatMatrix.style`

设置图形的样式，具体见 [style](/spec/common/style)。

### `repeatMatrix.theme`

设置图形的主题，具体见 [theme](/spec/theme/overview)。
