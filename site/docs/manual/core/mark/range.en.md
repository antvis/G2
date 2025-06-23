---
title: range
order: 20
---

## Overview

`range` is a tool used to define a rectangular area. The position and size of this rectangle can be determined by two sets of numbers: one for the horizontal direction (x1, x2) and another for the vertical direction (y1, y2). It is commonly used for drawing auxiliary background areas or marking certain regions.

- Horizontal direction (x1, x2):

  - `x1`: Where the rectangle starts in the horizontal direction.
  - `x2`: Where the rectangle ends in the horizontal direction.

- Vertical direction (y1, y2):

  - `y1`: Where the rectangle starts in the vertical direction.
  - `y2`: Where the rectangle ends in the vertical direction.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/0b37279d-1674-42b4-b285-29683747ad9a.json',
  },
  children: [
    { type: 'lineX', data: [0] },
    { type: 'lineY', data: [0] },
    {
      type: 'range',
      // Area chart data
      data: [
        { x: [-25, 0], y: [-30, 0], region: '1' },
        { x: [-25, 0], y: [0, 20], region: '2' },
        { x: [0, 5], y: [-30, 0], region: '2' },
        { x: [0, 5], y: [0, 20], region: '1' },
      ],
      // Encoding rules, x and y correspond to fields in data, color corresponds to region field
      encode: { x: 'x', y: 'y', color: 'region' },
      scale: {
        color: {
          range: ['#d8d0c0', '#a3dda1'],
          independent: true,
          guide: null,
        },
      },

      style: {
        fillOpacity: 0.2,
      },
    },
    {
      type: 'point',
      encode: {
        x: 'change in female rate',
        y: 'change in male rate',
        size: 'pop',
        color: 'continent',
        shape: 'point',
      },
      scale: {
        color: {
          range: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
        },
        x: { domain: [-25, 5] },
        y: { domain: [-30, 20] },
        size: { range: [4, 30] },
      },
      style: { stroke: '#bbb', fillOpacity: 0.8 },
      axis: { x: { title: false }, y: { title: false } },
    },
  ],
});

chart.render();
```

## Configuration

| Property | Description                                                                                                                                                           | Type              | Default | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure the visual channels of the `range` mark, including `x`, `y`, `color`, `shape`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the graphic style of the `range` mark                                                                                                                       | [style](#style)   | -       |          |

### encode

Configure the visual channels of the `range` mark.

| Property | Description                                                                                     | Type     | Default | Required |
| -------- | ----------------------------------------------------------------------------------------------- | -------- | ------- | -------- |
| x        | Bind the `x` property channel of the `range` mark, usually a time or ordinal field from `data`  | `string` | -       | ✓        |
| y        | Bind the `y` property channel of the `range` mark, usually a numeric or array field from `data` | `string` | -       | ✓        |

For more `encode` configurations, you can check the [Encode](/en/manual/core/encode) introduction page.

### style

Configure the style of the `range` mark.

| Property      | Description                                                                                                                                                                         | Type                                              | Default   | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- | -------- |
| fill          | Fill color of the graphic                                                                                                                                                           | `string` \| `Function<string>`                    | -         |          |
| fillOpacity   | Fill opacity of the graphic                                                                                                                                                         | `number` \| `Function<number>`                    | -         |          |
| stroke        | Stroke of the graphic                                                                                                                                                               | `string` \| `Function<string>`                    | -         |          |
| strokeOpacity | Stroke opacity                                                                                                                                                                      | `number` \| `Function<number>`                    | -         |          |
| lineWidth     | Width of the graphic stroke                                                                                                                                                         | `number` \| `Function<number>`                    | -         |          |
| lineDash      | Dashed stroke configuration. The first value is the length of each dash segment, the second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke | `[number,number]` \| `Function<[number, number]>` | -         |          |
| opacity       | Overall opacity of the graphic                                                                                                                                                      | `number` \| `Function<number>`                    | -         |          |
| shadowColor   | Shadow color of the graphic                                                                                                                                                         | `string` \| `Function<string>`                    | -         |          |
| shadowBlur    | Gaussian blur coefficient of the graphic shadow                                                                                                                                     | `number` \| `Function<number>`                    | -         |          |
| shadowOffsetX | Horizontal distance of the shadow from the graphic                                                                                                                                  | `number` \| `Function<number>`                    | -         |          |
| shadowOffsetY | Vertical distance of the shadow from the graphic                                                                                                                                    | `number` \| `Function<number>`                    | -         |          |
| cursor        | Mouse cursor style. Same as CSS cursor style, default 'default'                                                                                                                     | `string` \| `Function<string>`                    | 'default' |          |

For more `style` configurations, you can check the [Style](/en/manual/core/style) introduction page.

## Examples

For more examples, you can visit the [Chart Examples - Data Annotation](/en/examples#annotation-range) page.
