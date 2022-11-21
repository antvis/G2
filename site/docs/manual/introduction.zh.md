---
title: 简介
order: 1
---

G2 是一个简洁的渐进式语法，主要用于制作基于网页的可视化。它提供了一套函数风格式、声明形式的 API 和组件化的编程范式，希望能帮助用户能快速完成**报表搭建**、**数据探索**、**可视化叙事**等多样化的需求。

这篇文章将给大家简单介绍一下 G2 的能力和以下核心概念：

- **标识（Mark）**：绘制数据驱动的图形
- **转换（Transform）**：派生数据
- **比例尺（Scale）**：将抽象的数据映射为视觉数据
- **坐标系（Coordinate**）：对空间通道应用点变换
- **视图复合（Composition）**：管理和增强视图
- **动画（Animation）**：数据驱动的动画和连续的形变动画
- **交互（Interaction）**： 操作视图并且展现详细信息

"Talk is cheap, show me the code"，那么接下来看看基于下面这个简单的数据集，G2 能做出什么可视化效果。

<img alt="data" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*U-tfTa2m98EAAAAAAAAAAAAADmJ7AQ/original" width="100%">

## 标识

**标识**是 G2 中最小的视觉单元，G2 中的所有图表都是由不同标识构成的。

<img alt="point" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*jT--SYkfcGoAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
// 创建标识
chart.point().data(data).encode('x', 'GDP').encode('y', 'LifeExpectancy');
```

## 转换

**转换**会改变数据和标识的展现形式，多用于数据分析。

<img alt="bin" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Wb8oTb-csMAAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .rect()
  .data(data)
  .encode('x', 'LifeExpectancy')
  .encode('color', 'Continent')
  .transform({ type: 'binX', y: 'count', thresholds: 10 }) // 声明转换
  .transform({ type: 'stackY' })
  .style({ insetLeft: 1 });
```

## 比例尺

比例尺用于控制标识的视觉样式。

<img alt="scale" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*I5rmTbr0350AAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .interval()
  .data(data)
  .transform({ type: 'groupX', y: 'count' })
  .encode('x', 'Continent')
  .encode('color', 'Continent')
  // 声明比例尺
  .scale('color', {
    range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#c564be'],
  });
```

## 坐标系

**坐标系**会改变图表的展示形式。

<img alt="coordinate" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Yr3FQZd0wc0AAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
// 声明坐标系
chart.coordinate({ type: 'parallel' });

chart
  .line()
  .data(data)
  .encode('position', ['Continent', 'LifeExpectancy', 'Population', 'GDP'])
  .encode('color', 'Continent')
  .style('strokeOpacity', 0.8);
```

## 视图复合

**视图复合**用于制作多视图图表。

<img alt="composition" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*owcrT7GY20sAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
// 声明复合方式
const rect = chart.facetRect().data(data).encode('x', 'Continent');

rect
  .point()
  .transform({ type: 'pack' })
  .encode('title', 'Country')
  .encode('shape', 'point');
```

## 动画

**动画**支持分组动画和关键帧动画。

<img alt="animation" src="https://gw.alipayobjects.com/zos/raptor/1668754073133/intro-animation.gif" width="640px">

```js
const keyframe = chart
  .timingKeyframe()
  .attr('iterationCount', 10)
  .attr('direction', 'alternate');

// The third scatterplot.
keyframe
  .point()
  .attr('paddingLeft', 50)
  .data(data)
  .transform({ type: 'stackEnter', groupBy: 'color' })
  .encode('x', 'GDP')
  .encode('y', 'LifeExpectancy')
  .encode('color', 'Continent')
  .encode('shape', 'point')
  .encode('groupKey', 'Continent')
  .encode('size', 'Population')
  .scale('size', { type: 'log', range: [4, 20] });

// The fourth aggregated barchart.
keyframe
  .interval()
  .data(data)
  .attr('paddingLeft', 50)
  .encode('x', 'Continent')
  .encode('key', 'Continent')
  .encode('color', 'Continent')
  .transform({ type: 'groupX', y: 'count' });
```

## 交互

交互可以按需探索数据。

<img alt="interaction" src="https://gw.alipayobjects.com/zos/raptor/1668754097488/intro-interaction.gif" width="640px">

```js
// 声明交互
chart.interaction({ type: 'fisheye' });

chart
  .point()
  .data(data)
  .encode('x', 'GDP')
  .encode('y', 'LifeExpectancy')
  .encode('size', 'Population')
  .encode('color', 'Continent')
  .encode('shape', 'point')
  .scale('size', { type: 'log', range: [4, 20] })
  .axis('x', { labelFormatter: '~s' })
  .style('fillOpacity', 0.3)
  .style('lineWidth', 1);
```

## 可视化语法

G2 名字和设计理念都来自于图形语法《[The Grammar of Graphisc](https://book.douban.com/subject/10123863/)》

该理论的核心在于：拒绝图表分类，用一些基本图形和一系列可视化组件（比例尺，坐标系等）去描述一个图表。得益于此，大大提高了 G2 能制作出图表的种类，也改变了 G2 使用者思考图表的方式：图表不再是一个不可分割的整体，而是可以被具有不同用途的标识组合出来的。

G2 的可视化语法在原本图形语法基础上做了以下的改变：

- 简化数据探索的语法
- 增加动画语法
- 增加单元可视化的语法
- 增加交互语法（还在开发中，正式版将和大家见面）

我们希望 G2 不仅仅能用于绘制图表，也能潜移默化地影响用户思考可视化的方式。
