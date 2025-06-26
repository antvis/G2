---
title: brushHighlight
order: 4
---

## Overview

The `brushHighlight` interaction targets chart elements. It highlights elements within the selected brush area and supports dragging and resizing the brush selection.

- Trigger: Brush selection of elements.

- End: Click on chart area.

- Affected states:

Elements within the brush range change to `active` state.

Elements outside the brush range change to `inactive` state.

Built-in interaction states:

```js
({
  // Define inactive state element opacity as 0.5
  state: { inactive: { opacity: 0.5 } },
});
```

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*wICbS6qdoJMAAAAAAAAAAAAADmJ7AQ/original" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height', y: 'weight', color: 'gender' },
  state: { inactive: { stroke: 'gray' } },
  interaction: { brushHighlight: true },
});

chart.render();
```

## Usage

There are two ways to configure the `brushHighlight` interaction:

First, pass a `boolean` to set whether to enable the interaction.

```js
({
  type: 'interval',
  interaction: { brushHighlight: true }, // Use default configuration
});
```

Second, pass [configuration options](#configuration-options) to configure the interaction.

```js
({
  type: 'line',
  interaction: {
    brushHighlight: {
      series: true,
    },
  },
});
```

## Configuration Level

Interaction can be configured at the Mark level:

```ts
({
  type: 'interval',
  interaction: { brushHighlight: true },
});
```

It can also be configured at the View level. Interactions declared on the view will be passed to marks declared in `children`. If the mark has declared the corresponding interaction, they will be merged; otherwise, it won't be affected.

```ts
({
  type: 'view',
  interaction: { brushHighlight: true },
});
```

## Configuration Options

| Property        | Description                                                                                                | Type                          | Default                                                                                         | Required |
| --------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------- | -------- |
| reverse         | Whether to reverse the brush                                                                               | boolean                       | false                                                                                           |          |
| series          | Whether brush affects series elements, controls the highlighting mode of selected elements                 | boolean                       | false                                                                                           |          |
| facet           | Whether brush spans across facets, controls interaction behavior                                           | boolean                       | false                                                                                           |          |
| selectedHandles | Directions of handles that can be resized                                                                  | string[]                      | `['handle-n','handle-e','handle-s','handle-w','handle-nw','handle-ne','handle-se','handle-sw']` |          |
| brushRegion     | Custom brush region, usually not configured, used internally by G2 for brushXHighlight and brushYHighlight | (x, y, x1, y1, extent) => any | `(x, y, x1, y1) => [x, y, x1, y1]`                                                              |          |
| mask            | Mask style for brush area                                                                                  | [mask](#mask)                 | See [mask](#mask)                                                                               |          |
| maskHandle      | Handle style for brush area                                                                                | [maskHandle](#maskhandle)     | See [maskHandle](#maskhandle)                                                                   |          |

### series

The `series` parameter is a key switch that controls the brush highlight mode, determining how to provide visual feedback for graphic elements. When configured as `series: false`, it's more suitable for scatter plots, bar charts and other discrete elements, directly modifying element states (for continuous graphics like line charts, it changes the state of the entire line); when configured as `series: true`, continuous graphics like line charts and area charts will highlight local paths. Please enable or disable as needed.

- `series: false`

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
const config = {
  type: 'line',
  interaction: { brushHighlight: { series: false } },
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  state: { active: { stroke: 'red' } },
  labels: [{ text: 'value', style: { dx: -10, dy: -12 } }],
};
chart.options(config);

chart.render();
```

- `series: true`

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
const config = {
  type: 'line',
  interaction: { brushHighlight: { series: true } },
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  state: { active: { stroke: 'red' } },
  labels: [{ text: 'value', style: { dx: -10, dy: -12 } }],
};
chart.options(config);

