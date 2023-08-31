---
title: FacetRect
order: 6
---

## 开始使用

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 928,
  height: 270,
  paddingBottom: 50,
});

const facetRect = chart
  .facetRect()
  .attr('paddingBottom', 50)
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  })
  .encode('x', 'series');

facetRect
  .point()
  .attr('inset', 10)
  .encode('x', 'x')
  .encode('y', 'y')
  .style('stroke', '#000');

chart.render();
```

## 创建可视化

## `facetRect.[mark]`

设置图表的 Mark 标记，具体见 [mark](/api/mark/area)。

## 设置属性

## `facetRect.attr`

获取或设置图表的配置项。

## `facetRect.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/spec/data/overview)。

## `facetRect.scale`

设置图形每个通道的比例尺，具体见 [scale](/spec/overview#scale)。

## `facetRect.legend`

设置图形的图例，具体见 [legend](/spec/component/legend)。

## `facetRect.axis`

设置图形的坐标轴，具体见 [axis](/spec/component/axis)。

## `facetRect.style`

设置图形的样式，具体见 [style](/spec/common/style)。

## `facetRect.theme`

设置图形的主题，具体见 [theme](/spec/theme/overview)。
