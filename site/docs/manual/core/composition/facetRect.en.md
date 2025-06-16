---
title: facetRect
order: 2
---

Uses row and column field dimension values to partition space and data, visualizing data segments in each subspace.

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

For more examples, please visit the [Chart Examples](/examples) page.

## Options

The underlying implementation of facetRect is consistent with marks, so many configurations are the same.

| Property      | Description                                       | Type     | Default |
| ------------- | ------------------------------------------------- | -------- | ------- |
| data          | See [data](/manual/core/data/overview) documentation | `Data`   |         |
| encode        | Channel settings, see table below                |          |         |
| padding       | Padding size                                      | `number` | 0       |
| paddingLeft   |                                                   | `number` | 0       |
| paddingRight  |                                                   | `number` | 0       |
| paddingTop    |                                                   | `number` | 0       |
| paddingBottom |                                                   | `number` | 0       |
| margin        | Margin                                            | `number` | 0       |
| marginLeft    |                                                   | `number` | 0       |
| marginRight   |                                                   | `number` | 0       |
| marginTop     |                                                   | `number` | 0       |
| marginBottom  |                                                   | `number` | 0       |
| title         | See [title](/manual/component/title) documentation |          |         |
| scale         | See [scale](/manual/core/scale/overview) documentation |          |         |

All configurations for `facetRect` can be set using the API, for example:

```ts
chart.facetRect().data([1, 2, 3]).encode('x', 'type');
```

### encode

FacetRect has its own unique encode channels.

| Channel | Description                                                    | Type                               | Default |
| ------- | -------------------------------------------------------------- | ---------------------------------- | ------- |
| x       | Specify faceting field in x direction, can be constant, field name, or callback function | `string` \| `(d, idx, arr) => any` |         |
| y       | Specify faceting field in y direction, can be constant, field name, or callback function | `string` \| `(d, idx, arr) => any` |         |

## FAQ

- Is facetRect functionally redundant with repeatMatrix?

FacetRect partitions space through x, y encode fields. For example, specifying `encode('x', 'sex')` will divide space into 2 facets in the x direction based on the enumerated values of gender. RepeatMatrix, on the other hand, partitions space based on the number of fields.
