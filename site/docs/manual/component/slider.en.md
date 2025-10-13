---
title: Slider
order: 7.4
---

## Overview

The **Slider** in G2 can be used to filter data, allowing users to focus on local data at a time when dealing with large datasets. It's an auxiliary component for data visualization. It condenses large amounts of data onto an axis, enabling users to view data at both macro and micro levels, and drag to observe data evolution within a certain range. The slider can be bound to x or y channels to display sliders in different directions. Sliders are disabled by default.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const formatter = (dateTimeString) => {
  return new Date(dateTimeString).toLocaleString();
};

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  slider: {
    x: {
      labelFormatter: (d) => `${formatter(d)}`,
    },
  },
});

chart.render();
```

### Configuration Hierarchy

Sliders can be configured at the Mark level. In G2, each mark has its own slider. If the scales corresponding to marks are synchronized, the sliders will also be merged.

```js
({
  type: 'interval',
  slider: {
    x: {},
    y: {},
  },
});
```

Sliders can also be configured at the View level. Sliders have inheritance. Sliders declared on a view will be passed to the marks declared in `children`. If the mark has a slider for the corresponding channel, they will be merged; otherwise, it won't affect anything.

```js
({
  type: 'view',
  slider: {
    x: {},
    y: {},
  },
});
```

### When to Use

Sliders are condensed representations of value domain data, closely related to the scale types corresponding to position channels `x` and `y`. Generally, sliders are more frequently used with temporal scales, less frequently with continuous scales, and almost never with categorical scales.

<img alt="slider" src="https://user-images.githubusercontent.com/15646325/205075894-09f6b3a7-8cec-4953-af1a-2c466999f598.png" width="600" />

- **Temporal axis with very large data span** [High frequency use]: For example, when time series data spans 10 years and you need to observe data trends during this period, it's recommended to enable the slider;
- **Temporal axis with high data density** [High frequency use]: For example, minute-level real-time data updates. When you need to view data trends within a day, it's recommended to enable the slider;
- **Continuous axis with high data density** [Low frequency use]: For example, viewing average height distribution for ages 1-100. Enabling the slider allows global viewing of height distribution;
- **Categorical axis** [Not recommended].

### Usage

<img alt="slider" src="https://user-images.githubusercontent.com/15646325/205065555-8ef69242-ae35-4a9b-b7db-f380e82fd544.png" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  slider: { y: {} }, // Enable Y-direction slider
});

chart.render();
```

## Configuration Options

