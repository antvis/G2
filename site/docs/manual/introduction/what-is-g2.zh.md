---
title: 什么是 G2
order: 1
---

**G2** 是一个简洁的渐进式语法，主要用于制作基于网页的可视化。它提供了一套函数风格式、声明形式的 API 和组件化的编程范式，希望能帮助用户能快速完成**报表搭建**、**数据探索**、**可视化叙事**等多样化的需求。

这篇文章将给大家简单介绍一下 G2 的核心概念：

- **标记（Mark）**：绘制数据驱动的图形
- **转换（Transform）**：派生数据
- **比例尺（Scale）**：将抽象的数据映射为视觉数据
- **坐标系（Coordinate**）：对空间通道应用点变换
- **视图复合（Composition）**：管理和增强视图
- **动画（Animation）**：数据驱动的动画和连续的形变动画
- **交互（Interaction）**： 操作视图并且展现详细信息

"Talk is cheap, show me the code"，那么接下来看看基于下面这个简单的数据集，G2 能做出什么可视化效果。

```js | ob { pin: false }
table({
  url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
});
```

:::info{title=提示}
在 G2 官网的文档中，特定代码块会挂载其返回的 DOM，并在网页中展示。

```js
(() => {
  const chart = new G2.Chart();
  // ...
  return chart.getContainer(); // 挂载图表的容器
})();
```

这是在 G2 官网特定运行环境的语法，在实际项目中使用 G2 请参考[快速上手](/manual/quick-start)。
:::

## 标记（Mark）

**标记**是 G2 中最小的视觉单元，G2 中的所有图表都是由不同标记构成的。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'weight')
    .encode('y', 'height')
    .encode('color', 'gender');

  chart.render();

  return chart.getContainer();
})();
```

## 转换（Transform）

**转换**会改变数据和标记的展现形式，多用于数据分析。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'height')
    .encode('color', 'gender')
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY' })
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

## 比例尺（Scale）

**比例尺**用于控制标记的视觉样式。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'height')
    .encode('color', 'gender')
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY' })
    .scale('color', { range: ['steelblue', 'orange'] })
    .scale('y', { nice: true })
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

## 坐标系（Coordinate）

**坐标系**会改变图表的展示形式。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'height')
    .encode('color', 'gender')
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY' })
    .scale('color', { range: ['steelblue', 'orange'] })
    .scale('y', { type: 'sqrt', nice: true })
    .coordinate({ type: 'polar' })
    .axis('y', { title: false })
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

## 视图复合（Composition）

**视图复合**用于制作多视图图表。

```js | ob
(() => {
  const chart = new G2.Chart({
    paddingLeft: 60,
    
  });

  const facet = chart
    .facetRect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('y', 'gender');

  facet
    .rect()
    .encode('x', 'height')
    .encode('color', 'gender')
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY' })
    .scale('y', { nice: true })
    .attr('frame', false)
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

## 动画（Animation）

**动画**支持分组动画和关键帧动画。可以点击左边的运行按钮看效果。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'height')
    .encode('color', 'gender')
    .encode('enterDuration', 1000)
    .transform({ type: 'stackEnter', groupBy: ['color'] })
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY' })
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

```js | ob
(async () => {
  const data = await fetch(
    'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  ).then((res) => res.json());

  const chart = new G2.Chart();

  const keyframe = chart
    .timingKeyframe()
    .attr('direction', 'alternate')
    .attr('iterationCount', 4);

  keyframe
    .interval()
    .attr('padding', 'auto')
    .data(data)
    .encode('x', 'gender')
    .encode('color', 'gender')
    .encode('key', 'gender')
    .transform({ type: 'groupX', y: 'count' });

  keyframe
    .point()
    .attr('padding', 'auto')
    .data(data)
    .encode('x', 'weight')
    .encode('y', 'height')
    .encode('color', 'gender')
    .encode('groupKey', 'gender')
    .encode('shape', 'point');

  chart.render();

  return chart.getContainer();
})();
```

## 交互（Interaction）

交互可以按需探索数据。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'weight')
    .encode('y', 'height')
    .encode('color', 'gender')
    .encode('shape', 'point')
    .style({
      fillOpacity: 0.7,
      transform: 'scale(1, 1)',
      transformOrigin: 'center center',
    })
    .state('inactive', {
      fill: 'black',
      fillOpacity: 0.5,
      transform: 'scale(0.5, 0.5)',
    })
    .interaction('brushXHighlight', true);

  chart.render();

  return chart.getContainer();
})();
```

## 更多能力

因为 G2 的标记是可以组合的，同时提供了**复合标记**的机制去扩展 G2，所以你基本上可以快速绘制任意的可视化。在[案例页面](/examples)你可以获得更多灵感，也可以通过文档全面了解 G2 的能力。
