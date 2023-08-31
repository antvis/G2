---
title: 规范（Spec）
order: 2
---

G2 设计了一套**规范（Spec）** 去描述可以绘制的可视化，使得用户可以通过调用 `chart.options(options)` 根据指定的满足规范的**选项（options）** 去渲染图表，比如绘制一个如下基本的条形图：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: {
      x: 'genre',
      y: 'sold',
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

## 函数式 API

基于底层的 Spec，为了提供更多样化和灵活地声明图表的能力，G2 也提供了一系列函数式 API 来声明图表，比如声明上面简单的条形图：

```js | ob
(() => {
  const chart = new G2.Chart();

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
    .encode('y', 'sold');

  chart.render();

  return chart.getContainer();
})();
```

简单来讲：**调用函数形式 API 只是在生成内部的 options，两者没有什么本质区别，两者的绘制能力相同，更多的只是一个风格上的选择**。比如当调用 `chart.interval` 的时候是添加一个 Interval 标记到 `children` 里面：

```js
({
  type: 'view',
  children: [{ type: 'interval' }],
});
```

`chart.interval().encode('x', 'genre')` 只是设置 options 里面的 `encode`：

```js
({
  type: 'view',
  children: [{ type: 'interval', encode: { x: 'genre' } }],
});
```

所以理解函数式 API 和 Options 的映射关系很重要，在后面的介绍中都会先介绍 Spec，然后介绍对应的 API。

## 视图树

G2 的 Spec 总体来讲是一个有层级结构的**视图树（View Tree）**，由不同的节点构成。节点通过 `node.type` 指定类型，不同的类型有不同的作用，同时通过 `node.children` 来进行嵌套。

```js
({
  type: 'spaceFlex',
  children: [
    {
      type: 'view',
      children: [{ type: 'line' }, { type: 'point' }],
    },
    {
      type: 'interval',
    },
  ],
});
```

其中视图可以简单理解为图表，或者**单视图图表（Single View Plot）**。这颗“树”通过不同的容器节点在时间和空间上管理视图，从而在时间和空间上管理我们的视图，从而绘制**多视图图表（Multiple View Plots）**。

API 是通过 `parent.[child]()` 的形式给指定的 _parent_ 添加对应的 _child_ 节点来声明层次关系的，比如上面的层次关系用 API 需要如下声明：

```js
const spaceFlex = chart.spaceFlex();

const view = spaceFlex.view();

view.line();

view.point();

spaceFlex.interval();
```

接下来介绍三种节点：

- 标记节点
- 视图节点
- 复合节点

## 标记节点

标记节点是该树上的叶子节点，不可继续嵌套，也就是不能再包含 `children` 属性。标记类似图表的概念，比如一个 Interval 标记可以绘制一个条形图。

```js
({
  type: 'interval',
});
```

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval', // 标记节点
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: {
      x: 'genre',
      y: 'sold',
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

## 视图节点

如果是希望图表中有多个标记，这个时候就需要把它们放入视图节点中，绘制单视图图表。视图节点只能嵌套标记节点。

```js
({
  type: 'view',
  children: [{ type: 'line' }, { type: 'point' }],
});
```

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view', // 视图节点
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    encode: {
      x: 'year',
      y: 'value',
    },
    children: [
      { type: 'line' }, // Line 标记
      { type: 'point' }, // Point 标记
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

## 复合节点

用于在一个图表里面绘制多个视图（多视图图表）。它可以嵌套复合节点，视图节点和标记节点。

```js
({
  type: 'spaceFlex',
  children: [
    { type: 'spaceFlex' }, // 复合节点
    { type: 'view' }, // 视图节点
    { type: 'interval' }, // 标记节点
  ],
});
```

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'spaceFlex',
    width: 800,
    height: 400,
    children: [
      {
        type: 'interval',
        padding: 'auto',
        data: [
          { genre: 'Shooter', sold: 350 },
          { genre: 'Sports', sold: 275 },
          { genre: 'Other', sold: 150 },
          { genre: 'Action', sold: 120 },
          { genre: 'Strategy', sold: 115 },
        ],
        encode: { x: 'genre', y: 'sold' },
      },
      {
        type: 'interval',
        padding: 'auto',
        data: [
          { genre: 'Shooter', sold: 350 },
          { genre: 'Sports', sold: 275 },
          { genre: 'Other', sold: 150 },
          { genre: 'Action', sold: 120 },
          { genre: 'Strategy', sold: 115 },
        ],
        encode: { y: 'sold', color: 'genre' },
        transform: [{ type: 'stackY' }],
        coordinate: { type: 'theta' },
        legend: { color: false },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```
