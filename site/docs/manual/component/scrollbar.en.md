---
title: Scrollbar
order: 7.3
---

## Overview

In G2, **Scrollbar** can be used to filter data and can be bound to the x or y channel. Scrollbars are turned off by default. It solves the problem of chart information being too dense to be fully displayed.

When to use: Whether content exceeds the display area depends on the amount of content and the size of the display area. When the content to be displayed exceeds the size of the display area in the vertical direction, a vertical scrollbar should be used to control the displayed portion. The same principle applies to horizontal scrollbars.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency', y1: 0.000001 },
  scale: { y: { type: 'log' } },
  scrollbar: {
    x: {
      ratio: 0.2,
      trackSize: 14,
      trackFill: '#000',
      trackFillOpacity: 1,
    },
    y: {
      ratio: 0.5,
      trackSize: 12,
      value: 0.1,
      trackFill: '#000',
      trackFillOpacity: 1,
    },
  },
});

chart.render();
```

### Components

<img alt="legend-overview" width=900 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vEWuTqp_4WoAAAAAAAAAAAAAemJ7AQ/original"/>

### Usage

Scrollbars can be configured at the Mark level. In G2, each Mark has its own scrollbar. If the scales corresponding to marks are synchronized, the scrollbars will also be merged.

```js
({
  type: 'interval',
  scrollbar: {
    x: {}, // x-axis scrollbar
    y: {}, // y-axis scrollbar
  },
});
```

Scrollbars can also be configured at the View level. Scrollbars have inheritance properties. Scrollbars declared on a view will be passed to marks declared in `children`. If the mark has a scrollbar for the corresponding channel, they will be merged; otherwise, it won't affect anything.

```js
({
  type: 'view',
  scrollbar: {
    x: {},
    y: {},
  },
});
```

## Configuration Options

| Property   | Description                                                                     | Type            | Default Value | Required |
| ---------- | ------------------------------------------------------------------------------- | --------------- | ------------- | -------- |
| ratio      | Scrollbar ratio, the proportion of single page data in total data               | number          | `0.5`         |          |
| value      | Starting position of scrollbar, default is `0` for horizontal, `1` for vertical | [0, 1]          |               |          |
| slidable   | Whether it can be dragged                                                       | boolean         | true          |          |
| position   | Scrollbar position relative to chart                                            | string          | `bottom`      |          |
| isRound    | Whether scrollbar style is rounded                                              | boolean         | true          |          |
| style      | Scrollbar style configuration, all styles can be configured directly            | [style](#style) |               |          |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
    shape: 'smooth',
  },
  transform: [{ type: 'stackY' }],
  scrollbar: {
    x: {
      // Configuration options
      ratio: 0.2,
      value: 0.1,
      slidable: true,
      isRound: true,
      position: 'top',

      // Scrollbar thumb style
      thumbFillOpacity: 0.2,
      thumbFill: '#000',
      thumbStroke: '#000',

      // Scrollbar track style
      trackFill: '#fa0',
      trackStroke: '#f00',
      trackLineWidth: 2,
      trackFillOpacity: 1,
      trackSize: 14,
      trackLength: 300,
    },
  },
});

chart.render();
```

### style

`style` scrollbar style configuration. Internal processing allows you to configure styles directly in the configuration options. For specific style configurations, refer to [Scrollbar Thumb](#scrollbar-thumb) and [Scrollbar Track](#scrollbar-track).

#### Scrollbar Thumb

| Property           | Description                              | Type            | Default Value | Required |
| ------------------ | ---------------------------------------- | --------------- | ------------- | -------- |
| thumbFill          | Scrollbar thumb fill color               | string          | `#000`        |          |
| thumbFillOpacity   | Scrollbar thumb fill opacity             | number          | `0.15`        |          |
| thumbStroke        | Scrollbar thumb stroke color             | string          | –             |          |
| thumbLineWidth     | Scrollbar thumb stroke width             | number          | –             |          |
| thumbStrokeOpacity | Scrollbar thumb stroke opacity           | number          | –             |          |
| thumbLineDash      | Scrollbar thumb dash configuration       | [number,number] | –             |          |
| thumbOpacity       | Scrollbar thumb overall opacity          | number          | –             |          |
| thumbShadowColor   | Scrollbar thumb shadow color             | string          | –             |          |
| thumbShadowBlur    | Scrollbar thumb shadow blur coefficient  | number          | –             |          |
| thumbShadowOffsetX | Scrollbar thumb shadow horizontal offset | number          | –             |          |
| thumbShadowOffsetY | Scrollbar thumb shadow vertical offset   | number          | –             |          |
| thumbCursor        | Scrollbar thumb cursor style             | string          | `default`     |          |

```js
({
  scrollbar: {
    x: {
      thumbFill: '#1173a1',
      thumbFillOpacity: 1,
      thumbStroke: 'red',
      thumbLineWidth: 2,
      thumbStrokeOpacity: 0.9,
    },
    y: {},
  },
});
```

#### Scrollbar Track

| Property           | Description                              | Type            | Default Value | Required |
| ------------------ | ---------------------------------------- | --------------- | ------------- | -------- |
| trackSize          | Scrollbar track width                    | number          | `10`          |          |
| trackLength        | Scrollbar track length                   | number          | –             |          |
| trackFill          | Scrollbar track fill color               | string          | –             |          |
| trackFillOpacity   | Scrollbar track fill opacity             | number          | `0`           |          |
| trackStroke        | Scrollbar track stroke color             | string          | –             |          |
| trackLineWidth     | Scrollbar track stroke width             | number          | –             |          |
| trackStrokeOpacity | Scrollbar track stroke opacity           | number          | –             |          |
| trackLineDash      | Scrollbar track dash configuration       | [number,number] | –             |          |
| trackOpacity       | Scrollbar track overall opacity          | number          | –             |          |
| trackShadowColor   | Scrollbar track shadow color             | string          | –             |          |
| trackShadowBlur    | Scrollbar track shadow blur coefficient  | number          | –             |          |
| trackShadowOffsetX | Scrollbar track shadow horizontal offset | number          | –             |          |
| trackShadowOffsetY | Scrollbar track shadow vertical offset   | number          | –             |          |
| trackCursor        | Scrollbar track cursor style             | string          | `default`     |          |

```js
({
  scrollbar: {
    x: {
      trackSize: 20,
      trackLength: 300,
      trackFillOpacity: 1,
      trackFill: 'red',
      trackLineWidth: 2,
      trackStroke: 'red',
      trackStrokeOpacity: 0.4,
    },
    y: {},
  },
});
```

## Events

| Property    | Description                                           | Type                                                |
| ----------- | ----------------------------------------------------- | --------------------------------------------------- |
| valuechange | Triggered when scroll value changes, listen via event | `({detail: { oldValue: any; value: any }}) => void` |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency', y1: 0.000001 },
  scale: { y: { type: 'log' } },
  scrollbar: { x: true },
});

// After rendering the chart
chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  document
    .querySelector('.g2-scrollbar')
    .addEventListener('valuechange', (evt) => {
      console.log(evt.detail.oldValue); // Data before scroll update
      console.log(evt.detail.value); // Data after update
    });
});

chart.render();
```
