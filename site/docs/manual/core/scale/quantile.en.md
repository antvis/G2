---
title: quantile
order: 2
---

## Overview

The `quantile` scale belongs to the **discretizing scale** category, primarily used to group continuous data by quantiles and map them to a specified range. It is a **measurement that automatically segments based on data density**, similar to [threshold](/en/manual/core/scale/threshold), but quantile automatically segments based on the sorted data indices rather than manually specified thresholds. It automatically determines segment points (ticks) based on data distribution density, where these segment points are determined by data quantiles rather than uniform distribution. During scaling, it performs segmented mapping based on these ticks, with tick calculation using the `tickMethod: quantile` approach. This characteristic makes the quantile scale particularly suitable for displaying datasets with non-uniform distributions, providing more accurate reflection of data density changes and suitable for scenarios requiring discretization based on data characteristics.

### Mapping Effect Example

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4 },
    { year: '1996', value: 5 },
    { year: '1997', value: 7 },
    { year: '1998', value: 7 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: {
    y: {
      type: 'quantile',
      range: [1, 0.5, 0],
    },
  },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
```

> The above chart shows that more values around 4-5 are mapped to 0.5, indicating the highest data density is between 4-5.

## Configuration Options

| Property   | Description                                                                                                               | Type                                                    | Default Value        | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------- | -------- |
| domain     | Sets the domain range of the data                                                                                         | `number[]`                                              | `[]`                 |          |
| range      | Sets the range for data mapping                                                                                           | `any[]`                                                 | `[]`                 | ✔        |
| unknown    | Return value for `undefined`, `NaN`, `null` empty values                                                                  | `any`                                                   | `undefined`          |          |
| tickCount  | Sets the recommended number of ticks to generate, tickCount is only a suggestion and not guaranteed to be fully effective | `number`                                                | `5`                  |          |
| tickMethod | Sets the method for generating ticks, commonly used for custom ticks                                                      | `(min: number, max: number, count: number) => number[]` | `wilkinson-extended` |          |
| nice       | Extends the domain range to make output ticks display more friendly                                                       | `boolean`                                               | `false`              |          |

### Complex Type Descriptions

- **tickMethod**:
  - Type: `(min: number, max: number, count: number) => number[]`
  - Description: Function used to generate tick values, receiving the domain's minimum value, maximum value, and desired tick count as parameters. In quantile scales, while actual data segmentation is obtained through quantile-calculated thresholds, generating tick values for display is accomplished through tickMethod. The default uses the `wilkinson-extended` algorithm, which generates aesthetically pleasing, uniformly distributed ticks. Customizing this method allows control over the tick positions and quantities displayed on the axis.
  - Example: `tickMethod: (min, max, count) => [min, (min+max)/2, max]` will only generate ticks at minimum value, middle value, and maximum value.

## Examples

### Heatmap

The following example shows how to use quantile scale to divide salary data into three groups and map them to different colors:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'cell',
  height: 640,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
  },
  encode: { x: 'x', y: 'y', color: 'index' },
  scale: {
    color: { type: 'quantile', range: ['#eeeeee', '#ffc3ce', '#ff0d0d'] },
  },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```

> In the above example, the quantile scale automatically divides salaries into three groups based on data distribution and maps them to three different colors, suitable for displaying the layered effect of data distribution.
