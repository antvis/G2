---
title: 声明形式 API
order: 2
---

G2 图表实例使用了一种函数式风格的声明形式 API，使得我们可以声明式地描述数据和图表中图形元素之间的关系，从而描述最后的可视化。

在底层实现上，当通过 API 声明可视化图表的时候，并不会真正地开始渲染图表，只会按照一定的规则把这些声明存储为一个 JavaScript Object，这个 Object 被称为**选项**。在调用 `chart.render` 之后才会真正地解析和渲染期望的可视化。

```js
// 声明可视化
chart
  .interval()
  .encode('x', 'name')
  .encode('y', 'value')
  .style('fill', 'red')
  .style('stroke', 'black');
```

可以通过 `chart.options` 获得当前选项。

上面的声明获得的结果如下：

```js
const options = {
  type: 'view',
  children: [
    {
      type: 'interval',
      encode: {
        x: 'name',
        y: 'value',
      },
      style: {
        fill: 'red',
        stroke: 'black',
      },
    },
  ],
};
```

现在还不需要理解这个选项的具体含义，只用了解这些 API 本质上是**不断地去修改这个内部存储可视化描述的选项**，不同的 API 有不同的改变选项的行为，理解这一点对 G2 的使用和调试至关重要。

```js
chart.options();
```

## 创建容器节点

在 G2 中通过 `chart.nodeName` 的形式去创建一个**容器节点**（下面用节点代替）。

```js
// 创建一个 Interval 节点
const interval = chart.interval();
```

每一个节点会保存一份选项，然后通过调用一系列**属性方法** `node.method` 去改变这份选项。当给属性指定参数的时候，会返回这个节点本身，从而可以继续调用属性方法，达到**链式调用**的效果。

```js
// 链式调用
interval
  .encode('x', 'name') // 指定 encode
  .encode('y', 'value') // 指定 encode
  .style('fill', 'red'); // 指定 style
```

当没有参数传递给属性方法的时候，不是返回节点本身，而是返回对应的选项值。

```js
interval.encode(); // {'x': 'name', 'y': 'value'}
```

接下来介绍不同种类的属性方法。

## 值属性方法

**值属性方法**会给选项添加一个键值对，其中键是方法名，值是方法的第一个参数。

```js
interval().frame(true);
```

```js
interval().frame(); // true

const options = {
  type: 'interval',
  frame: true,
};
```

## 对象属性方法

**对象属性方法**会给选项添加一个键值对，其中键是方法名，值是对象。可以通过不断调用该方法给值添加多对键值对。其中第一个参数会作为键名，第二个参数会作为值。

```js
interval().encode('x', 'name').encode('y', 'value');
```

```js
interval().encode(); // { x:'name', y:'value' }

const options = {
  type: 'interval',
  encode: {
    x: 'name',
    y: 'value',
  },
};
```

也可以直接一次性如下设置该对象：

```js
interval().encode({
  x: 'name',
  y: 'value',
});
```

## 数组属性方法

数组属性方法会给选项添加一个键值对，其中键是方法名，值是数组。可以通过不断调用该方法给该数组添加元素。

```js
interval().transform({ type: 'stackY' }).transform({ type: 'normalizeY' });
```

```js
interval().transform(); // [{ type: 'stackY' }, { type: 'normalizeY' }];

const options = {
  type: 'interval',
  transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
};
```

也可以直接一次性如下设置该数组：

```js
interval().transform([{ type: 'stackY' }, { type: 'normalizeY' }]);
```

## call 语法

每一个节点上都有一个 `node.call` 的方法来复用逻辑。

```js
import { Chart } from '@antv/g2';

chart.line().encode('x', 'name').encode('y', 'value');
chart.point().encode('x', 'name').encode('y', 'value');

chart.render();
```

比如在上面的例子中我们对创建的 `line` 和 `point` 节点都执行了相同的逻辑，自然我们会如下把相同逻辑抽象成函数，然后如下调用。

```js
function x(node) {
  return node.encode('x', 'name');
}

function y(node) {
  return node.encode('y', 'value');
}

x(y(chart.line()));
x(y(chart.point()));
```

但是这样的写法不够“优雅”，它不仅打破了链式调用，而且函数嵌套的层数是不断增加的。用 `node.call` 语法重写上面的例子如下：

```js
chart.line().call(x).call(y);
chart.line().call(x).call(y);
```

`node.call` 本质上会调用对节点执行第一个参数指定的函数，并且返回该节点。也就说下面两种写法是等价的。

```js
x(chart.line()); // 第一种

chart.line().call(x); // 第二种
```

同时 `node.call` 会将剩余的参数传递给第一个函数参数作为参数：

```js
function color(node, color) {
  node.style('fill', color).style('stroke', color);
}

chart.point().call(color, 'red');
```

使用 `node.call` 甚至可以一条语句完成图表实例的创建到图表渲染：

```js
new Chart()
  .call((chart) => chart.line().call(x).call(y))
  .call((chart) => chart.point().call(x).call(x))
  .render();
```
