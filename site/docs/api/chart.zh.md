---
title: Chart
order: 2
---

G2 的 Node 是图形容器的概念，Chart 以及 Mark（Interval、Area、Line 等）都继承自 Node。每一个 Node 拥有自己独立的数据源、坐标系、几何标记、Tooltip 以及图例，可以理解 Node 是整个 G2 体系中，用来组装 Data、Mark、Component 的容器。 一个 Node 可以包含有多个子 Node，通过这种嵌套关系，可以将一个画布按照不同的布局划分多个不同区域，也可以将不同数据源的多个 Node 叠加到一起，形成一个多数据源，多图层的图表。

而 Chart 用于提供创建 canvas、自适应图表大小等能力，便于开发者使用的类。

下面会介绍如何创建 Chart 对象，以及 Chart 对象提供一些 API，包括通用 API、生命周期 API 以及 Node 管理 API 等。

## 创建 Chart 对象

```js
const chart = new Chart({
  container: 'container',
  width: 400,
  height: 600,
});
```

### 选项

| API       | 描述                                                                                                                                                                                          | 类型                    | 默认值 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------ |
| container | 指定 chart 绘制的 DOM，可以传入 DOM id，也可以直接传入 dom 实例                                                                                                                               | `string \| HTMLElement` |        |
| width     | 图表宽度                                                                                                                                                                                      | `number`                | 640    |
| height    | 图表高度                                                                                                                                                                                      | `number`                | 480    |
| renderer  | 指定渲染引擎，默认使用 canvas。                                                                                                                                                               |                         |        |
| plugins   | 指定渲染时使用的插件                                                                                                                                                                          | `any[]`                 |        |
| autoFit   | 图表是否自适应容器宽高，默认为 `false`，用户需要手动设置 `width` 和 `height`。<br/>当 `autoFit: true` 时，会自动取图表容器的宽高，如果用户设置了 `height`，那么会以用户设置的 `height` 为准。 | `boolean`               | false  |
| padding   | 图表内边距                                                                                                                                                                                    | `number`                | 30     |

## Chart API

| API                                               | 描述                         | 示例               |
| ------------------------------------------------- | ---------------------------- | ------------------ |
| chart.[`mark`] ()                                 | 为 Chart 添加图形标记        | `chart.interval()` |
| chart.render()                                    | 调用图表的渲染方法           |                    |
| chart.options()                                   | 获取图表的配置项             |                    |
| chart.node()                                      | 获取图表的 HTML 容器         |                    |
| chart.forceFit()                                  | 自动根据容器大小 resize 画布 |                    |
| chart.destroy()                                   | 销毁图表容器和 Canvas 画布   |                    |
| chart.changeSize(_width: number, height: number_) | 改变图表大小，同时重新渲染。 |                    |

## Node API

| API                                          | 描述                                                                                                                           | 示例               |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| node.[**attribute**] (_...params?_)          | 修改或者返回节点对应的属性。<br/>如果该函数没有参数，那么返回节点对应的属性值；<br/>如果函数有参数，那么会去设置对应属性的值。 | `node.data([...])` |
| node.remove()                                | 从当前 node 的父节点上移除该节点                                                                                               | -                  |
| node.getNodesByType(_type: string_):_Node[]_ | 通过 type 查找所有的 node 子节点                                                                                               | -                  |
| node.getNodeByKey(_key: string_):_Node_      | 通过 key 查找当前 node 的子节点                                                                                                | -                  |
| node.changeSize(data: _Datum[]_)             | 改变 Node 数据并重新渲染图表                                                                                                   | -                  |
| node.append(Ctor: _Node_)                    | 创建一个新的 Node 并添加在 node 的子节点上                                                                                     | -                  |

**配置 node 的属性有：**

- `node.data()`： 配置当前 Node 的数据源。
- `node.encode()`： 配置当前 Node 的每个通道的字段名称。
- `node.scale()`： 配置当前 Node 的每个通道的比例尺。
- `node.coordinate()`： 配置当前 Node 的坐标变换。
- `node.legend()`： 配置当前 Node 图形的图例。
- `node.axis()`： 配置当前 Node 图形的坐标轴。
- `node.tooltip()`： 配置当前 Node 图形的 Tooltip。
- `node.label()`： 配置当前 Node 图形的标签样式。
- `node.style()`： 配置当前 Node 图形的样式。
- `node.theme()`： 配置当前 Node 图形的主题样式。

上述属性支持链式调用，例如：

```js
const chart = new Chart({
  container: 'container',
  width: 640,
  height: 480,
});

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
  .encode('y', 'sold')
  .encode('color', 'genre');

chart.render();
```

## Chart 生命周期 API

图表渲染的生命周期有：

- `beforerender`
- `afterrender`
- `beforepaint`
- `afterpaint`
- `beforechangedata`
- `afterchangedata`
- `beforechangesize`
- `afterchangesize`
- `beforedestroy`
- `afterdestroy`

通过 `chart.on()` 来申明生命周期事件。例如：

```js
chart.on('afterrender', (e) => {
  // callback
});
```
