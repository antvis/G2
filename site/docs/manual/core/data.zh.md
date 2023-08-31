---
title: 数据（Data）
order: 4.1
---

G2 中的**数据（Data）** 主要用于指定需要可视化的数据和数据转换（预处理）。数据可以指定在 View 层级：

```js
({
  type: 'view',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

```js
// API 形式
chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);
```

也可以指定在 Mark 层级：

```js
({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

```js
// API 形式
chart.interval().data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);
```

## 连接器和转换

一个完整的数据声明由两部分构成：**连接器（Connector）** 和**数据转换（Data Transform）** 。其中连接器是获得数据的方式，通过 `data.type` 指定，数据转换是预处理函数，通过 `data.transform` 指定。

```js
({
  data: {
    type: 'fetch', // 指定连接器类型
    // 指定连接器的值
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    transform: [
      // 指定转换，可以多个
      { type: 'filter', callback: (d) => d.sex === 'gender' },
    ],
  },
});
```

如果数据满足以下三个条件：

- 内联数据
- 是数组
- 没有预处理函数

那么可以直接指定为 `data`：

```js
({
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

## 标记的数据

每一个标记都有自己的数据，这意味着我们可以在一个视图中可视化多份数据，比如下面的区间标注图：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rangeX()
    .data([
      { year: [new Date('1933'), new Date('1945')], event: 'Nazi Rule' },
      {
        year: [new Date('1948'), new Date('1989')],
        event: 'GDR (East Germany)',
      },
    ])
    .encode('x', 'year')
    .encode('color', 'event')
    .scale('color', { independent: true, range: ['#FAAD14', '#30BF78'] })
    .style('fillOpacity', 0.75)
    .tooltip(false);

  chart
    .line()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/year-population.json',
    })
    .encode('x', (d) => new Date(d.year))
    .encode('y', 'population')
    .encode('color', '#333');

  chart.render();

  return chart.getContainer();
})();
```

## 视图的数据

视图也可以和数据绑定，视图绑定的数据具有传递性：会传递给 `view.children` 里面的标记，如果该标记没有数据，那么就设置其数据，否则没有任何影响。这意味着对于共享数据的标记，可以把数据和视图绑定。

```js | ob
(() => {
  const chart = new G2.Chart();

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

  chart.line().encode('x', 'year').encode('y', 'value');

  chart.point().encode('x', 'year').encode('y', 'value');

  chart.render();

  return chart.getContainer();
})();
```

## 数据更新

因为数据是和标记绑定的，所以数据更新会稍微复杂一点。以下面的案例作为例子：

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const interval = chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold');

chart.render();
```

更新上面例子 interval 的数据有以下几种方法：

- 第一种：最基础的方式。

```js
// 更新 interval 绑定的数据
interval.data(newData);

// 通过 chart 更新图表的渲染
chart.render();
```

- 第二种：上面的方式的语法糖。

```js
// 更新 interval 数据并且渲染图表
interval.changeData(newData);
```

- 第三种：通过查询 API 获得 interval 对象，然后更新数据。

```js
chart.getNodesByType('rect')[0].changeData(data);
```

## FAQ

- 如何使用第三方库绘制统计回归线？

借助自定义数据转换能力，我们可以使用外部的数据处理相关的库。下面的例子中，我们使用第三方库 [d3-regression](https://github.com/HarryStevens/d3-regression) 来生成线性统计回归线：

```js
import { regressionLinear } from 'd3-regression';

node.data({
  // 利用 D3 的 regressionLinear 对数据进行线性回归处理
  transform: [
    {
      type: 'custom',
      callback: regressionLinear(),
    },
  ],
});
```

更多统计回归线案例见 [数据分析-regression](/examples#analysis-regression)。
