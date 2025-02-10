---
title: 概览
order: 1
---

G2 中动画是可视化中很重要的一部分，可以提高可视化的表现力。动画可以声明在标记层级：

```js
({
  type: 'interval',
  animate: {
    enter: {
      type: 'scaleInX',
      duration: 100,
      delay: 10,
    },
    update: {
      type: 'morphing',
    },
  },
});
```

```js
// API
// 第一种方式
chart
  .interval()
  .animate('enter', { type: 'scaleInX', duration: 100, delay: 10 })
  .animate('update', { type: 'morphing' });

// 第二种方式
chart.interval().animate({
  enter: {
    type: 'scaleInX',
    duration: 100,
    delay: 10,
  },
  update: {
    type: 'morphing',
  },
});
```

## 动画属性

标记是通过 `mark.animate` 指定动画属性的，一共有三个部分的动画可以指定：

- **enter** - 新增的图形
- **update** - 更新的图形
- **exit** - 删除的图形

而每部分的动画有以下的属性：

- **type** - 种类
- **duration** - 持续时间
- **delay** - 延迟时间
- **easing** - 缓动函数

```js | ob
(() => {
  const chart = new G2.Chart();

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
    .animate('enter', {
      type: 'scaleInY', // 指定入场动画的类型
      duration: 1000, // 指定入场动画的执行时间
    });

  chart.render();

  return chart.getContainer();
})();
```

## 动画编码

在 G2 中动画属性可以作为一种通道，也可以编码数据。比如下面甘特图中，每个条的出现和持续时间是和数据线性相关的。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ transform: [{ type: 'transpose' }] })
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

  chart.render();

  return chart.getContainer();
})();
```

## 分组动画

G2 也提供了 StackEnter 标记转换来实现分组动画，该标记转换会先将图形进行分组，然后将它们的出现时间和持续时间在空间上进行堆叠，从而实现依次出现的效果。

```js | ob
(() => {
  const chart = new G2.Chart();

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

  chart.render();

  return chart.getContainer();
})();
```

## 关键帧动画

上面的动画都是过渡动画，不涉及到数据的更新，G2 也提供了制作关键帧动画的能力。使用 `chart.timingKeyframe` 创建一个时间容器，用于放置一系列视图，它会对这些视图中有关系的图形元素应用平滑的过渡效果。而对应关系通过 **key** 和 **groupKey** 两个通道指定。

```js | ob
(async () => {
  const data = await fetch(
    'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  ).then((res) => res.json());

  const chart = new G2.Chart();

  // 参考 css animation 的描述
  const keyframe = chart
    .timingKeyframe() // 创建容器
    .attr('iterationCount', 2) // 迭代次数
    .attr('direction', 'alternate') // 方向
    .attr('duration', 1000); // 持续时间

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

  chart.render();

  return chart.getContainer();
})();
```

## 时序动画

**时序动画（timingSequence）** 还在开发中，敬请期待。

## 开始使用

```ts
chart
  .interval()
  /* ... */
  .animate({
    /* options */
  });
```

## 选项

关于 `animate` API 的参数，有以下，主要 3 种动画场景（enter、update、exit）和 动画 5 个属性（type、duration、delay、easing、fill）的组合。

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----------------| ----------|
| enterType         | 动画类型                                                     | `Type`         |           |
| enterDuration     | 动画持续时间 (ms)                                             | `number`         |           |
| enterDelay        | 延迟执行时间 (ms)                                             | `number`         |           |
| enterEasing       | 动画的缓动函数                                                | `Easing`           |          |
| enterFill         | 动画处于非运行状态时的展示效果                                   | `Fill`           |           |
| updateType        | 动画类型                                                     | `Type`         |           |
| updateDuration    | 动画持续时间 (ms)                                             | `number`         |           |
| updateDelay       | 延迟执行时间 (ms)                                             | `number`         |           |
| updateEasing      | 动画的缓动函数                                                | `Easing`           |          |
| updateFill        | 动画处于非运行状态时的展示效果                                   | `Fill`           |           |
| exitType          | 动画类型                                                     | `Type`         |           |
| exitDuration      | 动画持续时间 (ms)                                             | `number`         |           |
| exitDelay         | 延迟执行时间 (ms)                                             | `number`         |           |
| exitEasing        | 动画的缓动函数                                                | `Easing`           |          |
| exitFill          | 动画处于非运行状态时的展示效果                                   | `Fill`           |           |

### 动画类型 Type

动画类型 `Type` 本质是设置动画的方式，会影响的视觉属性。这里具体可以看对应的文档 [Animation](/api/overview#animation)。当然也可以设置为 `null`，`undefined`，`false`，代表关闭动画。

### 缓动函数 Easing

缓动函数指定的是动画过程中，视觉属性变化的插值函数。支持以下内置缓动函数，来自 [easings](https://easings.net/)，也可以上这个网站预览动画缓动的效果。

| constant   | accelerate         | decelerate     | accelerate-decelerate | decelerate-accelerate |
| ---------- | ------------------ | -------------- | --------------------- | --------------------- |
| linear     | ease-in / in       | ease-out / out | ease-in-out / in-out  | ease-out-in / out-in  |
| ease       | in-sine            | out-sine       | in-out-sine           | out-in-sine           |
| steps      | in-quad            | out-quad       | in-out-quad           | out-in-quad           |
| step-start | in-cubic           | out-cubic      | in-out-cubic          | out-in-cubic          |
| step-end   | in-quart           | out-quart      | in-out-quart          | out-in-quart          |
|            | in-quint           | out-quint      | in-out-quint          | out-in-quint          |
|            | in-expo            | out-expo       | in-out-expo           | out-in-expo           |
|            | in-circ            | out-circ       | in-out-circ           | out-in-circ           |
|            | in-back            | out-back       | in-out-back           | out-in-back           |
|            | in-bounce          | out-bounce     | in-out-bounce         | out-in-bounce         |
|            | in-elastic         | out-elastic    | in-out-elastic        | out-in-elastic        |
|            | spring / spring-in | spring-out     | spring-in-out         | spring-out-in         |

除此之外，还可以通过 `cubic-bezier(<number>, <number>, <number>, <number>)` 自定义形如三次贝塞尔曲线的函数。以上部分内置函数也是通过它定义完成的，例如 `ease-in-sine = cubic-bezier(0.47, 0, 0.745, 0.715)`。

### 动画填充 Fill

该属性规定了图形在动画处于非运行状态（例如动画开始前，结束后）时的展示效果，可以参考 [WebAPI](https://developer.mozilla.org/en-US/docs/Web/API/EffectTiming/fill) 规范。支持以下值：

- `auto/none` - 默认值，这意味着动画在第一帧开始前和最后一帧结束后都不会影响到图形的展示效果。例如在动画完成后图形会恢复到动画前状态，如果设置了 delay 在延迟期间也不会应用第一帧的效果。
- `forwards` - 动画完成后停住，不恢复到初始状态
- `backwards` - 动画开始前应用第一帧效果
- `both` - 为 forwards 和 backwards 的组合效果

