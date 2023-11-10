---
title: 转换（Transform）
order: 6
---

G2 中的**标记转换（Mark Transform）** 提供了一个方便的机制，去转换数据和标记的选项，主要用于分析数据。标记转换的本质是一个函数，这个函数会**筛选** 、**修改** 、**聚合**和**产生**新的通道值。

转换是一个数组，声明的转换会按照顺序执行。转换可以配置在 Mark 层级：

```js
({
  type: 'interval',
  transform: [{ type: 'stackY' }, { type: 'sortX' }],
});
```

```js
// API
// 第一种方式
chart.interval().transform({ type: 'stackY' }).transform({ type: 'sortX' });

// 第二种方式
chart.interval().transform([{ type: 'stackY' }, { type: 'sortX' }]);
```

转换也可以配置 View 层级：

```js
({
  type: 'view',
  transform: [{ type: 'stackY' }, { type: 'sortX' }],
});
```

```js
// API
// 第一种方式
chart.transform({ type: 'stackY' }).transform({ type: 'sortX' });

// 第二种方式
chart.transform([{ type: 'stackY' }, { type: 'sortX' }]);
```

## 标记转换

标记转换会去修改每个通道绑定的数据，从而改变图表的展示形式。比如 StackY 转换堆叠了条形图 y 和 y1 通道绑定的列数据：

```js | ob
(() => {
  const chart = new G2.Chart();

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
    .encode('color', 'city')
    .transform({ type: 'stackY' });

  chart.render();

  return chart.getContainer();
})();
```

## 视图转换

在视图上声明的转换会传递给 `children` 声明的标记。如果该标记没有转换就设置，否则没有影响。比如下面这个带有转换的堆叠面积图：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
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
    .encode('color', 'city')
    .transform({ type: 'stackY' }); // 视图层级的转换

  chart.area().style('fillOpacity', 0.5);

  chart.line().style('strokeWidth', 2).tooltip(false);

  chart.render();

  return chart.getContainer();
})();
```

## 常见转换

常见的转换的作用一般有两种：

- 防止重叠
- 数据聚合

### 防止重叠

转换的一个作用是防止重叠。比如如下的数据绘制的条形图中的条就重叠了。

```js | ob
(() => {
  const chart = new G2.Chart();

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

  chart.render();

  return chart.getContainer();
})();
```

这时候可以声明一个 DodgeX 去绘制分组条形图：

```js | ob
(() => {
  const chart = new G2.Chart();

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
    .encode('color', 'city')
    .transform({ type: 'dodgeX' }); // 声明转换

  chart.render();

  return chart.getContainer();
})();
```

这其实就是标记转换的作用之一：**防止重叠**。除了 DodgeX 之外，还有 StackY，JitterX 等转换可以用于防止重叠。

### 数据聚合

除了防止重叠之外，还有一类标记转换主要是用来做数据聚合：比如 Bin 和 Group。和传统的数据聚合不同，标记聚合是发生在绘制之中，而不是在绘制之前。这使得我们不需要去操作抽象的原始数据，而是直接操作通道值即可。这大大提高了我们探索数据的效率。

首先我们如下绘制一个散点图，展现了企鹅 culmen_depth_mm 和 culmen_length_mm 的相关性。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/penguins.json',
      transform: [
        { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
      ],
    })
    .encode('x', (d) => +d.culmen_depth_mm)
    .encode('y', (d) => +d.culmen_length_mm);

  chart.render();

  return chart.getContainer();
})();
```

这时如果希望看企鹅 culmen_depth_mm 的分布情况，就可以使用 bin 对数据进行分箱。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/penguins.json',
      transform: [
        { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
      ],
    })
    .encode('x', (d) => +d.culmen_depth_mm)
    .transform({
      type: 'binX', // 对 x 通道的值进行分箱
      y: 'count', // 生成 y 通道，并且选择 count reducer 去统计每个箱子的总数
    })
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

Bin 主要是用来聚合数值类型的数据，Group 主要针对离散数据。

## 多个转换

我们也可以同时声明多个转换。比如在上面的企鹅的例子中，我们多考虑一个数据维度：企鹅的性别，就可以连续声明 Bin 和 StackY 转换。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/penguins.json',
      transform: [
        { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
      ],
    })
    .encode('x', (d) => +d.culmen_depth_mm)
    .encode('color', 'sex')
    .transform({ type: 'binX', y: 'count' }) // 声明 bin 转换
    .transform({ type: 'stackY', orderBy: 'sum', reverse: true }) // 声明 stack 转换
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```
