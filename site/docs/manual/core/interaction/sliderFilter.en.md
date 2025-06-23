---
title: sliderFilter
order: 21
---

## Overview

The `sliderFilter` interaction targets the data domain, filtering the displayed data range through slider controls. It allows users to dynamically adjust the data range displayed in visualization charts by dragging sliders, thus achieving interactive data filtering.

- Trigger: Drag slider component
- End: Release slider
- Effect: Update chart's displayed data range

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*nNa7R6quqkwAAAAAAAAAAAAADmJ7AQ/original" width="640">

## Usage

There are two ways to configure `sliderFilter` interaction:
First, automatically enable slider axis filtering interaction by configuring the slider component:

```js
({
  slider: {
    x: true,
    y: true,
  },
});
```

Second, configure directly in interaction:

```js
({
  slider: {
    x: true,
  },
  interaction: {
    sliderFilter: true, // Use default configuration
  },
});
```

## Configuration Level

Interaction can be configured at the View level:

```js
({
  type: 'view',
  slider: { x: true, y: true },
  interaction: { sliderFilter: true },
});
```

## Configuration Options

| Property      | Description                                                       | Type                                         | Default                                            | Required |
| :------------ | :---------------------------------------------------------------- | :------------------------------------------- | :------------------------------------------------- | :------- |
| initDomain    | Initialize coordinate axis range                                  | { x: [number, number], y: [number, number] } | {}                                                 |          |
| className     | CSS class name for slider component                               | string                                       | 'slider'                                           |          |
| prefix        | Slider component prefix, used for identification and event naming | string                                       | 'slider'                                           |          |
| setValue      | Custom function to set slider value                               | (component, values) => void                  | (component, values) => component.setValues(values) |          |
| hasState      | Whether to save slider ratio state                                | boolean                                      | false                                              |          |
| wait          | Throttle wait time (milliseconds)                                 | number                                       | 50                                                 |          |
| leading       | Whether to execute at the beginning during throttling             | boolean                                      | true                                               |          |
| trailing      | Whether to execute at the end during throttling                   | boolean                                      | false                                              |          |
| getInitValues | Function to get initial slider values                             | (slider) => [number, number]                 | undefined                                          |          |

### slider Component Configuration

In addition to the configuration for sliderFilter interaction, the slider component itself has some important configuration options that affect the behavior of slider axis filtering:

| Property | Description                                                | Type               | Default | Required |
| -------- | ---------------------------------------------------------- | ------------------ | ------- | -------- |
| padding  | Slider axis inner padding                                  | number \| number[] | -       |          |
| values   | Initial selection range of slider axis, in 0 ～ 1 interval | [number, number]   | -       |          |
| slidable | Whether to allow dragging selection and handles            | boolean            | true    |          |

For detailed documentation see [Slider Component](/en/manual/component/slider)

## Events

### Triggering Events

Slider axis filtering interaction supports the following events:

- `sliderX:filter` - Trigger X axis filtering
- `sliderY:filter` - Trigger Y axis filtering

```js
chart.emit('sliderX:filter', {
  data: { selection: [['2001-01', '2001-03'], undefined] },
});

chart.emit('sliderY:filter', {
  data: { selection: [undefined, [50, 550]] },
});
```

### Listening to Data

- `sliderX:filter` - X axis slider filter event
- `sliderY:filter` - Y axis slider filter event

```js
chart.on('sliderX:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('sliderX:filter', data.selection);
});

chart.on('sliderY:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('sliderY:filter', data.selection);
});
```

## Examples

### Basic Slider Axis Filtering

The following example shows how to add basic X-axis slider axis filtering functionality to a line chart:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency', y1: 0.000001 },
  slider: { x: true },
  interaction: {
    sliderFilter: {
      wait: 100,
      leading: false,
      tariling: true,
    },
  },
});

chart.render();
```
