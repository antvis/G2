---
title: Chart
order: 2
---

Chart is used to provide the ability to create canvas, add Mark tags, adaptive chart size, etc.

## start using

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

## Options

| API       | describe                                                                                                                                                                                                                                                                                                                  | type                    | default value |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------- |
| container | Specify the DOM drawn by the chart. You can pass in the DOM id or directly pass in the dom instance.                                                                                                                                                                                                                      | `string \| HTMLElement` |               |
| width     | chart width                                                                                                                                                                                                                                                                                                               | `number`                | 640           |
| height    | chart height                                                                                                                                                                                                                                                                                                              | `number`                | 480           |
| depth     | Chart depth, used in 3D charts                                                                                                                                                                                                                                                                                            | `number`                | 0             |
| renderer  | Specify the rendering engine, using canvas by default.                                                                                                                                                                                                                                                                    |                         |               |
| plugins   | Specify the plug-in used when rendering. For details, see[plugin](/api/plugin/rough)                                                                                                                                                                                                                                      | `any[]`                 |               |
| autoFit   | Whether the chart adapts to the width and height of the container, the default is`false`, users need to manually set`width`and`height`。<br/>when`autoFit: true`, the width and height of the chart container will be automatically taken. If the user sets`height`, then it will be set by the user`height`shall prevail. | `boolean`               | false         |
| padding   | chart padding                                                                                                                                                                                                                                                                                                             | `number`                | 30            |

## Create a visualization

### new Chart

Create a Chart instance.

### `chart.interval`

Add interval graphics, see for details[mark](/spec/mark/interval)。

### `chart.rect`

Add rect graphics, see for details[mark](/spec/mark/rect)。

### `chart.point`

Add point graphics, see for details[mark](/spec/mark/point)。

### `chart.area`

Add area graphics, see for details[mark](/spec/mark/area)。

### `chart.line`

Add line graphics, see for details[mark](/spec/mark/line)。

### `chart.vector`

Add vector graphics, see details[mark](/spec/mark/vector)。

### `chart.link`

Add link graphics, see for details[mark](/spec/mark/link)。

### `chart.polygon`

Add polygon graphics, see details[mark](/spec/mark/polygon)。

### `chart.image`

Add image graphics, see for details[mark](/spec/mark/image)。

### `chart.text`

Add text graphics, see details[mark](/spec/mark/text)。

### `chart.lineX`

Add lineX graphics, see for details[mark](/spec/mark/line-x)。

### `chart.lineY`

Add lineY graphics, see for details[mark](/spec/mark/line-y)。

### `chart.range`

Add range graphics, see for details[mark](/spec/mark/range)。

### `chart.rangeX`

Add rangeX graphics, see for details[mark](/spec/mark/range-x)。

### `chart.rangeY`

Add rangeY graphics, see for details[mark](/spec/mark/range-y)。

### `chart.connector`

<!-- 暂缺 -->

Add connector graphics, see for details[mark](/spec/mark/connector)。

### `chart.sankey`

Add sankey graphics, see details[graph](/spec/graph/sankey)。

### `chart.treemap`

Add treemap graphics, see details[graph](/spec/graph/treemap)。

### `chart.boxplot`

Add boxplot graphics, see[mark](/spec/mark/boxplot)。

### `chart.density`

Add density graphics, see[mark](/spec/mark/density)。

### `chart.heatmap`

Add heatmap graphics, see[mark](/spec/mark/heatmap)。

### `chart.shape`

Add shape graphics, see for details[mark](/spec/mark/shape)。

### `chart.pack`

Add pack graphics, see[graph](/spec/graph/pack)。

### `chart.forceGraph`

Add forceGraph graph, see for details[graph](/spec/graph/force-graph)。

### `chart.tree`

Add tree graphics, see details[graph](/spec/graph/tree)。

### `chart.wordCloud`

Add wordCloud graphics, see details[mark](/spec/mark/word-cloud)。

### `chart.gauge`

Add gauge graphics, see for details[mark](/spec/mark/gauge)。

### `chart.view`

Add view graphics, see details[api](/api/view)。

### `chart.spaceLayer`

Add spaceLayer graphic, see details[composition](/spec/composition/space-layer)。

### `chart.spaceFlex`

Add spaceFlex graphics, see[composition](/spec/composition/space-flex)。

### `chart.facetRect`

Add facetRect graphic, see details[composition](/spec/composition/facet-rect)。

### `chart.facetCircle`

Add facetCircle graphics, see details[composition](/spec/composition/facet-circle)。

### `chart.repeatMatrix`

Add repeatMatrix graphics, see details[composition](/spec/composition/repeat-matrix)。

### `chart.geoView`

Add geoView graphics, see[geo](/spec/geo/geo-view)。