chart.render();
```

### mask

Configure the style of the brush area mask.

| Property          | Description                                                                                                    | Type            | Default   | Required |
| ----------------- | -------------------------------------------------------------------------------------------------------------- | --------------- | --------- | -------- |
| maskFill          | Mask fill color                                                                                                | string          | `#777`    |          |
| maskFillOpacity   | Mask fill opacity                                                                                              | number          | 0.3       |          |
| maskStroke        | Mask stroke                                                                                                    | string          | `#fff`    |          |
| maskStrokeOpacity | Stroke opacity                                                                                                 | number          |           |          |
| maskLineWidth     | Mask stroke width                                                                                              | number          |           |          |
| maskLineDash      | Stroke dash configuration. First value is dash length, second is gap length. Setting to [0,0] means no stroke. | [number,number] |           |          |
| maskOpacity       | Mask overall opacity                                                                                           | number          |           |          |
| maskShadowColor   | Mask shadow color                                                                                              | string          |           |          |
| maskShadowBlur    | Mask shadow Gaussian blur coefficient                                                                          | number          |           |          |
| maskShadowOffsetX | Set horizontal distance of shadow from mask                                                                    | number          |           |          |
| maskShadowOffsetY | Set vertical distance of shadow from mask                                                                      | number          |           |          |
| maskCursor        | Mouse cursor style. Same as CSS cursor style                                                                   | string          | `default` |          |

When configuring brush area mask style, it's not configured as an object, but using the `mask` prefix with property names.

