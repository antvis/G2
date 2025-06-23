---
title: group
order: 2
---

## Overview

The `group` function is an important tool for data processing, used to perform grouping operations on data, grouping discrete x and continuous y channels, and aggregating channels according to specified Reducers.
It can group datasets by specified fields or conditions, so that subsequent chart rendering or data analysis can be processed based on the grouped results.

At the same time, the `group` function supports custom grouping logic, allowing users to flexibly group data according to business needs, usually used in combination with `data` or `transform` methods. The `group` is a series of functions, which includes preset similar functions such as [groupX](/en/manual/core/transform/group-x), [groupY](/en/manual/core/transform/group-y), [groupColor](/en/manual/core/transform/group-color), etc., mainly for user convenience. Their functionality and usage are basically the same, but they are packaged for different channels, and you can refer to their usage respectively.

## Use Cases

The `group` function is suitable for the following scenarios:

### Data Aggregation

When you need to group data by a certain dimension (such as time, category) and calculate summary values (such as sum, average).

### Categorical Display

When you need to group data by a certain field in a chart to draw grouped bar charts, stacked charts, etc.

### Data Structure Adjustment

Adjusting the structure of raw data to suit specific chart types (such as converting from flat data to nested data).

### Multi-dimensional Analysis

In multi-dimensional data analysis, grouping data by multiple fields for further analysis or visualization.

## Configuration

| Property  | Description                                                  | Type                   | Default      |
| --------- | ------------------------------------------------------------ | ---------------------- | ------------ |
| channels  | Which channels to perform data grouping and aggregation on   | `string` \| `string[]` | `['x', 'y']` |
| [channel] | Aggregation method for channel data output to specific marks | `Reducer`              |              |

### Channel

Channel represents how data is mapped to visual attributes of graphics (such as position, color, size, etc.). In AntV, channel is the foundation for building visualization charts. By binding data fields to specific visual channels, corresponding graphic representations are generated. Theoretically, `channel` can be set to all channel values. For details, please refer to the [encode](/en/manual/core/encode) documentation.

All enumeration values are as follows:

```ts
type Channel =
  | 'x'
  | 'y'
  | 'z'
  | 'x1'
  | 'y1'
  | 'series'
  | 'color'
  | 'opacity'
  | 'shape'
  | 'size'
  | 'key'
  | 'groupKey'
  | 'position'
  | 'series'
  | 'enterType'
  | 'enterEasing'
  | 'enterDuration'
  | 'enterDelay'
  | 'updateType'
  | 'updateEasing'
  | 'updateDuration'
  | 'updateDelay'
  | 'exitType'
  | 'exitEasing'
  | 'exitDuration'
  | 'exitDelay'
  | `position${number}`;
```

#### Common Types

Based on the above enumeration, we list the following channel types for reference. Commonly used ones include:

Position Channels:

- x: x-axis position, usually mapping horizontal coordinate data.
- y: y-axis position, usually mapping vertical coordinate data.

Geometric Channels:

- size: The size of graphics (such as point size, line thickness).
- shape: The shape of graphics (such as point shapes: circle, square).

Color Channels:

- color: The color of graphics, used to distinguish categories or represent value ranges.

We provide corresponding preset functions such as [groupX](/en/manual/core/transform/group-x), [groupY](/en/manual/core/transform/group-y), and [groupColor](/en/manual/core/transform/group-color) for calling.

### Reducer

The `channel` property of the `group` function can be a string or a function. A string represents the field name to be aggregated, while a function is used for custom aggregation logic. The function receives two parameters:

- `I`: An array representing the values to be aggregated
- `V`: An array representing the original data corresponding to the values to be aggregated (can be objects or other types) `type Primitive = number | string | boolean | Date;`

Preset `Reducer` can also be used directly, such as `mean`, `max`, `count`, etc. Here are some commonly used `Reducer`:

```ts
type Reducer =
  | 'mean'
  | 'max'
  | 'count'
  | 'min'
  | 'median'
  | 'sum'
  | 'first'
  | 'last'
  | ((I: number[], V: Primitive[]) => Primitive);
```

## Examples

### Basic Example

The following is a simple example showing how to use the `group` function to group data and draw a grouped bar chart.

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { year: '1951', sales: 38 },
    { year: '1952', sales: 52 },
    { year: '1956', sales: 61 },
    { year: '1957', sales: 145 },
    { year: '1958', sales: 48 },
    { year: '1959', sales: 38 },
    { year: '1960', sales: 38 },
    { year: '1962', sales: 38 },
    { year: '1951', sales: 38 },
    { year: '1952', sales: 52 },
    { year: '1956', sales: 61 },
    { year: '1957', sales: 145 },
    { year: '1958', sales: 48 },
    { year: '1959', sales: 38 },
    { year: '1960', sales: 38 },
    { year: '1962', sales: 38 },
  ],
  encode: { x: 'year', y: 'sales' },
  transform: [{ type: 'group', channels: ['x'], y: 'sum' }],
});

chart.render();
```

Example Explanation

- In this example, we first define a set of sales data `data`, including year and sales amount.
- In the above code, the `transform` method uses a `group` type data transformation to group data by the `x` channel.
- After grouping, the data will be aggregated according to the value of the `x` channel, calculating the sum of `sales` for each `year`.
- Finally, the grouped data is mapped to the `x` and `y` axis of the chart through the `encode` method for rendering.

### Advanced Example

`group` is not just for grouping data, but can also perform aggregation calculations on data. For example, we can perform operations such as sum and average on data.

Below we group according to specific data, using the `group` function to process data grouping and display different grouping results in the chart.
The following example shows how to use the `group` function to group data and take the maximum value (`max`), and display different grouping results in the chart.

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'cell',
  height: 300,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  encode: {
    x: (d) => new Date(d.date).getUTCDate(),
    y: (d) => new Date(d.date).getUTCMonth(),
    color: 'temp_max',
  },
  transform: [{ type: 'group', color: 'max' }],
  scale: { color: { type: 'sequential', palette: 'gnBu' } },
  style: { inset: 0.5 },
});

chart.render();
```
