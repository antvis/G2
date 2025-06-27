---
title: elementHighlightByX
order: 12
---

## Overview

The `elementHighlightByX` interaction targets chart elements. When the mouse hovers over an element, it highlights all elements with the same x channel value as the hovered element.

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

## Getting Started

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670298045860/element-highlight-by-x.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

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
  state: { active: { fill: 'red' }, inactive: { opacity: 0.5 } },
  axis: { y: { labelFormatter: '~s' } },
  interaction: { elementHighlightByX: true },
});

chart.render();
```

## Usage

There are two ways to configure the `elementHighlightByX` interaction:

First, pass a `boolean` to set whether to enable the interaction.

```js
({
  type: 'interval',
  interaction: { elementHighlightByX: true }, // Use default configuration
});
```

Second, pass [configuration options](#configuration-options) to configure the interaction.

```js
({
  type: 'line',
  interaction: {
    elementHighlightByX: {
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
  interaction: { elementHighlightByX: true },
});
```

It can also be configured at the View level. Interactions declared on the view will be passed to marks declared in `children`. If the mark has declared the corresponding interaction, they will be merged; otherwise, it won't be affected.

```ts
({
  type: 'view',
  interaction: { elementHighlightByX: true },
});
```

## Configuration Options

Interaction configuration
| Property | Description | Type | Default |
| ---------- | ------------------------------------------------------------------------------- | --------- | ------- |
| background | Whether to highlight background | `boolean` | false |
| region | Whether to trigger highlight when mouse moves to empty area of element (see below) | `boolean` | false |

Element highlight style configuration

| Property   | Description                     | Type                                                                                     | Default                                                                                      |
| ---------- | ------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| offset     | Offset in the main direction    | `number`                                                                                 | 0                                                                                            |
| background | Whether to highlight background | [backgroundStyle](/en/manual/core/interaction/element-highlight#element-highlight-style) | See [backgroundStyle](/en/manual/core/interaction/element-highlight#element-highlight-style) |

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*n9wMQZoN2ssAAAAAAAAAAAAAemJ7AQ/original" width="800">

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
  interaction: { elementHighlightByX: true },
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
  interaction: { elementHighlightByX: true },
});

chart.render();
```
