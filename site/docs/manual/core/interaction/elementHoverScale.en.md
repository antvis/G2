---
title: elementHoverScale
order: 11
---

## Overview

The `elementHoverScale` interaction targets chart elements. When the mouse hovers over an element, it scales up and adds a shadow effect for stronger visual feedback. This interaction is particularly suitable for pie charts, donut charts, and other scenarios where individual elements need to be highlighted.

- **Trigger**: Mouse hover over an element
- **End**: Mouse leaves the element
- **State Change**: The hovered element becomes `active`
- **Visual Effect**: Element scales up, increases in z-index, and adds shadow

<img alt="hover-scale-pie" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oPIvT4UxolEAAAAAU5AAAAgAemJ7AQ/original" width="640">
<img alt="hover-scale-donut" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WZ0bTbATWVEAAAAAVtAAAAgAemJ7AQ/original" width="640">
<img alt="hover-scale-group" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vQKWQJmG3tQAAAAAUIAAAAgAemJ7AQ/original" width="640">

## Usage

There are two ways to configure the `elementHoverScale` interaction:

First method: pass a `boolean` to enable/disable the interaction with default settings.

```js
({
  type: 'interval',
  interaction: { elementHoverScale: true }, // use default configuration
});
```

Second method: pass a [configuration object](#configuration) to customize the interaction.

```js
({
  type: 'interval',
  interaction: {
    elementHoverScale: {
      scale: 1.1,
      shadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
});
```

## Configuration Level

The interaction can be configured at the Mark level:

```js
({
  type: 'interval',
  interaction: { elementHoverScale: true },
});
```

Or at the View level. Interactions declared on the view are passed to child marks. If a child mark declares the same interaction, they are merged; otherwise, the view-level interaction does not affect the child.

```js
({
  type: 'view',
  interaction: { elementHoverScale: true },
});
```

## Configuration

| Property       | Description                     | Type      | Default Value               | Required |
|----------------|---------------------------------|-----------|-----------------------------|----------|
| scale          | Scale factor on hover           | `number`  | `1.04`                      |          |
| shadow         | Whether to show shadow          | `boolean` | `true`                      |          |
| shadowColor    | Shadow color                    | `string`  | `'rgba(0, 0, 0, 0.4)'`      |          |
| shadowBlur     | Shadow blur radius              | `number`  | `10`                        |          |
| shadowOffsetX  | Horizontal shadow offset        | `number`  | `0`                         |          |
| shadowOffsetY  | Vertical shadow offset          | `number`  | `2`                         |          |
| zIndex         | z-index when hovered            | `number`  | `10`                        |          |
| delay          | Delay before resetting on leave | `number`  | `60` (milliseconds)         |          |
| createGroup    | Custom grouping function        | `function`| `(d) => d` (group by data)  |          |

### Configuration Details

#### scale

Controls the scale factor when hovering. A value of `1.04` means the element scales to 104% of its original size. Scaling defaults to center origin.

#### shadow

Whether to add a shadow effect on hover. The shadow enhances visual hierarchy.

#### createGroup

Custom grouping function to control which elements should respond to hover together. By default, each element responds independently.

```js
// Example: group by category field
createGroup: (data) => data.category;
```

## Events

### Listening to Events

Supported events:

- `element:hoverscale` - triggered when an element is hovered and scaled
- `element:unhoverscale` - triggered when the hover scale is removed

```js
chart.on('element:hoverscale', (e) => {
  console.log(e.data.data); // data of the hovered element
  console.log(e.data.group); // array of grouped element data
  console.log(e.nativeEvent); // native event object
});

chart.on('element:unhoverscale', (e) => {
  console.log(e.nativeEvent);
});
```

### Triggering Interaction

Supported trigger events:

- `element:hoverscale` - trigger element scale
- `element:unhoverscale` - cancel element scale

```js
chart.emit('element:hoverscale', {
  data: { data: { category: 'A', value: 100 } },
});

chart.emit('element:unhoverscale', {});
```

## Examples

### Pie Chart Hover Scale

The most common use case for `elementHoverScale` is in pie charts to highlight the hovered sector:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  height: 400,
  data: [
    { item: 'Case 1', count: 40, percent: 0.4 },
    { item: 'Case 2', count: 21, percent: 0.21 },
    { item: 'Case 3', count: 17, percent: 0.17 },
    { item: 'Case 4', count: 13, percent: 0.13 },
    { item: 'Case 5', count: 9, percent: 0.09 },
  ],
  coordinate: { type: 'theta', outerRadius: 0.8 },
  transform: [{ type: 'stackY' }],
  encode: {
    y: 'percent',
    color: 'item',
  },
  legend: { color: { position: 'bottom' } },
  labels: [
    {
      text: 'item',
      position: 'outside',
      fontSize: 12,
    },
    {
      text: (d) => `${(d.percent * 100).toFixed(0)}%`,
      position: 'inside',
      fontSize: 14,
      fontWeight: 'bold',
      fill: '#fff',
    },
  ],
  interaction: {
    elementHoverScale: true,
  },
});

