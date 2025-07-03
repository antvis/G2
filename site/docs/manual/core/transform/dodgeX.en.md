---
title: dodgeX
order: 2
---

## Overview

`dodgeX` is a grouping layout transform that enables chart elements to be grouped and displayed by series through generating and applying `series` channel values. The `dodgeX` transform works primarily through the following steps:

1. Group data by grouping conditions (defaults to the `x` channel)
2. Generate `series` channel values using the values from the `color` channel
3. Adjust the coordinate positions of different series within the same group according to order and spacing, forming a side-by-side structure

## Use Cases

The `dodgeX` transform is primarily used for scenarios where data within the same group needs to be arranged side by side by series on the coordinate system, to highlight data differences and distribution characteristics between different series.

For example, the following case shows the population distribution of different age groups across US states.

**Before using the `dodgeX` transform**: Data will be stacked together, making it difficult to clearly see comparisons between age groups.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  axis: { y: { labelFormatter: '~s' } },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    // Note: No dodgeX transform is used here
  ],
});

chart.render();
```

**After using the `dodgeX` transform**: Through the `dodgeX` transform, data from different age groups are displayed side by side within each state, making it easy to visually compare them.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  axis: { y: { labelFormatter: '~s' } },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' }, // Apply dodgeX transform to achieve side-by-side grouping effect
  ],
});

chart.render();
```

## Configuration Options

| Property | Description                                        | Type               | Default Value | Required |
| -------- | -------------------------------------------------- | ------------------ | ------------- | -------- |
| groupBy  | Channel or channel combination for data grouping   | string \| string[] | `x`           |          |
| orderBy  | Sorting rule for elements within groups            | TransformOrder     | () => null    |          |
| reverse  | Whether to reverse the order of elements in groups | boolean            | false         |          |
| padding  | Spacing between elements within groups (0 ~ 1)     | number             | 0             |          |

### groupBy

`groupBy` is used to specify the channel or channel combination for data grouping. By default, it groups by the `x` channel, but it can also be specified as other channels or combinations of multiple channels.

### orderBy

`orderBy` is used to specify the sorting rule for elements within groups, supporting multiple sorting strategies:

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

### reverse

`reverse` is used to control whether to reverse the order of elements within groups. When set to true, elements within groups will be arranged in the opposite order to the default.

### padding

`padding` is used to control the spacing between elements within groups, with a value range from 0 to 1. The larger the value, the greater the spacing between elements; when the value is 0, there is no spacing between elements.

## Examples

The following examples demonstrate the functionality of various configuration options for the `dodgeX` transform. We can see the differences by comparing before and after the transformation:

**Before transformation**: Data from different departments will be stacked, making horizontal comparison difficult.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { Quarter: 'Q1', Department: 'Sales', Performance: 90, Year: '2024' },
  { Quarter: 'Q1', Department: 'Marketing', Performance: 80, Year: '2024' },
  { Quarter: 'Q1', Department: 'R&D', Performance: 70, Year: '2024' },
  { Quarter: 'Q2', Department: 'Sales', Performance: 90, Year: '2024' },
  { Quarter: 'Q2', Department: 'Marketing', Performance: 70, Year: '2024' },
  { Quarter: 'Q2', Department: 'R&D', Performance: 80, Year: '2024' },
  { Quarter: 'Q3', Department: 'Sales', Performance: 70, Year: '2024' },
  { Quarter: 'Q3', Department: 'Marketing', Performance: 80, Year: '2024' },
  { Quarter: 'Q3', Department: 'R&D', Performance: 90, Year: '2024' },
  { Quarter: 'Q4', Department: 'Sales', Performance: 80, Year: '2024' },
  { Quarter: 'Q4', Department: 'Marketing', Performance: 70, Year: '2024' },
  { Quarter: 'Q4', Department: 'R&D', Performance: 90, Year: '2024' },
];

chart.options({
  type: 'interval',
  autoFit: true,
  data,
  encode: {
    x: 'Quarter',
    y: 'Performance',
    color: 'Department',
  },
  // Note: No transform is used here
});

chart.render();
```

**After transformation**: The effect after applying the `dodgeX` transform, demonstrating the functionality of various configuration options:

- **groupBy**: Group and display department data by `x` channel (Quarter)
- **orderBy**: Set to `value` to sort elements within groups by performance value
- **reverse**: Set to true to arrange elements within groups from high to low performance values
- **padding**: Set spacing between elements within groups to 0.1

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { Quarter: 'Q1', Department: 'Sales', Performance: 90, Year: '2024' },
  { Quarter: 'Q1', Department: 'Marketing', Performance: 80, Year: '2024' },
  { Quarter: 'Q1', Department: 'R&D', Performance: 70, Year: '2024' },
  { Quarter: 'Q2', Department: 'Sales', Performance: 90, Year: '2024' },
  { Quarter: 'Q2', Department: 'Marketing', Performance: 70, Year: '2024' },
  { Quarter: 'Q2', Department: 'R&D', Performance: 80, Year: '2024' },
  { Quarter: 'Q3', Department: 'Sales', Performance: 70, Year: '2024' },
  { Quarter: 'Q3', Department: 'Marketing', Performance: 80, Year: '2024' },
  { Quarter: 'Q3', Department: 'R&D', Performance: 90, Year: '2024' },
  { Quarter: 'Q4', Department: 'Sales', Performance: 80, Year: '2024' },
  { Quarter: 'Q4', Department: 'Marketing', Performance: 70, Year: '2024' },
  { Quarter: 'Q4', Department: 'R&D', Performance: 90, Year: '2024' },
];

chart.options({
  type: 'interval',
  autoFit: true,
  data,
  encode: {
    x: 'Quarter',
    y: 'Performance',
    color: 'Department',
  },
  transform: [
    {
      type: 'dodgeX', // Apply dodgeX transform
      groupBy: 'x',
      orderBy: 'value',
      reverse: true,
      padding: 0.1,
    },
  ],
});

chart.render();
```
