---
title: 视图复合
order: 5
---

**视图复合（View Composition）** 提供了在一个可视化中绘制多个图表的能力。G2 定义了一个**视图树（View Graph）** 去描述**多视图图表（Multi-View Plot）**，通过 `composition.[node]` 的形式去声明层次结构。

## 空间

最基础的视图复合方式就是**空间复合（Space Composition）**，只是对空间进行划分。

一个比较常见的复合方式是 `chart.facetLayer`：将多个图表重叠在一起。使用场景是这些视图拥有的不同的坐标系，比如下面的条形图和饼图。

<img alt="space" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*SFM9T40m2cEAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
const layer = chart.spaceLayer();

// 条形图
layer
  .interval()
  .data([
    { genre: 'Shooter', sold: 350 },
    { genre: 'Sports', sold: 275 },
    { genre: 'Other', sold: 150 },
    { genre: 'Action', sold: 120 },
    { genre: 'Strategy', sold: 115 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold');

// 饼图
layer
  .interval() // 创建一个 interval
  .attr('paddingLeft', 300) // 设置位置
  .attr('paddingBottom', 250)
  .coordinate({ type: 'theta' }) // 指定坐标系
  .transform({ type: 'stackY' })
  .data([
    { genre: 'Shooter', sold: 350 },
    { genre: 'Sports', sold: 275 },
    { genre: 'Other', sold: 150 },
    { genre: 'Action', sold: 120 },
    { genre: 'Strategy', sold: 115 },
  ])
  .encode('y', 'sold')
  .encode('color', 'genre')
  .legend('color', false);
```

同时也可以使用 `chart.spaceFlex` 去让视图水平或者竖直排列。

<img alt="flex" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ycN9TY08CCIAAAAAAAAAAAAADmJ7AQ/original" width="800px">

```js
const flex = chart.spaceFlex();

// 条形图
flex
  .interval()
  .data([
    { genre: 'Shooter', sold: 350 },
    { genre: 'Sports', sold: 275 },
    { genre: 'Other', sold: 150 },
    { genre: 'Action', sold: 120 },
    { genre: 'Strategy', sold: 115 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold');

// 饼图
flex
  .interval() // 创建一个 interval
  .coordinate({ type: 'theta' }) // 指定坐标系
  .transform({ type: 'stackY' })
  .data([
    { genre: 'Shooter', sold: 350 },
    { genre: 'Sports', sold: 275 },
    { genre: 'Other', sold: 150 },
    { genre: 'Action', sold: 120 },
    { genre: 'Strategy', sold: 115 },
  ])
  .encode('y', 'sold')
  .encode('color', 'genre')
  .legend('color', false);
```

同时这些复合方式是可以嵌套的，所以很容易通过一个单独的声明去实现一个报表。

## 分面

**分面复合（Facet Composition）** 和空间复合的不同在于：它还会对数据划分，每个视图展现原始数据的一个子集。

<img alt="facet" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WedLRZpSzRcAAAAAAAAAAAAADmJ7AQ/original" width="100%">

```js
const facetRect = chart
  .facetRect()
  .attr('paddingBottom', 50)
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  })
  // 将数据按照 series 字段划分成一个个子集，
  // 并且是 x 方向排列
  .encode('x', 'series');

facetRect
  .point()
  .attr('inset', 10)
  .encode('x', 'x')
  .encode('y', 'y')
  .style('stroke', '#000');
```

## 重复

**重复复合（Repeat Composition）** 和分面的区别在于：它的每个视图展现的是全量数据，只不过会对编码进行重复，从而绘制出多个视图。

<img alt="repeat" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*32qdTJ7MBtsAAAAAAAAAAAAADmJ7AQ/original" width="100%">

```js
const repeatMatrix = chart
  .repeatMatrix()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    // 数据处理
  })
  // 指定需要重复的编码
  // 一共会生成 4 * 4 = 16 个视图
  // 每个视图的 x 和 y 编码是下面字段的叉乘
  .encode('position', [
    'culmen_length_mm',
    'culmen_depth_mm',
    'flipper_length_mm',
    'body_mass_g',
  ]);

repeatMatrix.point().encode('color', 'species');
```
