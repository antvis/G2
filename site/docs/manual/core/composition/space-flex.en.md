---
title: spaceFlex
order: 2
---

Use a layout similar to CSS flex to divide spatial areas, commonly used for multi-chart comparison views.

## Getting Started

Provides a canvas with two-level flex container layout.

<img alt="spaceFlex" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*lLecQJkdPbIAAAAAAAAAAAAADmJ7AQ" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 900,
});

chart.options({
  type: 'spaceFlex',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  direction: 'col',
  ratio: [1, 2],
  children: [
    {
      type: 'interval',
      paddingBottom: 0,
      paddingRight: 300,
      transform: [{ type: 'groupX', y: 'max' }],
      axis: { x: false },
      encode: {
        x: (d) => new Date(d.date).getUTCDate(),
        y: 'temp_max',
        color: 'steelblue',
      },
    },
    {
      type: 'spaceFlex',
      ratio: [2, 1],
      children: [
        {
          type: 'cell',
          paddingRight: 0,
          paddingBottom: 50,
          transform: [{ type: 'group', color: 'max' }],
          encode: {
            x: (d) => new Date(d.date).getUTCDate(),
            y: (d) => new Date(d.date).getUTCMonth(),
            color: 'temp_max',
          },
          style: { inset: 0.5 },
          axis: { x: { title: 'Date' }, y: { title: 'Month' } },
          legend: { color: false },
          scale: {
            color: {
              type: 'sequential',
              palette: 'gnBu',
            },
          },
        },
        {
          type: 'interval',
          paddingBottom: 50,
          transform: [{ type: 'groupX', y: 'max' }],
          coordinate: { transform: [{ type: 'transpose' }] },
          axis: { x: false },
          encode: {
            x: (d) => new Date(d.date).getUTCMonth(),
            y: 'temp_max',
            color: 'steelblue',
          },
        },
      ],
    },
  ],
});

chart.render();
```

For more examples, visit the [Chart Examples](/en/examples) page.

## Options

Currently flex mainly provides the two most core configurations for convenient space partitioning.

| Property  | Description                                                                  | Type           | Default        |
| --------- | ---------------------------------------------------------------------------- | -------------- | -------------- |
| ratio     | Set the proportion of space occupied by child elements in the flex container | `number[]`     | Equal division |
| direction | Set the direction for flex space division                                    | `col` \| `row` | `row`          |
| data      | Data for the flex container                                                  | `Data`         |                |

All configurations corresponding to `spaceFlex` can be set using the API, for example:

```ts
chart.options({ type: 'spaceFlex', ratio: [1, 2, 3], direction: 'col' });
```

## FAQ

- How to use spaceFlex to define complex chart layouts?

spaceFlex provides proportional horizontal and vertical space division. For complex layouts, theoretically they can all be achieved by continuously splitting container hierarchy structures.