```js
({
  interaction: {
    brushHighlight: {
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

The names of handles in eight directions are as follows (named according to north, south, east, west). Set corresponding properties in the format `mask[handleName][styleAttribute]`, or set width through `maskHandleSize`.

<img src="https://github.com/antvis/G2/assets/49330279/eb2d3951-7990-423c-97f3-e3a38b2baf68" width=640 alt="custom-style"/>

| Property                      | Description                                                                                                    | Type                                    | Default   | Required |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------- | --------- | -------- |
| mask[handleName]Render        | Custom mask handle rendering function                                                                          | (g, options, document) => DisplayObject |           |          |
| mask[handleName]Size          | Mask handle width                                                                                              | string                                  |           |          |
| mask[handleName]Fill          | Mask handle fill color                                                                                         | string                                  |           |          |
| mask[handleName]FillOpacity   | Mask handle fill opacity                                                                                       | number                                  |           |          |
| mask[handleName]Stroke        | Mask handle stroke                                                                                             | string                                  |           |          |
| mask[handleName]StrokeOpacity | Stroke opacity                                                                                                 | number                                  |           |          |
| mask[handleName]LineWidth     | Mask handle stroke width                                                                                       | number                                  |           |          |
| mask[handleName]LineDash      | Stroke dash configuration. First value is dash length, second is gap length. Setting to [0,0] means no stroke. | [number,number]                         |           |          |
| mask[handleName]Opacity       | Mask handle overall opacity                                                                                    | number                                  |           |          |
| mask[handleName]ShadowColor   | Mask handle shadow color                                                                                       | string                                  |           |          |
| mask[handleName]ShadowBlur    | Mask handle shadow Gaussian blur coefficient                                                                   | number                                  |           |          |
| mask[handleName]ShadowOffsetX | Set horizontal distance of shadow from mask handle                                                             | number                                  |           |          |
| mask[handleName]ShadowOffsetY | Set vertical distance of shadow from mask handle                                                               | number                                  |           |          |
| mask[handleName]Cursor        | Mouse cursor style. Same as CSS cursor style                                                                   | string                                  | `default` |          |

```js
chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'data/penguins.csv',
  },
  encode: {
    color: 'species',
    x: 'culmen_length_mm',
    y: 'culmen_depth_mm',
  },
  state: {
    inactive: { stroke: 'gray', opacity: 0.5 },
  },
  interaction: {
    brushHighlight: {
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
```

## Events

### Listening to Events

The following events are supported:

- `brush:start` - Triggered when starting to create brush
- `brush:end` - Triggered when brush size and position update is complete
- `brush:remove` - Triggered when brush is removed
- `brush:highlight` - Triggered when brush changes size and position

```js
chart.on('brush:highlight', (e) => {
  console.log(e.data.selection);
  console.log(e.nativeEvent);
});
```

### Triggering Interaction

The following events are supported:

- `brush:highlight` - Highlight data
- `brush:remove` - Remove brush

```js
chart.emit('brush:remove');
chart.emit('brush:highlight', { data: { selection } });
```

## Examples

### Custom Handle

You can specify the handle rendering function through `mask[handleName]Render` to render custom handles. The function signature is as follows:

```js
function render(
  g, // Mount container
  options, // Style properties, set through mask[handleName][styleAttribute]
  document, // Canvas document, used to create sub-graphics
) {
  // Need to return the created graphic
}
```

Here's an example of creating a path handle:

```js
function renderPath(group, options, document) {
  // Creation logic
  // If it's the first render, create and mount the graphic
  if (!group.handle) {
    // Create graphics through document.createElement
    const path = document.createElement('path');
    group.handle = path;
    group.appendChild(group.handle);
  }

  // Update logic
  const { handle } = group;
  const { width, height, ...rest } = options;
  if (width === undefined || height === undefined) return handle;
  handle.attr(rest);

  // Return corresponding value
  return handle;
}
```

<img src="https://github.com/antvis/G2/assets/49330279/d586fabe-4c34-4dfb-bffa-ef1a354b1333" width=640 alt="custom-brush"/>

```js
function createPathRender(path) {
  return (group, options, document) => {
    if (!group.handle) {
      const path = document.createElement('path');
      group.handle = path;
      group.appendChild(group.handle);
    }
    const { handle } = group;
    const { x, y, width, height, ...rest } = options;
    if (width === undefined || height === undefined) return handle;
    handle.style.d = path(x, y, width, height);
    handle.attr(rest);
    return handle;
  };
}

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'data/penguins.csv',
  },
  encode: {
    color: 'species',
    x: 'culmen_length_mm',
    y: 'culmen_depth_mm',
  },
  state: {
    inactive: { stroke: 'gray', opacity: 0.5 },
  },
  interaction: {
    brushHighlight: {
      maskHandleSize: 30,
      maskHandleNRender: createPathRender((x, y, width, height) => {
        return `M${x},${y + height / 2}L${x + width / 2},${y - height / 2}L${
          x + width
        },${y + height / 2},Z`;
      }),
      maskHandleERender: createPathRender(
        (x, y, width, height) =>
          `M${x + width / 2},${y}L${x + (width * 3) / 2},${y + height / 2}L${
            x + width / 2
          },${y + height},Z`,
      ),
      maskHandleSRender: createPathRender(
        (x, y, width, height) =>
          `M${x},${y + height / 2}L${x + width / 2},${y + (height / 2) * 3}L${
            x + width
          },${y + height / 2},Z`,
      ),
      maskHandleWRender: createPathRender(
        (x, y, width, height) =>
          `M${x + width / 2},${y}L${x - width},${y + height / 2}L${
            x + width / 2
          },${y + height},Z`,
      ),
      maskHandleNWRender: createPathRender(
        (x, y, width, height) =>
          `M${x},${y}L${x + width},${y + height / 2}L${x + width / 2},${
            y + height
          },Z`,
      ),
      maskHandleNERender: createPathRender(
        (x, y, width, height) =>
          `M${x},${y + height / 2}L${x + width},${y}L${x + width / 2},${
            y + height
          },Z`,
      ),
      maskHandleSERender: createPathRender(
        (x, y, width, height) =>
          `M${x + width / 2},${y}L${x + width},${y + height}L${x},${
            y + height / 2
          },Z`,
      ),
      maskHandleSWRender: createPathRender(
        (x, y, width, height) =>
          `M${x + width / 2},${y}L${x + width},${y + height / 2}L${x},${
            y + height
          },Z`,
      ),
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
```

### Custom Interaction State

Some interactions change element states. We can change the interaction effect by configuring the appearance of element states.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height', y: 'weight', color: 'gender' },
  state: {
    inactive: { stroke: 'gray', opacity: 0.5 },
    active: { lineWidth: 5 },
  },
  interaction: { brushHighlight: true },
});

chart.render();
```
