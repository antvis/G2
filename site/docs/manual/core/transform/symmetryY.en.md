---
title: symmetryY
order: 2
---

## Overview

Group by specified channel and add offset to the y and y1 channels of each group to achieve symmetry effect.

## Use Cases

SymmetryY (Y-axis symmetry) is typically used to emphasize or highlight data symmetry, comparison, or mirror relationships. Here are common application scenarios with chart types and practical examples:

| **Scenario**                           | **Chart Type**          | **Description**                                                                                                                             | **Example**                               |
| -------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Compare Two Groups**                 | Bar Chart, Column Chart | Two groups of data displayed on both sides of the Y-axis, intuitively showing comparison differences (e.g., A/B test results).              | Male vs Female Income Distribution        |
| **Mirror Relationship Analysis**       | Line Chart, Area Chart  | Data symmetrically distributed around the Y-axis, showing positive and negative correlations (e.g., profit vs loss, import/export balance). | Company Monthly Profit vs Loss Comparison |
| **Symmetry Distribution Verification** | Box Plot, Violin Plot   | Check if data follows symmetric distribution (e.g., normal distribution test).                                                              | Height/Weight Symmetry Analysis           |
| **Bidirectional Deviation Display**    | Error Bar Chart         | Display both positive and negative deviations simultaneously (e.g., difference between predicted and actual values).                        | Weather Forecast Error Range              |

### Summary of Uses

1. **Comparative Analysis**: Quickly identify differences or similarities between two groups of data.
2. **Symmetry Verification**: Test whether data follows symmetric distribution (e.g., normality).
3. **Bidirectional Expression**: Display both positive and negative trends simultaneously (e.g., profit/loss, errors).
4. **Natural Law Visualization**: Reveal symmetric phenomena in nature or science (e.g., physics, biology).

## Configuration

| Property | Description                                                                                | Type                 | Default |
| -------- | ------------------------------------------------------------------------------------------ | -------------------- | ------- |
| groupBy  | Specify grouping channel, can be a single channel name or multiple channels (string array) | `string \| string[]` | `x`     |

### groupBy

When `symmetryY` is executed, the data needs to be grouped, and the calculation logic of `symmetryY` is executed in each group. For example, for area charts, y data under the same x value needs to be grouped, and then the maximum and minimum value processing logic is applied within the group, so `groupBy` is set to the `x` channel.

Theoretically, `groupBy` can be set to all channel values. For details, please refer to the [encode](/en/manual/core/encode) documentation. All enumeration values are as follows:

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

Here is a simple example code. Please note the `.transform({ type: 'symmetryY' })` transformation and compare the corresponding output:

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          date: new Date(d.date),
        }),
      },
    ],
  },
  encode: { x: 'date', y: 'unemployed', color: 'industry' },
  transform: [{ type: 'stackY' }, { type: 'symmetryY' }],
});

chart.render();
```

The above code will render the corresponding chart:

<img alt="symmetryY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Vf-FQZH-5FMAAAAAAAAAAAAADmJ7AQ/original" width="600" />

Similarly, how to draw a symmetric bar chart? Use this transform as well, as follows:

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  width: 800,
  height: 300,
  data: [
    { x: 'A', y: 100 },
    { x: 'B', y: 200 },
    { x: 'C', y: 300 },
    { x: 'D', y: 250 },
  ],
  encode: { x: 'x', y: 'y', color: 'x' },
  transform: [{ type: 'stackY' }, { type: 'symmetryY' }],
  scale: { x: { padding: 0.5 } },
  coordinate: { transform: [{ type: 'transpose' }] },
  legend: false,
});

chart.render();
```

Please note the final `.transform({ type: 'symmetryY' })` transformation function.

### Funnel Chart

SymmetryY has another important application scenario in [funnel charts](https://g2.antv.antgroup.com/en/examples/general/funnel/#funnel) ([comparison funnel charts](https://g2.antv.antgroup.com/en/examples/general/funnel/#mirror-funnel), [conversion funnel charts](https://g2.antv.antgroup.com/en/examples/general/funnel/#funnel-annotation)), and [pyramid charts](https://g2.antv.antgroup.com/en/examples/general/funnel/#pyramid), which are used to show data conversion and result presentation. For example, a typical funnel chart is shown as follows:

<img alt="symmetryY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-mJbR6QvImkAAAAAAAAAAAAAemJ7AQ/fmt.webp" width="600" />

The corresponding example code is:

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { action: 'Browse Website', pv: 50000 },
    { action: 'Add to Cart', pv: 35000 },
    { action: 'Generate Order', pv: 25000 },
    { action: 'Pay Order', pv: 15000 },
    { action: 'Complete Transaction', pv: 8000 },
  ],
  encode: { x: 'action', y: 'pv', color: 'action', shape: 'funnel' },
  transform: [{ type: 'symmetryY' }],
  scale: { x: { padding: 0 } },
  coordinate: { transform: [{ type: 'transpose' }] },
  animate: { enter: { type: 'fadeIn' } },
  axis: false,
  labels: [
    {
      text: (d) => `${d.action}\
${d.pv}`,
      position: 'inside',
      transform: [{ type: 'contrastReverse' }],
    },
  ],
});

chart.render();
```

For more specific cases, please refer to the chart example page links provided above.
