---
title: brushAxisHighlight
order: 2
---

## Overview

The `brushAxisHighlight` interaction targets the coordinate axis, allowing users to brush select areas on axis to highlight corresponding chart elements. This interaction is particularly suitable for parallel coordinate charts, helping users quickly filter and analyze multi-dimensional data.

- **Trigger**: Brush selection on the coordinate axis.
- **End**: Click on non-brush areas of the axis or double-click on an existing brush area.
- **Affected States**:
  - Elements within the brush range become `active`.
  - Elements outside the brush range become `inactive`.

Built-in interaction states:

```js
({
  // Define inactive state element opacity as 0.5
  state: { inactive: { opacity: 0.5 } },
});
```

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*y-afSbt4oroAAAAAAAAAAAAADmJ7AQ/original" width="640">

## Usage

There are two ways to configure the `brushAxisHighlight` interaction:

First, pass a `boolean` to enable or disable the interaction.

```js
({
  type: 'line',
  interaction: { brushAxisHighlight: true }, // Use default configuration
});
```

Second, pass [configuration options](#configuration-options) to customize the interaction.

```js
({
  type: 'line',
  interaction: {
    brushAxisHighlight: {
      maskFill: 'red',
      maskOpacity: 0.8,
    },
  },
});
```

## Configuration Levels

The interaction can be configured at the Mark level:

```js
({
  type: 'line',
  interaction: { brushAxisHighlight: true },
});
```

It can also be configured at the View level, where interactions declared on the view are passed to marks declared in `children`:

```js
({
  type: 'view',
  interaction: { brushAxisHighlight: true },
  children: [
    {
      type: 'line',
      // Inherits parent interaction configuration
    },
  ],
});
```

## Configuration Options

| Property        | Description                                                                                                  | Type                            | Default Value                                                                                   | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------- | -------- |
| reverse         | Whether to reverse the brush; when reversed, elements outside the selection area will be highlighted         | `boolean`                       | `false`                                                                                         |          |
| facet           | Whether brush spans across facets, controlling interaction behavior                                          | `boolean`                       | `false`                                                                                         |          |
| selectedHandles | Resizable handle directions                                                                                  | `string[]`                      | `['handle-n','handle-e','handle-s','handle-w','handle-nw','handle-ne','handle-se','handle-sw']` |          |
| brushRegion     | Custom brush region, generally not configured, used internally by G2 for brushXHighlight and brushYHighlight | `(x, y, x1, y1, extent) => any` | `(x, y, x1, y1) => [x, y, x1, y1]`                                                              |          |
| mask            | Style of the brush area mask                                                                                 | Object                          | See mask section below                                                                          |          |
| maskHandle      | Style of the brush area handles                                                                              | Object                          | See maskHandle section below                                                                    |          |

### mask

Configure the style of the brush area mask.

| Property          | Description                                                                       | Type              | Default Value | Required |
| ----------------- | --------------------------------------------------------------------------------- | ----------------- | ------------- | -------- |
| maskFill          | Fill color of the mask                                                            | `string`          | `#777`        |          |
| maskFillOpacity   | Fill opacity of the mask                                                          | `number`          | `0.3`         |          |
| maskStroke        | Stroke of the mask                                                                | `string`          | `#fff`        |          |
| maskStrokeOpacity | Stroke opacity                                                                    | `number`          |               |          |
| maskLineWidth     | Width of the mask stroke                                                          | `number`          |               |          |
| maskLineDash      | Dash configuration for stroke, first value is dash length, second is gap distance | `[number,number]` |               |          |
| maskOpacity       | Overall opacity of the mask                                                       | `number`          |               |          |
| maskShadowColor   | Shadow color of the mask                                                          | `string`          |               |          |
| maskShadowBlur    | Gaussian blur coefficient for mask shadow                                         | `number`          |               |          |
| maskShadowOffsetX | Horizontal distance of shadow from mask                                           | `number`          |               |          |
| maskShadowOffsetY | Vertical distance of shadow from mask                                             | `number`          |               |          |
| maskCursor        | Mouse cursor style. Same as CSS cursor styles                                     | `string`          | `default`     |          |

When configuring the brush area mask style, instead of using an object format, configure with `mask` prefix plus property:

```js
({
  interaction: {
    brushAxisHighlight: {
      maskFill: '#000',
      maskFillOpacity: 0.2,
      maskStroke: 'red',
      maskStrokeOpacity: 0.9,
      maskLineWidth: 2,
      maskLineDash: [4, 8],
      maskOpacity: 0.2,
      maskShadowColor: '#d3d3d3',
      maskShadowBlur: 10,
      maskShadowOffsetX: 10,
      maskShadowOffsetY: 10,
      maskCursor: 'pointer',
    },
  },
});
```

### maskHandle

The eight directional handles are named as follows (using compass directions). Set corresponding properties using the format `mask[handleName][styleAttribute]`, or set width with `maskHandleSize`.

![custom-style](https://github.com/antvis/G2/assets/49330279/eb2d3951-7990-423c-97f3-e3a38b2baf68)

| Property                      | Description                                                                       | Type                                      | Default Value | Required |
| ----------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------- | ------------- | -------- |
| mask[handleName]Render        | Custom render function for mask handles                                           | `(g, options, document) => DisplayObject` |               |          |
| mask[handleName]Size          | Width of mask handles                                                             | `string`                                  |               |          |
| mask[handleName]Fill          | Fill color of mask handles                                                        | `string`                                  |               |          |
| mask[handleName]FillOpacity   | Fill opacity of mask handles                                                      | `number`                                  |               |          |
| mask[handleName]Stroke        | Stroke of mask handles                                                            | `string`                                  |               |          |
| mask[handleName]StrokeOpacity | Stroke opacity                                                                    | `number`                                  |               |          |
| mask[handleName]LineWidth     | Width of mask handle stroke                                                       | `number`                                  |               |          |
| mask[handleName]LineDash      | Dash configuration for stroke, first value is dash length, second is gap distance | `[number,number]`                         |               |          |
| mask[handleName]Opacity       | Overall opacity of mask handles                                                   | `number`                                  |               |          |
| mask[handleName]ShadowColor   | Shadow color of mask handles                                                      | `string`                                  |               |          |
| mask[handleName]ShadowBlur    | Gaussian blur coefficient for mask handle shadow                                  | `number`                                  |               |          |
| mask[handleName]ShadowOffsetX | Horizontal distance of shadow from mask handle                                    | `number`                                  |               |          |
| mask[handleName]ShadowOffsetY | Vertical distance of shadow from mask handle                                      | `number`                                  |               |          |
| mask[handleName]Cursor        | Mouse cursor style. Same as CSS cursor styles                                     | `string`                                  | `default`     |          |

## Events

### Listening to Events

The following events are supported:

- `brushAxis:start` - Triggered when starting to create a brush
- `brushAxis:end` - Triggered when brush size and position update is completed
- `brushAxis:remove` - Triggered when brush is removed
- `brushAxis:highlight` - Triggered when brush changes size and position

```js
chart.on('brushAxis:highlight', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('brushAxis:highlight', data);
});

chart.on('brushAxis:remove', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('brushAxis:remove', data);
});
```

### Triggering Interactions

The following events are supported:

- `brushAxis:highlight` - Highlight data
- `brushAxis:remove` - Remove brush

```js
chart.emit('brushAxis:highlight', {
  data: { selection: [[20, 30], undefined, [100, 300]] },
});

chart.emit('brushAxis:remove', {});
```

## Examples

### Parallel Coordinate Brush Highlighting

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const axis = {
  zIndex: 1,
  titlePosition: 'right',
  line: true,
  style: {
    labelStroke: '#fff',
    labelStrokeWidth: 5,
    labelFontSize: 10,
    labelStrokeLineJoin: 'round',
    titleStroke: '#fff',
    titleFontSize: 10,
    titleStrokeWidth: 5,
    titleStrokeLineJoin: 'round',
    titleTransform: 'translate(-50%, 0) rotate(-90)',
    lineStroke: 'black',
    tickStroke: 'black',
    lineStrokeWidth: 1,
  },
};

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/cars3.json',
  },
  coordinate: { type: 'parallel' },
  encode: {
    position: [
      'economy (mpg)',
      'cylinders',
      'displacement (cc)',
      'power (hp)',
      'weight (lb)',
      '0-60 mph (s)',
      'year',
    ],
    color: 'weight (lb)',
  },
  style: {
    lineWidth: 1.5,
    strokeOpacity: 0.4,
  },
  scale: {
    color: {
      type: 'sequential',
      palette: 'brBG',
      offset: (t) => 1 - t,
    },
  },
  legend: {
    color: {
      length: 400,
      layout: { justifyContent: 'center' },
    },
  },
  state: {
    active: { lineWidth: 5 },
    inactive: { stroke: '#eee', opacity: 0.5 },
  },
  axis: Object.fromEntries(
    Array.from({ length: 7 }, (_, i) => [
      `position${i === 0 ? '' : i}`,
      {
        ...axis,
        title: true,
      },
    ]),
  ),
  interaction: {
    brushAxisHighlight: {
      maskFill: '#000',
      maskFillOpacity: 0.2,
      maskStroke: '#1890ff',
      maskLineWidth: 1,
    },
    tooltip: false,
  },
});

