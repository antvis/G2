---
title: repeatMatrix
order: 2
---

Divides space according to the number of fields, then visualizes data in these subspaces.

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

For more examples, please visit the [Chart Examples](/examples) page.

## Options

The underlying implementation of repeatMatrix is consistent with marks, so many configurations are the same.

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

All configurations for `repeatMatrix` can be set using the API, for example:

```ts
chart.repeatMatrix().data([1, 2, 3]).encode('x', ['f1', 'f2', 'f3']);
```

### encode

RepeatMatrix has its own unique encode channels.

| Channel | Description                                               | Type       | Default |
| ------- | --------------------------------------------------------- | ---------- | ------- |
| x       | Specify field list in x direction for spatial partitioning | `string[]` |         |
| y       | Specify field list in y direction for spatial partitioning | `string[]` |         |
