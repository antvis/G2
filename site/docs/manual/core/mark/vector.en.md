---
title: vector
order: 26
---

## Overview

Vector graphics map data into `arrow` styles for visualization display, by controlling the position, size, color, angle and other information of arrows to visualize vector field data. It has the following visual channels:

- `x`: Horizontal position, corresponding to x-axis scale
- `y`: Vertical position, corresponding to y-axis scale, position anchor is positioned at the center of the arrow
- `color`: Color of the arrow
- `size`: Length of the arrow
- `rotate`: Rotation angle of the arrow, starting angle is `right` in Cartesian coordinate system, rotation direction is `clockwise`

Vector graphic marks map data into vector data through the above channels: `[start, end]`.

<img alt="vector" src="https://gw.alipayobjects.com/zos/antfincdn/c9nPWlX5Au/vector.png" width="300" />

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'vector',
  data: [
    { longitude: 3.375, latitude: 45.625, u: -1.3287959, v: -2.6778967 },
    { longitude: 3.625, latitude: 45.625, u: -1.012322, v: -2.8640392 },
    { longitude: 3.875, latitude: 45.625, u: -0.7947747, v: -3.0722558 },
    { longitude: 4.125, latitude: 45.625, u: -0.70024896, v: -3.311115 },
    { longitude: 4.375, latitude: 45.625, u: -0.62092346, v: -3.5720115 },
    { longitude: 4.625, latitude: 45.625, u: -0.54210645, v: -3.798527 },
    { longitude: 4.875, latitude: 45.625, u: -0.531152, v: -3.6907976 },
    { longitude: 5.125, latitude: 45.625, u: -0.58284736, v: -3.2739944 },
    { longitude: 5.375, latitude: 45.625, u: -0.6388908, v: -2.8400586 },
    { longitude: 5.625, latitude: 45.625, u: -0.68683237, v: -2.4499083 },
    { longitude: 5.875, latitude: 45.625, u: -0.6949226, v: -2.2482452 },
    { longitude: 6.125, latitude: 45.625, u: -0.67617714, v: -2.189318 },
    { longitude: 6.375, latitude: 45.625, u: -0.6690367, v: -2.1100578 },
    { longitude: 6.625, latitude: 45.625, u: -0.6749189, v: -2.0985062 },
    { longitude: 6.875, latitude: 45.625, u: -0.61023676, v: -2.067676 },
    { longitude: 7.125, latitude: 45.625, u: -0.46769565, v: -1.9350243 },
    { longitude: 7.375, latitude: 45.625, u: -0.31841764, v: -1.7978805 },
    { longitude: 7.625, latitude: 45.625, u: -0.296789, v: -1.6545589 },
    { longitude: 7.875, latitude: 45.625, u: -0.49164182, v: -1.6660733 },
    { longitude: 8.125, latitude: 45.625, u: -0.7730643, v: -1.8458021 },
    { longitude: 8.375, latitude: 45.625, u: -1.0214152, v: -2.0177982 },
    { longitude: 8.625, latitude: 45.625, u: -1.131555, v: -2.0604942 },
    { longitude: 8.875, latitude: 45.625, u: -1.143751, v: -1.9134171 },
    { longitude: 9.125, latitude: 45.625, u: -1.1628431, v: -1.6859006 },
    { longitude: 9.375, latitude: 45.625, u: -1.1996219, v: -1.4945693 },
    { longitude: 9.625, latitude: 45.625, u: -1.2651129, v: -1.385864 },
    { longitude: 9.875, latitude: 45.625, u: -1.340052, v: -1.3189282 },
  ],
  encode: {
    x: 'longitude',
    y: 'latitude',
    rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
    size: 30,
    color: ({ u, v }) => Math.hypot(v, u),
  },
  scales: {
    size: { range: [6, 20] },
    color: { type: 'sequential', palette: 'viridis' },
  },
  axis: {
    x: { grid: false },
    y: { grid: false },
  },
  style: {
    arrowSize: 10,
  },
  legend: false,
});

chart.render();
```

## Configuration

| Property | Description                                                                                                                                                            | Type              | Default | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure the visual channels of the `vector` mark, including `x`, `y`, `rotate`, `size`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the graphic style of the `vector` mark                                                                                                                       | [style](#style)   | -       |          |

### encode

| Property | Description                                                                                                                                                                                                                                                | Type                             | Default | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------- | -------- |
| x        | Bind the `x` property channel of the `vector` mark, binding the horizontal position corresponding to the x-axis scale                                                                                                                                      | [encode](/en/manual/core/encode) | -       | ✓        |
| y        | Bind the `y` property channel of the `vector` mark, binding the vertical position corresponding to the y-axis scale, position anchor is positioned at the center of the arrow                                                                              | [encode](/en/manual/core/encode) | -       | ✓        |
| size     | Bind the `size` property channel of the `vector` mark, changing the size of the graphic mark, the `size` visual channel is mapped to the length of the arrow                                                                                               | [encode](/en/manual/core/encode) | -       | ✓        |
| rotate   | Bind the `rotate` property channel of the `vector` mark, used to map data fields to the rotation angle of the arrow                                                                                                                                        | [encode](/en/manual/core/encode) | -       | ✓        |
| color    | Bind the `color` property channel of the `vector` mark. If a data field is mapped to the color channel, the data will be grouped, with different colors corresponding to different groups. The `color` visual channel is mapped to the color of the arrow. | [encode](/en/manual/core/encode) | -       |          |

### style

| Property      | Description                                                                                                                                                                         | Type                                              | Default   | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- | -------- |
| arrowSize     | Size of the arrow icon, can specify pixel values or relative values of arrow length                                                                                                 | `string` \| `number`                              | '40%'     |          |
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

## Examples

- How to specify the length of arrow icons?

There are two ways to specify the length of arrow icons. One is by filling in pixel values, such as `4`, to specify a fixed length; the other is by specifying a percentage, such as `30%`, to specify the relative length with reference to the arrow length. The default value is `40%`. Example as follows:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'vector',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
  },
  encode: {
    x: 'longitude',
    y: 'latitude',
    rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
    size: ({ u, v }) => Math.hypot(v, u),
    color: ({ u, v }) => Math.hypot(v, u),
  },
  scales: {
    size: { range: [6, 20] },
    color: { type: 'sequential', palette: 'viridis' },
  },
  axis: {
    x: { grid: false },
    y: { grid: false },
  },
  style: {
    arrowSize: 4,
    // arrowSize: '30%',
  },
  legend: false,
});

chart.render();
```

For more examples, you can visit the [Chart Examples](/en/examples#general-vector) page.
