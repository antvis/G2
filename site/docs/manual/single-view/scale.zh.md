---
title: 比例尺和辅助组件
order: 7
---

**比例尺（Scale）** 是可视化很重要的一个抽象：将抽象数据映射为视觉数据，它是抽象数据和视觉数据的桥梁。如果说编码决定了标识的哪些通道需要被可视化，那么比例尺决定了这些通道该如何被可视化。

标识的每一个通道都绑定了一个比例尺。该比例尺会对该通道绑定的列数据进行转换，将其从数据范围：**定义域（Domain）** 转换到视觉范围：**值域（Range）**。不同类型的比例尺针对不同类型的数据和使用场景。

G2 内部会根据数据类型以及标识的类型，去推断比例尺的类型、定义域和值域，但是仍然提供了很强的配置性。可以通过 `mark.scale` 去配置和该标识绑定的比例尺。

```js
chart.interval().scale(
  'x', // 指定 x 通道的比例尺
  {
    type: 'log', // 指定类型
    domain: [10, 100], // 指定定义域
    range: [0, 1], // 指定值域
    /* 其他配置 */
  },
);
```

## 连续比例尺

第一种比例尺是连续比例尺，主要针对是连续数据，比较常见的连续比例尺有：linear，time，log 等。比如下面的散点图的 x 和 y 通道都是使用了 linear 比例尺。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*U-tfTa2m98EAAAAAAAAAAAAADmJ7AQ/original" width="100%">

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*jT--SYkfcGoAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .point()
  .data(data)
  .encode('x', 'GDP') // GDP 是一个连续的数据
  .encode('y', 'LifeExpectancy'); // LifeExpectancy 是一个连续的数据
```

## 序数比例尺

第二种比例尺是序数比例尺，主要针对离散数据，比较常见的序数比例尺有：ordinal，point 等。比如下面的条形图的 color 通道就是用了 ordinal 比例尺。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2cLsQbws-s0AAAAAAAAAAAAADmJ7AQ/original" width="640px">

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
  .encode('color', 'genre') // genre 是一个离散数据
  .scale('color', {
    // 指定映射后的颜色
    range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#c564be'],
  });
```

## 离散化比例尺

第三种比例尺是离散化比例尺，该比例尺主要针对连续数据，会将它们离散化之后再映射，比如 threshold，quantize 等。下面的 color 通道就用了 quantile 比例尺。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pPtiRYZXEMYAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .cell()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
    transform: [{ type: 'map', callback: (d) => ({ salary: d }) }],
  })
  .scale('color', {
    type: 'quantile',
    // 分成三组，每组对应下面的一个颜色
    range: ['#eee', 'pink', 'red'],
  })
  .encode('y', (_, i) => (i % 5) + 1)
  .encode('x', (_, i) => ((i / 5) | 0) + 1)
  .encode('color', 'salary') // 是连续数据，比例尺按照分位数对数据进行分组
  .style('stroke', '#000')
  .style('inset', 2);
```

## 辅助组件

**辅助组件（Guide）** 是对比例尺的可视化，用来帮助用户更好的理解图表。不同种类的通道有不同的辅助组件。

### 空间通道和坐标轴

G2 中有三种空间通道：x，y 和 position，空间通道的辅助组件都是**坐标轴（Axis)** 。在 G2 中每个标识都有自己的坐标轴，通过 `mark.axis` 去设置。

```js
// 设置 x 方向的坐标轴
interval.axis('x', {
  tickCount: 5, // 指定坐标刻度数量
  title: 'hello', // 指定坐标标题
  labelFormatter: (d) => d.toFixed(2), // 指定 label 格式化函数
});

// 隐藏 y 方向坐标轴
interval.axis('y', false);

// 隐藏所有坐标轴
interval.axis(false);
```

每个空间通道也可以和多条坐标轴绑定。

```js
// 设置多条 x 方向的坐标轴
interval.axis('y', [
  // 一条 x 轴放在上面
  {
    tickCount: 5,
    position: 'top',
  },
  // 一条 x 轴放在下面
  {
    title: 'hello',
    position: 'bottom',
  },
]);
```

### 其余通道和图例

G2 种的 color，opacity，size，shape 通道的辅助组件是**图例（Legend）** 。在 G2 中，标识的图例由 `mark.legend` 去设置。

```js
// 设置 color 的图例
interval.legend('color', {});

// 设置 size 的图例
interval.size('size', {});

// 隐藏 size 的图例
interval.size('size', false);

// 隐藏所有比例尺
interval.legend(false);
```