chart.render();
```

### Donut Chart Hover Effect

Donut charts also benefit from `elementHoverScale` interaction:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  height: 400,
  data: [
    { item: 'Case 1', count: 40, percent: 0.4 },
    { item: 'Case 2', count: 21, percent: 0.21 },
    { item: 'Case 3', count: 17, percent: 0.17 },
    { item: 'Case 4', count: 13, percent: 0.13 },
    { item: 'Case 5', count: 9, percent: 0.09 },
  ],
  coordinate: { type: 'theta', innerRadius: 0.5, outerRadius: 0.8 },
  transform: [{ type: 'stackY' }],
  encode: {
    y: 'percent',
    color: 'item',
  },
  legend: { color: { position: 'bottom' } },
  labels: [
    {
      text: 'item',
      position: 'spider',
      fontSize: 12,
    },
  ],
  interaction: {
    elementHoverScale: {
      scale: 1.08,
      shadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowBlur: 15,
    },
  },
});

chart.render();
```

### Bar Chart Hover Effect

`elementHoverScale` can also be used in bar charts to highlight individual bars:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  height: 300,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 6 }],
  axis: { y: { labelFormatter: '.0%' } },
  interaction: {
    elementHoverScale: {
      scale: 1.05,
      shadow: true,
    },
  },
});

chart.render();
```

### Custom Scale Configuration

Fully customize the hover effect through configuration:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  height: 400,
  data: [
    { category: 'A', value: 27 },
    { category: 'B', value: 25 },
    { category: 'C', value: 18 },
    { category: 'D', value: 15 },
    { category: 'E', value: 10 },
    { category: 'F', value: 5 },
  ],
  coordinate: { type: 'theta', outerRadius: 0.75 },
  transform: [{ type: 'stackY' }],
  encode: { y: 'value', color: 'category' },
  legend: { color: { position: 'right' } },
  style: {
    stroke: '#fff',
    lineWidth: 2,
  },
  interaction: {
    elementHoverScale: {
      scale: 1.15, // larger scale factor
      shadow: true,
      shadowColor: 'rgba(139, 0, 139, 0.6)', // custom shadow color
      shadowBlur: 20, // larger blur radius
      shadowOffsetX: 5, // horizontal offset
      shadowOffsetY: 5, // vertical offset
      zIndex: 20, // higher z-index
      delay: 100, // 100ms delay before reset
    },
  },
});

chart.render();
```

### Grouped Hover Effect

Use `createGroup` to achieve linked hover effects across multiple elements:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { year: '2018', type: 'A', value: 100 },
  { year: '2018', type: 'B', value: 80 },
  { year: '2019', type: 'A', value: 120 },
  { year: '2019', type: 'B', value: 90 },
  { year: '2020', type: 'A', value: 140 },
  { year: '2020', type: 'B', value: 110 },
  { year: '2021', type: 'A', value: 160 },
  { year: '2021', type: 'B', value: 130 },
];

chart.options({
  type: 'interval',
  height: 300,
  data,
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  interaction: {
    elementHoverScale: {
      scale: 1.08,
      // group by type, bars of the same type scale together on hover
      createGroup: (view) => (d) => d.type,
    },
  },
});

chart.render();
```
