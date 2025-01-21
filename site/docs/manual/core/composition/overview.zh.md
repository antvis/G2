---
title: 概览
order: 1
---

G2 中**视图复合（View Composition）** 提供了在一个可视化中绘制多个图表的能力。G2 定义了一个**视图树（View Graph）** 去描述**多视图图表（Multi-View Plot）**。

```js
({
  type: 'spaceLayer',
  children: [{ type: 'view' }, { type: 'view' }],
});
```

```js
// API
const layer = chart.spaceLayer();

layer.view();

layer.view();
```

## 空间

最基础的视图复合方式就是**空间复合（Space Composition）**，只是对空间进行划分。

一个比较常见的复合方式是 `composition.spaceLayer`：将多个图表重叠在一起。使用场景是这些视图拥有的不同的坐标系，比如下面的条形图和饼图。

```js | ob
(() => {
  const chart = new G2.Chart();

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

  chart.render();

  return chart.getContainer();
})();
```

同时也可以使用 `composition.spaceFlex` 去让视图水平或者竖直排列。

```js | ob
(() => {
  const chart = new G2.Chart();
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

  chart.render();

  return chart.getContainer();
})();
```

同时这些复合方式是可以嵌套的，所以很容易通过一个单独的声明去实现一个报表。

## 分面

**分面复合（Facet Composition）** 和空间复合的不同在于：它还会对数据划分，每个视图展现原始数据的一个子集。

```js | ob
(() => {
  const chart = new G2.Chart({
    height: 260,
    width: 800,
    paddingLeft: 40,
    paddingBottom: 50,
  });

  const facetRect = chart
    .facetRect()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
    })
    // 将数据按照 series 字段划分成一个个子集，
    // 并且是 x 方向排列
    .encode('x', 'series');

  facetRect
    .point()
    .attr('padding', 'auto')
    .attr('inset', 10)
    .encode('x', 'x')
    .encode('y', 'y')
    .style('stroke', '#000');

  chart.render();

  return chart.getContainer();
})();
```

## 重复

**重复复合（Repeat Composition）** 和分面的区别在于：它的每个视图展现的是全量数据，只不过会对编码进行重复，从而绘制出多个视图。

```js | ob
(() => {
  const chart = new G2.Chart({
    width: 900,
    height: 900,
    padding: 'auto',
    paddingLeft: 55,
    paddingBottom: 45,
  });

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

  repeatMatrix.point().attr('padding', 'auto').encode('color', 'species');

  chart.render();

  return chart.getContainer();
})();
```

## 时间

**时间复合**在空间上管理视图，用于做动画。

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
