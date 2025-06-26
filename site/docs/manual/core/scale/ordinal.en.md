---
title: ordinal
order: 2
---

## Overview

The ordinal scale is a categorical scale that maps discrete domains to discrete ranges. Unlike continuous scales, ordinal scales handle discrete, categorical data such as product categories, classes, gender, etc.

The core characteristics of ordinal scales are:

- Input values must be discrete (usually strings or other non-numeric types)
- Output values are also discrete (can be any type, such as colors, shapes, etc.)
- Preserves the order of input data but not the proportional relationships between data points

In G2, ordinal scales are most commonly used to map categorical data to visual attributes such as colors and shapes. When no scale type is explicitly declared, G2 applies ordinal scales by default for categorical data.

### Mapping Principles

The working principle of ordinal scales is:

1. Map each discrete value in the input domain (e.g., 'A', 'B', 'C') to corresponding values in the output domain (e.g., 'red', 'green', 'blue') in order
2. The mapping is one-to-one: the first input value maps to the first output value, the second input value maps to the second output value, and so on
3. If an input value is not in the domain, it returns an unknown value (default is undefined)

For example, with domain ['A', 'B', 'C'] and range ['red', 'green', 'blue']:

- Input 'A' maps to 'red'
- Input 'B' maps to 'green'
- Input 'C' maps to 'blue'
- Input 'D' (not in domain) maps to undefined

### Differences from Other Scales

- **Difference from band/point scales**: Band and point scales also handle categorical data, but they map categorical data to continuous numeric ranges, primarily used for position encoding (such as x, y coordinates)
- **Difference from continuous scales**: Linear, log, and other continuous scales handle continuous numeric data and preserve proportional relationships between data points
- **Difference from discretizing scales**: Quantize, threshold, and other discretizing scales discretize continuous data, while ordinal scales directly handle discrete data

## Usage Scenarios

Ordinal scales are suitable for the following scenarios:

- Mapping categorical data to colors (e.g., different product categories using different colors)
- Mapping categorical data to shapes (e.g., different genders using different shapes)
- Mapping categorical data to other visual channels (such as size, opacity, etc.)
- Need to customize the display order of categorical data

## Getting Started

Here's a basic usage example that maps categorical data to the color channel:

```ts
chart
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'category')
  .scale('color', {
    type: 'ordinal',
    range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#c564be'],
  });
```

In this example, we map the 'category' field to the color channel and use an ordinal scale to specify a set of custom colors.

## Configuration Options

The ordinal scale provides the following configuration options:

| Parameter | Description                                              | Type                                                   | Default Value | Required |
| --------- | -------------------------------------------------------- | ------------------------------------------------------ | ------------- | -------- |
| domain    | Set the domain range of the data                         | `any[]`                                                | `[]`          |          |
| range     | Set the range of data mapping values                     | `any[]`                                                | `[]`          |          |
| unknown   | Return value for `undefined`, `NaN`, `null` empty values | `any`                                                  | `undefined`   |          |
| compare   | Comparator for comparing two values, used for sorting    | `(a: number \| string, b: number \| string) => number` | `undefined`   |          |

### domain

The `domain` parameter defines the input domain of the scale, i.e., the set of possible values in the original data. For ordinal scales, the domain is usually an array of strings representing all possible categorical values.

If domain is not set, G2 will automatically infer it from the data. However, in some cases, explicitly setting the domain can:

- Control the order of categories
- Include categories that may not exist in the data but need to be displayed in the legend
- Limit to display only partial categories

```ts
chart.scale('color', {
  type: 'ordinal',
  domain: ['Category A', 'Category B', 'Category C'], // Explicitly specify categories and their order
});
```

### range

The `range` parameter defines the output domain of the scale, i.e., the set of mapped values. For ordinal scales, the range can be an array of any type, most commonly an array of colors.

```ts
chart.scale('color', {
  type: 'ordinal',
  range: ['#1f77b4', '#ff7f0e', '#2ca02c'], // Custom colors
});
```

If range is not set, G2 will use default values based on the channel type:

- For color channels, use the default categorical color scheme
- For shape channels, use the default shape set
- For other channels, determined based on specific circumstances

### compare

The `compare` parameter is a comparison function used to sort values in the domain. This is very useful for controlling the display order of categorical data.

```ts
chart.scale('color', {
  type: 'ordinal',
  // Sort alphabetically
  compare: (a, b) => a.localeCompare(b),
});
```

If no compare function is provided, values in the domain will maintain their original order.

## Common Use Cases

### 1. Basic Bar Chart Color Mapping

Below is a basic example using ordinal scales to map categorical data to colors:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre', // Map genre to color channel
  },
  scale: {
    color: {
      type: 'ordinal',
      // Custom color range
      range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#c564be'],
    },
  },
});

chart.render();
```

In this example, we use an ordinal scale to map game genres to different colors. Each category corresponds to a color in the range array.

### 2. Custom Sort Order

The following example shows basic categorical data visualization:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Create chart instance

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// Prepare data - intentionally using unordered categories
const data = [
  { category: 'C', value: 20 },
  { category: 'A', value: 40 },
  { category: 'B', value: 30 },
  { category: 'E', value: 10 },
  { category: 'D', value: 25 },
];

// Configure chart
chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'category',
    y: 'value',
    color: 'category',
  },
});

// Render chart
chart.render();
```

In this example, we can see that G2 uses ordinal scales by default to handle categorical data. By default, categories are displayed in their original order from the data (C, A, B, E, D).

If you need custom sorting, you can add the following configuration:

```js
scale: {
  x: {
    type: 'ordinal',
    compare: (a, b) => a.localeCompare(b), // Sort alphabetically
  },
  color: {
    type: 'ordinal',
    compare: (a, b) => a.localeCompare(b), // Keep color mapping consistent
  },
}
```

This ensures categories are arranged alphabetically (A, B, C, D, E) rather than in the original order from the data.

## Complete Example

Here's a complete example using G2 declarative syntax (G2Spec) to configure ordinal scales:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const spec = {
  type: 'interval',
  data: [
    { category: 'A', value: 40 },
    { category: 'B', value: 30 },
    { category: 'C', value: 20 },
    { category: 'D', value: 10 },
    { category: 'E', value: 25 },
  ],
  scale: {
    color: {
      type: 'ordinal',
      domain: ['A', 'B', 'C', 'D', 'E'], // Explicitly specify category order
      range: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A'], // Custom colors
    },
  },
  encode: {
    x: 'category',
    y: 'value',
    color: 'category',
  },
};

// Render using Chart

const chart = new Chart({
  container: 'container',
  autoFit: true,
});
chart.options(spec);
chart.render();
```

This example demonstrates how to create a bar chart using ordinal scales with G2 declarative syntax, including the following features:

1. Using ordinal scales to map categorical data to colors
2. Explicitly specifying category order
3. Customizing color range

### Notes

When using ordinal scales, pay attention to the following:

1. **Number of categories vs. number of colors**: If the number of categories exceeds the number of colors provided in the range, G2 will cycle through these colors. For optimal visual effect, it's recommended that the range length be at least equal to the number of different categories.

2. **Color selection**: Choose colors with good contrast to ensure different categories can be clearly distinguished. For large numbers of categories, consider using professional color schemes like ColorBrewer.

3. **Coordination with other scales**: In the same chart, ordinal scales are usually used together with band or point scales, where the former is used for color encoding and the latter for position encoding.

4. **Sorting considerations**: Choose appropriate sorting methods based on the semantics of the data. Sometimes sorting by numeric values is more meaningful than sorting by category names.
