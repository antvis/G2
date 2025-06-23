---
title: elementHighlightByColor
order: 11
---

## Overview

The `elementHighlightByColor` interaction targets chart elements. When the mouse hovers over an element, it highlights all elements with the same color channel value as the hovered element.

- Trigger: Mouse hover over element.

- End: Mouse leaves element.

- Affected states:

Hovered elements change to `active` state.

Other elements change to `inactive` state.

Built-in interaction states:

```js
({
  // Active state elements have 1px black border
  state: { active: { lineWidth: '1', stroke: '#000' } },
});
```

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670297651394/highlight-by-color.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  state: {
    active: { fill: 'red', linkFillOpacity: 0.5 },
    inactive: { opacity: 0.5 },
  },
  axis: { y: { labelFormatter: '~s' } },
  interaction: { elementHighlightByColor: { link: true } },
});

chart.render();
```

## Usage

There are two ways to configure the `elementHighlightByColor` interaction:

First, pass a `boolean` to set whether to enable the interaction.

```js
({
  type: 'interval',
  interaction: { elementHighlightByColor: true }, // Use default configuration
});
```

Second, pass [configuration options](#configuration-options) to configure the interaction.

```js
({
  type: 'line',
  interaction: {
    elementHighlightByColor: {
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
  interaction: { elementHighlightByColor: true },
});
```

It can also be configured at the View level. Interactions declared on the view will be passed to marks declared in `children`. If the mark has declared the corresponding interaction, they will be merged; otherwise, it won't be affected.

```ts
({
  type: 'view',
  interaction: { elementHighlightByColor: true },
});
```

## Configuration Options

Element highlight interaction configuration has two parts:

1. Interaction configuration
2. Element highlight style

Interaction configuration

| Property   | Description                                                                        | Type      | Default |
| ---------- | ---------------------------------------------------------------------------------- | --------- | ------- |
| background | Whether to highlight background                                                    | `boolean` | false   |
| region     | Whether to trigger highlight when mouse moves to empty area of element (see below) | `boolean` | false   |
| link       | Whether to show connection lines                                                   | `boolean` | false   |

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*n9wMQZoN2ssAAAAAAAAAAAAAemJ7AQ/original" width="640">

Element highlight style configuration

| Property   | Description                      | Type                                | Default                                 |
| ---------- | -------------------------------- | ----------------------------------- | --------------------------------------- |
| offset     | Offset in the main direction     | number                              | `0`                                     |
| background | Whether to highlight background  | [backgroundStyle](#backgroundstyle) | See [backgroundstyle](#backgroundstyle) |
| link       | Whether to show connection lines | [linkStyle](#linkstyle)             | See [linkStyle](#linkstyle)             |

### backgroundStyle

Element highlight background style, see example [Custom Highlight](/en/manual/core/interaction/element-highlight#custom-highlight)
| Property | Description | Type | Default | Required |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| backgroundRadius | Background border radius | number \| (datum, index, data) => number | `0` | |
| backgroundFill | Background fill color | string \| (datum, index, data) => string | `transparent` | |
| backgroundFillOpacity | Background fill opacity | number \| (datum, index, data) => number | - | |
| backgroundStroke | Background stroke | string \| (datum, index, data) => string | - | |
| backgroundStrokeOpacity | Background stroke opacity | number \| (datum, index, data) => number | - | |
| backgroundLineWidth | Background stroke width | number \| (datum, index, data) => number | - | |
| backgroundLineDash | Background stroke dash configuration. First value is dash length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | - | |
| backgroundOpacity | Background overall opacity | number \| (datum, index, data) => number | - | |
| backgroundShadowColor | Background shadow color | string \| (datum, index, data) => string | - | |
| backgroundShadowBlur | Background shadow Gaussian blur coefficient | number \| (datum, index, data) => number | - | |
| backgroundShadowOffsetX | Set horizontal distance of shadow from background | number \| (datum, index, data) => number | - | |
| backgroundShadowOffsetY | Set vertical distance of shadow from background | number \| (datum, index, data) => number | - | |
| backgroundCursor | Background mouse cursor style. Same as CSS cursor style. | string \| (datum, index, data) => string | `default` | |

```js
({
  state: {
    active: {
      backgroundRadius: 50,
      backgroundFill: '#000',
      backgroundFillOpacity: 0.9,
      backgroundStroke: '#DAF5EC',
      backgroundStrokeOpacity: 0.9,
      backgroundLineWidth: 2,
      backgroundLineDash: [4, 8],
      backgroundOpacity: 1,
      backgroundShadowColor: '#d3d3d3',
      backgroundShadowBlur: 10,
      backgroundShadowOffsetX: 10,
      backgroundShadowOffsetY: 10,
      backgroundCursor: 'pointer',
    },
  },
});
```

### linkStyle

Connection style, see example [Connection Line Highlight](#connection-line-highlight)

| Property          | Description                                                                                                                             | Type                                                         | Default       | Required |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| linkRadius        | Connection line border radius                                                                                                           | number \| (datum, index, data) => number                     | `0`           |          |
| linkFill          | Connection line fill color                                                                                                              | string \| (datum, index, data) => string                     | `transparent` |          |
| linkFillOpacity   | Connection line fill opacity                                                                                                            | number \| (datum, index, data) => number                     | -             |          |
| linkStroke        | Connection line stroke                                                                                                                  | string \| (datum, index, data) => string                     | -             |          |
| linkStrokeOpacity | Connection line stroke opacity                                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| linkLineWidth     | Connection line stroke width                                                                                                            | number \| (datum, index, data) => number                     | -             |          |
| linkLineDash      | Connection line stroke dash configuration. First value is dash length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| linkOpacity       | Connection line overall opacity                                                                                                         | number \| (datum, index, data) => number                     | -             |          |
| linkShadowColor   | Connection line shadow color                                                                                                            | string \| (datum, index, data) => string                     | -             |          |
| linkShadowBlur    | Connection line shadow Gaussian blur coefficient                                                                                        | number \| (datum, index, data) => number                     | -             |          |
| linkShadowOffsetX | Set horizontal distance of shadow from connection line                                                                                  | number \| (datum, index, data) => number                     | -             |          |
| linkShadowOffsetY | Set vertical distance of shadow from connection line                                                                                    | number \| (datum, index, data) => number                     | -             |          |
| linkCursor        | Connection line mouse cursor style. Same as CSS cursor style.                                                                           | string \| (datum, index, data) => string                     | `default`     |          |

```js
({
  state: {
    active: {
      linkRadius: 50,
      linkFill: '#000',
      linkFillOpacity: 0.9,
      linkStroke: '#DAF5EC',
      linkStrokeOpacity: 0.9,
      linkLineWidth: 2,
      linkLineDash: [4, 8],
      linkOpacity: 1,
      linkShadowColor: '#d3d3d3',
      linkShadowBlur: 10,
      linkShadowOffsetX: 10,
      linkShadowOffsetY: 10,
      linkCursor: 'pointer',
    },
  },
});
```

## Events

### Listening to Events

The following events are supported:

- `element:highlight` - Triggered when element is highlighted
- `element:unhighlight` - Triggered when element highlight is removed

```js
chart.on('element:highlight', (e) => {
  console.log(e.data.data);
  console.log(e.data.group);
  console.log(e.nativeEvent);
});

chart.on('element:unhighlight', (e) => {
  console.log(e.nativeEvent);
});
```

### Triggering Interaction

The following events are supported:

- `element:highlight` - Highlight data
- `element:unhighlight` - Remove highlight

```js
chart.emit('element:highlight', {
  data: { data: { population: 5038433 } },
});

chart.emit('element:unhighlight', {});
```

## Examples

### Basic Highlight

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  state: {
    active: { fill: 'red', linkFillOpacity: 0.5 },
    inactive: { opacity: 0.5 },
  },
  axis: { y: { labelFormatter: '~s' } },
  interaction: { elementHighlightByColor: true },
});

chart.render();
```

### Connection Line Highlight

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  state: {
    active: {
      fill: 'red',
      linkRadius: 50,
      linkFill: 'green',
      linkFillOpacity: 0.9,
      linkStroke: '#DAF5EC',
      linkStrokeOpacity: 0.9,
      linkLineWidth: 2,
      linkOpacity: 1,
      linkCursor: 'pointer',
    },
    inactive: { opacity: 0.5 },
  },
  axis: { y: { labelFormatter: '~s' } },
  interaction: {
    elementHighlightByColor: { link: true, background: true },
  },
});

chart.render();
```

### Transpose

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  height: 600,
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  legend: false,
  encode: {
    x: 'state',
    y: 'population',
    color: 'age',
  },
  axis: {
    y: { labelFormatter: '~s' },
  },
  scale: {
    x: { paddingInner: 0.2 },
  },
  state: {
    active: {
      linkFill: (d) => (d.state === 'CA' ? 'red' : undefined),
      stroke: '#000',
      lineWidth: 1,
      linkFillOpacity: 0.5,
    },
    inactive: {
      opacity: 0.6,
    },
  },
  interaction: {
    elementHighlightByColor: {
      link: true,
    },
  },
});

chart.render();
```
