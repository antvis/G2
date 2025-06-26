---
title: groupY
order: 2
---

`groupY` is a variant of the `group` function family, specifically designed for grouping discrete `y` channels and aggregating channels according to specified Reducers. It is equivalent to [group](/en/manual/core/transform/group) with `channels = ['y']`. The usage and configuration options are the same as the group function. Below, we explain the use cases and configuration options specific to the groupY function.

## Options

| Property  | Description                                                 | Type      | Default |
| --------- | ----------------------------------------------------------- | --------- | ------- |
| [channel] | Aggregation method for channel data output to specific mark | `Reducer` |         |

For detailed information about `Reducer`, please refer to the configuration options of the [group](/en/manual/core/transform/group) function.

## Examples

For example, in corresponding marks, you can use the transform method to apply data transformations. We can use groupY to group and aggregate data. In the example below, we will group the y channel and calculate the minimum and maximum values for each group.

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'view',
  height: 180,
  paddingLeft: 80,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          body_mass_g: +d.body_mass_g,
        }),
      },
    ],
  },
  children: [
    {
      type: 'point',
      encode: { x: 'body_mass_g', y: 'species' },
      style: { stroke: '#000' },
    },
    {
      type: 'link',
      encode: { x: 'body_mass_g', y: 'species' },
      transform: [{ type: 'groupY', x: 'min', x1: 'max' }],
      style: { stroke: '#000' },
    },
    {
      type: 'point',
      encode: { y: 'species', x: 'body_mass_g', shape: 'line', size: 12 },
      transform: [{ type: 'groupY', x: 'median' }],
      style: { stroke: 'red' },
    },
  ],
});

chart.render();
```

Explanation:

1. In this example, we first define a set of penguin data `data`, containing penguin body mass and species;
2. In the code above, the `transform` method uses a `groupY` type data transformation to group data by the `y` channel;
3. After grouping, the data is aggregated according to the values of the `y` channel, calculating the minimum and maximum values of `body_mass_g` for each `species`;
4. Finally, through the `encode` method, the grouped data is mapped to the chart's `x` and `y` axis for rendering.
