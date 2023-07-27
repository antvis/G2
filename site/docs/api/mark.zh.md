---
title: Mark
order: 3
---

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

## Mark API

### 设置属性

#### `mark.attr`

获取或设置图表的配置项。

#### `mark.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/spec/data/overview)。

### `chart.changeData`

更改图形的数据并重新渲染图表。

#### `mark.encode`

设置图形每个通道的字段名称，具体见 [encode](/api/encode/overview)。

#### `mark.scale`

设置图形每个通道的比例尺，具体见 [scale](/spec/overview#scale)。

#### `mark.label`

设置图形的标签，具体见 [label](/spec/label/overview)。

#### `mark.style`

设置图形的样式，具体见 [style](/spec/common/style)。

#### `mark.theme`

设置图形的主题，具体见 [theme](/spec/theme/overview)。

#### `mark.animate`

设置图形的动画，具体见 [style](/api/animate/overview)。

#### `mark.axis`

设置图形的坐标轴 [style](/api/axis/overview)。

#### `mark.legend`

设置图形的图例，具体见 [style](/api/legend/overview)。

#### `mark.slider`

设置图形的缩略轴，具体见 [style](/api/slider/overview)。

#### `mark.scrollbar`

设置图形的滚动条，具体见 [style](/api/scrollbar/overview)。

#### `mark.state`

设置图形的状态样式，具体见 [style](/api/state/overview)。

#### `mark.tooltip`

设置图形的 Tooltip，具体见 [style](/api/tooltip/overview)。

### 获取实例

#### `chart.getGroup`

返回 chart 渲染时的 canvas group 实例。

#### `chart.getScale`

返回 chart 渲染时所有的 scale 实例。

#### `chart.getScaleByChannel`

通过通道名称查找返回 chart 渲染时对应的 scale 实例。
