---
title: facetCircle
order: 2
---

Partition data by fields, use circular space division, then visualize data for each facet.

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

For more examples, visit the [Chart Examples](/en/examples) page.

## Options

The underlying implementation of facetCircle is consistent with mark, so many configuration options are the same.

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

All configurations corresponding to `facetCircle` can be set using the API, for example:

```ts
chart.facetCircle().data([1, 2, 3]).encode('position', 'month');
```

### encode

For facetCircle, there are unique encode channels.

| Channel  | Description                                                   | Type                               | Default |
| -------- | ------------------------------------------------------------- | ---------------------------------- | ------- |
| position | Divide the angular space in the circle based on position data | `string` \| `(d, idx, arr) => any` |         |
