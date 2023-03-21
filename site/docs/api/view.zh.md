---
title: View
order: 3
---

## 开始使用

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});
const scaleColor = (node) =>
  node.scale('color', {
    palette: 'cool',
    offset: (t) => t * 0.8 + 0.1,
  });
const layer = chart.spaceLayer().data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  format: 'csv',
});
layer
  .interval()
  .attr('paddingLeft', 50)
  .transform({ type: 'sortX', reverse: true, by: 'y' })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'letter')
  .call(scaleColor);
layer
  .view()
  .attr('x', 300)
  .attr('y', 50)
  .attr('width', 300)
  .attr('height', 300)
  .coordinate({ type: 'theta' })
  .interval()
  .transform({ type: 'stackY' })
  .legend(false)
  .scale('color', {
    palette: 'cool',
    offset: (t) => t * 0.8 + 0.1,
  })
  .encode('y', 'frequency')
  .encode('color', 'letter')
  .call(scaleColor);
chart.render();
```

## 创建可视化

### `view.interval`

添加 interval 图形，具体见 [mark](/spec/mark/interval)。

### `view.rect`

添加 rect 图形，具体见 [mark](/spec/mark/rect)。

### `view.point`

添加 point 图形，具体见 [mark](/spec/mark/point)。

### `view.area`

添加 area 图形，具体见 [mark](/spec/mark/area)。

### `view.line`

添加 line 图形，具体见 [mark](/spec/mark/line)。

### `view.vector`

添加 vector 图形，具体见 [mark](/spec/mark/vector)。

### `view.link`

添加 link 图形，具体见 [mark](/spec/mark/link)。

### `view.polygon`

添加 polygon 图形，具体见 [mark](/spec/mark/polygon)。

### `view.image`

添加 image 图形，具体见 [mark](/spec/mark/image)。

### `view.text`

添加 text 图形，具体见 [mark](/spec/mark/text)。

### `view.lineX`

添加 lineX 图形，具体见 [mark](/spec/mark/lineX)。

### `view.lineY`

添加 lineY 图形，具体见 [mark](/spec/mark/lineY)。

### `view.range`

添加 range 图形，具体见 [mark](/spec/mark/range)。

### `view.rangeX`

添加 rangeX 图形，具体见 [mark](/spec/mark/rangeX)。

### `view.rangeY`

添加 rangeY 图形，具体见 [mark](/spec/mark/rangeY)。

### `view.connector`

添加 connector 图形，具体见 [mark](/spec/mark/connector)。

### `view.sankey`

添加 sankey 图形，具体见 [mark](/spec/mark/sankey)。

### `view.treemap`

添加 treemap 图形，具体见 [mark](/spec/mark/treemap)。

### `view.boxplot`

添加 boxplot 图形，具体见 [mark](/spec/mark/boxplot)。

### `view.shape`

添加 shape 图形，具体见 [mark](/spec/mark/shape)。

### `view.pack`

添加 pack 图形，具体见 [mark](/spec/mark/pack)。

### `view.forceGraph`

添加 forceGraph 图形，具体见 [mark](/spec/mark/forceGraph)。

### `view.tree`

添加 tree 图形，具体见 [mark](/spec/mark/tree)。

### `view.wordCloud`

添加 wordCloud 图形，具体见 [mark](/spec/mark/wordCloud)。

### `view.gauge`

添加 gauge 图形，具体见 [mark](/spec/mark/gauge)。

## 设置属性

### `view.attr`

获取或设置图表的配置项。

### `view.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/api/data/overview)。

### `view.encode`

设置图形每个通道的字段名称，具体见 [encode](/api/encode/overview)。

### `view.scale`

设置图形每个通道的比例尺，具体见 [scale](/api/scale/overview)。

### `view.legend`

设置图形的图例，具体见 [legend](/api/component/legend)。

### `view.tooltip`

设置图形的 Tooltip，具体见 [tooltip](/api/component/tooltip/overview)。

### `view.axis`

设置图形的坐标轴，具体见 [axis](/api/component/axis)。

### `view.slider`

设置图形的坐标轴，具体见 [slider](/api/component/slider)。

### `view.label`

设置图形的标签，具体见 [label](/api/label/overview)。

### `view.style`

设置图形的样式，具体见 [style](/api/style/overview)。

### `view.theme`

设置图形的主题，具体见 [style](/api/theme/overview)。

## 获取实例

### `view.getView`

返回 view 渲染时的 view 实例。

### `view.getCoordinate`

返回 view 渲染时的 coordinate 实例。

### `view.getTheme`

返回 view 渲染时的 theme 实例。

### `view.getGroup`

返回 view 渲染时的 canvas group 实例。

### `view.getScale`

返回 view 渲染时所有的 scale 实例。

### `view.getScaleByChannel`

通过通道名称查找返回 view 渲染时对应的 scale 实例。

### `view.getNodesByType(type: string): Node[]`

通过 type 查找所有的 node 子节点。

### `view.getNodeByKey(key: string): Node`

通过 key 找到当前 node 的子节点。

## `view.append(node:Node)`

创建一个新的 Node 并添加在 view 的子节点上。