| Property               | Description                                                                                 | Type                    | Default             | Required |
| ---------------------- | ------------------------------------------------------------------------------------------- | ----------------------- | ------------------- | -------- |
| padding                | Slider inner padding                                                                        | number \| number[]      | -                   |          |
| values                 | Initial selection range of slider, within 0 ~ 1 interval                                    | [number, number]        | -                   |          |
| slidable               | Whether to allow dragging selection and handles                                             | boolean                 | true                |          |
| brushable              | Whether to enable brushing                                                                  | boolean                 | true                |          |
| labelFormatter         | Slider handle label formatter                                                               | (value: number)=>string | -                   |          |
| showHandle             | Whether to show drag handles                                                                | boolean                 | true                |          |
| showLabel              | Whether to show handle text                                                                 | boolean                 | true                |          |
| showLabelOnInteraction | Show handle text only when adjusting handles or brushing, effective when showLabel is false | boolean                 | false               |          |
| autoFitLabel           | Whether to automatically adjust handle text position                                        | boolean                 | true                |          |
| style                  | Configure slider component styles                                                           | [style](#style)         | See [style](#style) |          |

### style

Configure slider component styles.

| Property  | Description                     | Type                    | Default                     | Required |
| --------- | ------------------------------- | ----------------------- | --------------------------- | -------- |
| selection | Configure selection area styles | [selection](#selection) | See [selection](#selection) |          |
| track     | Configure track styles          | [track](#track)         | See [track](#track)         |          |
| handle    | Configure handle styles         | [handle](#handle)       | See [handle](#handle)       |          |
| sparkline | Configure sparkline styles      | [sparkline](#sparkline) | See [sparkline](#sparkline) |          |

#### selection

Configure slider selection area styles.

| Property               | Description                              | Type            | Default   | Required |
| ---------------------- | ---------------------------------------- | --------------- | --------- | -------- |
| selectionFill          | Selection area fill color                | string          | `#1783FF` |          |
| selectionFillOpacity   | Selection area fill opacity              | number          | `0.15`    |          |
| selectionStroke        | Selection area stroke color              | string          | -         |          |
| selectionStrokeOpacity | Selection area stroke opacity            | number          | -         |          |
| selectionLineWidth     | Selection area stroke width              | number          | -         |          |
| selectionLineDash      | Selection area stroke dash configuration | [number,number] | -         |          |
| selectionOpacity       | Selection area overall opacity           | number          | -         |          |
| selectionShadowColor   | Selection area shadow color              | string          | -         |          |
| selectionShadowBlur    | Selection area shadow blur coefficient   | number          | -         |          |
| selectionShadowOffsetX | Selection area shadow horizontal offset  | number          | -         |          |
| selectionShadowOffsetY | Selection area shadow vertical offset    | number          | -         |          |
| selectionCursor        | Selection area cursor style              | string          | `default` |          |

When configuring selection styles in the Slider component, use the `selection` prefix with properties instead of object configuration.

```js
({
  slider: {
    x: {
      // Can be configured outside style as well, G2 internally handles compatibility
      style: {
        selectionFill: '#000',
        selectionFillOpacity: 0.9,
        selectionStroke: '#DAF5EC',
        selectionStrokeOpacity: 0.9,
        selectionLineWidth: 2,
        selectionLineDash: [4, 8],
        selectionOpacity: 1,
        selectionShadowColor: '#d3d3d3',
        selectionShadowBlur: 10,
        selectionShadowOffsetX: 10,
        selectionShadowOffsetY: 10,
        selectionCursor: 'pointer',
      },
    },
  },
});
```

#### track

Configure slider track styles.

| Property           | Description                     | Type            | Default   | Required |
| ------------------ | ------------------------------- | --------------- | --------- | -------- |
| trackLength        | Track length                    | number          | -         |          |
| trackSize          | Track size                      | number          | `16`      |          |
| trackFill          | Track fill color                | string          | `#416180` |          |
| trackFillOpacity   | Track fill opacity              | number          | `1`       |          |
| trackStroke        | Track stroke color              | string          | -         |          |
| trackStrokeOpacity | Track stroke opacity            | number          | -         |          |
| trackLineWidth     | Track stroke width              | number          | -         |          |
| trackLineDash      | Track stroke dash configuration | [number,number] | -         |          |
| trackOpacity       | Track overall opacity           | number          | -         |          |
| trackShadowColor   | Track shadow color              | string          | -         |          |
| trackShadowBlur    | Track shadow blur coefficient   | number          | -         |          |
| trackShadowOffsetX | Track shadow horizontal offset  | number          | -         |          |
| trackShadowOffsetY | Track shadow vertical offset    | number          | -         |          |
| trackCursor        | Track cursor style              | string          | `default` |          |

When configuring selection styles in the Slider component, use the `track` prefix with properties instead of object configuration.

```js
({
  slider: {
    x: {
      // Can be configured outside style as well, G2 internally handles compatibility
      style: {
        trackSize: 20,
        trackFill: '#000',
        trackFillOpacity: 0.9,
        trackStroke: '#DAF5EC',
        trackStrokeOpacity: 0.9,
        trackLineWidth: 2,
        trackLineDash: [4, 8],
        trackOpacity: 1,
        trackShadowColor: '#d3d3d3',
        trackShadowBlur: 10,
        trackShadowOffsetX: 10,
        trackShadowOffsetY: 10,
        trackCursor: 'pointer',
      },
    },
  },
});
```

#### handle

Configure slider handle styles.

| Property                 | Description                                                                                                                            | Type                                                       | Default   | Required |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------- | -------- |
| handleLabelFontSize      | Handle label font size                                                                                                                 | number                                                     | `12`      |          |
| handleLabelFontFamily    | Handle label font family                                                                                                               | string                                                     | -         |          |
| handleLabelFontWeight    | Handle label font weight                                                                                                               | number                                                     | `normal`  |          |
| handleLabelLineHeight    | Handle label line height                                                                                                               | number                                                     | -         |          |
| handleLabelTextAlign     | Set current alignment for handle label text content                                                                                    | `center` \| `end` \| `left` \| `right` \| `start`          | `start`   |          |
| handleLabelTextBaseline  | Set current text baseline used when drawing handle label text                                                                          | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging` | `bottom`  |          |
| handleLabelFill          | Handle label font color                                                                                                                | string                                                     | `#1D2129` |          |
| handleLabelFillOpacity   | Handle label font color opacity                                                                                                        | number                                                     | `0.45`    |          |
| handleLabelStroke        | Handle label font stroke color                                                                                                         | string                                                     | -         |          |
| handleLabelStrokeOpacity | Handle label font stroke color opacity                                                                                                 | number                                                     | -         |          |
| handleLabelLineWidth     | Handle label font stroke width                                                                                                         | number                                                     | -         |          |
| handleLabelLineDash      | Handle label font stroke dash configuration. First value is dash segment length, second is gap distance. Setting [0,0] removes stroke. | [number , number]                                          | -         |          |
| handleLabelOpacity       | Handle label text overall opacity                                                                                                      | number                                                     | -         |          |
| handleLabelShadowColor   | Handle label text shadow color                                                                                                         | string                                                     | -         |          |
| handleLabelShadowBlur    | Handle label text shadow Gaussian blur coefficient                                                                                     | number                                                     | -         |          |
| handleLabelShadowOffsetX | Shadow horizontal distance from handle label text                                                                                      | number                                                     | -         |          |
| handleLabelShadowOffsetY | Shadow vertical distance from handle label text                                                                                        | number                                                     | -         |          |
| handleLabelCursor        | Handle label cursor style. Same as CSS cursor style                                                                                    | string                                                     | `default` |          |
| handleIconRadius         | Handle icon corner radius                                                                                                              | number                                                     | `2`       |          |
| handleIconSize           | Handle icon size                                                                                                                       | number                                                     | `10`      |          |
| handleIconFill           | Handle icon fill color                                                                                                                 | string                                                     | `#f7f7f7` |          |
| handleIconFillOpacity    | Handle icon fill opacity                                                                                                               | number                                                     | `1`       |          |
| handleIconStroke         | Handle icon stroke                                                                                                                     | string                                                     | `#1D2129` |          |
| handleIconStrokeOpacity  | Handle icon stroke opacity                                                                                                             | number                                                     | `0.25`    |          |
| handleIconLineWidth      | Handle icon stroke width                                                                                                               | number                                                     | `1`       |          |
| handleIconLineDash       | Handle icon stroke dash configuration. First value is dash segment length, second is gap distance. Setting [0,0] removes stroke.       | [number , number]                                          | -         |          |
| handleIconOpacity        | Handle icon overall opacity                                                                                                            | number                                                     | -         |          |
| handleIconShadowColor    | Handle icon shadow color                                                                                                               | string                                                     | -         |          |
| handleIconShadowBlur     | Handle icon shadow Gaussian blur coefficient                                                                                           | number                                                     | -         |          |
| handleIconShadowOffsetX  | Shadow horizontal distance from handle icon                                                                                            | number                                                     | -         |          |
| handleIconShadowOffsetY  | Shadow vertical distance from handle icon                                                                                              | number                                                     | -         |          |
| handleIconCursor         | Handle icon cursor style. Same as CSS cursor style                                                                                     | string                                                     | `default` |          |

When configuring slider handle properties in the Slider component, use the `handle` prefix with properties instead of object configuration.

```js
({
  slider: {
    x: {
      // Can be configured outside style as well, G2 internally handles compatibility
      style: {
        // Configure handleLabel drawing properties
        handleLabelFontSize: 16,
        handleLabelFontFamily: 'sans-serif',
        handleLabelFontWeight: 500,
        handleLabelLineHeight: 20,
        handleLabelTextAlign: 'center',
        handleLabelTextBaseline: 'middle',
        handleLabelFill: '#000',
        handleLabelFillOpacity: 0.9,
        handleLabelStroke: '#DAF5EC',
        handleLabelStrokeOpacity: 0.9,
        handleLabelLineWidth: 2,
        handleLabelLineDash: [4, 8],
        handleLabelOpacity: 1,
        handleLabelShadowColor: '#d3d3d3',
        handleLabelShadowBlur: 10,
        handleLabelShadowOffsetX: 10,
        handleLabelShadowOffsetY: 10,
        handleLabelCursor: 'pointer',

        handleIconSize: 50,
        // Configure handleIcon drawing properties
        handleIconFill: '#000',
        handleIconFillOpacity: 0.9,
        handleIconStroke: '#DAF5EC',
        handleIconStrokeOpacity: 0.9,
        handleIconLineWidth: 2,
        handleIconLineDash: [4, 8],
        handleIconOpacity: 1,
        handleIconShadowColor: '#d3d3d3',
        handleIconShadowBlur: 10,
        handleIconShadowOffsetX: 10,
        handleIconShadowOffsetY: 10,
        handleIconCursor: 'pointer',
      },
    },
  },
});
```

#### sparkline

Configure slider sparkline styles.

| Property                   | Description                                                                                                                          | Type                                          | Default | Required |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ------- | -------- |
| sparklineType              | Sparkline type: line chart, column chart                                                                                             | `line` \| `column`                            | `line`  |          |
| sparklineIsStack           | Whether to stack data                                                                                                                | boolean                                       | false   |          |
| sparklineRange             | Specify value range. If not specified, will use data's min and max values                                                            | [number, number]                              | -       |          |
| sparklineColor             | Specify color                                                                                                                        | string \| string[] \| (index: number)=>string | -       |          |
| sparklineSmooth            | For line charts, smooth curves                                                                                                       | boolean                                       | false   |          |
| sparklineLineStroke        | For line charts, line color                                                                                                          | string                                        | -       |          |
| sparklineLineStrokeOpacity | For line charts, line opacity                                                                                                        | number                                        | -       |          |
| sparklineLineLineDash      | For line charts, line dash configuration. First value is dash segment length, second is gap distance. Setting [0, 0] removes stroke. | [number,number]                               | -       |          |
| sparklineAreaFill          | For line charts, fill area color                                                                                                     | string                                        | -       |          |
| sparklineAreaFillOpacity   | For line charts, fill area opacity                                                                                                   | number                                        | -       |          |
| sparklineColumnFill        | For column charts, column color                                                                                                      | string                                        | -       |          |
| sparklineColumnFillOpacity | For column charts, column opacity                                                                                                    | number                                        | -       |          |
| sparklineIsGroup           | For column charts, whether to display in groups                                                                                      | boolean                                       | false   |          |
| sparklineSpacing           | For column charts, spacing between grouped columns                                                                                   | number                                        | `0`     |          |

When configuring sparkline properties in the Slider component, use the `sparkline` prefix with properties instead of object configuration.

```js
({
  slider: {
    x: {
      // Can be configured outside style as well, G2 internally handles compatibility
      style: {
        sparklineType: 'line',
        sparklineColor: 'red',
      },
    },
  },
});
```

### Events

| Property    | Description                                         | Type                                  |
| ----------- | --------------------------------------------------- | ------------------------------------- |
| valuechange | Triggered when selection changes, listen via events | `({detail: { value: any; }}) => void` |

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  // Enable X-axis slider
  .slider('x', {});

chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  document.querySelector('.slider').addEventListener('valuechange', (evt) => {
    console.info(evt.detail);
  });
});

chart.render();
```

## Common Interactions

### Wheel Zooming (sliderWheel)

The `sliderWheel` interaction allows users to control the slider's selection range through mouse wheel or trackpad gestures, enabling quick data range zooming operations.

- **Trigger**: Use mouse wheel or trackpad scrolling within the chart area
- **Effect**: Zoom in/out selection range while maintaining the center position of the selection
- **Use Cases**: Suitable for scenarios requiring frequent adjustment of data viewing range

#### Configuration

```js
({
  slider: {
    x: {}, // Enable X-axis slider
  },
  interaction: {
    sliderWheel: true, // Enable wheel zooming interaction
  },
});
```

You can also pass configuration options for customization:

```js
({
  slider: {
    x: {},
  },
  interaction: {
    sliderWheel: {
      wheelSensitivity: 0.1, // Wheel sensitivity
      minRange: 0.05,        // Minimum zoom range
      x: true,               // X-axis response mode
      y: 'shift',            // Y-axis responds only when Shift key is pressed
    },
  },
});
```

#### Main Configuration Options

| Property         | Description                     | Type    | Default |
| :--------------- | :------------------------------ | :------ | :------ |
| minRange         | Minimum zoom range              | number  | 0.01    |
| wheelSensitivity | Wheel zoom sensitivity          | number  | 0.05    |
| x                | X-axis wheel interaction mode   | boolean | true    |
| y                | Y-axis wheel interaction mode   | boolean | true    |

#### Example

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  slider: {
    x: {
      labelFormatter: (d) => {
        return new Date(d).toLocaleDateString();
      },
    },
  },
  interaction: {
    sliderWheel: {
      wheelSensitivity: 0.08,
      minRange: 0.02,
    },
  },
});

chart.render();
```

## Adaptive Filtering

Sliders can not only be used for data filtering but also support adaptive filtering functionality. When dragging the slider, it automatically adjusts the display range of other axis based on the currently selected data range, providing a better data exploration experience.

### Important Note

**Adaptive strategies need to be configured in the `sliderFilter` interaction, not in the `slider` component.** Starting from G2 5.4.1, when you configure the `slider` component, adaptive filtering functionality is automatically enabled. If adaptive functionality is not needed, it needs to be manually disabled.

### Configuration Methods

#### 1. Default Adaptive (Recommended)

When configuring the slider component, adaptive filtering is enabled by default:

```javascript
// Adaptive filtering is automatically enabled by default
chart.options({
  slider:{
    x:{}
  }
});
```

#### 2. Manual sliderFilter Configuration

For custom adaptive strategies, configure in the `sliderFilter` interaction:

```javascript
chart.options({
  slider:{
    x:{}
  },
  interaction:{
    sliderFilter:{
      adaptiveMode: 'filter', // Enable adaptive
    }
  }
});
```

#### 3. Manual Disable Adaptive

If adaptive functionality is not needed, explicitly disable it:

```javascript
chart.options({
  slider:{
    x:{}
  },
  interaction:{
    sliderFilter:{
      adaptiveMode: false  // Manually disable adaptive
    }
  }
});
```

### Adaptive Mode Parameters

The `adaptiveMode` configuration option in the `sliderFilter` interaction can control the behavior of adaptive filtering:

```js
{
  slider: {
    x: { values: [0.1, 0.8] }
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter'  // Enable adaptive filtering (default value)
      // adaptiveMode: false   // Disable adaptive filtering
    }
  }
}
```

**Available values:**

- `'filter'`: Enable adaptive filtering, dynamically adjust other axis' domain values based on selected data range (**default value**)
- `false` or `null`: Disable adaptive filtering
- More adaptive strategies will be introduced in future versions, stay tuned.

### Specific Scenarios

The system will adopt different adaptive strategies based on different configuration scenarios. In single-axis scenarios, slider configuration at View level or Mark level has the same effect. But in multi-axis charts, there will be different adaptive strategies:

- **Multi-axis Adaptive**: When there are independent coordinate axis in the chart (configured through `scale: { y: { independent: true }}`), multi-axis adaptive strategies will be enabled. Different adaptive strategies will be adopted based on the configuration level of the slider.

  - **View Level Configuration**: Affects all Marks in the entire view, suitable for scenarios where unified control of multiple charts is needed
  - **Mark Level Configuration**: Only affects specific Marks, suitable for scenarios where independent filtering of certain specific marks is needed

- **Adaptive Calculation Logic**: By collecting channel data from all marks, calling specified filtering logic for adaptive filtering calculation, dynamically calculating Y-axis domain range based on current filtering range, ensuring the displayed data range is always reasonable.

#### Single-axis Adaptive

When only X-axis or only Y-axis has a slider configured, single-axis adaptive filtering will be enabled. When dragging the slider, it will automatically adjust the display range of the other axis based on the currently selected data range.

##### Single Mark Scenario

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [];
for (let i = 0; i < 150; i++) {
  data.push({
    x: i,
    y: Math.sin(i / 15) * 60 + 80 + Math.random() * 25,
    category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C',
  });
}

chart.options({
  type: 'point',
  data,
  encode: { x: 'x', y: 'y', color: 'category' },
  slider: {
    x: {
      values: [0.1, 0.8],
      labelFormatter: (d) => `X: ${Math.round(d)}`,
    },
  },
  style: {
    fillOpacity: 0.8,
  },
});

chart.render();
```

### Adaptive Features

#### Discrete and Continuous Axis

- **Continuous Axis**: During adaptation, minimum and maximum values of data are calculated to form new domain ranges
- **Discrete Axis**: During adaptation, all discrete values within range are collected and deduplicated as new domain values
- **Zero Baseline Preservation**: For continuous axis whose original domain includes 0, the zero baseline is preserved during adaptation

#### Bidirectional Mutual Exclusion

If both X-axis and Y-axis have sliders configured, adaptive functionality will not take effect even if adaptive strategies are configured.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [];
for (let i = 0; i < 300; i++) {
  const x = Math.random() * 100;
  const y = x * 0.7 + Math.random() * 30 + 10;
  data.push({
    x,
    y,
    size: Math.random() * 8 + 3,
    category: Math.random() > 0.5 ? 'A' : 'B',
  });
}

chart.options({
  type: 'point',
  data,
  encode: {
    x: 'x',
    y: 'y',
    size: 'size',
    color: 'category',
  },
  // Configure both X and Y axis sliders, adaptive will not take effect
  slider: {
    x: {
      values: [0.2, 0.8],
      labelFormatter: (d) => `X: ${Math.round(d)}`,
    },
    y: {
      values: [0.1, 0.9],
      labelFormatter: (d) => `Y: ${Math.round(d)}`,
    },
  },
  scale: {
    x: { nice: true },
    y: { nice: true },
  },
  style: {
    fillOpacity: 0.7,
  },
});

chart.render();
```

## Examples

### Custom Slider

If you don't want to use G2's default slider, you can customize following these steps:

- Render the slider after rendering is complete.
- Listen to slider events.

The key to the first step is determining the slider's position and length through the coordinate object obtained via `chart.getCoordinate`. The key to the second step is using the scale obtained through `chart.getScale` to invert the selected range, finally obtaining the selected data range, then updating the scale's domain.

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();

function sliderX(chart) {
  // Create and mount range
  const container = chart.getContainer();
  const range = document.createElement('input');
  container.append(range);

  // Set range width and other properties based on coordinate
  const coordinate = chart.getCoordinate();
  const { paddingLeft, width } = coordinate.getOptions();
  range.type = 'range';
  range.min = 0;
  range.max = width;
  range.value = width;
  range.style.display = 'block';
  range.style.width = width + 'px';
  range.style.marginLeft = paddingLeft + 'px';

  // Listen to change event, get filtered domain through scale
  // Update domain and render
  const scale = chart.getScaleByChannel('x');
  const options = chart.options();
  range.onchange = (event) => {
    const value = event.target.value;
    const range = [0, value / width];
    const domain = range.map((d) => scale.invert(d));
    chart.options({
      ...options,
      scale: { x: { domain } },
    });
    chart.render();
  };
}

// Render chart
chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
});

chart.render().then(sliderX);
```
