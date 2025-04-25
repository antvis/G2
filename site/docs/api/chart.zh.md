---
title: Chart
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
| depth     | 图表深度，在 3D 图表中使用                                                                                                                                                                    | `number`                | 0      |
| renderer  | 指定渲染引擎，默认使用 canvas。                                                                                                                                                               |                         |        |
| plugins   | 指定渲染时使用的插件 ，具体见 [plugin](/manual/extra-topics/plugin/rough)                                                                                                                                     | `any[]`                 |        |
| autoFit   | 图表是否自适应容器宽高，默认为 `false`，用户需要手动设置 `width` 和 `height`。<br/>当 `autoFit: true` 时，会自动取图表容器的宽高，如果用户设置了 `height`，那么会以用户设置的 `height` 为准。 | `boolean`               | false  |
| padding   | 图表内边距                                                                                                                                                                                    | `number`                | 30     |

## 创建可视化

### new Chart

创建 Chart 实例。

### `chart.interval`

添加 interval 图形，具体见 [mark](/manual/core/mark/interval)。

### `chart.rect`

添加 rect 图形，具体见 [mark](/manual/core/mark/rect)。

### `chart.point`

添加 point 图形，具体见 [mark](/manual/core/mark/point)。

### `chart.area`

添加 area 图形，具体见 [mark](/manual/core/mark/area)。

### `chart.line`

添加 line 图形，具体见 [mark](/manual/core/mark/line)。

### `chart.vector`

添加 vector 图形，具体见 [mark](/manual/core/mark/vector)。

### `chart.link`

添加 link 图形，具体见 [mark](/manual/core/mark/link)。

### `chart.polygon`

添加 polygon 图形，具体见 [mark](/manual/core/mark/polygon)。

### `chart.image`

添加 image 图形，具体见 [mark](/manual/core/mark/image)。

### `chart.text`

添加 text 图形，具体见 [mark](/manual/core/mark/text)。

### `chart.lineX`

添加 lineX 图形，具体见 [mark](/manual/core/mark/line-x)。

### `chart.lineY`

添加 lineY 图形，具体见 [mark](/manual/core/mark/line-y)。

### `chart.range`

添加 range 图形，具体见 [mark](/manual/core/mark/range)。

### `chart.rangeX`

添加 rangeX 图形，具体见 [mark](/manual/core/mark/range-x)。

### `chart.rangeY`

添加 rangeY 图形，具体见 [mark](/manual/core/mark/range-y)。

### `chart.connector`

<!-- 暂缺 -->

添加 connector 图形。

### `chart.sankey`

添加 sankey 图形，具体见 [graph](/manual/extra-topics/graph/sankey)。

### `chart.treemap`

添加 treemap 图形，具体见 [graph](/manual/extra-topics/graph/treemap)。

### `chart.boxplot`

添加 boxplot 图形，具体见 [mark](/manual/core/mark/boxplot)。

### `chart.density`

添加 density 图形，具体见 [mark](/manual/core/mark/density)。

### `chart.heatmap`

添加 heatmap 图形，具体见 [mark](/manual/core/mark/heatmap)。

### `chart.shape`

添加自定义图形，具体见 [mark](/manual/core/mark/shape)。

### `chart.pack`

添加 pack 图形，具体见 [graph](/manual/extra-topics/graph/pack)。

### `chart.forceGraph`

添加 forceGraph 图形，具体见 [graph](/manual/extra-topics/graph/force-graph)。

### `chart.tree`

添加 tree 图形，具体见 [graph](/manual/extra-topics/graph/tree)。

### `chart.wordCloud`

添加 wordCloud 图形，具体见 [mark](/manual/core/mark/wordcloud)。

### `chart.gauge`

添加 gauge 图形，具体见 [mark](/manual/core/mark/gauge)。

### `chart.view`

添加 view 图形，具体见 [api](/api/view)。

### `chart.spaceLayer`

添加 spaceLayer 图形，具体见 [composition](/manual/core/composition/space-layer)。

### `chart.spaceFlex`

添加 spaceFlex 图形，具体见 [composition](/manual/core/composition/space-flex)。

### `chart.facetRect`

添加 facetRect 图形，具体见 [composition](/manual/core/composition/facet-rect)。

### `chart.facetCircle`

添加 facetCircle 图形，具体见 [composition](/manual/core/composition/facet-circle)。

