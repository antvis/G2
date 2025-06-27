---
title: repeatMatrix
order: 2
---

Divide space according to the number of fields, then use data to visualize in these subspaces.

## Getting Started

<img alt="repeatMatrix" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*MhTMTrLKT5UAAAAAAAAAAAAADmJ7AQ" width="260" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 300,
  height: 720,
  paddingLeft: 50,
  paddingBottom: 60,
});

const repeatMatrix = chart
  .repeatMatrix()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/weather.json',
    transform: [
      {
        type: 'map',
        callback: ({ date, ...d }) => ({
          ...d,
          date: new Date(date).getMonth() + '',
        }),
      },
    ],
  })
  .encode('y', ['temp_max', 'precipitation', 'wind'])
  .encode('x', 'date');

repeatMatrix
  .line()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('color', 'location')
  .scale('y', { zero: true });

chart.render();
```

For more examples, visit the [Chart Examples](/en/examples) page.

## Options

The underlying implementation of repeatMatrix is consistent with mark, so many configuration options are the same.

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

All configurations corresponding to `repeatMatrix` can be set using the API, for example:

```ts
chart.repeatMatrix().data([1, 2, 3]).encode('x', ['f1', 'f2', 'f3']);
```

### encode

For repeatMatrix, there are unique encode channels.

| Channel | Description                                                    | Type       | Default |
| ------- | -------------------------------------------------------------- | ---------- | ------- |
| x       | Specify the field list in the x direction for x-axis splitting | `string[]` |         |
| y       | Specify the field list in the y direction for y-axis splitting | `string[]` |         |
