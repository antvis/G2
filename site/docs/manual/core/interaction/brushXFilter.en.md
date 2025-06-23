---
title: brushXFilter
order: 7
---

## Overview

`brushXFilter` interaction is a horizontal-constrained version of brushFilter, specifically designed for data filtering based on X-axis dimensions. This interaction restricts users to horizontal brush selection operations (along the X-axis direction only) to filter chart elements by range, particularly suitable for time series analysis, horizontal comparison, and other scenarios.

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Wz7zQaiBiXwAAAAAAAAAAAAADmJ7AQ/original" width="640">

Key characteristics:

Unidirectional operation: Only allows horizontal direction brush selection, Y-axis range is automatically fully selected

Dimensional focus: Precise control of X-axis data range (such as time ranges, numerical intervals)

Responsive updates: Dynamically triggers view updates after filtering

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
  },
  encode: {
    x: (d) => new Date(d.date), // X-axis bound to time data
    y: 'total',
  },
  interaction: {
    brushXFilter: true, // Enable horizontal filtering
  },
});

chart.render();
```

## Usage

There are two ways to configure `brushXFilter` interaction:

### Quick Enable Mode

Enable interaction with a boolean value using default configuration:

```js
({
  type: 'interval',
  interaction: { brushXFilter: true }, // Enable X-axis brush filter with default configuration
});
```

### Custom Configuration Mode

Fine-tune interaction behavior through [configuration options](#configuration-options):

```js
({
  type: 'interval',
  interaction: {
    brushXFilter: {
      reverse: false, // Disable reverse selection
      maskFill: '#rgba(0,0,0,0.3)', // Custom mask color
    },
  },
});
```

## Configuration Level

Interaction can be configured at the Mark level:

```ts
({
  type: 'interval',
  interaction: { brushXFilter: true },
});
```

It can also be configured at the View level. Interactions declared on the view will be passed to marks declared in `children`. If the mark has declared the corresponding interaction, they will be merged; otherwise, it won't be affected.

```ts
({
  type: 'view',
  interaction: { brushXFilter: true },
});
```

## Configuration Options

| Property | Description              | Type          | Default           | Required |
| -------- | ------------------------ | ------------- | ----------------- | -------- |
| reverse  | Whether to reverse brush | boolean       | false             |          |
| mask     | Style of brush area mask | [mask](#mask) | See [mask](#mask) |          |

### mask

Configure the style of the brush area mask.

| Property          | Description                                                                                                             | Type            | Default   | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------- | --------- | -------- |
| maskFill          | Mask fill color                                                                                                         | string          | `#777`    |          |
| maskFillOpacity   | Mask fill opacity                                                                                                       | number          | 0.3       |          |
| maskStroke        | Mask stroke                                                                                                             | string          | `#fff`    |          |
| maskStrokeOpacity | Stroke opacity                                                                                                          | number          |           |          |
| maskLineWidth     | Mask stroke width                                                                                                       | number          |           |          |
| maskLineDash      | Stroke dash configuration. First value is dash length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] |           |          |
| maskOpacity       | Mask overall opacity                                                                                                    | number          |           |          |
| maskShadowColor   | Mask shadow color                                                                                                       | string          |           |          |
| maskShadowBlur    | Mask shadow Gaussian blur coefficient                                                                                   | number          |           |          |
| maskShadowOffsetX | Set horizontal distance of shadow from mask                                                                             | number          |           |          |
| maskShadowOffsetY | Set vertical distance of shadow from mask                                                                               | number          |           |          |
| maskCursor        | Mouse cursor style. Same as CSS cursor style                                                                            | string          | `default` |          |

When configuring the mask style of the brush area, it's not configured as an object, but using the `mask` prefix with property names.

Style configuration example:

```js
({
  interaction: {
    brushXFilter: {
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

## Events

### Listening to Events

Listen to brush filter actions:

```js
chart.on('brush:filter', (event) => {
  const {
    data, // Filtered data collection
    nativeEvent, // Original DOM event
  } = event;
  const [xStart, xEnd] = data.selection[0];
  console.log(`Filter range: ${xStart} ~ ${xEnd}`);
});
```

### Triggering Interaction

Trigger filtering programmatically:

```js
// Set X-axis filter range (timestamp example)
chart.emit('brush:filter', {
  data: {
    selection: [
      [new Date('2023-01-01').getTime(), new Date('2023-06-30').getTime()],
    ],
  },
});
```

## Examples

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
];

const chart = new Chart({
  container: 'container',
});
chart.options({
  autoFit: true,
  interaction: {
    brushXFilter: {
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

chart.interval().data(data).encode('x', 'letter').encode('y', 'frequency');

chart.render();
```
