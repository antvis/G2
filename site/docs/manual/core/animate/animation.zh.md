---
title: 动画（Animate）
order: 6.8
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
