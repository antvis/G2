---
title: 比例尺
order: 7
---

**比例尺（Scale）** 是可视化很重要的一个抽象：将抽象数据映射为视觉数据，它是抽象数据和视觉数据的桥梁。如果说编码决定了标记的哪些通道需要被可视化，那么比例尺决定了这些通道该如何被可视化。

标记的每一个通道都绑定了一个比例尺。该比例尺会对该通道绑定的列数据进行转换，将其从数据范围：**定义域（Domain）** 转换到视觉范围：**值域（Range）**。不同类型的比例尺针对不同类型的数据和使用场景。

G2 内部会根据数据类型以及标记的类型，去推断比例尺的类型、定义域和值域，但是仍然提供了很强的配置性。可以通过 `mark.scale` 去配置和该标记绑定的比例尺。

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

<img alt="data" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*U-tfTa2m98EAAAAAAAAAAAAADmJ7AQ/original" width="100%">

<img alt="continuous" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*jT--SYkfcGoAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .point()
  .data(data)
  .encode('x', 'GDP') // GDP 是一个连续的数据
  .encode('y', 'LifeExpectancy'); // LifeExpectancy 是一个连续的数据
```

## 序数比例尺

第二种比例尺是序数比例尺，主要针对离散数据，比较常见的序数比例尺有：ordinal，point 等。比如下面的条形图的 color 通道就是用了 ordinal 比例尺。

<img alt="ordinal" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2cLsQbws-s0AAAAAAAAAAAAADmJ7AQ/original" width="640px">

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

<img alt="threshold" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pPtiRYZXEMYAAAAAAAAAAAAADmJ7AQ/original" width="640px">

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

## 条件映射

可以通过 `scale.relations` 去指定一系列映射规则，这个优先级别会高于 domain 到 range 的默认映射方式。比如对于 color 通道来讲，如果希望特定的值映射为特定的颜色，或者处理异常值，这个配置会很有用。

```js
chart.interval().scale('color', {
  relations: [
    ['dog', 'red'], // dog 恒等映射为红色
    [(d) => d === undefined, 'grey'], // 如果是值为 undefined，那么为灰色
  ],
});
```

## 传递性

比例尺具有传递性，chart 实例的比例尺会传递给所拥有的标记。

```js
chart.interval().scale('x', { type: 'linear' });
```

和下面的写法等效：

```js
chart.scale('x', { type: 'linear' });
chart.interval();
```

## 比例尺同步

同一个视图中的标记相同通道的比例尺会默认是同步的。如果希望不同步（比如绘制双轴图的时候），就需要设置 `scale.independent` 为 `true`，设置了该属性的比例尺不会和任何比例尺同步。下面的例子中的 interval 和 line 的 y 通道会使用两个不同的比例尺，从而会生成两个不同的坐标轴。

```js
chart.interval().data(data1).scale('y', { independent: true });

chart
  .line()
  .data(data2)
  .scale('y', { type: 'log' })
  .axis('y', { position: 'right' }); // 设置在图表右侧
```

如果希望比例尺分组同步，可以声明 `scale.key`，拥有相同 key 的 scale 会同步。下面的例子中 i1 和 l1 的 y 通道对应的比例尺会同步；i2 和 l2 对应的比例尺会同步。

```js
const i1 = chart.interval().data(data1).scale('y', { key: 'data1' });
const l1 = chart.line().data(data1).scale('y', { key: 'data1' });

const i2 = chart.interval().data(data2).scale('y', { key: 'data2' });
const l2 = chart.line().data(data2).scale('y', { key: 'data2' });
```
