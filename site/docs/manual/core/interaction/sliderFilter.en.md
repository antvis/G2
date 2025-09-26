---
title: sliderFilter
order: 21
---

## Overview

The `sliderFilter` interaction targets the data domain, filtering the displayed data range through slider controls. It allows users to dynamically adjust the data range displayed in visualization charts by dragging sliders, thus enabling interactive data filtering.

- Trigger: Drag slider component
- End: Release slider
- Effect: Update chart's displayed data range

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*nNa7R6quqkwAAAAAAAAAAAAADmJ7AQ/original" width="640">

## Usage

There are two ways to configure the `sliderFilter` interaction:
First, automatically enable slider filtering interaction by configuring the slider component:

```js
({
  slider: {
    x: true,
    y: true,
  },
});
```

Second, configure directly in the interaction:

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

The interaction can be configured at the View level:

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
| adaptiveMode  | Adaptive filtering mode                                           | 'filter' \| false \| null                    | 'filter'                                           |          |
| getInitValues | Function to get initial slider values                             | (slider) => [number, number]                 | undefined                                          |

### slider Component Configuration

In addition to the configuration for sliderFilter interaction, the slider component itself has some important configuration options that affect the behavior of slider filtering:

| Property | Description                                                | Type               | Default | Required |
| -------- | ---------------------------------------------------------- | ------------------ | ------- | -------- |
| padding  | Slider inner padding                                       | number \| number[] | -       |          |
| values   | Initial selection range of slider, in 0 ~ 1 interval      | [number, number]   | -       |          |
| slidable | Whether to allow dragging selection and handles            | boolean            | true    |          |

For detailed documentation see [Slider Component](/en/manual/component/slider)

### Adaptive Filtering Mode

The `adaptiveMode` configuration option controls the adaptive filtering behavior of the slider:

- `'filter'`: Enable adaptive filtering, dynamically adjust other a xi s' domain values based on selected data range (**default value**)
- `false` or `null`: Disable adaptive filtering

**How Adaptive Filtering Works:**

- **Single-axis Adaptive**: When only X-axis or only Y-axis has a slider configured, dragging the slider will automatically adjust the display range of the other axis based on the currently selected data range
- **Multi-axis Adaptive**: When there are independent coordinate axis in the chart, the system will adopt different adaptive strategies based on the configuration level of the slider
- **Bidirectional Mutual Exclusion**: If both X-axis and Y-axis have sliders configured, the adaptive function will not take effect

```js
({
  slider: {
    x: { values: [0.1, 0.8] }
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter'  // Enable adaptive filtering (default value)
      // adaptiveMode: false   // Disable adaptive filtering
    }
  }
})
```

## Events

### Triggering Events

Slider filtering interaction supports the following events:

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

### Basic Slider Filtering

The following example shows how to add basic X-axis slider filtering functionality to a line chart:

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

### Adaptive Filtering Examples

#### Single-axis Adaptive Filtering

When only X-axis slider is configured, dragging the X-axis slider will automatically adjust the Y-axis display range:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// Generate interesting data with some outliers
const data = [];
for (let i = 0; i < 50; i++) {
  const baseValue = Math.sin(i / 8) * 30 + 50;
  // Add outliers in specific range
  const anomaly = (i >= 20 && i <= 25) ? Math.random() * 150 : 0;
  data.push({
    time: i,
    value: baseValue + anomaly + Math.random() * 10,
    category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C'
  });
}

chart.options({
  type: 'point',
  data,
  encode: { x: 'time', y: 'value', color: 'category' },
  slider: {
    x: {
      values: [0.2, 0.8],
      labelFormatter: (d) => `Time: ${Math.round(d)}`
    }
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter'  // Enable adaptive filtering
    }
  },
  style: {
    fillOpacity: 0.8
  }
});

chart.render();
```

#### Y-axis Adaptive Filtering

When only Y-axis slider is configured, dragging the Y-axis slider will automatically adjust the X-axis display range:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv'
  },
  encode: { x: 'date', y: 'close' },
  slider: {
    y: {
      values: [0.1, 0.9],
      labelFormatter: (d) => `Price: ${Math.round(d)}`
    }
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter'  // Enable adaptive filtering
    }
  }
});

chart.render();
```

#### Disable Adaptive Filtering

If adaptive functionality is not needed, you can explicitly disable it:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    x: i,
    y: Math.sin(i / 10) * 50 + 100 + Math.random() * 20
  });
}

chart.options({
  type: 'line',
  data,
  encode: { x: 'x', y: 'y' },
  slider: {
    x: {
      values: [0.3, 0.7]
    }
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: false  // Disable adaptive filtering
    }
  },
  scale: {
    y: { domain: [0, 200] }  // Fixed Y-axis range
  }
});

chart.render();
```
