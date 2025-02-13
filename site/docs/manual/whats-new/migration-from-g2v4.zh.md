---
title: v4 升级 v5 指南
order: 2
---

> G2 栈团队还会继续维护 v4 版本，针对 Bug 发布 Patch 版本修复，但是此后不再接收新的 Feature Request，截止日期为 2023 年年底。原 v4 官网迁移至 https://g2-v4.antv.vision/ 。

本文旨在帮助那些已经熟悉 G24.0 的用户了解 4.0 和 5.0 版本之间的区别。读者可以选择直接阅读新的文档，而不需要从头到尾阅读本文。本文将突出显示两个版本之间各个概念对应 API 的变化。

## 大小（Dimension）

4.0 的 padding 和 appendPadding 是一个数组，5.0 将其拆开了并且修改 appendPadding 为 margin。

```js
// 4.0
const chart = new Chart({
  width: 600,
  height: 400,
  padding: [10, 20, 30, 40],
  appendPadding: [10, 20, 30, 40],
});

// 5.0
const chart = new Chart({
  width: 600,
  height: 400,
  paddingLeft: 10,
  paddingTop: 20,
  paddingRight: 30,
  paddingBottom: 40,
  marginLeft: 10,
  marginTop: 20,
  marginRight: 30,
  marginBottom: 40,
});
```

## 数据（Data）

4.0 中每个视图和一份数据绑定，该视图中的标记（前几何元素）共用一份数据。5.0 中每个视图中的所有标记可以有独立的数据，默认会同步比例尺。

```js
// 4.0
chart.data(data);
chart.line();
chart.point();

// 5.0
chart.line().data(data1);
chart.line().data(data2);
```

## 编码（Encode）

5.0 在编码方式上和 4.0 有以下的一系列不同：

### 声明方式

4.0 通过 geometry.position、geometry.color 等顶层 API 去编码通道。5.0 通过 mark.encode 去编码，并且不支持 \* 语法。

```js
// 4.0
chart.interval().position('name*value').color('genre');

// 5.0
chart
  .interval()
  .encode('x', 'name')
  .encode('y', 'value')
  .encode('color', 'genre');
```

### 回调参数

4.0 中编码的回调，会从原始数据里面提供对应的字段。5.0 中编码的回调只提供原始数据。

```js
// 4.0
chart.interval().color('name*value', (name, value) => {});

// 5.0
chart
  .interval()
  // 需要自己解构
  .encode('color', ({ name, value }) => {});
```

### 回调返回值

4.0 回调返回视觉数据。5.0 回调默认返回抽象数据。

```js
// 4.0
chart.interval().color('name', (name) => (name > 10 ? 'red' : 'yellow'));

// 5.0
chart
  .interval()
  .encode('color', (d) => (d.name > 10 ? 'high' : 'low')) // 抽象数据
  .scale('color', { range: ['red', 'yellow'] }); // 指定值域

// 5.0
chart
  .interval()
  .encode('color', (d) => (d.name > 10 ? 'red' : 'yellow'))
  .scale('color', { type: 'identity' });
```

### 颜色值域

4.0 通过 geometry.color 的第二个参数声明颜色值域，5.0 通过 scale.color 指定。

```js
// 4.0
chart.interval().color('name', ['red', 'blue']);
chart.interval().color('name', '#fff-#000');

// 5.0
chart
  .interval()
  .encode('color', 'name') // 离散
  .scale('color', { range: ['red', 'blue'] });

chart
  .interval()
  .encode('color', 'name') //连续
  .scale('color', { range: '#fff-#000' });
```

## 时序通道

4.0 会尝试解析时间字符串，5.0 不会去尝试解析，需要显示地转换成 Date 对象。

```js
const data = [
  { year: '2020-10-01', value: 1 },
  { year: '2022-10-01', value: 2 },
  { year: '2023-10-01', value: 3 },
];

// 4.0
chart.line().position('year*value');

// 5.0
chart
  .line()
  .encode('x', (d) => new Date(d.year))
  .encode('y', 'value');
```

## 样式（Style）

4.0 中样式的回调作用于整个对象上。5.0 中作用于每一个属性。

```js
// 4.0
chart
  .interval()
  .style('a*b', (a, b) =>
    a + b > 10
      ? { stroke: 'red', strokeWidth: 10 }
      : { stroke: 'black', strokeWidth: 5 },
  );

// 5.0
chart
  .interval()
  .style('stroke', ({ a, b }) => (a + b > 10 ? 'red' : 'black'))
  .style('strokeWidth', ({ a, b }) => (a + b > 10 ? 10 : 5));
```

## 比例尺（Scale）

5.0 在比例尺的使用下和 4.0 有以下的一系列不同：

### 绑定对象

4.0 的比例尺是和字段绑定的，5.0 的比例尺是和通道绑定。

