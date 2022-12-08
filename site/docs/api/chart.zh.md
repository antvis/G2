---
title: Chart
order: 2
---

G2 的 Node 是图形容器的概念，Chart 以及 Mark（Interval、Area、Line 等）都继承自 Node 类。每一个 Node 拥有自己独立的数据源、坐标系、几何标记、Tooltip 以及图例，可以理解 Node 是整个 G2 体系中，用来组装 Data、Mark、Component 的容器。 一个 Node 可以包含有多个子 Node，通过这种嵌套关系，可以将一个画布按照不同的布局划分多个不同区域，也可以将不同数据源的多个 Node 叠加到一起，形成一个多数据源，多图层的图表。

而 Chart 用于提供创建 canvas、自适应图表大小等能力。

下面会介绍如何创建 Chart 对象，以及 Chart 对象提供一些 API，包括通用 API、生命周期 API 以及 Node API 等。

## 开始使用

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

## 选项

| API       | 描述                                                                                                                                                                                          | 类型                    | 默认值 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------ |
| container | 指定 chart 绘制的 DOM，可以传入 DOM id，也可以直接传入 dom 实例                                                                                                                               | `string \| HTMLElement` |        |
| width     | 图表宽度                                                                                                                                                                                      | `number`                | 640    |
| height    | 图表高度                                                                                                                                                                                      | `number`                | 480    |
| renderer  | 指定渲染引擎，默认使用 canvas。                                                                                                                                                               |                         |        |
| plugins   | 指定渲染时使用的插件 ，具体见 [plugin](/api/plugin/rough)                                                                                                                                     | `any[]`                 |        |
| autoFit   | 图表是否自适应容器宽高，默认为 `false`，用户需要手动设置 `width` 和 `height`。<br/>当 `autoFit: true` 时，会自动取图表容器的宽高，如果用户设置了 `height`，那么会以用户设置的 `height` 为准。 | `boolean`               | false  |
| padding   | 图表内边距                                                                                                                                                                                    | `number`                | 30     |

## Chart API

### `chart.[mark]()`

设置图表的 Mark 标记，具体见 [mark](/api/mark)。

### `chart.render()`

调用图表的渲染方法。

### `chart.options()`

获取图表的配置项。

### `chart.node()`

获取图表的 HTML 容器。

### `chart.forceFit()`

自动根据外部 DOM 容器大小调整画布并重新渲染。

### `chart.changeSize(width: number, height: number)`

改变图表的宽高，并重新渲染。

### `chart.destroy()`

销毁图表容器和 Canvas 画布。

## Node API

Mark 以及 Chart 共享的 API

### `node.data()`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/api/data/overview)。

### `node.encode()`

设置图形每个通道的字段名称，具体见 [encode](/api/encode/overview)。

### `node.scale()`

设置图形每个通道的比例尺，具体见 [scale](/api/scale/overview)。

### `node.coordinate()`

设置图形的坐标变换，具体见 [coordinate](/api/coordinate/overview)。

### `node.legend()`

设置图形的图例，具体见 [legend](/api/component/legend)。

### `node.tooltip()`

设置图形的 Tooltip，具体见 [tooltip](/api/component/tooltip/overview)。

### `node.axis()`

设置图形的坐标轴，具体见 [axis](/api/component/axis)。

### `node.slider()`

设置图形的坐标轴，具体见 [slider](/api/component/slider)。

### `node.label()`

设置图形的标签，具体见 [label](/api/label/overview)。

### `node.style()`

设置图形的样式，具体见 [style](/api/style/overview)。

### `node.theme()`

设置图形的主题，具体见 [style](/api/theme/overview)。

### `node.changeData(data:Datum[])`

更改图形的数据来源并重新渲染整个图表。

### `node.getNodesByType(type: string): Node[]`

通过 type 查找所有的 node 子节点。

### `node.getNodeByKey(key: string): Node`

通过 key 找到当前 node 的子节点。

### `node.append(node:Node)`

创建一个新的 Node 并添加在 node 的子节点上。

### `node.remove()`

从当前 node 的父节点上移除该节点。

## 事件

### 生命周期事件

| 事件               | 描述                             |
| ------------------ | -------------------------------- |
| `beforerender`     | 图表渲染前执行该事件             |
| `afterrender`      | 图表渲染后执行该事件             |
| `beforepaint`      | 图表布局计算后，绘制前执行该事件 |
| `afterpaint`       | 图表绘制后执行该事件             |
| `beforechangedata` | 图表更新数据前执行该事件         |
| `afterchangedata`  | 图表更新数据后执行该事件         |
| `beforechangesize` | 图表更新尺寸前执行该事件         |
| `afterchangesize`  | 图表更新尺寸后执行该事件         |
| `beforedestroy`    | 图表销毁前执行该事件             |
| `afterdestroy`     | 图表销毁后执行该事件             |

通过 `chart.on()` 来申明生命周期事件。例如：

```js
chart.on('afterrender', (e) => {
  console.log('Chart has been rendered!');
});
```

### UI 事件

## FAQ

- 如何使用 svg 进行图表渲染？

```js
import { Renderer as GRenderer } from '@antv/g-svg';
const chart = new Chart({
  container: 'container',
  width: 640,
  height: 480,
  renderer: GRenderer,
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
