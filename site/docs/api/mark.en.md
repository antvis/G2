---
title: Mark
order: 3
---

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

## Mark API

### Set properties

#### `mark.attr`

Gets or sets the configuration items of the chart.

#### `mark.data`

Set graphic data to support multiple data sources and data transformations. For details, see[data](/spec/data/overview)。

### `chart.changeData`

Change the graph's data and re-render the chart.

#### `mark.encode`

Set the field name of each channel of the graph. For details, see[encode](/api/encode/overview)。

#### `mark.scale`

Set the scale of each channel of the graph. For details, see[scale](/spec/overview#scale)。

#### `mark.label`

Set the label of the graph. For details, see[label](/spec/label/overview)。

#### `mark.style`

Set the graphic style. For details, see[style](/spec/common/style)。

#### `mark.theme`

Set the theme of the graphic. For details, see[theme](/spec/theme/overview)。

#### `mark.animate`

Set the animation of graphics. For details, see[style](/api/animate/overview)。

#### `mark.axis`

Set the coordinate axis of the graph[style](/api/axis/overview)。

#### `mark.legend`

Set the legend of the graph. For details, see[style](/api/legend/overview)。

#### `mark.slider`

Set the thumbnail axis of the graph. For details, see[style](/api/slider/overview)。

#### `mark.scrollbar`

Set the scroll bar of the graph. For details, see[style](/api/scrollbar/overview)。

#### `mark.state`

Set the status style of the graph. For details, see[style](/api/state/overview)。

#### `mark.tooltip`

Set the Tooltip of the graphic. For details, see[style](/api/tooltip/overview)。

### Get instance

#### `chart.getGroup`

Returns the canvas group instance when the chart is rendered.

#### `chart.getScale`

Returns all scale instances when the chart is rendered.

#### `chart.getScaleByChannel`

Searching by channel name returns the scale instance corresponding to chart rendering.
