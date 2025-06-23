---
title: elementHighlight
order: 10
---

## Overview

The `elementHighlight` interaction targets chart elements. When the mouse hovers over an element, that element will be highlighted.

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

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670296745624/element-highlight.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  state: { active: { fill: 'orange' }, inactive: { opacity: 0.5 } },
  axis: { y: { labelFormatter: '.0%' } },
  interaction: { elementHighlight: true },
});

chart.render();
```

## Usage

There are two ways to configure the `elementHighlight` interaction:

First, pass a `boolean` to set whether to enable the interaction.

```js
({
  type: 'interval',
  interaction: { elementHighlight: true }, // Use default configuration
});
```

Second, pass [configuration options](#configuration-options) to configure the interaction.

```js
({
  type: 'line',
  interaction: {
    elementHighlight: {
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
  interaction: { elementHighlight: true },
});
```

It can also be configured at the View level. Interactions declared on the view will be passed to marks declared in `children`. If the mark has declared the corresponding interaction, they will be merged; otherwise, it won't be affected.

```ts
({
  type: 'view',
  interaction: { elementHighlight: true },
});
```

## Configuration Options

Element highlight interaction configuration has two parts:

1. Interaction configuration
2. Element highlight style

### Interaction Configuration

| Property   | Description                                                                        | Type      | Default |
| ---------- | ---------------------------------------------------------------------------------- | --------- | ------- |
| background | Whether to highlight background                                                    | `boolean` | false   |
| region     | Whether to trigger highlight when mouse moves to empty area of element (see below) | `boolean` | false   |

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*n9wMQZoN2ssAAAAAAAAAAAAAemJ7AQ/original" style="width: 100%">

### Element Highlight Style

Element highlight style, see example [Custom Highlight](#custom-highlight)

| Property                | Description                                                                                                                        | Type                                                         | Default       | Required |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| offset                  | Offset in the main direction                                                                                                       | number                                                       | `0`           |          |
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

When configuring background in active elements, it's not configured as an object, but using the `background` prefix with property names.

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
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
  axis: { y: { labelFormatter: '.0%' } },
  interaction: { elementHighlight: { background: true } },
});

chart.render();
```

### Custom Highlight

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
  axis: { y: { labelFormatter: '.0%' } },
  state: {
    active: {
      backgroundRadius: 50,
      backgroundFill: '#DAF5EC',
      backgroundFillOpacity: 0.9,
      backgroundStroke: '#52C41A',
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
  interaction: {
    elementHighlight: {
      background: true,
    },
  },
});

chart.render();
```
