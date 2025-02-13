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

## 设置属性

### `mark.attr`

获取或设置图表的配置项。

### `mark.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/manual/core/data/overview)。

### `mark.changeData`

更改图形的数据并重新渲染图表。

### `mark.encode`

设置图形每个通道的字段名称，具体见 [encode](/manual/core/encode)。

### `mark.scale`

设置图形每个通道的比例尺，具体见 [scale](/manual/core/scale/overview)。

### `mark.label`

设置图形的标签，具体见 [label](/manual/component/label)。

### `mark.style`

设置图形的样式，具体见 [style](/manual/core/style)。

### `mark.theme`

设置图形的主题，具体见 [theme](/manual/core/theme/overview)。

### `mark.animate`

设置图形的动画，具体见 [animation](/manual/core/animate/overview)。

### `mark.axis`

设置图形的坐标轴，具体见 [axis](/manual/component/axis)。

### `mark.legend`

设置图形的图例，具体见 [legend](/manual/component/legend)。

### `mark.slider`

设置图形的缩略轴，具体见 [slider](/manual/component/slider)。

### `mark.scrollbar`

设置图形的滚动条，具体见 [scrollbar](/manual/component/scrollbar)。

### `mark.state`

设置图形的状态样式，具体见 [state](/manual/core/state)。

### `mark.tooltip`

设置图形的提示，具体见 [tooltip](/manual/component/tooltip)。

## 获取实例

### `mark.getGroup`

返回 mark 渲染时的 canvas group 实例。

### `mark.getScale`

返回 mark 渲染时所有的 scale 实例。

### `mark.getScaleByChannel`

通过通道名称查找返回 mark 渲染时对应的 scale 实例。
