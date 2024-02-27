---
title: 编码（Encode）
order: 5
---

G2 中**编码（Encode）** 主要用于指定视觉元素属性和数据之间的关系，可以在 Mark 层级指定编码：

```js
({
  type: 'interval',
  encode: {
    x: 'name',
    y: 'value',
  },
});
```

```js
// API
// 第一种
chart.interval().encode('x', 'name').encode('y', 'value');

// 第二种
chart.interval().encode({ x: 'name', y: 'value' });
```

也可以在 View 层级指定编码：

```js
({
  type: 'view',
  encode: {
    x: 'name',
    y: 'value',
  },
});
```

```js
// API
// 第一种
chart.encode('x', 'name').encode('y', 'value');

// 第二种
chart.encode({ x: 'name', y: 'value' });
```

## 通道

为了控制标记的样式，我们往往会把一列数据和它的视觉属性绑定。比如在下面的例子中，我们把数据中 weight 一列数据和 x 属性绑定，height 列数据数据和 y 属性绑定，gender 列数据和 color 属性绑定。

```js | ob { pin: false }
table({
  url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
});
```

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

这种绑定的过程被称为**编码（Encode）**，我们常常说图形的某个视觉属性编码了一列数据，这种数据驱动的属性被称为**通道**。比如上面的 point mark 的 x，y 和 color 通道都分别编码了对应列的数据。

一个完整的编码是由 `encode.type` 和 `encode.value` 组成的：

```js
({
  type: 'point',
  encode: {
    x: { type: 'field', value: 'weight' },
    y: { type: 'field', value: 'height' },
    color: { type: 'field', value: 'gender' },
  },
});
```

当时在大部分情况下可以直接指定值，下面是编码一些内置的分类：

### 字段编码

指定通道和数据的某一列绑定：

```js
({
  type: 'interval',
  encode: { x: { type: 'field', value: 'name' } },
});
```

```js
// 语法糖
({
  type: 'interval',
  encode: { x: 'name' },
});
```

### 函数编码

指定通道和新生成的一些绑定：

```js
({
  type: 'interval',
  encode: {
    color: {
      type: 'transform',
      value: (d) => (d.value > 100 ? 'high' : 'low'),
    },
  },
});
```

```js
// 语法糖
({
  type: 'interval',
  encode: {
    color: (d) => (d.value > 100 ? 'high' : 'low'),
  },
});
```

### 常量编码

指定通道值为常量，常常用于指定颜色通道。

```js
({
  type: 'interval',
  encode: { color: { type: 'constant', value: 'steelblue' } },
});
```

```js
// 语法糖
({
  type: 'interval',
  encode: { color: 'steelblue' },
});
```

### 数据编码

指定某个通道的值为一个数组。

```js
({
  type: 'line',
  encode: {
    x: { type: 'column', value: [0, 1, , 2, 3] },
  },
});
```

对于一些大数据的场景，使用数组列会更适合，下面是一个简单的例子。

```js | ob
(() => {
  const I = [0, 1, 2, 3, 4];
  const X = I.map((i) => ((i - 2) * Math.PI) / 2);
  const Y = X.map((x) => Math.sin(x));

  const chart = new G2.Chart();

  chart
    .line()
    .data(I)
    .encode('x', { type: 'column', value: X })
    .encode('y', { type: 'column', value: Y })
    .encode('shape', 'smooth');

  chart.render();

  return chart.getContainer();
})();
```

## 数组通道

当然，对于空间通道来说：x 和 y 通道，往往不只需要一列数据，比如一个瀑布图，这个时候可以通过数组给一个通道指定多个列。

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { month: 'Jan.', profit: 387264, start: 0, end: 387264 },
      { month: 'Feb.', profit: 772096, start: 387264, end: 1159360 },
      { month: 'Mar.', profit: 638075, start: 1159360, end: 1797435 },
      { month: 'Apr.', profit: -211386, start: 1797435, end: 1586049 },
      { month: 'May', profit: -138135, start: 1586049, end: 1447914 },
      { month: 'Jun', profit: -267238, start: 1447914, end: 1180676 },
      { month: 'Jul.', profit: 431406, start: 1180676, end: 1612082 },
      { month: 'Aug.', profit: 363018, start: 1612082, end: 1975100 },
      { month: 'Sep.', profit: -224638, start: 1975100, end: 1750462 },
      { month: 'Oct.', profit: -299867, start: 1750462, end: 1450595 },
      { month: 'Nov.', profit: 607365, start: 1450595, end: 2057960 },
      { month: 'Dec.', profit: 1106986, start: 2057960, end: 3164946 },
      { month: 'Total', start: 0, end: 3164946 },
    ])
    .encode('x', 'month')
    .encode('y', ['end', 'start']) // 指定两列数据
    .encode('color', (d) =>
      d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    )
    .axis('y', { labelFormatter: '~s' });

  chart.render();

  return chart.getContainer();
})();
```

同时也可以通过 `${channel}${index}` 的形式去分别指定：

```js
// 和上面的形式等价
chart.encode('y', 'end').encode('y1', 'start');
```

## 常见通道

不同的标记有不同的通道，但是也有一些通用的通道，一些常见的和绘制相关的通用通道如下：

- **x** - x 位置
- **y** - y 位置
- **z** - z 位置
- **color** - 颜色，填充色或者边框色，由形状决定
- **opacity** - 透明度，填充透明度或者边框透明度，由样式决定
- **shape** - 形状
- **size** - 大小，不同的标记有不同的函数
- **series** - 系列，用于分成系列
- **key** - 唯一标记，用于数据更新

## 视图编码

通道编码具有传递性，视图的编码会传递给 `children` 指定的标记，如果该标记没有对应通道的编码，那么就设置否则不做任何事情。比如绘制一个点线图：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .data([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ])
    .encode('x', 'year') // 视图层级的编码
    .encode('y', 'value');

  chart.line();

  chart.point();

  chart.render();

  return chart.getContainer();
})();
```
