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

添加 interval 图形，具体见 [mark](/manual/core/mark/interval)。

### `repeatMatrix.rect`

添加 rect 图形，具体见 [mark](/manual/core/mark/rect)。

### `repeatMatrix.point`

添加 point 图形，具体见 [mark](/manual/core/mark/point)。

### `repeatMatrix.area`

添加 area 图形，具体见 [mark](/manual/core/mark/area)。

### `repeatMatrix.line`

添加 line 图形，具体见 [mark](/manual/core/mark/line)。

### `repeatMatrix.vector`

添加 vector 图形，具体见 [mark](/manual/core/mark/vector)。

### `repeatMatrix.link`

添加 link 图形，具体见 [mark](/manual/core/mark/link)。

### `repeatMatrix.polygon`

添加 polygon 图形，具体见 [mark](/manual/core/mark/polygon)。

### `repeatMatrix.image`

添加 image 图形，具体见 [mark](/manual/core/mark/image)。

### `repeatMatrix.text`

添加 text 图形，具体见 [mark](/manual/core/mark/text)。

### `repeatMatrix.lineX`

添加 lineX 图形，具体见 [mark](/manual/core/mark/line-x)。

### `repeatMatrix.lineY`

添加 lineY 图形，具体见 [mark](/manual/core/mark/line-y)。

### `repeatMatrix.range`

添加 range 图形，具体见 [mark](/manual/core/mark/range)。

### `repeatMatrix.rangeX`

添加 rangeX 图形，具体见 [mark](/manual/core/mark/range-x)。

### `repeatMatrix.rangeY`

添加 rangeY 图形，具体见 [mark](/manual/core/mark/range-y)。

### `repeatMatrix.connector`

添加 connector 图形。

### `repeatMatrix.sankey`

添加 sankey 图形，具体见 [graph](/manual/extra-topics/graph/sankey)。

### `repeatMatrix.treemap`

添加 treemap 图形，具体见 [graph](/manual/extra-topics/graph/treemap)。

### `repeatMatrix.boxplot`

添加 boxplot 图形，具体见 [mark](/manual/core/mark/boxplot)。

### `repeatMatrix.shape`

添加自定义图形，具体见 [mark](/manual/core/mark/shape)。

### `repeatMatrix.pack`

添加 pack 图形，具体见 [graph](/manual/extra-topics/graph/pack)。

### `repeatMatrix.forceGraph`

添加 forceGraph 图形，具体见 [graph](/manual/extra-topics/graph/force-graph)。

### `repeatMatrix.tree`

添加 tree 图形，具体见 [graph](/manual/extra-topics/graph/tree)。

### `repeatMatrix.wordCloud`

添加 wordCloud 图形，具体见 [mark](/manual/core/mark/wordcloud)。

### `repeatMatrix.gauge`

添加 gauge 图形，具体见 [mark](/manual/core/mark/gauge)。

## 设置属性

### `repeatMatrix.attr`

获取或设置图表的配置项。

### `repeatMatrix.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/manual/core/data/overview)。

### `repeatMatrix.encode`

设置图形每个通道的字段名称，具体见 [encode](/manual/core/encode)。

### `repeatMatrix.scale`

设置图形每个通道的比例尺，具体见 [scale](/manual/core/scale/overview)。

### `repeatMatrix.legend`

设置图形的图例，具体见 [legend](/manual/component/legend)。

### `repeatMatrix.tooltip`

设置图形的提示 [tooltip](/manual/component/tooltip)。

### `repeatMatrix.axis`

设置图形的坐标轴，具体见 [axis](/manual/component/axis)。

### `repeatMatrix.slider`

设置图形的缩略轴，具体见 [slider](/manual/component/slider)。

### `repeatMatrix.label`

设置图形的标签，具体见 [label](/manual/component/label)。

### `repeatMatrix.style`

设置图形的样式，具体见 [style](/manual/core/style)。

### `repeatMatrix.theme`

设置图形的主题，具体见 [theme](/manual/core/theme/overview)。