### `chart.geoPath`

Add geoPath graphics, see[geo](/spec/geo/geo-path)。

### `chart.timingKeyframe`

Add timingKeyframe graphic, see details[composition](/spec/composition/timing-keyframe)。

### `chart.point3D`

Add point3D graphics, see for details[3d](/spec/threed/point-threed)。

### `chart.interval3D`

Add interval3D graphics, see for details[3d](/spec/threed/interval-threed)。

### `chart.line3D`

Add line3D graphics, see details[3d](/spec/threed/line-threed)。

## Set properties

### `chart.width`

Set or get the width of the chart.

### `chart.height`

Sets or gets the height of the chart.

### `chart.title`

Set or get the title of the chart.

### `chart.options`

Get the configuration items of the chart.

### `chart.data`

Set graphic data to support multiple data sources and data transformations. For details, see[data](/spec/data/overview)。

### `chart.encode`

<!-- 暂缺 -->

Set the field name of each channel of the graph. For details, see[encode](/api/encode/overview)。

### `chart.scale`

<!-- 概况中的 scale 介绍更清晰 -->

Set the scale of each channel of the graph. For details, see[scale](/spec/overview#scale)。

### `chart.legend`

Set the legend of the graph. For details, see[legend](/spec/component/legend)。

### `chart.tooltip`

Set the Tooltip of the graphic. For details, see[tooltip](/spec/component/tooltip)。

### `chart.axis`

Set the coordinate axis of the graph. For details, see[axis](/spec/component/axis)。

### `chart.slider`

Set the coordinate axis of the graph. For details, see[slider](/spec/component/slider)。

### `chart.label`

Set the label of the graph. For details, see[label](/spec/label/overview)。

### `chart.style`

<!-- common 未放开，但可以跳转 -->

Set the graphic style. For details, see[style](/spec/common/style)。

### `chart.theme`

Set the theme of the graphic. For details, see[theme](/spec/theme/academy)。

### `chart.labelTransform`

<!-- 缺失 -->

Set the labelTransform of the graphic. For details, see[label](/spec/label/overview)

## Render chart

### `chart.render`

Call the chart's rendering method.

### `chart.destroy`

Destroy the chart container and Canvas.

### `chart.clear`

Clear the chart configuration and Canvas.

### `chart.show`

Displays the graphics rendered by the current node.

### `chart.hide`

Hide the graphics rendered by the current node.

### `chart.changeData`

Change the graph's data source and re-render the entire graph.

### `chart.changeSize`

Change the width and height of the chart and re-render it.

### `chart.forceFit`

Automatically resize the canvas to the size of the external DOM container and re-render.

## Get instance

### `chart.getContainer`

Gets the chart's HTML container.

### `chart.getContext`

Returns the context information of the chart.

### `chart.getView`

Returns the view instance when the chart is rendered.

### `chart.getCoordinate`

Returns the coordinate instance when the chart is rendered.

### `chart.getTheme`

Returns the theme instance when the chart is rendered.

### `chart.getGroup`

Returns the canvas group instance when the chart is rendered.

### `chart.getScale`

Returns all scale instances when the chart is rendered.

### `chart.getScaleByChannel`

Searching by channel name returns the scale instance corresponding to chart rendering.

### `chart.on`

Listen for events on the chart.

### `chart.once`

Listen to events on the chart and only trigger them once.

### `chart.emit`

Trigger events on the chart.

### `chart.off`

Listening events written on the chart.

### `chart.getNodesByType`

Find all node child nodes by type.

### `chart.getNodeByKey`

Find the child nodes of the current node by key.

### `chart.append`

Create a new Node and add it to the child node of the chart.

## event

## life cycle events

| event              | describe                                                                        |
| ------------------ | ------------------------------------------------------------------------------- |
| `beforerender`     | This event is executed before the chart is rendered.                            |
| `afterrender`      | This event is executed after the chart is rendered                              |
| `beforepaint`      | This event is executed after the chart layout is calculated and before drawing. |
| `afterpaint`       | This event is executed after the chart is drawn                                 |
| `beforechangedata` | This event is executed before the chart updates data.                           |
| `afterchangedata`  | This event is executed after the chart updates data                             |
| `beforechangesize` | This event is executed before the chart updates size.                           |
| `afterchangesize`  | This event is executed after the chart is updated in size                       |
| `beforedestroy`    | Execute this event before the chart is destroyed                                |
| `afterdestroy`     | This event is executed after the chart is destroyed                             |

pass`chart.on()`to declare life cycle events. For example:

```js
chart.on('afterrender', (e) => {
  console.log('Chart has been rendered!');
});
```

## UI events

## FAQ

* How to use svg for chart rendering?

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
