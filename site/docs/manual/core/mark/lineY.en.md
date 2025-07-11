---
title: lineY
order: 13
---

## Overview

The `lineY` and `lineX` marks have similar configurations. The `lineY` mark is used to draw auxiliary lines perpendicular to the y-axis, commonly used for drawing average values or other aggregated data auxiliary lines.

## Data Configuration Methods

`lineY` supports two methods for configuring data:

### Method 1: Direct data Configuration (Recommended for Simple Scenarios)

When you need to draw horizontal lines at fixed positions, you can directly configure `data` as a number array. G2 will automatically convert the array to `y` channel encoding.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  height: 200,
  autoFit: true,
  children: [
    {
      type: 'interval',
      data: [
        { year: '1951', sales: 38 },
        { year: '1952', sales: 52 },
        { year: '1956', sales: 61 },
        { year: '1957', sales: 120 },
        { year: '1958', sales: 48 },
        { year: '1959', sales: 38 },
      ],
      encode: { x: 'year', y: 'sales' },
    },
    {
      type: 'lineY',
      data: [100, 59], // Automatically converted to encode: { y: [100, 59] }
      style: {
        stroke: (v) => {
          if (v >= 60) {
            return 'green';
          } else {
            return 'red';
          }
        },
        lineWidth: 2,
      },
      labels: [
        // Text configuration can refer to mark text
        {
          text: (v) => (v >= 60 ? 'lineY divider 1' : 'lineY divider 2'),
          position: 'top-right',
          textBaseline: 'bottom',
          fill: '#000',
          fillOpacity: 0.45,
          background: true,
          backgroundFill: '#000',
          backgroundOpacity: 0.15,
        },
      ],
    },
  ],
});

chart.render();
```

### Method 2: Explicit encode Configuration (For Complex Data Processing)

When you need to work with data fields or combine with data transforms, you should explicitly configure the `encode` channels. This method is more flexible and supports data field mapping and various data transforms.

```js | ob { inject: true }
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_precipitation_mean.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
});

chart
  .interval()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', (d) => new Date(d.date).getUTCMonth())
  .encode('y', 'precipitation')
  .scale('y', { tickCount: 5, domainMax: 6 })
  .tooltip({ channel: 'y', valueFormatter: '.2f' });

chart
  .lineY()
  .transform({ type: 'groupX', y: 'mean' }) // Calculate mean value
  .encode('y', 'precipitation') // Explicitly configure y channel
  .style('stroke', '#F4664A')
  .style('strokeOpacity', 1)
  .style('lineWidth', 2)
  .style('lineDash', [3, 3]);

