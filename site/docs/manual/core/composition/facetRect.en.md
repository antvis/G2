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

const facetRect = chart
  .facetRect()
  .attr('paddingBottom', 50)
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  })
  .encode('x', 'series');

facetRect
  .point()
  .encode('x', 'x')
  .encode('y', 'y')
  .style('stroke', '#000')
  .attr('inset', 10);

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
chart.facetRect().data([1, 2, 3]).encode('x', 'type');
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
