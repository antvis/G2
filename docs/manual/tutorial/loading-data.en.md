---
title: 装载数据
order: 2
---

## 如何装载数据

chart 对象支持两种数据载入的方式：

* 方式 1：`data` 属性传入

```js
const chart = new G2.Chart({
  id: 'c1',
  width: 600,
  height: 300,
  data: [
    { x: 'a', y: 1 },
    { x: 'b', y: 2 },
    ...
  ]
});
```

* 方式 2：调用 `chart.source(data)` 方法，每个字段的[列定义](/zh/docs/manual/tutorial/scale-def)也可以在这里传入

```js
chart.source(data, {
  x: {
    type: 'cat'
  },
  y: {
    min: 0
  }
})
```

## 支持的数据格式

G2 支持两种格式的数据源：

1. JSON 数组
2. [DataView 对象](/zh/docs/manual/tutorial/data-set)

### JSON 数组

G2 接收的数据格式非常简单：标准的 JSON 数组，其中每个数组元素是一个标准的 JSON 对象：

Example:

```js
const data = [
  { gender: '男', count: 40 },
  { gender: '女', count: 30 }
];

chart.source(data);
```

### DataView 对象

详见 [DataSet 教程](/zh/docs/manual/tutorial/data-set)。

## 更新数据

G2 更新数据的方式主要有三种：
* 仅仅是更新图表的数据
* 清理所有，重新绘制
* 使用 DataView 时的更新

### 更新数据

如果需要马上更新图表，使用 `chart.changeData(data)` 即可

```js
chart.changeData(newData);
```

* view 也支持 `view.changeData(data)`

如果仅仅是更新数据，而不需要马上更新图表，可以调用 `chart.source(data)`，需要更新图表时调用 `chart.repaint()`

```js
chart.source(newData);

chart.guide().clear();// 清理guide
chart.repaint();
```

### 清理图形语法

更新数据时还可以清除图表上的所有元素，重新定义图形语法，重新绘制

```js
chart.line().position('x*y');

chart.render();

chart.clear(); // 清理所有
chart.source(newData); // 重新加载数据
chart.interval().position('x*y').color('z');
chart.render();
```

### 使用 DataView  更新

由于 `DataSet` 支持状态量 `state`，一旦更改状态量，图表即一起刷新，详情查看[ DataSet 教程](/zh/docs/manual/tutorial/data-set)。
