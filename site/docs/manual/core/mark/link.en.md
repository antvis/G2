---
title: link
order: 15
---

## Overview

The `link` mark is similar to a line chart but specifies `x` and `y` channels as field arrays of length 2. It obtains corresponding positioning points (x, y) by pairing them and connects the corresponding positioning points to draw directional line segments (with arrows).

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'link',
  height: 260,
  autoFit: true,
  data: [
    { x1: 10, y1: 10, x2: 20, y2: 20, type: '1' },
    { x1: 21, y1: 12, x2: 11, y2: 22, type: '1' },
    { x1: 20, y1: 21, x2: 10, y2: 11, type: '2' },
    { x1: 11, y1: 23, x2: 21, y2: 13, type: '2' },
  ],
  encode: { x: ['x1', 'x2'], y: ['y1', 'y2'], color: 'type' }, // The link mark requires x, x1, y, y1 channels to define a line or vector between two points
  style: { arrow: true, arrowSize: 6 }, // arrow is the arrow switch, arrows can usually represent direction, which is the difference between link and line marks.
  legend: false,
});

chart.render();
```

For more examples, please check the [Chart Examples - Link](/en/examples#general-link) page.

## Options

| Property | Description                                                                                                                                                          | Type              | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure the visual channels of the `link` mark, including `x`, `y`, `color`, `shape`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the graphic style of the `link` mark                                                                                                                       | [style](#style)   | -       |          |

### encode

Configure the visual channels of the `area` mark.

| Property | Description                                                                                                                                                                                                                                                     | Type                             | Default | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------- | -------- |
| x        | Bind the `x` property channel of the `link` mark, can be a single string representing the `x` channel, or directly through an array for both `x` and `x1` channels                                                                                              | [encode](/en/manual/core/encode) | -       | ✓        |
| x1       | Bind the `x1` property channel of the `link` mark, representing the `x` value of the ending direction point.                                                                                                                                                    | [encode](/en/manual/core/encode) | -       | ✓        |
| y        | Bind the `y` property channel of the `link` mark, can be a single string representing the `y` channel, or directly through an array for both `y` and `y1` channels                                                                                              | [encode](/en/manual/core/encode) | -       | ✓        |
| y1       | Bind the `y1` property channel of the `link` mark, representing the `y` value of the ending direction point.                                                                                                                                                    | [encode](/en/manual/core/encode) | -       | ✓        |
| color    | Bind the `color` property channel of the `link` mark. If a data field is mapped to the color channel, the data will be grouped and split into multiple areas with different colors, which can be used to divide areas or present the values of the current area | [encode](/en/manual/core/encode) | -       |          |
| shape    | Bind the `shape` property channel of the `link` mark                                                                                                                                                                                                            | [encode](/en/manual/core/encode) | `link`  |          |

#### x & y & x1 & y1

The `link` mark's visual channels require values for the four fields `x`, `y`, `x1`, `y1`. The supported data formats are as follows:

- Direct configuration of `x`, `y`

```ts
{
  type: 'link',
  data: [
    { x: 10, y: 10, x1: 20, y1: 20 },
  ],
  encode: { x: ['x','x1'], y: ['y','y1'] }
}
```

- Separate configuration of `x`, `y`, `x1`, `y1`

```ts
{
  type: 'link',
  data: [
    { x: 10, y: 10, x1: 20, y1: 20 },
  ],
  encode: { x: 'x', y: 'y', x1:'x1',y1:'y1' }
}
```

#### color

The `color` visual channel affects the `link` mark. A single area in the `link` mark can only use one color (or gradient color), but if a data field is mapped to the color channel, the data will be grouped and split into multiple areas:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'link',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
  },
  encode: {
    x: ['POP_1980', 'POP_2015'],
    y: ['R90_10_1980', 'R90_10_2015'],
    color: (d) => d.R90_10_2015 - d.R90_10_1980, // color is a numerical mapping, changing color based on the mapped value. Currently represents length, different lengths will display colors in gradient
  },
  scale: { x: { type: 'log' } },
  style: { arrow: true, arrowSize: 6 },
  axis: { x: { labelFormatter: '~s', labelTransform: 'rotate(90)' } },
  legend: false,
  tooltip: { title: { channel: 'color', valueFormatter: '.1f' } },
});

chart.render();
```