chart.render();
```

### Configuration Method Comparison

| Configuration Method     | Use Case                           | Example                        | Auto Conversion              |
| ------------------------ | ---------------------------------- | ------------------------------ | ---------------------------- |
| `data: [value1, value2]` | Fixed position auxiliary lines     | `data: [50, 100]`              | ✅ Auto convert to `encode.y` |
| `encode: { y: field }`   | Based on data fields or transforms | `encode('y', 'fieldName')`     | ❌ Explicit configuration     |

**Important Notes:**

- When both `data` array and `encode.y` are configured, `encode.y` takes higher priority
- `data` auto conversion only works when array elements are simple values (not objects)
- When using `transform` for data aggregation, you must use the `encode` method

For more examples, you can visit the [Chart Examples - Line Annotation](/en/examples#annotation-line) page.

## Configuration

| Property | Description                                                                                                                                             | Type              | Default | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| data     | Configure the data for the `lineY` mark, supports number arrays (automatically converted to y channel) or object arrays                               | Array             | -       |          |
| encode   | Configure the visual channels of the `lineY` mark, including `y`, `color`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the graphic style of the `lineY` mark                                                                                                         | [style](#style)   | -       |          |

### encode

Configure the visual channels of the `lineY` mark.

| Property | Description                                                                                                                                                                                                                                                                                                                                                                | Type                             | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------- | -------- |
| y        | Bind the `y` property channel of the `lineY` mark. Supports data field mapping or works with transforms to calculate aggregated values (such as mean or median). **Note: When directly configuring `data` as an array, it will be automatically converted to the `y` channel, no need to configure again.**                                                          | [encode](/en/manual/core/encode) | -       | ✓        |
| color    | Bind the `color` property channel of the `lineY` mark. If a data field is mapped to the color channel, the data will be grouped and split into multiple regions with different colors                                                                                                                                                                                      | [encode](/en/manual/core/encode) | -       |          |

### style

| Property      | Description                                                                                                                                                                         | Type                                                | Default   | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------- | -------- |
| stroke        | Stroke of the graphic                                                                                                                                                               | _string_ \| _Function\<string\>_                    | -         |          |
| strokeOpacity | Stroke opacity                                                                                                                                                                      | _number_ \| _Function\<number\>_                    | -         |          |
| lineWidth     | Width of the graphic stroke                                                                                                                                                         | _number_ \| _Function\<number\>_                    | -         |          |
| lineDash      | Dashed stroke configuration. The first value is the length of each dash segment, the second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke | _[number,number]_ \| _Function\<[number, number]\>_ | -         |          |
| opacity       | Overall opacity of the graphic                                                                                                                                                      | _number_ \| _Function\<number\>_                    | -         |          |
| shadowColor   | Shadow color of the graphic                                                                                                                                                         | _string_ \| _Function\<string\>_                    | -         |          |
| shadowBlur    | Gaussian blur coefficient of the graphic shadow                                                                                                                                     | _number_ \| _Function\<number\>_                    | -         |          |
| shadowOffsetX | Horizontal distance of the shadow from the graphic                                                                                                                                  | _number_ \| _Function\<number\>_                    | -         |          |
| shadowOffsetY | Vertical distance of the shadow from the graphic                                                                                                                                    | _number_ \| _Function\<number\>_                    | -         |          |
| cursor        | Mouse cursor style. Same as CSS cursor style, default 'default'                                                                                                                     | _string_ \| _Function\<string\>_                    | `default` |          |

## Examples

### Multiple Threshold Lines

Shows how to draw multiple threshold lines with different styles in the same chart, commonly used for data monitoring and alert systems.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// Simulate time series data
const data = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 50 + Math.sin(i * 0.3) * 20 + Math.random() * 10,
}));

chart.options({
  type: 'view',
  data,
  children: [
    // Draw the main line chart
    {
      type: 'line',
      encode: { x: 'day', y: 'value' },
      style: { stroke: '#1890ff', lineWidth: 2 },
    },
    // Draw data points
    {
      type: 'point',
      encode: { x: 'day', y: 'value' },
      style: { fill: '#1890ff', r: 3 },
    },
    // Danger threshold line (red)
    {
      type: 'lineY',
      data: [75],
      style: {
        stroke: '#ff4d4f',
        strokeOpacity: 0.8,
        lineWidth: 2,
        lineDash: [8, 4],
      },
      labels: [
        {
          text: 'Danger Threshold',
          position: 'top-right',
          fill: '#ff4d4f',
          fontWeight: 'bold',
          background: true,
          backgroundFill: '#fff',
          backgroundOpacity: 0.9,
        },
      ],
    },
    // Warning threshold line (orange)
    {
      type: 'lineY',
      data: [65],
      style: {
        stroke: '#fa8c16',
        strokeOpacity: 0.8,
        lineWidth: 2,
        lineDash: [5, 5],
      },
      labels: [
        {
          text: 'Warning Threshold',
          position: 'top-right',
          fill: '#fa8c16',
          fontWeight: 'bold',
          background: true,
          backgroundFill: '#fff',
          backgroundOpacity: 0.9,
        },
      ],
    },
    // Normal threshold line (green)
    {
      type: 'lineY',
      data: [35],
      style: {
        stroke: '#52c41a',
        strokeOpacity: 0.8,
        lineWidth: 2,
        lineDash: [3, 3],
      },
      labels: [
        {
          text: 'Normal Lower Limit',
          position: 'bottom-right',
          fill: '#52c41a',
          fontWeight: 'bold',
          background: true,
          backgroundFill: '#fff',
          backgroundOpacity: 0.9,
        },
      ],
    },
  ],
});

chart.render();
```
