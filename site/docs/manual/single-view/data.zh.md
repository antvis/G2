---
title: 数据和数据转换
order: 5
---

在 G2 中支持多种**数据类型（Data）**，同时也内置了一些 **数据转换（Data Transform）** 来预处理数据。

## 数据绑定

在 G2 中通过 `node.data` 去给当前节点绑定数据。数据具**有传递性**，当孩子节点没有数据的时候，会使用父亲的数据。

比如下面的例子中 interval 标识会使用图表实例绑定的数据 `[1, 2, 3]`，但是 point 标识会使用 `[2, 3, 4]` 作为自己的数。

```js
chart.data([1, 2, 3]);

chart.interval(); // ...
chart.point().data([2, 3, 4]); // ...
```

所以当同一个图表的标识都使用相同数据的时候，可以把数据和图表实例绑定，否者和标识本身绑定。

## 数据更新

正是因为数据是和标识绑定的，所以数据更新会稍微复杂一点。以下面的案例作为例子：

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

接下来看看支持的数据类型。

## 内联数据

直接使用定义的数据。

```js
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

node.data(data);
```

上面的写法是下面写法的语法糖。

```js
node.data({
  type: 'inline',
  value: data,
});
```

## 远程数据

从远程请求数据，目前支持 `json` 和 `csv` 两种格式的数据。

```js
node.data({
  type: 'fetch',
  value: 'xxxx',
  format: 'json',
});
```

## 数据转换

可以在数据选项中声明一个 `transform` 数组去指定数据变换，数据转换之后才和标识绑定。

```js
node.data({
  type: 'xxx',
  value: 'xxx',
  transform: [{
    type: 'filter',
    callback: (d, idx, arr) => true,
  }],
});
```

同时也可以通过自定义的方式自定义数据转换。

```js
function sum(data) {
  return data.reduce((sum, v) => (sum += v));
}

// 最后转换后的结果为 6
node.data({
  value: [1, 2, 3],
  transform: [{ type: 'custom', callback: sum }],
});
```