#### shape

The built-in shapes supported by the `link` mark are as follows:

| Shape  | Description             | Example                                                                                                          |
| ------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| link   | Connection line\|vector | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tTHNQaV0JaAAAAAAAAAAAAAAemJ7AQ/original"></img> |
| arc    | Arc line                | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3ya9SI9qVTQAAAAAAAAAAAAAemJ7AQ/original"></img> |
| smooth | Bezier curve            | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*etcgSbaVmlAAAAAAAAAAAAAAemJ7AQ/original"></img> |
| vhv    | Right-angle polyline    | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*X1oJSaTeNv8AAAAAAAAAAAAAemJ7AQ/original"></img> |

### style

| Property      | Description                                                                                                                                                                                                                                                                                               | Type                                                | Default   | Required |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------- | -------- |
| arrow         | Control whether to show arrows. Essentially a line segment, not a graphic, inherits all properties of straight lines.                                                                                                                                                                                     | _boolean_                                           | `false`   |          |
| arrowSize     | The size of the arrow icon, can specify pixel values or relative values of arrow length. This property is for arrow length, width is configured by 'lineWidth'                                                                                                                                            | _string_ \| _number_                                | `40%`     |          |
| stroke        | The color of the graphic                                                                                                                                                                                                                                                                                  | _string_ \| _Function\<string\>_                    | -         |          |
| strokeOpacity | Graphic transparency                                                                                                                                                                                                                                                                                      | _number_ \| _Function\<number\>_                    | -         |          |
| lineWidth     | The width of the graphic                                                                                                                                                                                                                                                                                  | _number_ \| _Function\<number\>_                    | -         |          |
| lineDash      | Dashed line configuration for stroke, the first value is the length of each dash segment, the second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke. Since arrows also inherit line style configuration, it's best not to configure this style when using arrows | _[number,number]_ \| _Function\<[number, number]\>_ | -         |          |
| opacity       | Overall transparency of the graphic                                                                                                                                                                                                                                                                       | _number_ \| _Function\<number\>_                    | -         |          |
| shadowColor   | Graphic shadow color                                                                                                                                                                                                                                                                                      | _string_ \| _Function\<string\>_                    | -         |          |
| shadowBlur    | Gaussian blur coefficient of the graphic shadow                                                                                                                                                                                                                                                           | _number_ \| _Function\<number\>_                    | -         |          |
| shadowOffsetX | Set the horizontal distance of the shadow from the graphic                                                                                                                                                                                                                                                | _number_ \| _Function\<number\>_                    | -         |          |
| shadowOffsetY | Set the vertical distance of the shadow from the graphic                                                                                                                                                                                                                                                  | _number_ \| _Function\<number\>_                    | -         |          |
| cursor        | Mouse style. Same as CSS mouse style, default 'default'.                                                                                                                                                                                                                                                  | _string_ \| _Function\<string\>_                    | `default` |          |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'link',
  height: 260,
  autoFit: true,
  data: [{ x1: 10, y1: 10, x2: 20, y2: 20 }],
  encode: { x: ['x1', 'x2'], y: ['y1', 'y2'] },
  style: {
    arrow: true,
    arrowSize: 6, // arrow length
    lineWidth: 8, // line width
    stroke: '#1f1aa1', // color
    opacity: 0.7,
  },
  legend: false,
});

chart.render();
```

## Examples

- How to specify the length of arrow icons?

There are two ways to specify the length of arrow icons: one is by entering pixel values, such as `40`, to specify a fixed length; the other is by specifying a percentage, such as `30%`, to specify a relative length based on the arrow length reference. The default value is `40%`. Example as follows:

```ts
chart
  .link()
  // ...
  .style({
    arrowSize: 40,
    // arrowSize: '30%',
  });
```
