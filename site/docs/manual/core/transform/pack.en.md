---
title: pack
order: 2
---

## Overview

`pack` is a grid layout transform that allows graphical elements to be compactly arranged in a container space according to a row-column structure. The `pack` transform works through the following main steps:

1. Calculate the optimal arrangement grid (number of rows and columns) based on the container's aspect ratio and number of elements
2. Arrange elements in the grid according to the specified direction (row-first or column-first)
3. Apply scaling and translation transforms to each element to fit the grid cells while maintaining appropriate spacing

## Use Cases

The `pack` transform is primarily used for Unit Visualization, effectively solving layout problems for large numbers of discrete elements. Common use cases include:

- Displaying large numbers of discrete elements in limited space: such as scatter plots with dense data points that need to avoid overlap
- Distribution display of categorical data: visualizations that highlight quantity differences between categories, such as demographic analysis

For example, the following case shows the distribution of Titanic passengers by cabin class and survival status. Through the `pack` transform, each passenger point is arranged in an orderly manner, clearly showing the quantity distribution of each category.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'facetRect',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic.json',
    transform: [
      { type: 'sortBy', fields: ['survived'] },
      {
        type: 'map',
        callback: ({ survived, ...d }) => ({
          ...d,
          survived: survived + '',
        }),
      },
    ],
  },
  encode: { x: 'pclass' },
  children: [
    {
      type: 'point',
      encode: { color: 'survived', shape: 'point', size: 3 },
      transform: [{ type: 'pack' }],
      legend: {
        color: { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') },
      },
      tooltip: { title: '', items: ['pclass', 'survived'] },
    },
  ],
});

chart.render();
```

For more examples, you can check the [Unit Visualization](/en/examples/unit/unit#basic) page.

## Configuration Options

| Property  | Description                             | Type           | Default | Required |
| --------- | --------------------------------------- | -------------- | ------- | -------- |
| padding   | Spacing between each element, in pixels | number         | 0       |          |
| direction | Stacking direction of elements          | `row` \| `col` | `col`   |          |

### padding

`padding` controls the spacing between each element, measured in pixels. Increasing the `padding` value creates more visible separation between elements. When the value is 0, elements are arranged closely together.

### direction

`direction` determines the stacking direction of elements in the grid:

- `col`: Column (vertical) stacking
- `row`: Row (horizontal) stacking

By adjusting `direction`, you can change the layout direction of data points in the chart to suit different reading preferences and data characteristics.

## Examples

The following case shows the distribution of Titanic passengers by gender and survival status. By configuring the `padding` and `direction` parameters of the `pack` transform, the results are more intuitive.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'facetRect',
  autoFit: true,
  shareData: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic.json',
    transform: [
      { type: 'sortBy', fields: ['survived'] },
      {
        type: 'map',
        callback: ({ survived, ...d }) => ({
          ...d,
          survived: survived + '',
        }),
      },
    ],
  },
  encode: { x: 'sex' },
  children: [
    {
      type: 'point',
      encode: { color: 'survived', shape: 'point', size: 3 },
      transform: [{ type: 'pack', padding: 5, direction: 'row' }],
      legend: {
        color: { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') },
      },
      tooltip: { title: '', items: ['sex', 'survived'] },
    },
  ],
});

chart.render();
```
