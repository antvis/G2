---
title: 标记和通道
order: 4
---

在 G2 中**没有图表的概念**，而是把标记作为基本的视觉组成单元，任何一个图表都是多个标记组合而成的。和传统的绘制系统不同，标记提供了绘制抽象数据的能力。

## 模版

**标记（Mark）** 是一个模版，会生成一些列**数据驱动**的图形，其中每个图形对应一个或者多个**数据项（Data Item）**。比如下面的散点图里只有一个 point 标记，而这个标记生成了多个圆。

<img alt="point" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*w6uhQ7zFaOcAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  })
  .encode('x', 'height')
  .encode('y', 'weight')
  .encode('color', 'gender');

chart.render();
```

而在下面的折线图中，一个条线对应多个数据项。

<img alt="line" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZMM5RYzZz4UAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .line()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  })
  .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
  .encode('x', (d) => new Date(d.Date))
  .encode('y', 'Close')
  .encode('color', 'Symbol')
  .axis('y', { title: '↑ Change in price (%)' });
```

## 通道

为了控制标记的样式，我们往往会把一列数据和它的视觉属性绑定。比如在下面的例子中，我们把数据中 height 一列数据和 x 属性绑定，weight 列数据数据和 y 属性绑定，gender 列数据和 color 属性绑定。

<img alt="channel" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vRbaQ6u4570AAAAAAAAAAAAADmJ7AQ/original" width="100%">

```js
chart
  .point()
  .data(data)
  .encode('x', 'height')
  .encode('y', 'weight')
  .encode('color', 'gender');
```

这种绑定的过程被称为**编码（Encode）**，我们常常说图形的某个视觉属性编码了一列数据，这种数据驱动的属性被称为**通道**。比如上面的 point mark 的 x，y 和 color 通道都分别编码了对应列的数据。

一共有 4 种生成和通道绑定的列数据的方式：

- **字段列**：提出数据的某列数据
- **常量列**：生成一个拥有相同元素的数组
- **函数列**：通过已有数据派生一列数据
- **数组列**：直接指定一个数组作为列数据

它们的指定方式如下：

```js
// 字段列
interval.encode('x', 'name'); // 语法糖
interval.encode('x', { type: 'field', value: 'name' }); // 完整写法

// 常量列
interval.encode('color', 'steelblue'); //语法糖
interval.encode('color', { type: 'constant', value: 'steeblue' }); // 完整写法

// 函数列
interval.encode('color', (d) => (d.value > 100 ? 'high' : 'low')); //语法糖
interval.encode('color', {
  type: 'transform',
  value: (d) => (d.value > 100 ? 'high' : 'low'),
}); // 完整写法

// 数据列
interval.encode('x', { type: 'column', value: [1, 2, 3] }); // 完整写法
```

在下面的例子，我们从原始数据中派生了一列新的数据去作为颜色的列数据，也生成了一列常量数据作为形状通道绑定的列。

<img alt="bubble" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7KPEQo4EB8MAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .point()
  //...
  .encode('color', (d) => (d.Population > 600e6 ? 'High' : 'Low')) // 函数列
  .encode('shape', 'point'); // 常量列
```

对于一些大数据的场景，使用数组列会更适合，下面是一个简单的例子。

<img alt="sin" width="640px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*BsVwRo-YOLIAAAAAAAAAAAAADmJ7AQ/original">

```js
const I = [0, 1, 2, 3, 4];
const X = I.map((i) => ((i - 2) * Math.PI) / 2);
const Y = X.map((x) => Math.sin(x));

chart
  .line()
  .data(I)
  .encode('x', { type: 'column', value: X })
  .encode('y', { type: 'column', value: Y })
  .encode('shape', 'smooth');
```

当然，对于空间通道来说：x 和 y 通道，往往不只需要一列数据，比如一个瀑布图，这个时候可以通过数组给一个通道指定多个列。

<img alt="bar-range" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vJt8R7caqwUAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
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
```

同时也可以通过 `${channel}${index}` 的形式去分别指定：

```js
// 和上面的形式等价
chart.encode('y', 'end').encode('y1', 'start');
```

不同的标记有不同的通道，但是也有一些通用的通道，一些常见的和绘制相关的通用通道如下：

- **x** - x 位置
- **y** - y 位置
- **color** - 颜色，填充色或者边框色，由形状决定
- **opacity** - 透明度，填充透明度或者边框透明度，由样式决定
- **shape** - 形状
- **size** - 大小，不同的标记有不同的函数
- **series** - 系列，用于分成系列
- **key** - 唯一标记，用于数据更新

