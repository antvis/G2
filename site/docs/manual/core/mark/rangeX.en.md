---
title: rangeX
order: 21
---

## Overview

Uses a set of `x` values (x1, x2) to position a rectangular area drawn on the x-axis, commonly used for highlighting specific areas.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_falkensee.html
 */

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  width: 600,
  height: 360,
  paddingLeft: 60,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/year-population.json',
  },
  children: [
    {
      type: 'rangeX',
      data: [
        { year: [new Date('1933'), new Date('1945')], event: 'Nazi Rule' },
        {
          year: [new Date('1948'), new Date('1989')],
          event: 'GDR (East Germany)',
        },
      ],
      encode: { x: 'year', color: 'event' },
      scale: { color: { independent: true, range: ['#FAAD14', '#30BF78'] } },
      style: { fillOpacity: 0.75 },
    },
    {
      type: 'line',
      encode: { x: (d) => new Date(d.year), y: 'population', color: '#333' },
    },
    {
      type: 'point',
      encode: { x: (d) => new Date(d.year), y: 'population', color: '#333' },
      style: { lineWidth: 1.5 },
    },
  ],
});

chart.render();
```

Additionally, rangeX provides a simplified syntax:

```ts
chart
  .rangeX()
  .data([[new Date('2010'), new Date('2011')]])
  .encode('x', (d) => d);

// it can be simplified as follows:
chart.rangeX().data([new Date('2010'), new Date('2011')]);
```

## Configuration

| Property | Description                                                                                                                                                            | Type              | Default | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure the visual channels of the `rangeX` mark, including `x`, `y`, `color`, `shape`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the graphic style of the `rangeX` mark                                                                                                                       | [style](#style)   | -       |          |

### encode

Configure the visual channels of the `rangeX` mark.

| Property | Description                                                                                     | Type     | Default | Required |
| -------- | ----------------------------------------------------------------------------------------------- | -------- | ------- | -------- |
| x        | Bind the `x` property channel of the `rangeX` mark, usually a time or ordinal field from `data` | `string` | -       | ✓        |

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
