---
title: scrollbarFilter
order: 20
---

## Overview

`scrollbarFilter` is a default interaction that is automatically enabled when a scrollbar component is configured. It allows users to filter and browse data through scrollbars, particularly suitable for visualization scenarios with large amounts of data. Scrollbar filtering can be applied to both x-axis and y-axis, helping users focus on data regions of interest.

- Trigger: Drag scrollbar.

- End: Release scrollbar.

- Effect: Update chart's displayed data range.

## Usage

There are two ways to configure `scrollbarFilter` interaction:

First, automatically enable scrollbar filtering interaction by configuring the scrollbar component:

```js
({
  scrollbar: {
    x: { ratio: 0.5 }, // x-axis scrollbar, displaying 50% of data
    y: { ratio: 0.3 }, // y-axis scrollbar, displaying 30% of data
  },
});
```

Second, configure directly in interaction:

```js
({
  scrollbar: {
    x: { ratio: 0.5 },
    y: { ratio: 0.3 },
  },
  interaction: {
    scrollbarFilter: true, // Enable scrollbar filtering interaction
  },
});
```

## Configuration Level

Scrollbar filtering interaction can be configured at the View level:

```js
({
  type: 'view',
  scrollbar: {
    x: { ratio: 0.5 },
    y: { ratio: 0.3 },
  },
  interaction: { scrollbarFilter: true },
});
```

## Configuration Options

Scrollbar filtering interaction supports the following configuration options:

| Property      | Description                                                                           | Type                                         | Default                                              | Required |
| ------------- | ------------------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------- | -------- |
| initDomain    | Initialize the data domain range, used to set initial filter range                    | { x: [number, number], y: [number, number] } | Automatically calculated based on data               | No       |
| className     | CSS class name for scrollbar, used for style customization and DOM selection          | string                                       | 'g2-scrollbar'                                       | No       |
| prefix        | Event prefix, used to define triggered event names                                    | string                                       | 'scrollbar'                                          | No       |
| hasState      | Whether to enable state management, controls state changes during scrollbar filtering | boolean                                      | true                                                 | No       |
| setValue      | Custom function to set scrollbar value                                                | (component, values) => void                  | (component, values) => component.setValue(values[0]) | No       |
| getInitValues | Custom function to get scrollbar initial values                                       | (scrollbar) => [number, number]              | Internal default implementation                      | No       |

### Complex Type Description

#### initDomain

`initDomain` is an object containing x and y properties, representing the initial data domain ranges for x-axis and y-axis respectively. This configuration option allows you to precisely control the initial data range displayed by the scrollbar.

```javascript
{
  initDomain: {
    x: [minX, maxX], // x-axis data domain range
    y: [minY, maxY], // y-axis data domain range
  }
}
```

For example, if you want the x-axis to initially display a range from the second to fifth data points:

```js
({
  interaction: {
    scrollbarFilter: {
      initDomain: {
        x: [1, 4], // Display data points with indices 1 to 4 (second to fifth)
      },
    },
  },
});
```

#### setValue

`setValue` is a function used to customize how to set the scrollbar value. The default implementation is `(component, values) => component.setValue(values[0])`, which sets the first value as the current value of the scrollbar.

If you need to customize the scrollbar's value setting logic, you can provide your own implementation:

```javascript
({
  interaction: {
    scrollbarFilter: {
      setValue: (component, values) => {
        // Custom value setting logic
        component.setValue(values[0]);
        // Additional operations can be added here
      },
    },
  },
});
```

#### getInitValues

`getInitValues` is a function used to get the initial values of the scrollbar. The default implementation checks if the scrollbar value is 0, and returns that value if it's not 0.

You can customize this function to control the initial position of the scrollbar, the return values should be an array of number between 0 and 1, means the positon of start and end.

```javascript
({
  interaction: {
    scrollbarFilter: {
      getInitValues: (scrollbar) => {
        // Custom logic to get initial values
        const values = scrollbar.slider.attributes.values;
        // For example, always start from the middle position
        return [values.length / 2];
      },
    },
  },
});
```

### scrollbar Component Configuration

In addition to the scrollbarFilter interaction configuration, the scrollbar component itself has some important configuration options that affect the behavior of scrollbar filtering:

| Property | Description                                 | Type           | Default | Required |
| -------- | ------------------------------------------- | -------------- | ------- | -------- |
| ratio    | Ratio of displayed data, value range [0, 1] | number         | 1       | No       |
| style    | Style configuration for scrollbar           | ScrollbarStyle | -       | No       |
| animate  | Whether to enable animation                 | boolean        | true    | No       |

For detailed documentation see [Scrollbar Component](/en/manual/component/scrollbar)

## Events

### Listening to Events

Scrollbar filtering interaction supports the following events:

- `scrollbarX:filter` - Triggered when x-axis scrollbar filters
- `scrollbarY:filter` - Triggered when y-axis scrollbar filters

```typescript
chart.on('scrollbarX:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('scrollbarX:filter', data.selection);
});

chart.on('scrollbarY:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('scrollbarY:filter', data.selection);
});
```

### Triggering Interaction

You can manually trigger scrollbar filtering interaction through the following methods:

- `scrollbarX:filter` - Trigger x-axis scrollbar filtering
- `scrollbarY:filter` - Trigger y-axis scrollbar filtering

```typescript
chart.emit('scrollbarX:filter', {
  data: { selection: [['2001-03'], undefined] },
});

chart.emit('scrollbarY:filter', {
  data: { selection: [undefined, [50, 550]] },
});
```

## Examples

### Basic Scrollbar Filtering

The following example shows how to add basic X-axis scrollbar filtering functionality to a column chart:

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
  scrollbar: { x: true }, // Enable X-axis scrollbar
});

chart.render();
```

### Listening to Scrollbar Value Changes

This example shows how to listen to the scrollbar's valuechange event to get the values before and after scrollbar sliding:

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
  const scrollbar = canvas.document.getElementsByClassName('g2-scrollbar')[0];

  if (scrollbar) {
    scrollbar.addEventListener('valuechange', (e) => {
      console.log('Scrollbar value changed:', e.detail);
    });
  }
});

chart.render();
```

### Dual-Axis Scrollbar

This example demonstrates how to use scrollbars on both X and Y axis simultaneously:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  height: 400,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: {
    x: 'weight',
    y: 'height',
    color: 'gender',
    size: 4,
  },
  scrollbar: {
    x: { ratio: 0.3 }, // Show 30% of X-axis data
    y: { ratio: 0.4 }, // Show 40% of Y-axis data
  },
});

chart.render();
```
