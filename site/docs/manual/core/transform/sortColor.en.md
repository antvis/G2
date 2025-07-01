---
title: sortColor
order: 2
---

## Overview

`sortColor` is a commonly used data transform provided by G2, used for sorting the domain of discrete color channels. By specifying sorting criteria, you can arrange color groups in a chart by certain measure values (such as y, x, etc.) in ascending or descending order, making it more intuitive to display the size relationships or distribution trends of grouped data.  
`sortColor` supports flexible configurations for sorting channels, aggregation methods, and slicing. It's commonly used in scenarios like highlighting key points, optimizing readability, and comparative analysis, especially suitable for grouped bar charts, grouped column charts, stacked charts, and more.

---

## Use Cases

- **Grouped Bar/Column Chart Sorting**: Arrange color groups (such as different categories or series) by values from high to low (or low to high) for easy comparison of data across groups.
- **Facet/Multi-series Sorting**: In facet or multi-series scenarios, sort by certain metrics within groups to highlight differences between groups.
- **Combined with Other Transforms**: Often used in combination with other transforms like `sortX`, `dodgeX`, etc., to achieve more complex data layouts and visual effects.

---

## Configuration Options

| Property | Description                                            | Type      | Default |
| -------- | ------------------------------------------------------ | --------- | ------- |
| by       | Specify the channel for sorting (e.g., 'y', 'x', etc.) | `string`  | `'y'`   |
| reverse  | Whether to reverse the order                           | `boolean` | `false` |
| reducer  | Aggregation method for multi-value comparison          | `Reducer` | `'max'` |

### by

Specifies the channel used as the sorting criterion, commonly used values include `'y'` (sort by y values), `'x'` (sort by x values), etc.  
For available channels, see [G2 Visual Channel Documentation](/en/manual/core/encode).

### reverse

Whether to reverse the sort order. `true` means reverse the sorting result, `false` means maintain the default order. The actual sorting direction is also related to the `reducer` aggregation method (e.g., when `reducer: 'max'`, reverse: true means descending order; when `reducer: 'min'`, reverse: true means ascending order).

### reducer

When the sorting criterion is an array or grouping, specifies the aggregation method. Supports `'max'`, `'min'`, `'sum'`, `'mean'`, `'median'`, `'first'`, `'last'`, and also allows custom functions.

```ts
type Primitive = number | string | boolean | Date;

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

### 1. Grouped Bar Chart Sorting Color Groups by y Values (reverse Controls Order)

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { Category: 'A', Year: '2022', Value: 30 },
    { Category: 'A', Year: '2023', Value: 50 },
    { Category: 'B', Year: '2022', Value: 20 },
    { Category: 'B', Year: '2023', Value: 40 },
    { Category: 'C', Year: '2022', Value: 35 },
    { Category: 'C', Year: '2023', Value: 25 },
  ],
  encode: { x: 'Category', y: 'Value', color: 'Year' },
  transform: [
    { type: 'sortColor', by: 'y', reverse: true },
    { type: 'dodgeX' },
  ],
});

chart.render();
```

### 2. Complex Sorting with reducer Configuration

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { Category: 'A', Year: '2022', Value: 30 },
    { Category: 'A', Year: '2023', Value: 50 },
    { Category: 'B', Year: '2022', Value: 20 },
    { Category: 'B', Year: '2023', Value: 40 },
    { Category: 'C', Year: '2022', Value: 35 },
    { Category: 'C', Year: '2023', Value: 25 },
  ],
  encode: { x: 'Category', y: 'Value', color: 'Year' },
  transform: [
    { type: 'sortColor', by: 'y', reducer: 'min' }, // Sort by minimum value
    { type: 'dodgeX' },
  ],
});

chart.render();
```
