---
title: 图表 - Chart
order: 2
---

Chart 用于提供创建 canvas、添加 Mark 标记、自适应图表大小等能力。

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

### 创建可视化

#### new Chart

创建 Chart 实例。

#### `chart.[mark]`

设置图表的 Mark 标记，具体见 [mark](/api/mark/area)。

### 设置属性

#### `chart.options`

获取图表的配置项。

#### `chart.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/api/data/overview)。

#### `chart.encode`

设置图形每个通道的字段名称，具体见 [encode](/api/encode/overview)。

#### `chart.scale`

设置图形每个通道的比例尺，具体见 [scale](/api/scale/overview)。

#### `chart.legend`

设置图形的图例，具体见 [legend](/api/component/legend)。

#### `chart.tooltip`

设置图形的 Tooltip，具体见 [tooltip](/api/component/tooltip/overview)。

#### `chart.axis`

设置图形的坐标轴，具体见 [axis](/api/component/axis)。

#### `chart.slider`

设置图形的坐标轴，具体见 [slider](/api/component/slider)。

#### `chart.label`

设置图形的标签，具体见 [label](/api/label/overview)。

#### `chart.style`

设置图形的样式，具体见 [style](/api/style/overview)。

#### `chart.theme`

设置图形的主题，具体见 [style](/api/theme/overview)。

### 渲染图表

#### `chart.render`

调用图表的渲染方法。

#### `chart.destroy`

销毁图表容器和 Canvas 画布。

#### `chart.clear`

清空图表配置和 Canvas 画布。

#### `chart.show`

显示当前节点渲染的图形。

#### `chart.hide`

隐藏当前节点渲染的图形。

#### `chart.changeData(data:Datum[])`

更改图形的数据来源并重新渲染整个图表。

#### `chart.changeSize(width: number, height: number)`

改变图表的宽高，并重新渲染。

#### `chart.forceFit`

自动根据外部 DOM 容器大小调整画布并重新渲染。

### 获取实例

#### `chart.getContainer`

获取图表的 HTML 容器。

#### `chart.getContext`

返回 chart 的 context 信息。

#### `chart.getView`

返回 chart 渲染时的 view 实例。

#### `chart.getCoordinate`

返回 chart 渲染时的 coordinate 实例。

#### `chart.getTheme`

返回 chart 渲染时的 theme 实例。

#### `chart.getGroup`

返回 chart 渲染时的 canvas group 实例。

#### `chart.getScale`

返回 chart 渲染时所有的 scale 实例。

#### `chart.getScaleByChannel`

通过通道名称查找返回 chart 渲染时对应的 scale 实例。

#### `chart.on`

监听 chart 上的事件。

#### `chart.once`

监听 chart 上的事件，仅触发一次。

#### `chart.emit`

触发 chart 上的事件。

#### `chart.off`

写在 chart 上的监听事件。

#### `chart.getNodesByType(type: string): Node[]`

通过 type 查找所有的 node 子节点。

#### `chart.getNodeByKey(key: string): Node`

通过 key 找到当前 node 的子节点。

#### `chart.append(node:Node)`

创建一个新的 Node 并添加在 chart 的子节点上。

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
