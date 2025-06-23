---
title: groupColor
order: 2
---

Groups discrete color channels and aggregates channels according to specified Reducers. Equivalent to [group](/en/manual/core/transform/group) with `channels = ['color']`.

`groupColor` is a variant of the `group` function family, specifically designed for grouping discrete `color` channels and aggregating channels according to specified Reducers. It is equivalent to [group](/en/manual/core/transform/group) with `channels = ['color']`. The usage and configuration options are the same as the group function. Below, we'll explain the use cases and configuration options specific to the `groupColor` function.

## Options

| Property  | Description                                                  | Type      | Default |
| --------- | ------------------------------------------------------------ | --------- | ------- |
| [channel] | Aggregation method for channel data output to specific marks | `Reducer` |         |

For detailed information about `Reducer`, please refer to the configuration options of the [group](/en/manual/core/transform/group) function.

## Example

In the following example, we retrieve the `species` and `sex` fields from the `penguins.json` dataset, group by the `species` field, and perform count aggregation on the `sex` field. Finally, we map the `species` field to the `color` channel. Note that the corresponding mark has transform methods available for data transformation.

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  height: 120,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: { color: 'sex' },
  transform: [
    { type: 'groupColor', y: 'count' },
    { type: 'stackY' },
    { type: 'normalizeY' },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  axis: { y: { labelFormatter: '.0%' } },
  labels: [{ text: 'sex', position: 'inside' }],
});

chart.render();
```

Explanation:

1. The `y` property of the `groupColor` function specifies count aggregation on the `sex` field;
2. The `stackY` function stacks the `y` channel;
3. The `normalizeY` function normalizes the `y` channel;
4. The `transpose` function transposes the coordinate system;
5. Finally, labels are added to the chart through the `labels` function.
