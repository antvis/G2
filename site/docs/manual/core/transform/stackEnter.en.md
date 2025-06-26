---
title: stackEnter
order: 2
---

## Overview

stackEnter is an animation effect for stacked graphic elements, primarily used for entrance animations in stacked charts. Its core functionality is to present the layered and cumulative relationships of data in a more intuitive and visually appealing way through dynamic transitions.

Through `stackEnter`, AntV makes the initial rendering of stacked charts more expressive, enhancing the clarity of data presentation and user experience.

## Use Cases

### Stack Animation

- `stackEnter` renders each data layer sequentially in stacking order (from bottom to top), creating a progressive layering animation effect.
- For example: In a stacked bar chart, each category's bar starts from the baseline, first drawing the bottom data layer, then progressively stacking other layers upward until forming a complete stacked bar.

### Visual Guidance

- Highlights the "accumulation process" of stacking through animation, helping users understand each layer's contribution to the total.
- Suitable for showing the relationship between parts and the whole (such as the proportion of different categories across various dimensions).

### Smooth Transition

- Animation is usually accompanied by easing effects, making transitions more natural and avoiding abrupt data changes.

### Specific Examples

- Stacked bar/column charts: Each bar grows upward in segments.
- Stacked area charts: Area regions expand layer by layer from the baseline.
- Other stacked charts: Such as stacked forms in rose charts and radar charts.

## Configuration Options

| Property | Description                          | Type                             | Default Value       |
| -------- | ------------------------------------ | -------------------------------- | ------------------- |
| groupBy  | Select a grouping channel            | `string \| string[]`             | `x`                 |
| reducer  | Grouping value method                | `(I: number[], V: any[]) => any` | `(I, V) => V[I[0]]` |
| orderBy  | Sorting channel                      | `string`                         | null                |
| reverse  | Whether to reverse order             | `boolean`                        | true                |
| duration | Animation duration (in milliseconds) | `number`                         | 3000                |

### groupBy

When `stackEnter` executes, data needs to be grouped, and `stackEnter` calculation logic is performed within each group. For example, for area charts, y data under the same x value needs to be grouped, then min-max processing logic is applied within the group, so `stackEnter` is set to the `x` channel.

Theoretically, `stackEnter` can be set to all channel values. For details, refer to the [encode](/en/manual/core/encode) documentation. All enumerated values are as follows:

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

### reducer

The reducer is a function used to process data after grouping. It receives two parameters:

- `I`: Array of data indices, representing the index positions of each group's data in the original dataset
- `V`: Array of original data values, containing all data items

By default, the reducer returns the first element value of each group: `(I, V) => V[I[0]]`, but you can customize this function to implement specific data processing logic, such as summing or averaging, to give charts a clearer organization. Here are simple examples for reference:

```ts
// Use custom reducer to calculate the sum of each group's data
chart.options({
  // ...
  transform: [
    {
      type: 'stackEnter',
      groupBy: 'x',
      reducer: (indices, values) => {
        // Calculate the sum of all values in the current group
        return indices.reduce((sum, index) => sum + values[index].value, 0);
      },
    },
  ],
});

// Use custom reducer to calculate the average of each group's data
chart.options({
  // ...
  transform: [
    {
      type: 'stackEnter',
      groupBy: 'x',
      reducer: (indices, values) => {
        const sum = indices.reduce(
          (acc, index) => acc + values[index].value,
          0,
        );
        return sum / indices.length; // Return average value
      },
    },
  ],
});
```

## Example

The following is a simple example code demonstrating how to use `stackEnter` and its visual effects.

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: [
    { type: 'Apple', year: '2001', value: 260 },
    { type: 'Orange', year: '2001', value: 100 },
    { type: 'Banana', year: '2001', value: 90 },
    { type: 'Apple', year: '2002', value: 210 },
    { type: 'Orange', year: '2002', value: 150 },
    { type: 'Banana', year: '2002', value: 30 },
  ],
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    series: 'type',
    enterDuration: 1000,
  },
  transform: [{ type: 'stackEnter', groupBy: 'x' }],
});

chart.render();
```

Finally, the following effect is presented (dynamic effect):

<img alt="stackEnter" src="https://gw.alipayobjects.com/zos/raptor/1668659773138/stackenter.gif" width="600" />
