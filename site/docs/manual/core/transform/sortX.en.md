---
title: sortX
order: 2
---

## Overview

`sortX` is a common data transform provided by G2, used for sorting the domain of **discrete x-axis**. By specifying sorting criteria, you can arrange the chart's x-axis in ascending or descending order according to certain metrics (such as y, color, size, etc.), making it more intuitive to display data size relationships or distribution trends.  
`sortX` supports flexible sorting channels, aggregation methods, slicing configurations, and is commonly used for highlighting key points, optimizing readability, and comparative analysis. **It is especially suitable for marks with discrete x channels (such as interval, rect, point, etc.)**.

---

## Use Cases

- **Bar/Column Chart Sorting**: Arrange bars from high to low (or low to high) by values for easier data comparison.
- **Group/Facet Sorting**: In grouped or faceted scenarios, sort by certain metrics within groups to highlight differences between groups.
- **Top N/Bottom N Filtering**: Combined with `slice` configuration, display only the top N or bottom N items to focus on key points.
- **Use with Other Transforms**: Often used in combination with other transforms like `dodgeX`, `diffY`, etc., to achieve more complex data layouts and visual effects.

---

## Configuration Options

| Property | Description                                                                 | Type                         | Default |
| -------- | --------------------------------------------------------------------------- | ---------------------------- | ------- |
| by       | Specify the sorting channel (e.g., 'y', 'color', 'size', etc.)              | `string`                     | `'y'`   |
| reverse  | Whether to reverse the order                                                | `boolean`                    | `false` |
| slice    | Select a slice range (e.g., top N items, interval)                          | `number \| [number, number]` |         |
| reducer  | Aggregation method for grouped comparisons                                  | `Reducer`                    | `'max'` |
| ordinal  | Whether to handle as categorical channel (set to false for continuous data) | `boolean`                    | `true`  |

### by

Specifies the channel to sort by, commonly used values include `'y'` (sort by y values), `'color'` (sort by color groups), `'size'` (sort by point size), etc.

### reverse

Whether to reverse the sort order. `true` means reverse the sorting result, `false` means keep the default order. The actual sorting direction also relates to the `reducer` aggregation method (e.g., when `reducer: 'max'`, reverse: true means descending; when `reducer: 'min'`, reverse: true means ascending).

### slice

Used to extract part of the sorted data. Can be a number (top N items) or an interval `[start, end]`.

### reducer

When the sorting criterion is an array or grouped, specifies the aggregation method. Supports `'max'`, `'min'`, `'sum'`, `'mean'`, `'median'`, `'first'`, `'last'`, or custom functions.

### ordinal

Whether to handle as categorical channel. Can be set to `false` if the sorting criterion is continuous data.

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

### 1. Bar Chart Sorted by y Values in Descending Order

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { Category: 'A', Value: 30 },
    { Category: 'B', Value: 50 },
    { Category: 'C', Value: 20 },
    { Category: 'D', Value: 40 },
  ],
  encode: { x: 'Category', y: 'Value' },
  transform: [{ type: 'sortX', by: 'y', reverse: true }],
});

chart.render();
```

### 2. Show Only Top 3 Items (slice)

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { Category: 'A', Value: 30 },
    { Category: 'B', Value: 50 },
    { Category: 'C', Value: 20 },
    { Category: 'D', Value: 40 },
  ],
  encode: { x: 'Category', y: 'Value' },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 3 }],
});

chart.render();
```

### 3. Used with dodgeX, Sorting After Grouping

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { State: 'A', Age: 'Youth', Population: 30 },
    { State: 'A', Age: 'Middle-aged', Population: 40 },
    { State: 'A', Age: 'Elderly', Population: 20 },
    { State: 'B', Age: 'Youth', Population: 50 },
    { State: 'B', Age: 'Middle-aged', Population: 60 },
    { State: 'B', Age: 'Elderly', Population: 30 },
  ],
  encode: { x: 'State', y: 'Population', color: 'Age' },
  transform: [{ type: 'sortX', by: 'y', reverse: true }, { type: 'dodgeX' }],
});

chart.render();
```

### 4. Complex Sorting with Reducer Configuration

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { Category: 'A', Value: 30 },
    { Category: 'B', Value: 50 },
    { Category: 'C', Value: 20 },
    { Category: 'D', Value: 40 },
  ],
  encode: { x: 'Category', y: 'Value' },
  transform: [
    { type: 'sortX', by: 'y', reducer: 'min' }, // Sort by minimum value
  ],
});

chart.render();
```
