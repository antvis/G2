---
title: sliderWheel
order: 22
---

## Overview

The `sliderWheel` interaction targets the data domain, controlling the slider's selection range through mouse wheel or trackpad gestures. It allows users to dynamically adjust the selection size through wheel operations, enabling quick data range zooming operations.

- Trigger: Use mouse wheel or trackpad scrolling within the chart area
- End: Stop wheel operations
- Effect: Zoom in/out selection range while maintaining the center position of the selection

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*S6UaT7Wy45cAAAAAgCAAAAgAemJ7AQ/original" width="640">

## Usage

To configure `sliderWheel` interaction, first ensure the chart has a slider component, then configure in the interaction:

```js
({
  slider: {
    x: true, // Enable X-axis slider
    y: true, // Enable Y-axis slider
  },
  interaction: {
    sliderWheel: true, // Use default configuration
  },
});
```

You can also pass configuration options for customization:

```js
({
  slider: {
    x: true,
  },
  interaction: {
    sliderWheel: {
      wheelSensitivity: 0.1,
      minRange: 0.05,
      x: true,
      y: 'shift', // Only trigger sliderWheel interaction when Shift key is pressed
    },
  },
});
```

## Configuration Hierarchy

Interactions can be configured at the View level:

```js
({
  type: 'view',
  slider: { x: true, y: true },
  interaction: { sliderWheel: true },
});
```

## Configuration Options

| Property         | Description                          | Type                        | Default                                            | Required |
| :--------------- | :----------------------------------- | :-------------------------- | :------------------------------------------------- | :------- |
| setValue         | Custom function to set slider values | (component, values) => void | (component, values) => component.setValues(values) |          |
| minRange         | Minimum zoom range                   | number                      | 0.01                                               |          |
| wheelSensitivity | Wheel zoom sensitivity               | number                      | 0.05                                               |          |
| x                | X-axis wheel interaction mode        | SliderDirection             | true                                               |          |
| y                | Y-axis wheel interaction mode        | SliderDirection             | true                                               |          |

### Complex Types

#### SliderDirection

`SliderDirection` type defines wheel interaction response modes:

```typescript
type SliderDirection = true | false | 'shift' | 'ctrl' | 'alt';
```

- `true`: Always respond to wheel operations
- `false`: Do not respond to wheel operations
- `'shift'`: Only respond when Shift key is pressed
- `'ctrl'`: Only respond when Ctrl key is pressed
- `'alt'`: Only respond when Alt key is pressed

This configuration allows you to set different trigger conditions for different axis, avoiding accidental zoom operations.

#### minRange

The `minRange` parameter controls the minimum range the slider selection can zoom to, with values ranging from 0.000001 to 1. When the selection reaches the minimum range, further inward scrolling will not produce additional zoom effects.

#### wheelSensitivity

The `wheelSensitivity` parameter controls the sensitivity of wheel zooming. Smaller values make zooming more precise, while larger values make zooming faster. The system automatically adjusts actual sensitivity based on current selection size, ensuring good operational experience at different zoom levels.

## Working Principle

### Adaptive Sensitivity

Wheel interaction adopts an adaptive sensitivity mechanism, ensuring appropriate operational experience at different zoom levels:

- **Large Range Selection**: Wheel operations produce larger zoom changes, convenient for quick adjustment
- **Small Range Selection**: Wheel operations produce smaller zoom changes, convenient for fine adjustment

## Events

### Triggered Events

Wheel zoom operations trigger the slider's `valuechange` event, which is the same as events produced by manually dragging slider handles:

```js
chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;

  document.querySelector('.slider').addEventListener('valuechange', (evt) => {
    console.log('Value changed:', evt.detail.value);
  });
});
```

## Examples

### Basic Wheel Zoom

The following example demonstrates how to enable basic wheel zoom functionality on a line chart:

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
    sliderWheel: true, // Enable wheel zoom
  },
});

chart.render();
```

### Custom Wheel Sensitivity

This example shows how to adjust wheel zoom sensitivity and minimum range:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close', color: 'symbol' },
  slider: {
    x: { values: [0.2, 0.8] },
  },
  interaction: {
    sliderFilter: true,
    sliderWheel: {
      wheelSensitivity: 0.1, // Reduce wheel sensitivity for more precise zooming
      minRange: 0.05, // Set minimum zoom range to 5%
    },
  },
});

chart.render();
```

### Modifier Key Control

This example shows how to use modifier keys to control different axis' wheel responses:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Generate sample data
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    x: i,
    y: Math.sin(i / 10) * 50 + 100 + Math.random() * 20,
    category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C',
  });
}

chart.options({
  type: 'point',
  autoFit: true,
  height: 300,
  data,
  encode: { x: 'x', y: 'y', color: 'category' },
  slider: {
    x: { values: [0.3, 0.7] },
    y: {},
  },
  interaction: {
    sliderFilter: true,
    sliderWheel: {
      x: true, // X-axis always responds to wheel
      y: 'shift', // Y-axis responds to wheel only when Shift key is pressed
      wheelSensitivity: 0.08,
    },
  },
});

chart.render();
```

### High Precision Zoom

This example shows how to configure high-precision wheel zoom, suitable for scenarios requiring fine operations:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Generate high-density data
const data = [];
for (let i = 0; i < 1000; i++) {
  data.push({
    time: i,
    value: Math.sin(i / 50) * 30 + 50 + Math.random() * 5,
  });
}

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  data,
  encode: { x: 'time', y: 'value' },
  slider: {
    x: {
      values: [0.45, 0.55], // Initially select a small range
      labelFormatter: (d) => `Time: ${Math.round(d)}`,
    },
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter', // Enable adaptive filtering
    },
    sliderWheel: {
      wheelSensitivity: 0.02, // Very low sensitivity for fine operations
      minRange: 0.001, // Allow zooming to very small ranges
    },
  },
  style: {
    lineWidth: 1.5,
  },
});

chart.render();
```
