---
title: facetRect
order: 2
---

Use row and column field values to divide space and data, visualizing data segments in each subspace.

## Getting Started

<img alt="facetRect" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*duq8TrR0LxcAAAAAAAAAAAAADmJ7AQ" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 928,
  height: 270,
  paddingBottom: 50,
});

chart.options({
  type: 'facetRect',
  paddingBottom: 50,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  },
  encode: { x: 'series' },
  children: [
    {
      type: 'point',
      encode: { x: 'x', y: 'y' },
      style: { stroke: '#000' },
      inset: 10,
    },
  ],
});

chart.render();
```

## Stacked Bar Chart Facet

The following example demonstrates how to use stacked bar charts in facetRect and add a legend to distinguish different data series.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'facetRect',
  margin: 60,
  data: [
    { region: 'East', quarter: 'Q1', category: 'Furniture', sales: 120 },
    { region: 'East', quarter: 'Q1', category: 'Office Supplies', sales: 80 },
    { region: 'East', quarter: 'Q1', category: 'Technology', sales: 150 },
    { region: 'East', quarter: 'Q2', category: 'Furniture', sales: 150 },
    { region: 'East', quarter: 'Q2', category: 'Office Supplies', sales: 90 },
    { region: 'East', quarter: 'Q2', category: 'Technology', sales: 180 },
    { region: 'South', quarter: 'Q1', category: 'Furniture', sales: 100 },
    { region: 'South', quarter: 'Q1', category: 'Office Supplies', sales: 70 },
    { region: 'South', quarter: 'Q1', category: 'Technology', sales: 130 },
    { region: 'South', quarter: 'Q2', category: 'Furniture', sales: 130 },
    { region: 'South', quarter: 'Q2', category: 'Office Supplies', sales: 85 },
    { region: 'South', quarter: 'Q2', category: 'Technology', sales: 160 },
    { region: 'North', quarter: 'Q1', category: 'Furniture', sales: 110 },
    { region: 'North', quarter: 'Q1', category: 'Office Supplies', sales: 75 },
    { region: 'North', quarter: 'Q1', category: 'Technology', sales: 140 },
    { region: 'North', quarter: 'Q2', category: 'Furniture', sales: 140 },
    { region: 'North', quarter: 'Q2', category: 'Office Supplies', sales: 95 },
    { region: 'North', quarter: 'Q2', category: 'Technology', sales: 170 },
  ],
  encode: { x: 'region' },
  children: [
    {
      type: 'interval',
      encode: { x: 'quarter', y: 'sales', color: 'category' },
      transform: [{ type: 'stackY' }],
      legend: {
        color: { position: 'top', layout: { justifyContent: 'center' } },
      },
    },
  ],
});

chart.render();
```

For more examples, visit the [Chart Examples](/en/examples) page.

## Options

The underlying implementation of facetRect is consistent with mark, so many configuration options are the same.

| Property      | Description                                                              | Type     | Default |
| ------------- | ------------------------------------------------------------------------ | -------- | ------- |
| data          | Refer to [data](/en/manual/core/data/overview) for related information   | `Data`   |         |
| encode        | Channel settings, see table below                                        |          |         |
| padding       | Padding size                                                             | `number` | 0       |
| paddingLeft   |                                                                          | `number` | 0       |
| paddingRight  |                                                                          | `number` | 0       |
| paddingTop    |                                                                          | `number` | 0       |
| paddingBottom |                                                                          | `number` | 0       |
| margin        | Margin                                                                   | `number` | 0       |
| marginLeft    |                                                                          | `number` | 0       |
| marginRight   |                                                                          | `number` | 0       |
| marginTop     |                                                                          | `number` | 0       |
| marginBottom  |                                                                          | `number` | 0       |
| title         | Refer to [title](/en/manual/component/title) for related information     |          |         |
| scale         | Refer to [scale](/en/manual/core/scale/overview) for related information |          |         |

All configurations corresponding to `facetRect` can be set using the API, for example:

```ts
chart.options({ type: 'facetRect', data: [1, 2, 3], encode: { x: 'type' } });
```

### encode

For facetRect, there are unique encode channels.

| Channel | Description                                                                                   | Type                               | Default |
| ------- | --------------------------------------------------------------------------------------------- | ---------------------------------- | ------- |
| x       | Specify the field for x-direction faceting, can be constant, field name, or callback function | `string` \| `(d, idx, arr) => any` |         |
| y       | Specify the field for y-direction faceting, can be constant, field name, or callback function | `string` \| `(d, idx, arr) => any` |         |

## FAQ

- Is facetRect functionally redundant with repeatMatrix?

facetRect divides space through x, y encode fields. For example, specifying `encode('x', 'sex')` will divide the x direction into 2 facets based on the enumerated values of gender. While repeatMatrix divides space based on the number of fields.