chart.render();
```

### Custom Handle Styles

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: [
    { x: 10, y: 5, category: 'A' },
    { x: 15, y: 8, category: 'A' },
    { x: 20, y: 12, category: 'A' },
    { x: 25, y: 15, category: 'A' },
    { x: 30, y: 10, category: 'B' },
    { x: 35, y: 7, category: 'B' },
    { x: 40, y: 13, category: 'B' },
    { x: 45, y: 18, category: 'B' },
    { x: 50, y: 20, category: 'C' },
    { x: 55, y: 16, category: 'C' },
    { x: 60, y: 9, category: 'C' },
    { x: 65, y: 6, category: 'C' },
  ],
  encode: {
    color: 'category',
    x: 'x',
    y: 'y',
  },
  state: {
    inactive: { stroke: 'gray', opacity: 0.5 },
  },
  interaction: {
    brushAxisHighlight: {
      maskHandleSize: 20,
      maskHandleNFill: 'blue',
      maskHandleEFill: 'red',
      maskHandleSFill: 'green',
      maskHandleWFill: 'yellow',
      maskHandleNWFill: 'black',
      maskHandleNEFill: 'steelblue',
      maskHandleSEFill: 'pink',
      maskHandleSWFill: 'orange',
    },
  },
});

chart.render();
```