### `chart.repeatMatrix`

添加 repeatMatrix 图形，具体见 [composition](/manual/core/composition/repeat-matrix)。

### `chart.geoView`

添加 geoView 图形，具体见 [geo](/manual/extra-topics/geo/geo-view)。

### `chart.geoPath`

添加 geoPath 图形，具体见 [geo](/manual/extra-topics/geo/geo-path)。

### `chart.timingKeyframe`

添加 timingKeyframe 图形，具体见 [composition](/manual/core/composition/timing-keyframe)。

### `chart.point3D`

添加 point3D 图形，具体见 [3d](/manual/extra-topics/three-dimensional/point-threed)。

### `chart.interval3D`

添加 interval3D 图形，具体见 [3d](/manual/extra-topics/three-dimensional/interval-threed)。

### `chart.line3D`

添加 line3D 图形，具体见 [3d](/manual/extra-topics/three-dimensional/line-threed)。

### `chart.surface3D`

添加 surface3D 图形，具体见 [3d](/manual/extra-topics/three-dimensional/surface-threed)。

## 设置属性

### `chart.width`

设置或获取图表的宽度。

### `chart.height`

设置或获取图表的高度。

### `chart.title`

设置或获取图表的标题。

### `chart.options`

获取图表的配置项。

### `chart.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/manual/core/data/overview)。

### `chart.encode`

设置图形每个通道的字段名称，具体见 [encode](/manual/core/encode)。

### `chart.scale`

设置图形每个通道的比例尺，具体见 [scale](/manual/core/scale/overview)。

### `chart.title`

设置图形的标题，具体见 [title](/manual/component/title)。

### `chart.legend`

设置图形的图例，具体见 [legend](/manual/component/legend)。

### `chart.tooltip`

设置图形的提示，具体见 [tooltip](/manual/component/tooltip)。

### `chart.axis`

设置图形的坐标轴，具体见 [axis](/manual/component/axis)。

### `chart.slider`

设置图形的缩略轴，具体见 [slider](/manual/component/slider)。

### `chart.scrollbar`

设置图形的滚动条，具体见 [slider](/manual/component/scrollbar)。

### `chart.label`

设置图形的标签，具体见 [label](/manual/component/label)。

### `chart.style`

<!-- common 未放开，但可以跳转 -->

设置图形的样式，具体见 [style](/manual/core/style)。

### `chart.theme`

设置图形的主题，具体见 [theme](/manual/core/theme/overview)。

### `chart.labelTransform`

<!-- 缺失 -->

设置图形的 labelTransform，具体见 [label](/manual/component/label)里的transform配置。

## 渲染图表

### `chart.render`

调用图表的渲染方法。

### `chart.destroy`

销毁图表容器和 Canvas 画布。

### `chart.clear`

清空图表配置和 Canvas 画布。

### `chart.show`

显示当前节点渲染的图形。

### `chart.hide`

隐藏当前节点渲染的图形。

### `chart.changeData`

更改图形的数据来源并重新渲染整个图表。

### `chart.changeSize`

改变图表的宽高，并重新渲染。

### `chart.forceFit`

自动根据外部 DOM 容器大小调整画布并重新渲染。

## 获取实例

### `chart.getContainer`

获取图表的 HTML 容器。

### `chart.getContext`

返回 chart 的 context 信息。

### `chart.getView`

返回 chart 渲染时的 view 实例。

### `chart.getCoordinate`

返回 chart 渲染时的 coordinate 实例。

### `chart.getTheme`

返回 chart 渲染时的 theme 实例。

### `chart.getGroup`

返回 chart 渲染时的 canvas group 实例。

### `chart.getScale`

返回 chart 渲染时所有的 scale 实例。

### `chart.getScaleByChannel`

通过通道名称查找返回 chart 渲染时对应的 scale 实例。

### `chart.on`

监听 chart 上的事件。

### `chart.once`

监听 chart 上的事件，仅触发一次。

### `chart.emit`

触发 chart 上的事件。

### `chart.off`

卸载 chart 上的监听事件。

### `chart.getNodesByType`

通过 type 查找所有的 node 子节点。

### `chart.getNodeByKey`

通过 key 找到当前 node 的子节点。

### `chart.append`

创建一个新的 Node 并添加在 chart 的子节点上。

## 事件

## 生命周期事件

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

## UI 事件

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
