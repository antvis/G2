---
title: brushYFilter
order: 8
---

## Overview

`brushYFilter` interaction is a vertical-constrained version of brushFilter, specifically designed for data filtering based on Y-axis dimensions. This interaction restricts users to vertical brush selection operations (along the Y-axis direction only) to filter chart elements by range, particularly suitable for numerical interval analysis, vertical comparison, and other scenarios.

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oOoQRaH-INwAAAAAAAAAAAAADmJ7AQ/original" width="640">

Key characteristics:

Vertical operation: Only allows vertical direction brush selection, X-axis range is automatically fully selected

Numerical focus: Precise control of Y-axis numerical range (such as price intervals, temperature ranges)

Dynamic response: Filter results are mapped to associated views in real-time

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: {
    x: 'height',
    y: 'weight', // Y-axis bound to numerical data
  },
  interaction: {
    brushYFilter: { maskStroke: '#52c41a' }, // Enable vertical filtering with green border
  },
});

chart.render();
```

## Usage

There are two ways to configure `brushYFilter` interaction:

### Quick Enable Mode

Enable interaction with a boolean value using default configuration:

```js
({
  type: 'interval',
  interaction: { brushYFilter: true }, // Enable Y-axis brush filter with default configuration
});
```

### Custom Configuration Mode

Fine-tune interaction behavior through [configuration options](#configuration-options):

```js
({
  type: 'interval',
  interaction: {
    brushYFilter: {
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
  interaction: { brushYFilter: true },
});
```

It can also be configured at the View level. Interactions declared on the view will be passed to marks declared in `children`. If the mark has declared the corresponding interaction, they will be merged; otherwise, it won't be affected.

```ts
({
  type: 'view',
  interaction: { brushYFilter: true },
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
    brushYFilter: {
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
  const [yMin, yMax] = data.selection[1]; // Note the data structure difference
  console.log(`Value range: ${yMin.toFixed(2)} - ${yMax.toFixed(2)}`);
});
```

### Triggering Interaction

Trigger filtering programmatically:

```js
// Set Y-axis filter range (numerical example)
chart.emit('brush:filter', {
  data: {
    selection: [
      null, // X-axis remains fully selected
      [20, 60], // Y-axis range 20-60
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
    brushYFilter: {
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
