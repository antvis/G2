---
title: 关键帧动画视图 - TimingKeyFrame
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
  theme: 'classic',
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

## TimingKeyFrame API

### 创建可视化

#### `timingKeyFrame.[mark]`

设置图表的 Mark 标记，具体见 [mark](/api/mark/area)。

### 设置属性

#### `timingKeyFrame.attr`

获取或设置图表的配置项。
