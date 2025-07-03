---
title: stackY
order: 2
---

## Overview

The stackY function is a utility function for implementing stacked chart data processing, primarily used for stacked bar charts, stacked area charts, and similar scenarios. Its core purpose is to perform stacking calculations on data by accumulating values of multiple subcategories within each category along the Y-axis, creating a comparison between the whole and its parts.

## Use Cases

The stackY function calculates the start and end positions of each data point on the Y-axis based on specified grouping fields and Y-axis fields, generating new data fields (typically y0 and y1) to ensure proper rendering of stacking effects in charts. Additionally, the stacking order is crucial for chart readability and information communication, so the stackY function provides various options to control stacking order and grouping methods.

- Input: Raw data array, typically containing categorical fields (such as x-axis categories) and numeric fields (such as y-axis values), along with grouping fields (such as series fields).
- Output: Processed data array with new fields representing stacking ranges (such as y0 for stack start value and y1 for stack end value).

stackY is commonly used for the following chart types:

- Stacked bar charts
- Stacked area charts
- Other visualization forms requiring data stacking

**Before using `stackY` transform**: Data will overlap without clear comparison between categories.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    format: 'csv',
    transform: [{ type: 'filter', callback: (d) => d.year === 2000 }],
  },
  encode: { x: 'age', y: 'people', color: 'sex' },
  transform: [{ type: 'groupX', y: 'sum' }],
  // Note: stackY transform is not used here
  scale: { color: { type: 'ordinal', range: ['#ca8861', '#675193'] } },
  style: { fillOpacity: 0.7 },
  axis: { y: { labelFormatter: '~s' } },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```

**After using `stackY` transform**: Through `stackY` transform, different categories are displayed in stacked manner, allowing you to see both totals and category comparisons.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    format: 'csv',
    transform: [{ type: 'filter', callback: (d) => d.year === 2000 }],
  },
  encode: { x: 'age', y: 'people', color: 'sex' },
  transform: [{ type: 'groupX', y: 'sum' }, { type: 'stackY' }], // Apply stackY transform to achieve stacking effect
  scale: { color: { type: 'ordinal', range: ['#ca8861', '#675193'] } },
  style: { fillOpacity: 0.7 },
  axis: { y: { labelFormatter: '~s' } },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```

## Configuration Options

| Property | Description                       | Type                 | Default |
| -------- | --------------------------------- | -------------------- | ------- |
| groupBy  | Specifies the grouping channel    | `string \| string[]` | `x`     |
| orderBy  | Specifies the data for sorting    | `TransformOrder`     | null    |
| y        | Y channel data source selection   | `'y'\|'y1'`          | `y`     |
| y1       | Y1 channel data source selection  | `'y'\|'y1'`          | `y1`    |
| reverse  | Whether to reverse the order      | `boolean`            | false   |
| series   | Whether there is a grouping field | `boolean`            | true    |

### groupBy

When `stackY` is executed, data needs to be grouped, and the `stackY` calculation logic is executed within each group. For example, for area charts, y data under the same x value needs to be grouped, and then min/max processing logic is performed within the group, so `stackY` is set to the `x` channel.

Theoretically, `stackY` can be set to all channel values. For details, refer to the [encode](/en/manual/core/encode) documentation. All enumeration values are as follows:

```ts
export type ChannelTypes =
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

### orderBy

`orderBy` is used to specify the stacking order, which can be a string array or a function. The function parameter is a data object, and the return value is a numeric value used for sorting.

```ts
type Primitive = number | string | boolean | Date;

type TransformOrder =
  | 'value'
  | 'sum'
  | 'series'
  | 'maxIndex'
  | string[]
  | null
  | ((data: Record<string, Primitive>) => Primitive);
```

## Examples

### Stacked Bar Chart

Next, let's look at a relatively complex data presentation scenario. For example, data comes from a CSV file, and we need to sort and group the data:

```js
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [{ type: 'stackY' }, { type: 'sortX', by: 'y', reverse: true }],
  axis: { y: { labelFormatter: '~s' } },
});

chart.render();
```

The implemented effect is as follows:

<img alt="stackY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GwDUQbVt9XYAAAAAAAAAAAAADmJ7AQ/original" width="600" />

In this example, we used `fetch` to retrieve data and sorted and grouped the data. Through the `stackY` method, we can easily implement data stacking effects.

### Normalized Stacked Area Chart

Next, let's look at a relatively complex scenario - the normalized stacked area chart is a type of data visualization chart that is a variant of the stacked area chart.

It is used to show trends of multiple categories of data changing over time or other continuous variables, while emphasizing the relative proportions of each category in the total, rather than absolute values. For example, if we need a normalized stacked area chart, we can achieve the following effect. You can refer to the corresponding example code, and for details, check our online [chart examples](https://g2.antv.antgroup.com/en/examples/general/area/#percentage-area):

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  },
  encode: { x: (d) => new Date(d.date), y: 'unemployed', color: 'industry' },
  transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
  tooltip: { items: [{ channel: 'y0', valueFormatter: '.3f' }] },
});

chart.render();
```

### Appearance Order Stacked Area Chart

The Appearance Order Stacked Area Chart is a special variant of stacked area charts. Its core characteristic is that the stacking order is based on the "appearance order" or first occurrence time of each category in the data, rather than fixed category order or numeric size.

This type of chart is typically used to show the cumulative effect when categories are gradually introduced or appear over time, emphasizing dynamic changes in the time dimension and the contribution of newly added categories.

We can achieve this effect using the `stackY` transform function. For example, if we need to implement the following effect:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QIP_RbjWYS4AAAAAAAAAAAAAemJ7AQ/original" width="600" />

The corresponding code is:

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json',
  },
  interaction: { tooltip: { filter: (d) => parseInt(d.value) > 0 } },
  children: [
    {
      type: 'area',
      encode: {
        x: (d) => new Date(d.year),
        y: 'revenue',
        series: 'format',
        color: 'group',
        shape: 'smooth',
      },
      transform: [{ type: 'stackY', orderBy: 'maxIndex', reverse: true }],
      axis: { y: { labelFormatter: '~s' } },
      tooltip: { items: [{ channel: 'y', valueFormatter: '.2f' }] },
    },
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.year),
        y: 'revenue',
        series: 'format',
        shape: 'smooth',
        color: 'group',
      },
      transform: [
        { type: 'stackY', orderBy: 'maxIndex', reverse: true, y: 'y1' },
      ],
      style: { stroke: 'white' },
      tooltip: false,
    },
  ],
});

chart.render();
```

For detailed examples, refer to our online [chart examples](https://g2.antv.antgroup.com/en/examples/general/area/#cascade-area), and there are other stacking chart examples available online for reference. Finally, here's a simple stacked bar chart as the most intuitive demonstration of calling this function:

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { category: 'A', value: 10, type: 'X' },
    { category: 'A', value: 20, type: 'Y' },
    { category: 'B', value: 15, type: 'X' },
    { category: 'B', value: 25, type: 'Y' },
  ],
  encode: { x: 'category', y: 'value', color: 'type' },
  transform: [{ type: 'stackY' }],
});

chart.render();
```

In the chart, X and Y values are stacked together under the same category, forming an overall height.

- Category A's X and Y are stacked (total height = 10 + 20 = 30).
- Category B's X and Y are stacked (total height = 15 + 25 = 40).
