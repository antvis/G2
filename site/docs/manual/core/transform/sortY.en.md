---
title: sortY
order: 2
---

## Overview

`sortY` is a commonly used data transform provided by G2, used to sort the domain of **discrete y-axis**. By specifying sorting criteria, you can arrange the y-axis of a chart in ascending or descending order based on a measure (such as x, color, etc.), making the size relationships or distribution trends of data more intuitive.  
`sortY` supports flexible sorting channels, aggregation methods, slicing configurations, and is commonly used for highlighting key points, optimizing readability, and comparative analysis, **especially suitable for marks with discrete y channels (such as scatter plots, word clouds, images, etc.)**.

---

## Use Cases

- **Scatter plot grouping and sorting**: Sort scatter plots with y-axis as grouping field by a measure value.
- **Word cloud/image distribution sorting**: Sort word clouds, images, and other marks with y-axis as categories.
- **Top N/Bottom N filtering**: Combined with `slice` configuration, display only the top N or bottom N data items to focus on key points.
- **Combination with other transforms**: Often used in combination with transforms like `dodgeY`, `diffX`, etc., to achieve more complex data layouts and visual effects.

---

## Configuration Options

| Property | Description                                                    | Type                         | Default |
| -------- | -------------------------------------------------------------- | ---------------------------- | ------- |
| by       | Specify the sorting channel (e.g., 'x', 'color', 'size', etc.) | `string`                     | `'y'`   |
| reverse  | Whether to reverse the order                                   | `boolean`                    | `false` |
| slice    | Select a slice range (e.g., first N items, interval)           | `number \| [number, number]` |         |
| reducer  | Grouping aggregation method for multi-value comparison         | `Reducer`                    | `'max'` |

### by

Specifies the channel for sorting criteria, commonly used like `'x'` (sort by x values), `'color'` (sort by color grouping), `'size'` (sort by point size), etc.

### reverse

Whether to reverse the order. `true` means reverse the sorting result, `false` means keep the default order. The actual sorting direction is also related to the `reducer` aggregation method (e.g., when `reducer: 'max'`, reverse: true is descending; when `reducer: 'min'`, reverse: true is ascending).

### slice

Used to extract part of the sorted data. Can be a number (first N items) or an interval `[start, end]`.

### reducer

When the sorting criterion is an array or grouping, specifies the aggregation method. Supports `'max'`, `'min'`, `'sum'`, `'mean'`, `'median'`, `'first'`, `'last'`, and can also be a custom function.

```ts
type Reducer =
  | 'max'
  | 'min'
  | 'sum'
  | 'first'
  | 'last'
  | 'mean'
  | 'median'
  | ((I: number[], V: Primitive[]) => Primitive);
```

---

## Examples

### 1. Scatter plot y-axis grouping and sorting

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: [
    { city: 'Beijing', year: '2020', value: 30 },
    { city: 'Shanghai', year: '2020', value: 50 },
    { city: 'Guangzhou', year: '2020', value: 20 },
    { city: 'Shenzhen', year: '2020', value: 40 },
    { city: 'Beijing', year: '2021', value: 35 },
    { city: 'Shanghai', year: '2021', value: 55 },
    { city: 'Guangzhou', year: '2021', value: 25 },
    { city: 'Shenzhen', year: '2021', value: 45 },
  ],
  encode: { x: 'year', y: 'city', color: 'city', size: 'value' },
  transform: [{ type: 'sortY', by: 'size', reverse: true }],
});

chart.render();
```

### 2. Show only Top 2 groups (slice)

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: [
    { city: 'Beijing', year: '2020', value: 30 },
    { city: 'Shanghai', year: '2020', value: 50 },
    { city: 'Guangzhou', year: '2020', value: 20 },
    { city: 'Shenzhen', year: '2020', value: 40 },
    { city: 'Beijing', year: '2021', value: 35 },
    { city: 'Shanghai', year: '2021', value: 55 },
    { city: 'Guangzhou', year: '2021', value: 25 },
    { city: 'Shenzhen', year: '2021', value: 45 },
  ],
  encode: { x: 'year', y: 'city', color: 'city', size: 'value' },
  transform: [{ type: 'sortY', by: 'size', reverse: true, slice: 2 }],
});

chart.render();
```

---
