---
title: point
order: 2
---

## Overview

The `point` scale belongs to the **categorical scale** category and is a special case of the [band](/en/manual/core/scale/band) scale with a fixed `bandWidth` of 0. It is used to evenly distribute a set of discrete categories (such as strings, numbers, dates, etc.) across a specified continuous range.

### Use Cases

- Even distribution of discrete data (such as categorical axis, grouped point distribution, etc.)

- Scenarios where categorical data needs to be mapped to a continuous range

### Mapping Effect Diagram

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  height: 500,
  data: [
    1.2, 3.4, 3.7, 4.3, 5.2, 5.8, 6.1, 6.5, 6.8, 7.1, 7.3, 7.7, 8.3, 8.6, 8.8,
    9.1, 9.2, 9.4, 9.5, 9.7, 10.5, 10.7, 10.8, 11, 11, 11.1, 11.2, 11.3, 11.4,
    11.4, 11.7, 12, 12.9, 12.9, 13.3, 13.7, 13.8, 13.9, 14, 14.2, 14.5, 15,
    15.2, 15.6, 16, 16.3, 17.3, 17.5, 17.9, 18, 18, 20.6, 21, 23.4,
  ],
  encode: { x: (d) => d, y: 'count' },
  transform: [{ type: 'binX', y: 'count', thresholds: 10 }],
  scale: { x: { type: 'point' } },
  style: { columnWidthRatio: 1, inset: 0.5 },
});

chart.render();
```

## Configuration Options

| Property | Description                                                | Type                                                   | Default Value | Required |
| -------- | ---------------------------------------------------------- | ------------------------------------------------------ | ------------- | -------- |
| type     | Scale type, must be 'point'                                | `string`                                               | None          | ✓        |
| domain   | Domain array, collection of categories                     | `number[]` \| `string[]` \| `Date[]`                   | `[]`          |          |
| range    | Range, the continuous interval for mapping                 | `number[]` \| `string[]`                               | `[0, 1]`      |          |
| unknown  | Value returned when input is `undefined`, `NaN`, or `null` | `any`                                                  | `undefined`   |          |
| round    | Whether to round the output values                         | `boolean`                                              | `false`       |          |
| align    | Alignment, within the range [0, 1]                         | `number`                                               | `0.5`         |          |
| compare  | Sort the domain                                            | `(a: string \| number, b: string \| number) => number` | `undefined`   |          |

**Complex Type Descriptions:**

- `domain`: An array of categories, which can be strings, numbers, or dates.
- `range`: The continuous interval for mapping, typically `[0, 1]` or pixel intervals.
- `compare`: Custom sorting function that determines the order of the domain.

**Note:** The point scale is a band scale with a constant bandWidth of 0. The following properties are internally fixed:

```js
padding: 0.5, // internally assigned
paddingInner: 1, // cannot be modified
paddingOuter: 0.5 // internally assigned
```

If you want to customize the `paddingOuter` value, you can modify it through the `padding` property. For example:

```js
(scale: {
  x: {
    type: 'point',
    padding: 0, // only affects paddingOuter, paddingInner is always 1
  },
});
```

```plan
|<------------------------------------------- range ------------------------------------------->|
|             |                                 |                                 |             |
|<--step*PO-->|<--------------step------------->|<--------------step------------->|<--step*PO-->|
|             |                                 |                                 |             |
|             A                                 B                                 C             |
|-----------------------------------------------------------------------------------------------|

```

## Examples

### Scatter Plot

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height', y: 'weight', color: 'gender' },
  scale: { x: { type: 'point' } },
});

chart.render();
```

### Cell Chart

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'cell',
  height: 640,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
  },
  encode: { x: 'x', y: 'y', color: 'index' },
  scale: { x: { type: 'point' } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```
