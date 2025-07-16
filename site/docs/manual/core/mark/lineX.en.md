---
title: lineX
order: 13
---

## Overview

The `lineX` and `lineY` marks have similar configurations. The `lineX` mark is used to draw auxiliary lines perpendicular to the x-axis, commonly used for drawing average values or other aggregated data auxiliary lines.

## Data Configuration Methods

`lineX` supports two methods for configuring data:

### Method 1: Direct data configuration (recommended for simple scenarios)

When you need to draw vertical lines at fixed positions, you can directly configure `data` as a number array. G2 will automatically convert the array to `x` channel encoding.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  height: 200,
  children: [
    {
      type: 'rect',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/unemployment2.json',
      },
      encode: { x: 'rate' },
      transform: [{ type: 'binX', y: 'count' }],
      style: { inset: 0.5 },
    },
    {
      type: 'lineX',
      data: [10.2], // Automatically converted to encode: { x: [10.2] }
      style: { stroke: '#000', strokeOpacity: 0.45, lineDash: [3, 4] },
      labels: [
        {
          text: 'lineX text',
          position: 'top-left',
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

### Method 2: Explicit encode configuration (for complex data processing)

When you need to work with data fields or use data transforms, you should explicitly configure `encode` channels. This approach is more flexible and supports data field mapping and various data transforms.

```js | ob { inject: true }
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_histogram_global_mean.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/movies.json',
  transform: [
    {
      type: 'filter',
      callback: (d) => d['IMDB Rating'] > 0,
    },
  ],
});

chart
  .rect()
  .transform({ type: 'binX', y: 'count', thresholds: 9 })
  .encode('x', 'IMDB Rating')
  .scale('y', { domainMax: 1000 })
  .style('inset', 1);

chart
  .lineX()
  .transform({ type: 'groupColor', x: 'mean' }) // Calculate mean value
  .encode('x', 'IMDB Rating') // Explicitly configure x channel
  .style('stroke', '#F4664A')
  .style('strokeOpacity', 1)
  .style('lineWidth', 2)
  .style('lineDash', [4, 4]);

chart.render();
```

### Configuration Method Comparison

| Configuration Method         | Use Case                         | Example                        | Auto Conversion              |
| ---------------------------- | -------------------------------- | ------------------------------ | ---------------------------- |
| `data: [value1, value2]`     | Fixed position auxiliary lines   | `data: [10, 20]`               | ✅ Auto converted to `encode.x` |
| `encode: { x: field }`       | Based on data fields or transforms | `encode('x', 'fieldName')`     | ❌ Explicit configuration    |

**Important Notes:**

- When both `data` array and `encode.x` are configured, `encode.x` takes higher priority
- `data` auto conversion only works when array elements are simple values (not objects)
- When using `transform` for data aggregation, the `encode` method must be used

For more examples, you can visit the [Chart Examples - Line Annotation](/en/examples#annotation-line) page.

## Configuration

| Property | Description                                                                                                    | Type              | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| data     | Configure data for the `lineX` mark, supports number arrays (automatically converted to x channel) or object arrays | Array             | -       |          |
| encode   | Configure visual channels of the `lineX` mark, including `x`, `color`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the graphic style of the `lineX` mark                                                                | [style](#style)   | -       |          |
| labels   | Configure the text configuration of the `lineX` mark                                                          | [labels](#labels) | -       |          |

### encode

Configure the visual channels of the `lineX` mark.

| Property | Description                                                                                                                                                                                                                                                                                                                           | Type                             | Default | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------- | -------- |
| x        | Bind the `x` property channel of the `lineX` mark. Supports data field mapping or works with transforms to calculate aggregated values (such as mean, median). **Note: When directly configuring `data` as an array, it will be automatically converted to the `x` channel, no need to configure repeatedly.** | [encode](/en/manual/core/encode) | -       | ✓        |
| color    | Bind the `color` property channel of the `lineX` mark. If a data field is mapped to the color channel, the data will be grouped and split into multiple regions with different colors                                                                                                                                               | [encode](/en/manual/core/encode) | -       |          |

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

### Multi-data Source Comparative Analysis

Shows how to use different data sources to calculate statistical lines separately, suitable for data comparison analysis scenarios.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// Simulate two different sets of data
const data2020 = Array.from({ length: 100 }, (_, i) => ({
  score: 60 + Math.random() * 30,
  year: 2020,
  category: 'A',
}));

const data2021 = Array.from({ length: 100 }, (_, i) => ({
  score: 70 + Math.random() * 25,
  year: 2021,
  category: 'B',
}));

const allData = [...data2020, ...data2021];

chart.options({
  type: 'view',
  children: [
    // 2020 data histogram
    {
      type: 'rect',
      data: data2020,
      transform: [{ type: 'binX', y: 'count', thresholds: 15 }],
      encode: { x: 'score' },
      style: {
        fill: '#1890ff',
        fillOpacity: 0.5,
        stroke: '#1890ff',
        inset: 0.5,
      },
    },
    // 2021 data histogram
    {
      type: 'rect',
      data: data2021,
      transform: [{ type: 'binX', y: 'count', thresholds: 15 }],
      encode: { x: 'score' },
      style: {
        fill: '#fa8c16',
        fillOpacity: 0.5,
        stroke: '#fa8c16',
        inset: 0.5,
      },
    },
    // 2020 average line
    {
      type: 'lineX',
      data: data2020,
      transform: [{ type: 'groupColor', x: 'mean' }],
      encode: { x: 'score' },
      style: {
        stroke: '#1890ff',
        strokeOpacity: 1,
        lineWidth: 3,
        lineDash: [6, 3],
      },
      labels: [
        {
          text: '2020 Average Score',
          position: 'top-left',
          fill: '#1890ff',
          fontWeight: 'bold',
          background: true,
          backgroundFill: '#e6f7ff',
          backgroundOpacity: 0.9,
        },
      ],
    },
    // 2021 average line
    {
      type: 'lineX',
      data: data2021,
      transform: [{ type: 'groupColor', x: 'mean' }],
      encode: { x: 'score' },
      style: {
        stroke: '#fa8c16',
        strokeOpacity: 1,
        lineWidth: 3,
        lineDash: [6, 3],
      },
      labels: [
        {
          text: '2021 Average Score',
          position: 'top-right',
          fill: '#fa8c16',
          fontWeight: 'bold',
          background: true,
          backgroundFill: '#fff7e6',
          backgroundOpacity: 0.9,
        },
      ],
    },
    // Overall average line
    {
      type: 'lineX',
      data: allData,
      transform: [{ type: 'groupColor', x: 'mean' }],
      encode: { x: 'score' },
      style: {
        stroke: '#52c41a',
        strokeOpacity: 1,
        lineWidth: 2,
        lineDash: [8, 4],
      },
      labels: [
        {
          text: 'Overall Average Score',
          position: 'bottom',
          fill: '#52c41a',
          fontWeight: 'bold',
          textAlign: 'center',
          background: true,
          backgroundFill: '#f6ffed',
          backgroundOpacity: 0.9,
        },
      ],
    },
  ],
});

chart.render();
```
