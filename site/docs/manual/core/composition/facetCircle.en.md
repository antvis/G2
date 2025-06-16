---
title: facetCircle
order: 2
---

Partitions data according to fields, uses circular division of space, then performs data visualization for each facet.

## Getting Started

<img alt="facetCircle" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*Tsx5RJVrVtsAAAAAAAAAAAAADmJ7AQ" width="600" />

```ts
import { Chart } from '@antv/g2';

const M = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
];
const N = ['A', 'B', 'C', 'D'];
const data = M.flatMap((month) =>
  N.map((name) => ({
    month,
    name,
    value: Math.random(),
  })),
);

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 480,
});

const facetCircle = chart.facetCircle().data(data).encode('position', 'month');

facetCircle
  .interval()
  .encode('x', 'name')
  .encode('y', 'value')
  .encode('color', 'name');

chart.render();
```

For more examples, please visit the [Chart Examples](/examples) page.

## Options

The underlying implementation of facetCircle is consistent with marks, so many configurations are the same.

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

All configurations for `facetCircle` can be set using the API, for example:

```ts
chart.facetCircle().data([1, 2, 3]).encode('position', 'month');
```

### encode

FacetCircle has its own unique encode channels.

| Channel  | Description                                                       | Type                               | Default |
| -------- | ----------------------------------------------------------------- | ---------------------------------- | ------- |
| position | Divide angles in circular space according to the position data   | `string` \| `(d, idx, arr) => any` |         |
