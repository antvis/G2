---
title: brushXHighlight
order: 5
---

## Overview

`brushXHighlight` is a specialized `brushHighlight` interaction. While retaining the basic highlight functionality, it fixes the y-axis brush range to the full domain (from minimum to maximum values), focusing specifically on data selection operations in the x-axis direction. This is suitable for scenarios requiring horizontal data comparison (such as time series analysis), improving operation precision by eliminating vertical direction interference.

- Trigger: Brush selection of elements.

- End: Click on chart area.

- Affected states:

Elements within the brush range change to `active` state.

Elements outside the brush range change to `inactive` state.

Built-in interaction states:

```js
({
  inactive: { opacity: 0.5 },
});
```

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*liG4Rq7bzmwAAAAAAAAAAAAADmJ7AQ/original" width="640">

```ts
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
  state: { inactive: { stroke: 'gray' } },
  interaction: { brushXHighlight: true },
});

chart.render();
```

## Usage

There are two ways to configure the `brushXHighlight` interaction:

First, pass a `boolean` to set whether to enable the interaction.

```js
({
  type: 'interval',
  interaction: { brushXHighlight: true },
});
```

Second, pass [configuration options](#configuration-options) to configure the interaction.

```js
({
  type: 'line',
  interaction: {
    brushXHighlight: {
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
  interaction: { brushXHighlight: true },
});
```

It can also be configured at the View level. Interactions declared on the view will be passed to marks declared in `children`. If the mark has declared the corresponding interaction, they will be merged; otherwise, it won't be affected.

```ts
({
  type: 'view',
  interaction: { brushXHighlight: true },
});
```

## Configuration Options

| Property        | Description                               | Type                          | Default                                                          | Required |
| --------------- | ----------------------------------------- | ----------------------------- | ---------------------------------------------------------------- | -------- |
| reverse         | Whether to reverse the brush              | boolean                       | false                                                            |          |
| series          | Whether brush affects series elements     | boolean                       | false                                                            |          |
| facet           | Whether brush spans across facets         | boolean                       | false                                                            |          |
| selectedHandles | Directions of handles that can be resized | string[]                      | `['handle-e', 'handle-w']`                                       |          |
| brushRegion     | Brush region                              | (x, y, x1, y1, extent) => any | `(x, y, x1, y1,[minX, minY, maxX, maxY]) => [x, minY, x1, maxY]` |          |
| mask            | Mask style for brush area                 | [mask](#mask)                 | See [mask](#mask)                                                |          |
| maskHandle      | Handle style for brush area               | [maskHandle](#maskhandle)     | See [maskHandle](#maskhandle)                                    |          |

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
    brushXHighlight: {
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

### Multi-view Chart Linkage

```js | ob {  inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
const focusContainer = document.createElement('div');
const contextContainer = document.createElement('div');
container.append(focusContainer);
container.append(contextContainer);

function createPathRender(compute) {
  return (group, options, document) => {
    if (!group.handle) {
      const path = document.createElement('path');
      group.handle = path;
      group.appendChild(group.handle);
    }
    const { handle } = group;
    const { x, y, width, height, ...rest } = options;
    if (width === undefined || height === undefined) return handle;
    handle.attr({ ...compute(x, y, width, height), ...rest });
    return handle;
  };
}

// Render focus view

const focus = new G2.Chart({
  container: focusContainer,
  height: 360,
  paddingLeft: 50,
});

focus
  .area()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  .animate(false)
  .interaction('brushXHighlight', {
    series: true,
    maskHandleWRender: createPathRender((x, y, w, h) => ({
      d: `M${x + w / 2},${y}L${x - w / 2},${y + h / 2}L${x + w / 2},${y + h}Z`,
      fill: '#1890FF',
    })),
    maskHandleERender: createPathRender((x, y, w, h) => ({
      d: `M${x + w / 2},${y}L${x + (w * 3) / 2},${y + h / 2}L${x + w / 2},${
        y + h
      }Z`,
      fill: '#1890FF',
    })),
  });

// Render context view

const context = new G2.Chart({
  container: contextContainer,
  height: 80,
  paddingLeft: 50,
});

context
  .area()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  .animate(false)
  .axis('x', { title: false })
  .axis('y', false)
  .interaction('brushXHighlight', {
    series: true,
    maskHandleWRender: createPathRender((x, y, w, h) => ({
      d: `M${x + w / 2},${y}L${x - w / 2},${y + h / 2}L${x + w / 2},${y + h}Z`,
      fill: '#1890FF',
    })),
    maskHandleERender: createPathRender((x, y, w, h) => ({
      d: `M${x + w / 2},${y}L${x + (w * 3) / 2},${y + h / 2}L${x + w / 2},${
        y + h
      }Z`,
      fill: '#1890FF',
    })),
  });

Promise.all([focus.render(), context.render()]).then(() => {
  // Add cross-chart linkage
  context.on('brush:highlight', (e) => {
    const { selection } = e.data;
    focus.emit('brush:highlight', { data: { selection } });
  });

  focus.on('brush:highlight', (e) => {
    const { selection } = e.data;
    context.emit('brush:highlight', { data: { selection } });
  });
});
```
