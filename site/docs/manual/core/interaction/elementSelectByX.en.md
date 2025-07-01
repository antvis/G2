---
title: elementSelectByX
order: 15
---

## Overview

The `elementSelectByX` interaction targets chart elements. When clicking an element, it selects all elements with the same x channel value.

- Trigger: Click element.

- End: Click the selected element again.

- Affected states:

Selected elements change to `selected` state.

Other elements change to `unselected` state.

Built-in interaction states:

```js
({
  // Selected state elements have 1px black border
  state: { selected: { lineWidth: '1', stroke: '#000' } },
});
```

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670298776816/element-select-by-x.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', paddingLeft: 50 });

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  encode: { x: 'state', y: 'population', color: 'age' },
  axis: { y: { labelFormatter: '~s' } },
  state: { selected: { fill: 'red' }, unselected: { opacity: 0.5 } },
  interaction: { elementSelectByX: true },
});

chart.render();
```

## Usage

There are two ways to configure the `elementSelectByX` interaction:

First, pass a `boolean` to set whether to enable the interaction.

```js
({
  type: 'interval',
  interaction: { elementSelectByX: true }, // Use default configuration
});
```

Second, pass [configuration options](#configuration-options) to configure the interaction.

```js
({
  type: 'line',
  interaction: {
    elementSelectByX: {
      background: true,
    },
  },
});
```

## Configuration Level

Interaction can be configured at the Mark level:

```ts
({
  type: 'interval',
  interaction: { elementSelectByX: true },
});
```

It can also be configured at the View level. Interactions declared on the view will be passed to marks declared in `children`. If the mark has declared the corresponding interaction, they will be merged; otherwise, it won't be affected.

```ts
({
  type: 'view',
  interaction: { elementSelectByX: true },
});
```

## Configuration Options

Element select by X interaction configuration has two parts:

1. Interaction configuration
2. Element selection style

### Interaction Configuration

| Property             | Description                                                                                                                        | Type                   | Default |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------- |
| background           | Whether to highlight background                                                                                                    | `boolean`              | false   |
| region               | Whether clicking empty area triggers selection                                                                                     | `boolean`              | false   |
| single               | Whether single-select mode. When set to true, only one x value's corresponding element group can be selected at a time             | `boolean`              | false   |
| multipleSelectHotkey | Hotkey code for multi-select. Hold hotkey to enable multi-select. When set, `single` becomes invalid. Default to multi-select mode | `string` \| `string[]` | -       |

### Element Selection Style

Element selection style, see example [Custom Selection](#custom-selection)

| Property                | Description                                                                                                                        | Type                                                         | Default       | Required |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| offset                  | Offset in the main direction                                                                                                       | number                                                       | `0`           |          |
| radius                  | Element border radius                                                                                                              | number \| (datum, index, data) => number                     | `0`           |          |
| fill                    | Element fill color                                                                                                                 | string \| (datum, index, data) => string                     | -             |          |
| fillOpacity             | Element fill opacity                                                                                                               | number \| (datum, index, data) => number                     | -             |          |
| stroke                  | Element stroke                                                                                                                     | string \| (datum, index, data) => string                     | -             |          |
| strokeOpacity           | Element stroke opacity                                                                                                             | number \| (datum, index, data) => number                     | -             |          |
| lineWidth               | Element stroke width                                                                                                               | number \| (datum, index, data) => number                     | -             |          |
| lineDash                | Element stroke dash configuration. First value is dash length, second is gap length. Setting lineDash to [0,0] means no stroke.    | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| opacity                 | Element overall opacity                                                                                                            | number \| (datum, index, data) => number                     | -             |          |
| shadowColor             | Element shadow color                                                                                                               | string \| (datum, index, data) => string                     | -             |          |
| shadowBlur              | Element shadow Gaussian blur coefficient                                                                                           | number \| (datum, index, data) => number                     | -             |          |
| shadowOffsetX           | Set horizontal distance of shadow from element                                                                                     | number \| (datum, index, data) => number                     | -             |          |
| shadowOffsetY           | Set vertical distance of shadow from element                                                                                       | number \| (datum, index, data) => number                     | -             |          |
| cursor                  | Element mouse cursor style. Same as CSS cursor style.                                                                              | string \| (datum, index, data) => string                     | `default`     |          |
| backgroundRadius        | Background border radius                                                                                                           | number \| (datum, index, data) => number                     | `0`           |          |
| backgroundFill          | Background fill color                                                                                                              | string \| (datum, index, data) => string                     | `transparent` |          |
| backgroundFillOpacity   | Background fill opacity                                                                                                            | number \| (datum, index, data) => number                     | -             |          |
| backgroundStroke        | Background stroke                                                                                                                  | string \| (datum, index, data) => string                     | -             |          |
| backgroundStrokeOpacity | Background stroke opacity                                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| backgroundLineWidth     | Background stroke width                                                                                                            | number \| (datum, index, data) => number                     | -             |          |
| backgroundLineDash      | Background stroke dash configuration. First value is dash length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| backgroundOpacity       | Background overall opacity                                                                                                         | number \| (datum, index, data) => number                     | -             |          |
| backgroundShadowColor   | Background shadow color                                                                                                            | string \| (datum, index, data) => string                     | -             |          |
| backgroundShadowBlur    | Background shadow Gaussian blur coefficient                                                                                        | number \| (datum, index, data) => number                     | -             |          |
| backgroundShadowOffsetX | Set horizontal distance of shadow from background                                                                                  | number \| (datum, index, data) => number                     | -             |          |
| backgroundShadowOffsetY | Set vertical distance of shadow from background                                                                                    | number \| (datum, index, data) => number                     | -             |          |
| backgroundCursor        | Background mouse cursor style. Same as CSS cursor style.                                                                           | string \| (datum, index, data) => string                     | `default`     |          |

When configuring background in selected elements, it's not configured as an object, but using the `background` prefix with property names.

```js
({
  state: {
    selected: {
      offset: 10,
      radius: 50,
      fill: '#1890FF',
      fillOpacity: 0.9,
      stroke: '#40A9FF',
      strokeOpacity: 0.9,
      lineWidth: 2,
      lineDash: [4, 8],
      opacity: 1,
      shadowColor: '#1890FF',
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      cursor: 'pointer',
      backgroundRadius: 50,
      backgroundFill: '#E6F7FF',
      backgroundFillOpacity: 0.9,
      backgroundStroke: '#91D5FF',
      backgroundStrokeOpacity: 0.9,
      backgroundLineWidth: 2,
      backgroundLineDash: [4, 8],
      backgroundOpacity: 1,
      backgroundShadowColor: '#91D5FF',
      backgroundShadowBlur: 10,
      backgroundShadowOffsetX: 5,
      backgroundShadowOffsetY: 5,
      backgroundCursor: 'pointer',
    },
  },
});
```

## Events

### Listening to Events

The following events are supported:

- `element:select` - Triggered when element is selected
- `element:unselect` - Triggered when element is deselected

```js
chart.on('element:select', (e) => {
  console.log(e.data.data);
  console.log(e.nativeEvent);
});

