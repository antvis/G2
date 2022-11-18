---
title: 动画
order: 6
---

动画是可视化中很重要的一部分，可以提高可视化的表现力。

## 动画属性

标识是通过 `mark.animate` 指定动画属性的，一共有三个部分的动画可以指定：

- **enter** - 新增的图形
- **update** - 更新的图形
- **exit** - 删除的图形

而每部分的动画有以下的属性：

- **type** - 种类
- **duration** - 持续时间
- **delay** - 延迟时间
- **easing** - 缓动函数

一个完整的动画属性的形式是 `${type}${Attribute}`，比如 `enterType`。

<img alt="animation-scale-in-y" src="https://gw.alipayobjects.com/zos/raptor/1668747253595/animation-scale-in-y.gif" width="640">

```js
chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre')
  .animate('enterType', 'scaleInY') // 指定入场动画的类型
  .animate('enterDuration', 1000); // 指定入场动画的执行时间
```

## 动画编码

在 G2 中动画属性也可以作为一种通道，也可以编码数据。比如下面甘特图中，每个条的出现和持续时间是和数据线性相关的。

<img alt="bar-range-stack-enter" src="https://gw.alipayobjects.com/zos/raptor/1668747204996/bar-range-stack-enter.gif" width="640">

```js
chart
  .interval()
  .data([
    { name: 'event planning', startTime: 1, endTime: 4 },
    { name: 'layout logistics', startTime: 3, endTime: 13 },
    { name: 'select vendors', startTime: 5, endTime: 8 },
    { name: 'hire venue', startTime: 9, endTime: 13 },
    { name: 'hire caterer', startTime: 10, endTime: 14 },
    { name: 'hire event decorators', startTime: 12, endTime: 17 },
    { name: 'rehearsal', startTime: 14, endTime: 16 },
    { name: 'event celebration', startTime: 17, endTime: 18 },
  ])
  .encode('x', 'name')
  .encode('y', ['endTime', 'startTime'])
  .encode('color', 'name')
  .encode('enterDuration', (d) => d.endTime - d.startTime) // 计算持续时间，并且编码
  .encode('enterDelay', 'startTime'); // 指定出现的时间，并且编码
```

## 分组动画

G2 也提供了 stackEnter 标识转换来实现分组动画，该标识转换会先将图形进行分组，然后将它们的出现时间和持续时间在空间上进行堆叠，从而实现依次出现的效果。

<img alt="bar-stack-enter" src="https://gw.alipayobjects.com/zos/raptor/1668747160997/bar-stack-enter.gif" width="640">

```js
chart
  .interval()
  .data([
    { type: 'Apple', year: '2001', value: 260 },
    { type: 'Orange', year: '2001', value: 100 },
    { type: 'Banana', year: '2001', value: 90 },
    { type: 'Apple', year: '2002', value: 210 },
    { type: 'Orange', year: '2002', value: 150 },
    { type: 'Banana', year: '2002', value: 30 },
  ])
  // 按照颜色分组，依次出现
  .transform({ type: 'stackEnter', groupBy: 'color' })
  .encode('x', 'year')
  .encode('y', 'value')
  .encode('color', 'type')
  .encode('series', 'type')
  .encode('enterDuration', 1000); // 每一组的持续时间为 1000
```

## 关键帧动画

上面的动画都是过度动画，不涉及到数据的更新，G2 也提供了制作关键帧动画的能力。使用 `chart.timingKeyframe` 创建一个时间容器，用于放置一系列视图，它会对这些视图中有关系的图形元素应用平滑的过渡效果。而对应关系通过 **key** 和 **groupKey** 两个通道指定。

<img alt="keyframe-split-and-merge" src="https://gw.alipayobjects.com/zos/raptor/1668748141424/keyframe-split-and-merge.gif" width="640">

```js
const data = await fetch('data/people.json').then((res) => res.json());

// 参考 css animation 的描述
const keyframe = chart
  .timingKeyframe() // 创建容器
  .iterationCount(2) // 迭代次数
  .direction('alternate') // 方向
  .duration(1000); // 持续时间

keyframe
  .interval()
  .transform({ type: 'groupX', y: 'mean' })
  .data(data)
  .encode('x', 'gender')
  .encode('y', 'weight')
  .encode('color', 'gender')
  .encode('key', 'gender'); // 指定 key

keyframe
  .point()
  .data(data)
  .encode('x', 'height')
  .encode('y', 'weight')
  .encode('color', 'gender')
  .encode('shape', 'point')
  .encode('groupKey', 'gender'); // 指定 groupKey
```

## 时序动画

**时序动画（timingSequence）** 还在开发中，敬请期待。