```js
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// 4.0
chart.data(data);
chart.scale('genre', {});
chart.interval().color('genre');

// 5.0
chart
  .interval()
  .data(data)
  .encode('color', 'genre')
  // 设置 color 通道比例尺
  .scale('color', {});
```

### 属性

比例尺的部分属性变化如下：

- 定义域：values -> domain
- 定义域最小值：min -> domainMin
- 定义域最大值：max -> domainMax

```js
// 4.0
chart.scale('genre', { values: ['a', 'b', 'c'] });

// 5.0
chart.scale('color', { domain: ['a', 'b', 'c'] });
```

### 离散比例尺

4.0 的离散比例尺有 cat 和 timeCat，在 5.0 中 cat 变成了 band，point 和 ordinal 比例尺，timeCat 被移除了。

```js
// 4.0
chart.scale('genre', { type: 'cat' });

// 5.0
chart
  .interval()
  .encode('x', 'name')
  .encode('color', 'name')
  // interval 的 x 通道默认是 band 比例尺
  .scale('x', { type: 'band', range: [0.1, 0.9] })
  .scale('color', { type: 'ordinal', range: ['red', 'blue'] });

chart
  .point()
  .encode('x', 'name')
  // point 比例尺
  .scale('point', {});
```

## 坐标系（Coordinate）

4.0 坐标系属性在 cfg 里面，通过 actions 去指定坐标系变换；5.0 坐标系属性平铺，同时通过 transform 去声明坐标系变换。

```js
// 4.0
chart.coordinate({
  type: 'polar',
  cfg: {
    radius: 0.85,
  },
  actions: [['transpose']],
});

// 5.0
chart.coordinate({
  type: 'polar',
  outerRadius: 0.85,
  transform: [{ type: 'transpose' }],
});
```

## 标签（Label）

4.0 每个元素只能声明一个标签，5.0 每个元素可以声明多个标签。

```js
// 4.0
chart.interval().label('field', (d) =>
  d > 10
    ? 'red'
    : 'blue'
    ? {
        style: { color: 'red', stroke: 'red' },
      }
    : {
        style: { color: 'black', stroke: 'black' },
      },
);

// 5.0
chart
  .interval()
  .label({
    text: 'field', // 指定内容
    style: {
      color: d > 10 ? 'red' : 'black', // 设置属性
      stroke: d > 10 ? 'red' : 'black',
    },
  })
  .label({ text: (d) => d.value });
```

## 提示信息（Tooltip）

4.0 可以通过 tooltip.containerTpl 自定义提示信息，5.0 通过 render 函数自定义提示信息。

```js
// 4.0
chart.tooltip({ containerTpl: `<div></div>` });

// 5.0
chart.interaction('tooltip', {
  render: () => `<div></div>`,
});
```

## 动画（Animation）

4.0 中有 appear 动画，5.0 将其合并到了 enter 动画里面去。

```js
// 4.0
chart.interval().animate({
  appear: {
    animation: 'fade-in',
    easing: 'easeQuadIn',
    delay: 100,
    duration: 600,
  },
});

// 5.0
chart.interval().animate('enter', {
  type: 'fadeIn',
  easing: 'easeQuadIn',
  delay: 100,
  duration: 600,
});
```

## 交互（Interaction）

4.0 通过 `chart.removeInteraction(name)` 移除交互，5.0 通过 `chart.interaction(name, false)` 移除交互。

```js
// 4.0
chart.removeInteraction('tooltip');

// 5.0
chart.interaction('tooltip', false);
```

## 标注（Annotation）

在 4.0 中图中的元素分为几何元素（Geometry）和标注（Annotation），在 5.0 中两者都是标注（Mark）。

### 声明方式

在 4.0 中标注通过 annotation 这个名称空间去声明，5.0 声明方式和标记保持一致。

```js
// 4.0
chart.annotation().line({});

// 5.0
chart.lineX();
```

### 标注特定值

在 4.0 通过 start 和 end 去标注特定值，5.0 通过 transform 去标注特定值。

```js
// 4.0
chart.annotation().line({
  start: ['min', 'mean'],
  end: ['max', 'mean'],
});

// 5.0
chart
  .lineX()
  .encode('y', 'value')
  // 选择 y 通道最小的值
  .transform({ type: 'selectY', y: 'mean' });
```

## 分面（Facet）

4.0 分面通过 facet 这个名称空间去声明，5.0 和标记保持一致。

```js
// 4.0
chart.facet('rect', {
  fields: ['cut', 'clarity'],
  eachView(view) {
    view
      .point()
      .position('carat*price')
      .color('cut')
      .shape('circle')
      .style({ fillOpacity: 0.3, stroke: null })
      .size(3);
  },
});

// 5.0
chart
  .facetRect()
  .encode('x', 'cut')
  .encode('y', 'clarity')
  .point()
  .encode('x', 'carat')
  .encode('y', 'price')
  .encode('color', 'cut')
  .encode('shape', 'point')
  .encode('size', 3)
  .style('fillOpacity', 0.3)
  .style('stroke', null);
```