chart.on('element:unselect', (e) => {
  console.log(e.nativeEvent);
});
```

### Triggering Interaction

The following events are supported:

- `element:select` - Select data
- `element:unselect` - Deselect

```js
chart.emit('element:select', {
  data: { data: [{ population: 5038433 }, { population: 3983091 }] },
});

chart.emit('element:unselect', {});
```

## Examples

### Basic Selection

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  paddingLeft: 50,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  axis: { y: { labelFormatter: '~s' } },
  interaction: { elementSelectByX: { background: true } },
});

chart.render();
```

### Custom Selection

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  paddingLeft: 50,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  axis: { y: { labelFormatter: '~s' } },
  state: {
    selected: {
      offset: 10,
      radius: 50,
      fill: (d) => (d.population > 1000000 ? '#F5222D' : '#1890FF'),
      fillOpacity: 0.9,
      stroke: (d) => (d.population > 1000000 ? '#FF4D4F' : '#40A9FF'),
      strokeOpacity: 0.9,
      lineWidth: 2,
      lineDash: [4, 8],
      opacity: 1,
      shadowColor: (d) => (d.population > 1000000 ? '#F5222D' : '#1890FF'),
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      cursor: 'pointer',
      backgroundRadius: 50,
      backgroundFill: (d) => (d.population > 1000000 ? '#FFF1F0' : '#E6F7FF'),
      backgroundFillOpacity: 0.9,
      backgroundStroke: (d) => (d.population > 1000000 ? '#FFA39E' : '#91D5FF'),
      backgroundStrokeOpacity: 0.9,
      backgroundLineWidth: 2,
      backgroundLineDash: [4, 8],
      backgroundOpacity: 1,
      backgroundShadowColor: (d) =>
        d.population > 1000000 ? '#FFA39E' : '#91D5FF',
      backgroundShadowBlur: 10,
      backgroundShadowOffsetX: 5,
      backgroundShadowOffsetY: 5,
      backgroundCursor: 'pointer',
    },
  },
  interaction: {
    elementSelectByX: {
      background: true,
    },
  },
});

chart.render();
```

### Single-Select Mode

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  paddingLeft: 50,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  axis: { y: { labelFormatter: '~s' } },
  interaction: {
    elementSelectByX: {
      single: true, // Set to single-select mode
      background: true,
    },
  },
});

chart.render();
```

### Multi-Select Mode

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  paddingLeft: 50,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  axis: { y: { labelFormatter: '~s' } },
  interaction: {
    elementSelectByX: {
      multipleSelectHotkey: 'ShiftLeft', // Hold left Shift key to enter multi-select mode
      background: true,
    },
  },
});

chart.render();
```
