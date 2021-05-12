---
title: Element
order: 3
---

## 为什么要增加 Element

在 G2 2.x 和 3.x 中，用户操作的对象是 Chart，仅仅有限的用户会接触自定义 Shape 中图形元素的创建，用户仅仅进行图表的渲染，使用默认的几个交互时还能满足需求，但是当需求一旦复杂，直接操作图形元素的弊端就会显现，也无法实现局部数据的更新。我们增加 Element 主要解决几个问题：

- 让操作图形更加简单，用户不需要理解底层的绘图代码也可以实现图形的操作。
- 增加更多操作的可能性。

## 什么是 Element

目前 G2 上仅有 Chart、View 和 Geometry 三层容器，而一个 geometry 下会根据视觉通道 color，size，shape 对数据进行分组，然后进行绘制。一组数据在不同的 geometry 上的渲染方式不同，在点图上一条数据会对应一个点，柱状图每条数据对应一个柱子，线图则是一组数据对应一条折线，Element 即一条/一组数据对应的图形元素，它代表一条数据或者一个数据集，在图形层面，它可以是单个 Shape 也可以是多个 Shape，我们称之为**图形元素**。所以 Element 可以分为单条数据对应的 Element 和集合数据对应的 Element。

> 注意：这里指的图形元素是能够代表一条数据或者集合数据的图形，不一定仅仅对应 canvas 上的一个 shape ，有可能会有多个 shape。

### 单数据对应的 Element

G2 上单条数据对应的 Element 被下面几种 Geometry 拥有：

- point
- interval
- polygon
- schema
- edge

####

### 集合数据对应的 Element

下面几种 Geometry 的 Element 包含多条数据：

- line
- path
- area

> 对于 heatmap，因为是通过 canvas 下一整张 image 对象实现的，所以没有对应的 Element 实例。

## Element 职责

Element 主要职责如下：

- 绘制 Shape
- 更新 Shape，当对应的 Element 数据发生更新时，更新对应的 shape（而不是销毁再创建）
- 销毁 Shape
- Shape 状态管理

G2 默认提供了三种图形状态：active、selected 以及 inactive，对于 Element 来说这三种状态都是相互独立的，即用户开启了 active 状态之后又开启了 selected 状态，element 就会在 active 的状态上叠加 selected 状态，交互状态之间的关联全部交由具体的交互行为负责，所以我们除了提供 `setState()` 方法外，还会提供 `clearState()` `hasState()` 方法。

```typescript
element.setState('active', true); // 开启 active 状态
```

关于 Element 详细的接口，后续会上新文档，敬请期待。

## Element 相关操作

1. 如何获取 Element 实例

```typescript
// 创建 Interval
const interval = chart.interval().position('x*y');

chart.render();

// 获取 Interval 下的 Element 实例
const elements = interval.elements;

// 根据特定的条件查找 Element 实例
const someElements = interval.getElementsBy((element) => {
  const data = element.getData();
  return data.x === 'a';
});
```

2. 通过 Element 操纵图形状态

```typescript
const interval = chart.interval().position('x*y');

// 将 Interval 的第一个 Element 实例设置为 active 状态
interval.elements[0].setState('active', false);
```

3. 修改 Element 图形元素的状态样式

```typescript
chart
  .interval()
  .position('x*y')
  .state({
    active: {
      style: {
        lineWidth: 2,
        stroke: '#000',
      },
    },
  });
```
