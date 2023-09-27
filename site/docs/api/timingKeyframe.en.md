---
title: TimingKeyframe
order: 9
---

## start using

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

## Create a visualization

### `timingKeyFrame.interval`

Add interval graphics, see for details[mark](/spec/mark/interval)。

### `timingKeyFrame.rect`

Add rect graphics, see for details[mark](/spec/mark/rect)。

### `timingKeyFrame.point`

Add point graphics, see for details[mark](/spec/mark/point)。

### `timingKeyFrame.area`

Add area graphics, see for details[mark](/spec/mark/area)。

### `timingKeyFrame.line`

Add line graphics, see for details[mark](/spec/mark/line)。

### `timingKeyFrame.vector`

Add vector graphics, see details[mark](/spec/mark/vector)。

### `timingKeyFrame.link`

Add link graphics, see for details[mark](/spec/mark/link)。

### `timingKeyFrame.polygon`

Add polygon graphics, see details[mark](/spec/mark/polygon)。

### `timingKeyFrame.image`

Add image graphics, see for details[mark](/spec/mark/image)。

### `timingKeyFrame.text`

Add text graphics, see details[mark](/spec/mark/text)。

### `timingKeyFrame.lineX`

Add lineX graphics, see for details[mark](/spec/mark/line-x)。

### `timingKeyFrame.lineY`

Add lineY graphics, see for details[mark](/spec/mark/line-y)。

### `timingKeyFrame.range`

Add range graphics, see for details[mark](/spec/mark/range)。

### `timingKeyFrame.rangeX`

Add rangeX graphics, see for details[mark](/spec/mark/range-x)。

### `timingKeyFrame.rangeY`

Add rangeY graphics, see for details[mark](/spec/mark/range-y)。

### `timingKeyFrame.connector`

Add connector graphics, see for details[mark](/spec/mark/connector)。

### `timingKeyFrame.sankey`

Add sankey graphics, see details[graph](/spec/graph/sankey)。

### `timingKeyFrame.treemap`

Add treemap graphics, see details[graph](/spec/graph/treemap)。

### `timingKeyFrame.boxplot`

Add boxplot graphics, see[mark](/spec/mark/boxplot)。

### `timingKeyFrame.shape`

Add shape graphics, see for details[mark](/spec/mark/shape)。

### `timingKeyFrame.pack`

Add pack graphics, see[graph](/spec/graph/pack)。

### `timingKeyFrame.forceGraph`

Add forceGraph graph, see for details[graph](/spec/graph/force-graph)。

### `timingKeyFrame.tree`

Add tree graphics, see details[graph](/spec/graph/tree)。

### `timingKeyFrame.wordCloud`

Add wordCloud graphics, see details[mark](/spec/mark/word-cloud)。

### `timingKeyFrame.gauge`

Add gauge graphics, see for details[mark](/spec/mark/gauge)。

## Set properties

### `timingKeyFrame.attr`

Gets or sets the configuration items of the chart.
