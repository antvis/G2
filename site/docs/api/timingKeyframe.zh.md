---
title: TimingKeyframe
order: 9
---

## 开始使用

```js
import { Chart } from '@antv/g2';

const sex = [
  { city: 'A', sex: '男', value: 52 },
  { city: 'A', sex: '女', value: 48 },
  { city: 'B', sex: '男', value: 130 },
  { city: 'B', sex: '女', value: 70 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingTop: 60,
  paddingLeft: 100,
});

const keyframe = chart.timingKeyframe();

keyframe
  .interval()
  .data(sex)
  .transform({ type: 'groupX', y: 'sum' })
  .encode('x', 'city')
  .encode('y', 'value')
  .encode('key', 'city');

keyframe
  .interval()
  .data(sex)
  .transform({ type: 'dodgeX' })
  .encode('x', 'city')
  .encode('y', 'value')
  .encode('color', 'sex')
  .encode('groupKey', 'city');

chart.render();
```

## 创建可视化

### `timingKeyFrame.interval`

添加 interval 图形，具体见 [mark](/spec/mark/interval)。

### `timingKeyFrame.rect`

添加 rect 图形，具体见 [mark](/spec/mark/rect)。

### `timingKeyFrame.point`

添加 point 图形，具体见 [mark](/spec/mark/point)。

### `timingKeyFrame.area`

添加 area 图形，具体见 [mark](/spec/mark/area)。

### `timingKeyFrame.line`

添加 line 图形，具体见 [mark](/spec/mark/line)。

### `timingKeyFrame.vector`

添加 vector 图形，具体见 [mark](/spec/mark/vector)。

### `timingKeyFrame.link`

添加 link 图形，具体见 [mark](/spec/mark/link)。

### `timingKeyFrame.polygon`

添加 polygon 图形，具体见 [mark](/spec/mark/polygon)。

### `timingKeyFrame.image`

添加 image 图形，具体见 [mark](/spec/mark/image)。

### `timingKeyFrame.text`

添加 text 图形，具体见 [mark](/spec/mark/text)。

### `timingKeyFrame.lineX`

添加 lineX 图形，具体见 [mark](/spec/mark/line-x)。

### `timingKeyFrame.lineY`

添加 lineY 图形，具体见 [mark](/spec/mark/line-y)。

### `timingKeyFrame.range`

添加 range 图形，具体见 [mark](/spec/mark/range)。

### `timingKeyFrame.rangeX`

添加 rangeX 图形，具体见 [mark](/spec/mark/range-x)。

### `timingKeyFrame.rangeY`

添加 rangeY 图形，具体见 [mark](/spec/mark/range-y)。

### `timingKeyFrame.connector`

添加 connector 图形，具体见 [mark](/spec/mark/connector)。

### `timingKeyFrame.sankey`

添加 sankey 图形，具体见 [graph](/spec/graph/sankey)。

### `timingKeyFrame.treemap`

添加 treemap 图形，具体见 [graph](/spec/graph/treemap)。

### `timingKeyFrame.boxplot`

添加 boxplot 图形，具体见 [mark](/spec/mark/boxplot)。

### `timingKeyFrame.shape`

添加 shape 图形，具体见 [mark](/spec/mark/shape)。

### `timingKeyFrame.pack`

添加 pack 图形，具体见 [graph](/spec/graph/pack)。

### `timingKeyFrame.forceGraph`

添加 forceGraph 图形，具体见 [graph](/spec/graph/force-graph)。

### `timingKeyFrame.tree`

添加 tree 图形，具体见 [graph](/spec/graph/tree)。

### `timingKeyFrame.wordCloud`

添加 wordCloud 图形，具体见 [mark](/spec/mark/word-cloud)。

### `timingKeyFrame.gauge`

添加 gauge 图形，具体见 [mark](/spec/mark/gauge)。

## 设置属性

### `timingKeyFrame.attr`

获取或设置图表的配置项。
