---
title: diffY
order: 2
---

## Overview

`diffY` is a special channel transformation that primarily operates on the y1 in encode.y. For area charts, which have both y and y1 channels representing the upper and lower boundaries of the area shape respectively, `diffY` processes the y1 of each area shape as follows:

1. Calculate the maximum value y1max of y1 corresponding to each x
2. For each shape's y, compare it with y1max. If y1max > y, remove this data; otherwise, set y1 = y1max

Commonly used for marks with y1 such as area charts and bar charts. Visually, the final effect displays only the overlapping areas of two bars or area shapes, hence the name `diffY`.

## Usage Scenarios

`diffY` is primarily designed for area charts to highlight the maximum values in comparison scenarios, and is less commonly used with other marks.

For example, the following case shows the weather trend comparison between `New York` and `San Francisco`. Using `diffY` highlights which city has higher temperature at the same time x.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperature-compare.json',
  },
  children: [
    {
      type: 'area',
      data: {
        transform: [
          // Fold the two cities into two fields: city + temperature.
          {
            type: 'fold',
            fields: ['New York', 'San Francisco'],
            key: 'city',
            value: 'temperature',
          },
        ],
      },
      encode: {
        x: (d) => new Date(d.date),
        y: 'temperature',
        color: 'city',
        shape: 'hvh',
      },
      transform: [{ type: 'diffY' }], // Perform difference calculation on grouped y values here.
      style: { opacity: 0.5 },
    },
    {
      type: 'line',
      encode: { x: (d) => new Date(d.date), y: 'San Francisco', shape: 'hvh' },
      style: { stroke: '#000' },
    },
  ],
});

chart.render();
```

## Configuration Options

| Property | Description                    | Type                               | Default Value |
| -------- | ------------------------------ | ---------------------------------- | ------------- |
| groupBy  | Which channel to group data by | `ChannelTypes` \| `ChannelTypes[]` | `x`           |

### groupBy

When `diffY` executes, it needs to group the data and perform the `diffY` calculation logic within each group. For area charts, y data under the same x value needs to be grouped together, then the max-min processing logic is applied within the group, so `groupBy` is set to the `x` channel.

Theoretically, `groupBy` can be set to any channel value. For details, refer to the [encode](/en/manual/core/encode) documentation. All enumerated values are as follows:

```ts
export type ChannelTypes =
  | 'x'
  | 'y'
  | 'z'
  | 'x1'
  | 'y1'
  | 'series'
  | 'color'
  | 'opacity'
  | 'shape'
  | 'size'
  | 'key'
  | 'groupKey'
  | 'position'
  | 'series'
  | 'enterType'
  | 'enterEasing'
  | 'enterDuration'
  | 'enterDelay'
  | 'updateType'
  | 'updateEasing'
  | 'updateDuration'
  | 'updateDelay'
  | 'exitType'
  | 'exitEasing'
  | 'exitDuration'
  | 'exitDelay'
  | `position${number}`;
```

## Examples

See the `Usage Scenarios` section above.