## 传递性

通道编码具有传递性，chart 实例上的编码会传递给其拥有的标记。

```js
chart.line().encode('x', 'date').encode('y', 'value');
chart.point().encode('x', 'date').encode('y', 'value');
```

上面的写法等价于：

```js
chart.encode('x', 'date').encode('y', 'value');
chart.line();
chart.point();
```

当标记编码和 chart 实例上的编码上冲突的时候，chart 实例上的编码不会生效。

```js
chart.encode('x', 'date');
chart.line().encode('x', 'value'); // 最后渲染的时候还是 x 绑定的字段还是 value，而不是 date
```

## 样式

通道除了可以通过 `mark.encode` 去设置之外，还可以通过 `mark.style` 去设置。两者的区别主要有两点：

- `mark.encode` 设置的通道会特殊一点，要么是该标记独有的，比如 image 的 src 通道；要么就是有一些特殊逻辑，比如 x 通道会影响 x 方向坐标轴的生成。
- `mark.encode` 更倾向于去设置和数据有关的通道，但是 `mark.style` 更倾向于去设置和数据无关的通道。虽然 `mark.style` 也同样支持回调去设置数据驱动的通道。

<img alt="style" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9WKjQKY9F1sAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .style('fill', 'steelblue') // 设置和数据无关的通道
  .style('strokeWidth', (d) => (d.frequency > 0.1 ? 2 : 1)) // 设置和数据有关的通道
  .style('stroke', (d) => (d.frequency > 0.1 ? 'red' : 'black'))
  .axis('y', { labelFormatter: '.0%' });
```

## 多个标记

通过上面的例子不难发现，在 G2 中通过 `chart.nodeName` 的形式向图表里面添加标记，每调用一次都会向图表中添加一个标记。下面的例子中给图表添加了 line 和 point 两个标记。

<img alt="mark-multi" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dV4rRJ0dXt8AAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

chart.line().data(data).encode('x', 'year').encode('y', 'value'); // 添加 line mark

chart.point().data(data).encode('x', 'year').encode('y', 'value'); // 添加 point mark
```

## 复合标记

普通的标记主要用于绘制简单的图表，比如上面绘制的散点图和条形图。但是对于某些复杂图表，用普通的标记绘制就很麻烦了。为了降低使用成本，G2 内置了一系列复合标记，能更方便地去绘制复杂图表。

<img alt="composite" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Zcb1QZ_qaSEAAAAAAAAAAAAADmJ7AQ/original" width="100%">

```js
chart
  .sankey()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/energy.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => ({ links: data }),
      },
    ],
  })
  .layout({
    // 设置布局相关的参数
    nodeAlign: 'center',
    nodePadding: 0.03,
  })
  .scale('color', { pallette: 'schemeTableau10' })
  .style('labelSpacing', 3) // 通过 label 前缀去设置 label 样式
  .style('labelFontWeight', 'bold')
  .style('nodeStrokeWidth', 1.2) // 通过 node 前缀去设置 node 样式
  .style('linkFillOpacity', 0.4); // 通过 link 前缀去设置 link 样式
```

<!-- ## 组合标记

上面也提到了在 G2 中，一个图表往往是由多个标记组合而成，G2 也提参考 Vue 和 React 的组件系统设计了一套组件式的编程范式。这个机制可以在保持 G2 函数式声明形式 API 的基础上，去使用一些标记组件，简化使用成本。

比如下面折线图加点的例子。

<img alt="component" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*XqLASKvKeKgAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.data([
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
]);

// 声明 Line Mark
chart.line().encode('x', 'year').encode('y', 'value');

// 声明 Point Mark
chart.point().encode('x', 'year').encode('y', 'value');

chart.render();
```

我们可以如下定义一个复合标记。

```js
// LineWithPoint.js
export function LineWithPoint(options) {
  const {
    encode, // 通过 mark.encode 设置的值
    data, // 通过 mark.data 设置的值
  } = options; // 这个选项就是通过属性方法设置得到的结果
  return (node) => {
    node.data(data); // 绑定数据
    node.line().encode(encode); // 声明一个 line 标记，并且指定编码
    node.point().encode(encode); // 声明一个 point 标记，并且指定编码
  };
}
```

然后如下的使用：

```js
import { LineWithPoint } from './LineWithPoint';

//...

chart
  .mark(LineWithPoint) // 使用该复合 Mark
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
  .encode('x', 'year')
  .encode('y', 'value');
``` -->
