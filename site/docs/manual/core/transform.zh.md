---
title: 转换
order: 6
---

**标记转换（Mark Transform）** 提供了一个方便的机制，去转换数据和标记的选项，主要用于分析数据。标记转换的本质是一个函数，这个函数会**筛选** 、**修改** 、**聚合**和**产生**新的通道值。

在 G2 中通过 `mark.transform` 去指定每一个标记的转换，该属性是数组属性。

```js
interval.transform({ type: 'stackY' }).transform({ type: 'sortX' });
```

## 防止重叠

转换的一个作用是防止重叠。比如如下的数据绘制条形图中的条就重叠了。

<img alt="layer" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*m5S6QKI-f7YAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .interval()
  .data([
    { city: 'London', month: 'Jan.', rainfall: 18.9 },
    { city: 'London', month: 'Feb.', rainfall: 28.8 },
    { city: 'London', month: 'Mar.', rainfall: 39.3 },
    { city: 'London', month: 'Apr.', rainfall: 81.4 },
    { city: 'London', month: 'May', rainfall: 47 },
    { city: 'London', month: 'Jun.', rainfall: 20.3 },
    { city: 'London', month: 'Jul.', rainfall: 24 },
    { city: 'London', month: 'Aug.', rainfall: 35.6 },
    { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
    { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
    { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
    { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
    { city: 'Berlin', month: 'May', rainfall: 52.6 },
    { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
    { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
    { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
  ])
  .encode('x', 'month')
  .encode('y', 'rainfall')
  .encode('color', 'city');
```

这时候可以声明一个 stackY 去修改 interval 标记的 y 通道，使得条在视觉上产生了堆叠的效果，从而得到了我们的堆叠条形图。

<img alt="stack-y" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ACL6TqxKw2cAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .interval() //...
  .transform({ type: 'stackY' }); // 指定 stackY 通道
```

这其实就是标记转换的作用之一：**防止重叠**。除了 stackY 之外，还有 dodgeX，jitterX 等转换可以用于防止重叠。

## 数据聚合

除了防止重叠之外，还有一类标记转换主要是用来做数据聚合：比如 bin 和 group。和传统的数据聚合不同，标记聚合是发生在绘制之中，而不是在绘制之前。这使得我们不需要去操作抽象的原始数据，而是直接操作通道值即可。这大大提高了我们探索数据的效率。

首先我们如下绘制一个散点图，展现了企鹅 culmen_depth_mm 和 culmen_length_mm 的相关性。

<img alt="point" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1rEdS62svv4AAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  })
  .encode('x', (d) => +d.culmen_depth_mm)
  .encode('y', (d) => +d.culmen_length_mm);
```

这时如果希望看企鹅 culmen_depth_mm 的分布情况，就可以使用 bin 对数据进行分箱。

<img alt="bin" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*HSxYRoWU6y4AAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  })
  .encode('x', (d) => +d.culmen_depth_mm)
  .transform({
    type: 'binX', // 对 x 通道的值进行分箱
    y: 'count', // 生成 y 通道，并且选择 count reducer 去统计每个箱子的总数
  })
  .style('insetLeft', 1);
```

bin 主要是用来聚合数值类型的数据，group 主要针对离散数据。

## 转换空间

标记转换既可以发生在**数据空间**，也可以发生在**屏幕空间**。上面的转换都是发生在数据空间的，因为转换过程并不需要感知空间的信息，但是下面的 pack 就是在屏幕空间转换，因为它需要感知每个 circle 的半径。

<img alt="pack" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*HWXPS6a6pOQAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart.facetRect().point().transform({ type: 'pack' });
```

## 多个转换

我们也可以同时声明多个转换。比如在上面的企鹅的例子中，我们多考虑一个数据维度：企鹅的性别，就可以连续声明 bin 和 stack 转换。

<img alt="multi" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ndHkRrtkCSIAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  })
  .encode('x', (d) => +d.culmen_depth_mm)
  .encode('color', 'sex')
  .transform({ type: 'binX', y: 'count' }) // 声明 bin 转换
  .transform({ type: 'stackY', orderBy: 'sum', reverse: true }) // 声明 stack 转换
  .style('insetLeft', 1);
```

## 传递性

转换也具有传递性，chart 实例拥有的转换会传递给所有拥有的标记。

```js
chart.line().transform({ type: 'stackY' });
chart.area().transform({ type: 'stackY' });
```

上面写法和下面的写法等价：

```js
chart.transform({ type: 'stackY' });
chart.line();
chart.area();
```
