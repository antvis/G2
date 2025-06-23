---
title: rangeY
order: 22
---

## Overview

Uses a set of `y` values (y1, y2) to position a rectangular area drawn on the y-axis, commonly used for highlighting specific areas.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  width: 600,
  height: 470,
  type: 'view',
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
      },
      encode: { x: 'height', y: 'weight', color: 'gender' },
    },
    { type: 'rangeY', data: [{ y: [54, 72] }], encode: { y: 'y' } },
  ],
});

chart.render();
```

Additionally, rangeY provides a simplified syntax:

```ts
chart
  .rangeY()
  .data([
    [54, 60],
    [65, 72],
  ])
  .encode('y', (d) => d);

// it can be simplified as follows:
chart.rangeY().data([
  [54, 60],
  [65, 72],
]);
```

## Configuration

| Property | Description                                                                                                                                                            | Type              | Default | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure the visual channels of the `rangeY` mark, including `x`, `y`, `color`, `shape`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the graphic style of the `rangeY` mark                                                                                                                       | [style](#style)   | -       |          |

### encode

Configure the visual channels of the `rangeY` mark.

| Property | Description                                                                                     | Type     | Default | Required |
| -------- | ----------------------------------------------------------------------------------------------- | -------- | ------- | -------- |
| y        | Bind the `y` property channel of the `rangeY` mark, usually a time or ordinal field from `data` | `string` | -       | ✓        |

For more `encode` configurations, you can check the [Encode](/en/manual/core/encode) introduction page.

### style

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
