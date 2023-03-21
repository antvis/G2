---
title: 图形 - Mark
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

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/api/data/overview)。

#### `mark.encode`

设置图形每个通道的字段名称，具体见 [encode](/api/encode/overview)。

#### `mark.scale`

设置图形每个通道的比例尺，具体见 [scale](/api/scale/overview)。

#### `mark.label`

设置图形的标签，具体见 [label](/api/label/overview)。

#### `mark.style`

设置图形的样式，具体见 [style](/api/style/overview)。

#### `mark.theme`

设置图形的主题，具体见 [style](/api/theme/overview)。

### 获取实例

#### `chart.getGroup`

返回 chart 渲染时的 canvas group 实例。

#### `chart.getScale`

返回 chart 渲染时所有的 scale 实例。

#### `chart.getScaleByChannel`

通过通道名称查找返回 chart 渲染时对应的 scale 实例。
