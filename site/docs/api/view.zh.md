---
title: 视图 - View
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

## View API

### 创建可视化

#### `view.[mark]`

设置图表的 Mark 标记，具体见 [mark](/api/mark/area)。

### 设置属性

#### `view.attr`

获取或设置图表的配置项。

#### `view.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/api/data/overview)。

#### `view.encode`

设置图形每个通道的字段名称，具体见 [encode](/api/encode/overview)。

#### `view.scale`

设置图形每个通道的比例尺，具体见 [scale](/api/scale/overview)。

#### `view.legend`

设置图形的图例，具体见 [legend](/api/component/legend)。

#### `view.tooltip`

设置图形的 Tooltip，具体见 [tooltip](/api/component/tooltip/overview)。

#### `view.axis`

设置图形的坐标轴，具体见 [axis](/api/component/axis)。

#### `view.slider`

设置图形的坐标轴，具体见 [slider](/api/component/slider)。

#### `view.label`

设置图形的标签，具体见 [label](/api/label/overview)。

#### `view.style`

设置图形的样式，具体见 [style](/api/style/overview)。

#### `view.theme`

设置图形的主题，具体见 [style](/api/theme/overview)。

### 获取实例

#### `view.getView`

返回 view 渲染时的 view 实例。

#### `view.getCoordinate`

返回 view 渲染时的 coordinate 实例。

#### `view.getTheme`

返回 view 渲染时的 theme 实例。

#### `view.getGroup`

返回 view 渲染时的 canvas group 实例。

#### `view.getScale`

返回 view 渲染时所有的 scale 实例。

#### `view.getScaleByChannel`

通过通道名称查找返回 view 渲染时对应的 scale 实例。

#### `view.getNodesByType(type: string): Node[]`

通过 type 查找所有的 node 子节点。

#### `view.getNodeByKey(key: string): Node`

通过 key 找到当前 node 的子节点。

### `view.append(node:Node)`

创建一个新的 Node 并添加在 view 的子节点上。
