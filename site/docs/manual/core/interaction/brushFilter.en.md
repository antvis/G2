---
title: brushFilter
order: 6.1
---

## Overview

`brushFilter` interaction is primarily used to implement dynamic range filtering functionality for chart elements. Through mouse brush selection operations, users can define specific areas on the chart (based on x/y coordinate systems), and G2 will re-render chart elements within that area that meet the filtering conditions.

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*indVQalzZEQAAAAAAAAAAAAADmJ7AQ/original" width="640">

Typical application scenarios:

Data exploration: Quickly focus on specific data intervals for in-depth analysis

Anomaly detection: Locate anomalous scattered data points

Comparative analysis: Horizontal/vertical comparison of data characteristics across different intervals

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
  interaction: { brushFilter: true },
});

chart.render();
```

## Usage

There are two ways to configure `brushFilter` interaction:

### Quick Enable Mode

Enable interaction with a boolean value using default configuration:

```js
({
  type: 'interval',
  interaction: { brushFilter: true }, // Enable brush filter with default configuration
});
```

### Custom Configuration Mode

Fine-tune interaction behavior through [configuration options](#configuration-options):

```js
({
  type: 'interval',
  interaction: {
    brushFilter: {
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
  interaction: { brushFilter: true },
});
```

It can also be configured at the View level. Interactions declared on the view will be passed to marks declared in `children`. If the mark has declared the corresponding interaction, they will be merged; otherwise, it won't be affected.

```ts
({
  type: 'view',
  interaction: { brushFilter: true },
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
    brushFilter: {
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
  console.log('Current selected range:', data.selection);
});
```

### Triggering Interaction

Trigger filtering programmatically:

```js
// Set x-axis range [50,100], y-axis range [20,80]
chart.emit('brush:filter', {
  data: {
    selection: [
      [50, 100],
      [20, 80],
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
    brushFilter: {
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
