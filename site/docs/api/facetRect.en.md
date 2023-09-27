---
title: FacetRect
order: 6
---

## start using

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

## Create a visualization

## `facetRect.[mark]`

Set the Mark mark of the chart. For details, see[mark](/api/mark/area)。

## Set properties

## `facetRect.attr`

Gets or sets the configuration items of the chart.

## `facetRect.data`

Set graphic data to support multiple data sources and data transformations. For details, see[data](/spec/data/overview)。

## `facetRect.scale`

Set the scale of each channel of the graph. For details, see[scale](/spec/overview#scale)。

## `facetRect.legend`

Set the legend of the graph. For details, see[legend](/spec/component/legend)。

## `facetRect.axis`

Set the coordinate axis of the graph. For details, see[axis](/spec/component/axis)。

## `facetRect.style`

Set the graphic style. For details, see[style](/spec/common/style)。

## `facetRect.theme`

Set the theme of the graphic. For details, see[theme](/spec/theme/overview)。
